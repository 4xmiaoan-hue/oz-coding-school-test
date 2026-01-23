import React, { useMemo } from 'react';
import ScrollPanel from './ScrollPanel';
import contract from '../../config/report_contract.json';
import { WebtoonReportData } from '../../types/report-webtoon'; // Keep for compatibility if needed

interface WebtoonScrollReportProps {
    rawText?: string;
    data?: WebtoonReportData; // Fallback
}

export default function WebtoonScrollReport({ rawText, data }: WebtoonScrollReportProps) {
    // Parse the raw text into sections
    const sections = useMemo(() => {
        if (!rawText) return [];
        
        const parsedSections: { id: number; title: string; content: string }[] = [];
        
        contract.sections.forEach((sectionDef, index) => {
            const marker = sectionDef.marker;
            const nextMarker = contract.sections[index + 1]?.marker;
            
            const startIndex = rawText.indexOf(marker);
            if (startIndex === -1) return;
            
            const endIndex = nextMarker ? rawText.indexOf(nextMarker) : rawText.length;
            if (endIndex === -1) return;
            
            const content = rawText.substring(startIndex + marker.length, endIndex).trim();
            
            parsedSections.push({
                id: sectionDef.id,
                title: sectionDef.title,
                content
            });
        });
        
        return parsedSections;
    }, [rawText]);

    if (!rawText && data) {
        // Fallback to old renderer logic if rawText is missing but data exists?
        // Or render data as panels. For MVP, we assume rawText is provided by new backend.
        return <div>Legacy data format not supported in Scroll View yet.</div>;
    }

    if (!sections.length) {
        return (
            <div className="p-10 text-center flex flex-col items-center justify-center min-h-screen">
                <p className="text-xl font-bold mb-4">리포트 내용을 불러올 수 없습니다 (형식 오류).</p>
                <div className="text-left bg-gray-100 p-4 rounded max-w-lg w-full overflow-auto max-h-64 text-xs">
                    <strong>Debug Info:</strong><br/>
                    Raw Text Length: {rawText?.length || 0}<br/>
                    First 100 chars: {rawText?.substring(0, 100)}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-[#FDFBF7]">
            {sections.map((section) => (
                <ScrollPanel key={section.id} className="border-b border-stone-200">
                    <div className="mb-8 text-center">
                        <span className="inline-block px-3 py-1 bg-stone-800 text-white text-xs font-bold rounded-full mb-3 tracking-widest">
                            SECTION {section.id}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900">
                            {section.title}
                        </h2>
                    </div>
                    
                    <div className="whitespace-pre-line font-serif text-stone-800 break-keep">
                        {section.content.split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}
                    </div>
                </ScrollPanel>
            ))}
            
            {/* Footer / Home Button */}
            <div className="py-20 text-center bg-[#FDFBF7]">
                <button 
                    onClick={() => window.location.href = '/'}
                    className="px-8 py-4 bg-stone-900 text-white font-bold rounded-full hover:bg-stone-800 transition-colors"
                >
                    홈으로 돌아가기
                </button>
            </div>
        </div>
    );
}
