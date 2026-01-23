import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
if (!supabaseUrl) throw new Error('Missing Supabase URL');
if (!supabaseServiceKey) throw new Error('Missing Supabase service key');
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const PRODUCTS = [
  { id: 'mouse', price: 8900, name: '자(子) · 쥐 도사' },
  { id: 'cow', price: 9900, name: '축(丑) · 소 도사' },
  { id: 'tiger', price: 11900, name: '인(寅) · 호랑이 도사' },
  { id: 'rabbit', price: 10900, name: '묘(卯) · 토끼 도사' },
  { id: 'dragon', price: 14900, name: '진(辰) · 청룡 도사' },
  { id: 'snake', price: 11900, name: '사(巳) · 뱀 도사' },
  { id: 'horse', price: 13900, name: '오(午) · 말 도사' },
  { id: 'sheep', price: 8900, name: '미(未) · 양 도사' },
  { id: 'monkey', price: 9900, name: '신(申) · 원숭이 도사' },
  { id: 'chicken', price: 13900, name: '유(酉) · 닭 도사' },
  { id: 'dog', price: 9900, name: '술(戌) · 개 도사' },
  { id: 'pig', price: 10900, name: '해(亥) · 돼지 도사' }
];

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { product_id, phone_number } = req.body || {};
  if (!product_id || !phone_number) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const product = PRODUCTS.find(p => p.id === product_id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  try {
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        product_id: product_id,
        phone_number,
        amount: product.price,
        status: 'pending'
      })
      .select()
      .single();
    if (error || !order) {
      return res.status(500).json({ error: 'Database error', detail: error?.message });
    }
    const paymentId = order.id;
    return res.status(200).json({
      paymentId,
      orderName: `${product.name} AI 리포트`,
      totalAmount: product.price,
      currency: 'KRW'
    });
  } catch {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
