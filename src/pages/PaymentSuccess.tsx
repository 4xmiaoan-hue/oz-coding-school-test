import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { CheckCircle2, ArrowRight, FileText, Share2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const orderToken = searchParams.get('order_token');
    const [orderData, setOrderData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!orderToken) {
                navigate('/');
                return;
            }

            const { data, error } = await supabase
                .from('orders')
                .select('*, products(*)')
                .eq('order_token', orderToken)
                .single();

            if (error || !data) {
                console.error('Order fetch error:', error);
                navigate('/');
                return;
            }

            setOrderData(data);
            setLoading(false);
        };

        fetchOrder();
        window.scrollTo(0, 0);
    }, [orderToken, navigate]);

    if (loading) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            
            <main className="flex-1 w-full max-w-[600px] mx-auto px-5 py-10 pt-[120px] text-center">
                <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-sm border border-gray-100">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                            <CheckCircle2 size={48} className="text-green-500" />
                        </div>
                    </div>

                    <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">결제가 완료되었습니다!</h1>
                    <p className="text-gray-500 mb-8 font-medium">
                        {orderData.products.name}의 AI 리포트가 생성되었습니다.
                    </p>

                    <div className="bg-gray-50 p-6 rounded-2xl mb-8 text-left space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400 font-medium">주문 상품</span>
                            <span className="text-gray-900 font-bold">{orderData.products.name} 리포트</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400 font-medium">결제 금액</span>
                            <span className="text-gray-900 font-bold">{new Intl.NumberFormat('ko-KR').format(orderData.amount)}원</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400 font-medium">주문 번호</span>
                            <span className="text-gray-900 font-mono text-xs">{orderData.id.slice(0, 8).toUpperCase()}</span>
                        </div>
                    </div>

                    <div className="space-y-4 flex flex-col items-center">
                        <Button 
                            className="w-full sm:w-auto px-12 h-16 text-lg font-bold text-white bg-[#111111] rounded-full shadow-md hover:bg-[#111111]/90 hover:shadow-lg focus:ring-4 focus:ring-[#111111]/20 transition-all transform hover:-translate-y-0.5"
                            aria-label="결제 완료 후 리포트 확인하기"
                            onClick={() => navigate(`/order/${orderToken}`)}
                        >
                            <FileText size={20} className="mr-2" />
                            리포트 읽기
                            <ArrowRight size={20} className="ml-2" />
                        </Button>
                        
                        <div className="flex gap-3 w-full sm:w-auto">
                            <Button 
                                variant="outline"
                                className="w-full sm:w-auto px-8 h-12 rounded-xl border-gray-200 text-gray-600 font-bold flex items-center justify-center gap-2 hover:bg-gray-50 hover:text-gray-900"
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.origin + `/order/${orderToken}`);
                                    alert('리포트 주소가 복사되었습니다. 나중에 이 주소로 다시 볼 수 있습니다.');
                                }}
                            >
                                <Share2 size={18} />
                                주소 복사
                            </Button>
                        </div>
                    </div>

                    <p className="mt-8 text-xs text-gray-400 leading-relaxed">
                        비회원 구매의 경우, 위 '주소 복사'를 통해 링크를 보관하시거나<br />
                        입력하신 휴대폰 번호로 전송된 안내를 확인해 주세요.
                    </p>
                </div>

                <div className="mt-8">
                    <Link to="/" className="text-sm font-bold text-gray-400 hover:text-primary transition-colors">
                        홈으로 돌아가기
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
