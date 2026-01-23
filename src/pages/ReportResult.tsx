import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WebtoonReportRenderer from '../components/report/WebtoonReportRenderer';
import WebtoonScrollReport from '../components/report/WebtoonScrollReport';
import { WebtoonReportData } from '../types/report-webtoon';

export default function ReportResult() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as { data: WebtoonReportData | any };
    const data = state?.data;

    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center p-8 bg-white rounded-lg shadow-sm">
                    <p className="text-gray-600 mb-4 text-lg">생성된 리포트 정보가 없습니다.</p>
                    <p className="text-gray-400 mb-6 text-sm">다시 시도해주세요.</p>
                    <button 
                        onClick={() => navigate('/')} 
                        className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                    >
                        홈으로 돌아가기
                    </button>
                </div>
            </div>
        );
    }

    // Check if new Raw Text format
    if (data.raw_text) {
        return <WebtoonScrollReport rawText={data.raw_text} />;
    }

    // Fallback to legacy
    return <WebtoonReportRenderer data={data as WebtoonReportData} />;
}
