import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { SimpleAccordion } from '../ui/accordion';
import { Tooltip } from '../ui/tooltip';
import { Check, Info, FileText, Sparkles, Zap, BrainCircuit, Target, AlertTriangle, ChevronRight, Scroll } from 'lucide-react';
import { EmailModal } from '../ui/EmailModal';
import ScrollReveal from '../ui/ScrollReveal';

const ReportPreviewSection = () => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [modalLabel, setModalLabel] = useState<'출시 알람 신청' | '얼리버드 신청'>('얼리버드 신청');

  const processSteps = [
    {
      step: "01",
      title: "생년월일시 입력",
      Icon: FileText,
      desc: "개인의 기질과 흐름을 해석하기 위한 최소 정보만 사용하며, 분석 후 개인정보는 저장하지 않습니다."
    },
    {
      step: "02",
      title: "AI 해석 프레임 + 도사 매칭",
      Icon: BrainCircuit,
      desc: "입력된 정보와 질문을 바탕으로 열두 도사 중 한 명이 해석의 주체로 선택됩니다."
    },
    {
      step: "03",
      title: "도사 관점 리포트 제공",
      Icon: Sparkles,
      desc: "예언이나 단정 없이, 해당 도사의 시점과 말투로 지금 상태를 정리해주는 리포트를 제공합니다."
    }
  ];

  return (
    <section className="pt-8 pb-20 px-4 md:px-6 bg-gray-50/50">
      <div className="max-w-3xl mx-auto space-y-12">
        
        {/* Main Layout - Stacked Vertically */}
        <div className="space-y-16">
          
          {/* Target User & Function Description */}
          <div className="space-y-12">
            {/* Target User Card */}
            <ScrollReveal animation="slide-up">
              <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm ring-1 ring-black/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[17px] sm:text-xl flex items-center gap-2 whitespace-nowrap">
                    <Target className="w-5 h-5 text-[#92302E] shrink-0" />
                    이런 분들께 특히 잘 맞습니다
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm whitespace-nowrap">
                    현재 상황에서 답답함을 느끼는 분들을 위한 솔루션
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3 pt-2">
                  {[
                    "말로 꺼내기도 벅찬 고민이 있을 때",
                    "차가운 분석보다 이해받고 싶을 때",
                    "같은 질문을 혼자 되뇌고 있을 때",
                    "내 편에서 말해줄 존재가 필요할 때"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-[13px] sm:text-sm font-medium text-gray-700 tracking-tight">{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Function Description (Improved UI) */}
            <div className="space-y-6">
              <ScrollReveal animation="slide-up" delay={200}>
                <div className="flex items-center gap-2 px-1">
                  <Scroll className="w-5 h-5 text-[#92302E]" />
                  <h3 className="text-lg font-bold text-gray-900">지지직감 작동 원리</h3>
                </div>
              </ScrollReveal>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {processSteps.map((item, index) => (
                  <ScrollReveal key={index} animation="slide-up" delay={300 + index * 150} className="h-full">
                    <Card className="h-full relative overflow-hidden border border-[#92302E]/10 shadow-sm bg-[#92302E]/[0.05] hover:bg-[#92302E]/[0.08] hover:shadow-md transition-all duration-300 group">
                      <CardHeader className="pb-2 relative z-10">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-bold text-[#92302E] tracking-widest opacity-70">{item.step}</span>
                          <item.Icon className="w-6 h-6 text-gray-400 group-hover:text-[#92302E] transition-colors duration-300" />
                        </div>
                        <CardTitle className="text-[15px] font-bold leading-tight flex items-center gap-2 text-gray-900">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <p className="text-[13px] text-gray-700 leading-relaxed break-keep font-medium">
                          {item.desc}
                        </p>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & Flow */}
          <div className="space-y-8">
            {/* Pricing Card */}
            <ScrollReveal animation="slide-up" delay={200}>
              <Card className="relative overflow-hidden border-primary/20 shadow-xl bg-white">
                <CardHeader className="space-y-4 pb-8 border-b bg-gray-50/50">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl">AI 개인 심층 리포트</CardTitle>
                    <CardDescription>구독 없이 한번의 결제로 평생 소장하세요</CardDescription>
                  </div>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-3xl md:text-4xl font-bold text-gray-900">9,900원</span>
                    <span className="text-sm text-gray-500 line-through">19,900원</span>
                    <Badge className="ml-2 bg-red-100 text-red-600 hover:bg-red-200 border-none">50% OFF</Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-8 space-y-6">
                  <ul className="space-y-3">
                    {[
                      "15페이지 분량의 상세 분석 리포트",
                      "나의 기질/성향 완벽 분석",
                      "올해와 내년의 월별 운세 흐름",
                      "고민 해결을 위한 구체적인 조언",
                      "PDF 다운로드 및 평생 소장 가능"
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4">
                    <Button 
                      className="w-full h-12 text-lg font-bold shadow-lg hover:shadow-xl transition-all bg-[#92302E] hover:bg-[#7a2826] text-white"
                      onClick={() => { setModalLabel('얼리버드 신청'); setIsEmailModalOpen(true); }}
                    >
                      얼리버드 신청하기
                    </Button>
                    <p className="text-xs text-center text-gray-400 mt-3">
                      * 결과에 만족하지 못하시면 100% 환불해 드립니다.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Payment Flow Stepper (Custom Timeline Style) */}
            <ScrollReveal animation="slide-up" delay={400}>
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 px-1">진행 과정</h3>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <div className="relative pl-4 border-l-2 border-gray-200 space-y-8">
                    {[
                      { title: "결제 완료", desc: "안전한 결제 시스템" },
                      { title: "AI 분석", desc: "실시간 데이터 처리" },
                      { title: "리포트 확인", desc: "웹사이트 즉시 열람" },
                      { title: "리포트 재열람", desc: "언제든지 웹사이트에서 재열람 가능" }
                    ].map((step, i) => (
                      <div key={i} className="relative group">
                        <div className="absolute -left-[23px] top-1 w-4 h-4 rounded-full bg-white border-2 border-[#92302E]/20 group-hover:border-[#92302E]/40 transition-colors">
                          <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-[#92302E]/20 to-[#92302E]/10" />
                        </div>
                        <h3 className="text-[15px] font-semibold text-[#92302E] mb-1">{step.title}</h3>
                        <p className="text-[14px] text-gray-500">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Disclaimer Alert */}
            <ScrollReveal animation="fade-in" delay={600}>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex gap-3 items-start text-left">
                <AlertTriangle className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-gray-700">오해 방지를 위한 안내</h4>
                  <ul className="text-xs text-gray-500 space-y-1 list-disc pl-4 leading-relaxed">
                    <li>지지직감은 의료·심리 상담을 대체하지 않습니다.</li>
                    <li>모든 리포트는 참고용 콘텐츠이며, 중요한 결정의 책임은 사용자 본인에게 있습니다.</li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
      <EmailModal isOpen={isEmailModalOpen} onClose={() => setIsEmailModalOpen(false)} sourceLabel={modalLabel} />
    </section>
  );
};

export default ReportPreviewSection;
