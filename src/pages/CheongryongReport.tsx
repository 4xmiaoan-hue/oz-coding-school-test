import React from 'react';
import { ReportHeader, ReportTitle } from '../components/report/ReportHeader';
import { ScrollPage } from '../components/report/ScrollPage';
import { SummaryCard } from '../components/report/SummaryCard';
import { SajuPillarCard } from '../components/report/SajuPillarCard';
import { ComparisonCard } from '../components/report/ComparisonCard';
import { SceneBlock } from '../components/report/SceneBlock';
import { CTASection } from '../components/report/CTASection';
import { CHEONGRYONG_REPORT_DATA as data } from '../data/cheongryongReportData';
import ReactMarkdown from 'react-markdown';

const RenderContent = ({ content }: { content: string }) => {
  // Split content by lines to find Scene placeholders
  const lines = content.split('\n');
  
  return (
    <div className="space-y-4 text-[#1A1A1A]/80 leading-loose text-[15px] sm:text-[17px] font-serif break-keep">
      {lines.map((line, idx) => {
        if (line.trim().startsWith('//')) {
          return <SceneBlock key={idx} description={line} />;
        }
        if (line.trim() === '') return <br key={idx} />;
        
        return (
           <ReactMarkdown 
             key={idx}
             components={{
               strong: ({node, ...props}) => <span className="font-bold text-[#1A1A1A] border-b border-[#1A1A1A]/20 pb-[1px]" {...props} />,
               li: ({node, ...props}) => <li className="list-disc ml-4 marker:text-[#1A1A1A]/40 pl-1" {...props} />,
               ul: ({node, ...props}) => <ul className="space-y-1 my-2" {...props} />,
             }}
           >
             {line}
           </ReactMarkdown>
        );
      })}
    </div>
  );
};

const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="font-serif font-bold text-lg sm:text-xl text-[#1A1A1A] mb-4 mt-8 flex items-center gap-2">
    <span className="w-1.5 h-1.5 bg-[#1A1A1A] rounded-full opacity-40"></span>
    {title}
  </h2>
);

const CheongryongReport = () => {
  return (
    <div className="min-h-screen bg-[#2A2A2A] pb-20">
      <ReportHeader title={data.header.title} meta={data.header.meta} />
      
      <div className="max-w-[800px] mx-auto pt-8 sm:pt-12 px-0">
        
        {/* Page 1: Title & Summary */}
        <ScrollPage pageNumber={1} totalPages={4}>
          <ReportTitle title={data.header.title} meta={data.header.meta} />
          
          <div className="mt-8">
            <SectionTitle title="핵심 요약" />
            <SummaryCard data={data.summary} />
          </div>
          
          <div className="mt-12 text-center animate-bounce">
            <span className="text-[10px] text-[#1A1A1A]/30 font-mono tracking-widest uppercase">Scroll Down</span>
          </div>
        </ScrollPage>

        {/* Page 2: Sections 1-2 */}
        <ScrollPage pageNumber={2} totalPages={4}>
          {data.sections.slice(0, 2).map((section) => (
            <div key={section.id}>
              <SectionTitle title={section.title} />
              <RenderContent content={section.content} />
              {section.id === 'section-2' && (
                <SajuPillarCard data={data.saju} />
              )}
            </div>
          ))}
        </ScrollPage>

        {/* Page 3: Sections 3-5 */}
        <ScrollPage pageNumber={3} totalPages={4}>
          {data.sections.slice(2, 5).map((section) => (
            <div key={section.id}>
              <SectionTitle title={section.title} />
              <RenderContent content={section.content} />
              {section.id === 'section-5' && section.comparison && (
                <ComparisonCard 
                  before={section.comparison.before} 
                  after={section.comparison.after} 
                />
              )}
            </div>
          ))}
        </ScrollPage>

        {/* Page 4: Sections 6-7 + CTA */}
        <ScrollPage pageNumber={4} totalPages={4}>
          {data.sections.slice(5).map((section) => (
            <div key={section.id}>
              <SectionTitle title={section.title} />
              <RenderContent content={section.content} />
            </div>
          ))}
          
          <div className="mt-12">
            <CTASection />
          </div>
        </ScrollPage>
      </div>
    </div>
  );
};

export default CheongryongReport;
