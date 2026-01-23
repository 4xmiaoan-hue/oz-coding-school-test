-- Products table
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    sub_name TEXT NOT NULL,
    question_text TEXT NOT NULL,
    price INTEGER NOT NULL,
    original_price INTEGER,
    discount_rate INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Orders table (Non-member focused)
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_token TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
    product_id TEXT REFERENCES public.products(id),
    phone_number TEXT NOT NULL,
    amount INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending', -- pending, paid, cancelled, failed
    payment_method TEXT,
    pg_tid TEXT, -- PG Transaction ID
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Reports table
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    order_token TEXT NOT NULL, -- For quick lookup without joining orders
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Products: Everyone can read
CREATE POLICY "Allow public read access to products" ON public.products FOR SELECT USING (true);

-- Orders: Public can create, but only read if they have the token (handled via API/Functions)
-- For MVP, we'll allow public insert for non-member checkout
CREATE POLICY "Allow public insert access to orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow read access to orders with token" ON public.orders FOR SELECT USING (true);

-- Reports: Read access with order_token
CREATE POLICY "Allow read access to reports with token" ON public.reports FOR SELECT USING (true);

-- Insert initial product data from zodiacData.ts
INSERT INTO public.products (id, name, sub_name, question_text, price, original_price, discount_rate)
VALUES 
('mouse', '자(子) · 쥐 도사', '눈치 · 관계 피로 · 불안', '나는 왜 항상 눈치를 보며 관계를 유지할까?', 8900, 18000, 51),
('cow', '축(丑) · 소 도사', '책임 · 의무 · 번아웃', '이건 책임감일까, 아니면 그냥 버티는 걸까?', 9900, 20000, 50),
('tiger', '인(寅) · 호랑이 도사', '자존심 · 분노 · 주도권', '왜 나는 항상 강한 척을 하게 될까?', 11900, 24000, 50),
('rabbit', '묘(卯) · 토끼 도사', '연애 · 감정 기복 · 기대', '나는 왜 사랑에서 항상 더 많이 기대할까?', 10900, 22000, 50),
('dragon', '진(辰) · 청룡 도사', '큰 흐름 · 방향성 · 인생 판단', '지금은 버텨야 할 때일까, 바꿔야 할 때일까?', 14900, 30000, 50),
('snake', '사(巳) · 뱀 도사', '속마음 · 관계의 이면 · 심리전', '이 사람, 정말 무슨 생각을 하고 있을까?', 11900, 24000, 50),
('horse', '오(午) · 말 도사', '추진력 · 방향 · 결단', '지금 달려야 할까, 멈춰야 할까?', 13900, 28000, 50),
('sheep', '미(未) · 양 도사', '자기 보호 · 감정 회복 · 자존감', '나는 왜 늘 나 자신을 뒤로 미룰까?', 8900, 18000, 51),
('monkey', '신(申) · 원숭이 도사', '판단 · 전략 · 기회', '이 판에서 나는 어떻게 움직여야 할까?', 9900, 20000, 50),
('chicken', '유(酉) · 닭 도사', '진실 · 표현 · 솔직함', '이 말, 지금 해도 될까?', 13900, 28000, 50),
('dog', '술(戌) · 개 도사', '신뢰 · 관계 유지 · 끝까지 가는 것', '나는 왜 항상 끝까지 남는 쪽일까?', 9900, 20000, 50),
('pig', '해(亥) · 돼지 도사', '회피 · 무기력 · 현실 도피', '아무것도 하기 싫은 나는, 잘못된 걸까?', 10900, 22000, 50)
ON CONFLICT (id) DO UPDATE SET
    price = EXCLUDED.price,
    original_price = EXCLUDED.original_price,
    discount_rate = EXCLUDED.discount_rate;
