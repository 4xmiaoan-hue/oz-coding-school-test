import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
if (!supabaseUrl) throw new Error('Missing Supabase URL');
if (!supabaseServiceKey) throw new Error('Missing Supabase service key');
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Product data (Server-side source of truth for pricing)
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

    const { product_id, phone_number, guest_profile_id } = req.body;

    if (!product_id || !phone_number || !guest_profile_id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const product = PRODUCTS.find(p => p.id === product_id);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    try {
        // 1. Create Order in Supabase
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                product_id: product.id,
                phone_number: phone_number,
                amount: product.price,
                guest_profile_id: guest_profile_id,
                status: 'pending'
            })
            .select()
            .single();

        if (orderError) throw orderError;

        // 2. Prepare KCP Parameters (Production)
        // KCP Standard Web Payment Parameters
        const kcpParams = {
            site_cd: process.env.KCP_SITE_CODE, // Production MID
            site_name: '지지직감',
            ordr_idxx: order.id,
            pay_method: '100000000000', // Credit Card
            good_name: `${product.name} AI 리포트`,
            good_mny: String(product.price),
            buyr_name: '비회원',
            buyr_mail: '',
            buyr_tel1: phone_number,
            buyr_tel2: phone_number,
            currency: 'WON',
            quota: '00', // Lump sum
            // Return URLs
            ret_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://jijijikgam.com'}/api/payment/confirm`,
            site_logo: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://jijijikgam.com'}/logo.png`, // Optional
            // KCP Specifics
            module_type: '01', // Standard
            res_cd: '',
            res_msg: '',
            enc_info: '',
            enc_data: '',
            use_pay_method: '100000000000'
        };

        return res.status(200).json({
            order_id: order.id,
            order_token: order.order_token,
            kcp_params: kcpParams
        });

    } catch (err: any) {
        return res.status(500).json({ error: 'Database error', detail: err?.message });
    }
}
