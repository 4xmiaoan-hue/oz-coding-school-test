import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export default function PaymentRedirect() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get('code');
    const message = searchParams.get('message') || '결제에 실패했습니다.';
    const paymentId = searchParams.get('paymentId');

    if (code) {
      navigate(`/payment/fail?error=${encodeURIComponent(message)}`);
      return;
    }
    if (!paymentId) {
      navigate(`/payment/fail?error=${encodeURIComponent('결제 식별자가 없습니다.')}`);
      return;
    }

    const apiBase = (() => {
      const env = import.meta.env.VITE_API_URL || '';
      const origin = window.location.origin;
      const isLocalOrigin = /localhost|127\.0\.0\.1/.test(origin);
      const isEnvLocal = /^https?:\/\/(localhost|127\.0\.0\.1)/.test(env);
      if (env && !(isEnvLocal && !isLocalOrigin)) return env;
      if (isLocalOrigin) return 'http://localhost:3000';
      return origin;
    })();
    (async () => {
      try {
        const res = await fetch(`${apiBase}/api/payment/complete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentId,
            orderId: paymentId
          })
        });
        if (!res.ok) {
          const txt = await res.text();
          navigate(`/payment/fail?error=${encodeURIComponent(txt || '결제 검증 실패')}`);
          return;
        }
        const data = await res.json();
        if (data?.order_token) {
          navigate(`/payment/success?order_token=${encodeURIComponent(data.order_token)}`);
        } else {
          navigate(`/payment/success`);
        }
      } catch (e: any) {
        navigate(`/payment/fail?error=${encodeURIComponent(e?.message || '결제 검증 오류')}`);
      }
    })();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-[600px] mx-auto px-5 py-10 pt-[120px] text-center">
        <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-sm border border-gray-100">
          <p className="text-gray-600 font-medium">결제 결과 확인 중입니다...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
