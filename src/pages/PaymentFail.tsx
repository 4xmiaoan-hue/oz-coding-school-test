import React from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { XCircle, RefreshCcw, Home } from 'lucide-react';

export default function PaymentFail() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const errorMsg = searchParams.get('error') || '결제 중 알 수 없는 오류가 발생했습니다.';

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            
            <main className="flex-1 w-full max-w-[600px] mx-auto px-5 py-10 pt-[120px] text-center">
                <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-sm border border-gray-100">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
                            <XCircle size={48} className="text-red-500" />
                        </div>
                    </div>

                    <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">결제에 실패했습니다</h1>
                    <p className="text-gray-500 mb-8 font-medium">
                        {errorMsg}
                    </p>

                    <div className="space-y-4">
                        <Button 
                            className="w-full h-14 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                            onClick={() => navigate(-1)}
                        >
                            <RefreshCcw size={20} />
                            다시 시도하기
                        </Button>
                        
                        <Button 
                            variant="outline"
                            className="w-full h-14 rounded-2xl border-gray-200 text-gray-600 font-bold flex items-center justify-center gap-2"
                            onClick={() => navigate('/')}
                        >
                            <Home size={20} />
                            홈으로 돌아가기
                        </Button>
                    </div>

                    <div className="mt-10 pt-8 border-t border-gray-100 text-left">
                        <h3 className="text-sm font-bold text-gray-900 mb-3">도움이 필요하신가요?</h3>
                        <ul className="text-xs text-gray-400 space-y-2 leading-relaxed">
                            <li>• 카드 한도 초과 또는 잔액 부족 여부를 확인해 주세요.</li>
                            <li>• 결제 창을 중간에 닫았을 경우 결제가 진행되지 않습니다.</li>
                            <li>• 지속적으로 오류가 발생하면 고객센터로 문의해 주세요. (help@jijijikgam.com)</li>
                        </ul>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
