import React, { useState, useEffect, useRef } from 'react';
import PortOne from '@portone/browser-sdk/v2';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ZODIAC_CARDS } from '../constants/zodiacData';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { Shield, CreditCard, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useCustomerStore } from '../store/customer';
import { Modal } from '../components/ui/Modal';
import { POLICY_MODAL_CONTENT } from '../constants/policies';

export default function Checkout() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const productId = searchParams.get('product_id');
    const guestProfileId = searchParams.get('guest_profile_id');
    const product = ZODIAC_CARDS.find(p => p.id === productId);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [agreePrivacy, setAgreePrivacy] = useState(false);
    const [agreePayment, setAgreePayment] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

    const formRef = useRef<HTMLFormElement>(null);
    const [kcpParams, setKcpParams] = useState<Record<string, string>>({});
    const storeId = import.meta.env.VITE_PORTONE_STORE_ID || '';
    // Use test channel key for specific products (Dragon, Rabbit, Monkey, Sheep)
    const isTestProduct = ['dragon', 'rabbit', 'monkey', 'sheep'].includes(productId || '');
    const channelKey = isTestProduct 
        ? 'channel-key-8052f98e-071b-4a1c-8e23-930cf1c53fad' // Test Channel Key
        : (import.meta.env.VITE_PORTONE_CHANNEL_KEY || '');
    const customerNameParam = (searchParams.get('customer_name') || '').trim();
    const customerNameStore = useCustomerStore.getState().name;
    const customerName = customerNameParam || customerNameStore || '비회원';

    useEffect(() => {
        if (!productId || !product || !guestProfileId) {
            navigate('/');
        }
        window.scrollTo(0, 0);
    }, [productId, product, guestProfileId, navigate]);

    useEffect(() => {
        if (Object.keys(kcpParams).length > 0 && formRef.current) {
            formRef.current.submit();
        }
    }, [kcpParams]);

    if (!product) return null;

    const validatePhone = (phone: string) => {
        const regex = /^010\d{7,8}$/;
        return regex.test(phone.replace(/-/g, ''));
    };

    const isFormValid = validatePhone(phoneNumber) && agreePrivacy && agreePayment;

    const toSdkCurrency = (cur?: string) => {
        const c = (cur || '').toUpperCase();
        if (!c) return 'CURRENCY_KRW';
        if (c.startsWith('CURRENCY_')) return c;
        if (c === 'KRW') return 'CURRENCY_KRW';
        if (c === 'USD') return 'CURRENCY_USD';
        if (c === 'JPY') return 'CURRENCY_JPY';
        return 'CURRENCY_KRW';
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length <= 11) {
            setPhoneNumber(value);
        }
    };

    const handlePayment = async () => {
        if (!isFormValid) return;
        
        setIsSubmitting(true);
        setError(null);

        try {
            const apiBase = (() => {
                const env = import.meta.env.VITE_API_URL || '';
                const origin = window.location.origin;
                const isLocalOrigin = /localhost|127\.0\.0\.1/.test(origin);
                const isEnvLocal = /^https?:\/\/(localhost|127\.0\.0\.1)/.test(env);
                if (env && !(isEnvLocal && !isLocalOrigin)) return env;
                if (isLocalOrigin) return 'http://localhost:3000';
                return origin;
            })();
            const requestUrlPrimary = `${apiBase}/api/payment/request`;
            const requestUrlKcpCreate = `${apiBase}/api/checkout/create`;
            const requestUrlKcpInit = `${apiBase}/api/kcp/init`;
            const safeJson = async (res: Response) => {
                const text = await res.text();
                try {
                    return JSON.parse(text);
                } catch {
                    throw new Error('응답 포맷 오류');
                }
            };

            async function initKcp(url: string) {
                const resp = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        product_id: product.id,
                        phone_number: phoneNumber,
                        guest_profile_id: guestProfileId
                    })
                });
                const text = await resp.text();
                if (!resp.ok) {
                    throw new Error(`KCP 초기화 실패 (${resp.status}): ${text || ''}`.trim());
                }
                let parsed: any;
                try {
                    parsed = JSON.parse(text);
                } catch {
                    throw new Error(`응답 포맷 오류: ${text.slice(0, 200)}`);
                }
                const kcp_params = parsed?.kcp_params;
                if (!kcp_params || typeof kcp_params.good_mny === 'undefined') {
                    throw new Error('응답 데이터 누락(kcp_params)');
                }
                const uiAmount = parseInt(String(product.price), 10);
                const serverAmount = parseInt(String(kcp_params.good_mny), 10);
                if (serverAmount !== uiAmount) {
                    throw new Error('금액 불일치로 결제를 진행할 수 없습니다.(KCP)');
                }
                setKcpParams(kcp_params);
                setIsSubmitting(false);
            }
            // 1) Prefer PortOne flow
            const orderRes = await fetch(requestUrlPrimary, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product_id: product.id,
                    phone_number: phoneNumber,
                    guest_profile_id: guestProfileId
                })
            });
            if (!orderRes.ok) {
                const msg = await orderRes.text();
                throw new Error(msg || '주문 생성 실패');
            }
            const { paymentId, orderName, totalAmount, currency } = await safeJson(orderRes);
            const uiAmount = Number(product.price);
            if (Number(totalAmount) !== uiAmount) {
                throw new Error('금액 불일치로 결제를 진행할 수 없습니다.');
            }
            const effStoreId = storeId;
            const effChannelKey = channelKey;
            let payment: any;
            try {
                const PortOneGlobal = (window as any).PortOne || PortOne;
                if (!effStoreId || !effStoreId.startsWith('store-')) {
                    throw new Error('PORTONE_STORE_ID가 올바르지 않습니다.');
                }
                if (!effChannelKey || !effChannelKey.startsWith('channel-key-')) {
                    throw new Error('PORTONE_CHANNEL_KEY가 올바르지 않습니다.');
                }
                const isMobile = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
                payment = await PortOneGlobal.requestPayment({
                    storeId: effStoreId,
                    channelKey: effChannelKey,
                    paymentId,
                    orderName: orderName || `${product.name} AI 리포트`,
                    totalAmount: uiAmount,
                    currency: toSdkCurrency(currency),
                    redirectUrl: isMobile ? `${window.location.origin}/payment/redirect` : undefined,
                    noticeUrls: [ `${window.location.origin}/api/portone/webhook` ],
                    customer: {
                        fullName: customerName,
                        phoneNumber: String(phoneNumber || '').replace(/[^0-9]/g, '')
                    },
                    payMethod: 'CARD',
                    customData: {
                        product_id: product.id,
                        guest_profile_id: guestProfileId
                    }
                });
                if (payment && payment.code !== undefined) {
                    const info = {
                        code: payment.code,
                        message: payment.message,
                        pgCode: payment.pgCode,
                        pgMessage: payment.pgMessage
                    };
                    throw new Error(JSON.stringify(info));
                }
            } catch (e: any) {
                try {
                    const parsed = JSON.parse(String(e?.message || '{}'));
                    if (parsed?.code === 'PG_PROVIDER_ERROR' && String(parsed?.pgCode) === 'CC84') {
                        const isMobile = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
                        const PortOneGlobal = (window as any).PortOne || PortOne;
                        payment = await PortOneGlobal.requestPayment({
                            storeId,
                            paymentId,
                            orderName: orderName || `${product.name} AI 리포트`,
                            totalAmount: uiAmount,
                            currency: toSdkCurrency(currency),
                            redirectUrl: isMobile ? `${window.location.origin}/payment/redirect` : undefined,
                            customer: {
                                fullName: customerName,
                                phoneNumber: String(phoneNumber || '').replace(/[^0-9]/g, '')
                            },
                            payMethod: 'CARD',
                            customData: {
                                product_id: product.id,
                                guest_profile_id: guestProfileId
                            }
                        });
                        if (payment && payment.code !== undefined) {
                            throw new Error(payment.message || 'PORTONE_PAYMENT_ERROR');
                        }
                    } else {
                        throw e;
                    }
                } catch {
                    throw e;
                }
            }
            // 3) Complete/verify on backend
            const completeRes = await fetch(`${apiBase}/api/payment/complete`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    paymentId: payment.paymentId,
                    orderId: paymentId
                })
            });
            if (!completeRes.ok) {
                const msg = await completeRes.text();
                throw new Error(msg || '결제 완료 검증 실패');
            }
            const completeData = await completeRes.json();
            setIsSubmitting(false);
            if (completeData?.order_token) {
                navigate(`/payment/success?order_token=${encodeURIComponent(completeData.order_token)}`);
            } else {
                navigate(`/payment/success`);
            }

        } catch (err: any) {
            console.error('Payment Error:', err);
            setError(err.message || '결제 진행 중 오류가 발생했습니다. 다시 시도해 주세요.');
            setIsSubmitting(false);
        }
    };

    const setPaymentStatusFailed = (payment: any) => {
        setError(payment.message || '결제가 취소되었거나 실패했습니다.');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            
            <main className="flex-1 w-full max-w-[600px] mx-auto px-5 py-10 pt-[100px]">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-1 text-gray-500 hover:text-gray-900 mb-6 transition-colors"
                >
                    <ArrowLeft size={18} />
                    <span className="text-sm font-medium">뒤로가기</span>
                </button>

                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">주문/결제</h1>

                <div className="space-y-6">
                    {/* Product Summary */}
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <CheckCircle2 size={20} className="text-primary" />
                            선택한 상품
                        </h2>
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <div className="font-bold text-gray-900">{product.name}</div>
                                <div className="text-sm text-gray-500">{product.subName} AI 리포트</div>
                            </div>
                            <div className="text-right">
                                <div className="font-extrabold text-primary text-xl">
                                    {new Intl.NumberFormat('ko-KR').format(product.price)}원
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Phone Number Input */}
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <AlertCircle size={20} className="text-blue-500" />
                            비회원 정보 입력
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    휴대폰 번호
                                </label>
                                <input 
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={handlePhoneChange}
                                    placeholder="휴대폰 번호 (숫자만 입력)"
                                    className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-lg tracking-wider"
                                />
                                <p className="mt-2 text-xs text-gray-400">
                                    * 결제 완료 후 리포트 확인 및 주문 조회 시 필요합니다.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Agreements */}
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">약관 동의</h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <input 
                                    type="checkbox"
                                    id="privacy"
                                    checked={agreePrivacy}
                                    onChange={(e) => setAgreePrivacy(e.target.checked)}
                                    className="mt-1 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <div className="flex-1">
                                    <label htmlFor="privacy" className="text-sm text-gray-700 leading-tight">
                                        개인정보 수집·이용에 동의합니다 (필수)
                                    </label>
                                    <button 
                                        type="button"
                                        onClick={() => setActiveModal('privacy')}
                                        className="ml-2 text-xs text-gray-400 underline hover:text-gray-600"
                                    >
                                        자세히 보기
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <input 
                                    type="checkbox"
                                    id="payment"
                                    checked={agreePayment}
                                    onChange={(e) => setAgreePayment(e.target.checked)}
                                    className="mt-1 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <div className="flex-1">
                                    <label htmlFor="payment" className="text-sm text-gray-700 leading-tight">
                                        결제 진행 및 서비스 이용 약관에 동의합니다 (필수)
                                    </label>
                                    <button 
                                        type="button"
                                        onClick={() => setActiveModal('terms')}
                                        className="ml-2 text-xs text-gray-400 underline hover:text-gray-600"
                                    >
                                        자세히 보기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                            {error}
                        </div>
                    )}

                    {/* Final CTA */}
                    <div className="pt-4">
                        <div className="flex items-center justify-between mb-4 px-2">
                            <span className="text-gray-500 font-medium">총 결제 금액</span>
                            <span className="text-2xl font-black text-gray-900">
                                {new Intl.NumberFormat('ko-KR').format(product.price)}원
                            </span>
                        </div>
                        <Button 
                            className="w-full h-16 text-xl md:text-2xl font-black tracking-wide rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 disabled:opacity-50 disabled:shadow-none disabled:translate-y-0 transition-all bg-primary text-white ring-offset-2 focus:ring-2 focus:ring-primary"
                            disabled={!isFormValid || isSubmitting}
                            onClick={handlePayment}
                        >
                            {isSubmitting ? '결제창 호출 중...' : '지금 결제하기'}
                        </Button>
                        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                            <Shield size={14} />
                            <span>보안 결제 시스템 적용</span>
                        </div>
                    </div>
                </div>

                {/* Hidden KCP Form */}
                <form 
                    ref={formRef} 
                    method="POST" 
                    action="https://pay.kcp.co.kr/pay/pay_plus.jsp" 
                    acceptCharset="UTF-8"
                >
                    {Object.entries(kcpParams).map(([key, value]) => (
                        <input key={key} type="hidden" name={key} value={value} />
                    ))}
                </form>

                <Modal 
                    isOpen={activeModal === 'privacy'}
                    onClose={() => setActiveModal(null)}
                    title="개인정보 수집·이용 동의"
                >
                    {POLICY_MODAL_CONTENT.PRIVACY}
                </Modal>

                <Modal 
                    isOpen={activeModal === 'terms'}
                    onClose={() => setActiveModal(null)}
                    title="서비스 이용약관"
                >
                    {POLICY_MODAL_CONTENT.TERMS}
                </Modal>
            </main>

            <Footer />
        </div>
    );
}
