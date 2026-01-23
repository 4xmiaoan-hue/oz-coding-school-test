import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

function verifySignature(rawBody: string, headers: any, secret: string) {
  const sig = headers['x-portone-signature'] || headers['x-portone-signature-v2'];
  if (!sig || !secret) return false;
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(rawBody);
  const hex = hmac.digest('hex');
  const base64 = Buffer.from(hex, 'hex').toString('base64');
  return sig === hex || sig === base64;
}

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    if (!supabaseUrl || !supabaseServiceKey) {
      return res.status(500).json({ error: 'Missing Supabase configuration' });
    }
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
    const secret = process.env.PORTONE_WEBHOOK_SECRET || process.env.PORTONE_V2_WEBHOOK_SECRET || '';
    if (secret && !verifySignature(raw, req.headers, secret)) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    let event: any = null;
    try {
      event = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    } catch {
      return res.status(400).json({ error: 'Invalid JSON body' });
    }

    const type = event?.type;
    const paymentId = event?.data?.paymentId;
    const timestamp = event?.timestamp;
    if (!paymentId) {
      return res.status(200).json({ ok: true, note: 'No paymentId' });
    }

    const PORTONE_API_SECRET = process.env.PORTONE_V2_API_SECRET || '';
    if (!PORTONE_API_SECRET) {
      return res.status(500).json({ error: 'Missing PORTONE_V2_API_SECRET' });
    }

    const payResp = await fetch(`https://api.portone.io/payments/${encodeURIComponent(paymentId)}`, {
      headers: { Authorization: `PortOne ${PORTONE_API_SECRET}` }
    });
    if (!payResp.ok) {
      return res.status(200).json({ ok: true, note: 'Payment query failed' });
    }
    const payment = await payResp.json();

    const { data: orderRow } = await supabase
      .from('orders')
      .select('*')
      .eq('id', paymentId)
      .single();

    if (orderRow) {
      const intended = orderRow.amount;
      const paidTotal = payment?.amount?.total;
      if (Number(paidTotal) === Number(intended)) {
        let statusUpdate = 'pending';
        if (payment?.status === 'PAID') statusUpdate = 'paid';
        else if (payment?.status === 'VIRTUAL_ACCOUNT_ISSUED') statusUpdate = 'va_issued';
        else if (payment?.status === 'PARTIALLY_PAID') statusUpdate = 'partially_paid';
        await supabase
          .from('orders')
          .update({ status: statusUpdate, pg_tid: paymentId, updated_at: new Date().toISOString() })
          .eq('id', paymentId);
      }
    }

    return res.status(200).json({ ok: true, type, timestamp });
  } catch (e: any) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
