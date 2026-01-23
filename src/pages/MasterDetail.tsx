import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ZODIAC_CARDS } from '../constants/zodiacData';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ScrollToTopButton } from '../components/ui/ScrollToTopButton';
import { Check, Star, Shield, Users, ArrowRight, ArrowLeft, Clock, Gift, CreditCard, Calendar, User, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/button';
import ScrollReveal from '../components/ui/ScrollReveal';
import { useCustomerStore } from '../store/customer';

const TIME_SLOTS = [
  "00:00~01:29 조자시",
  "01:30~03:29 축시",
  "03:30~05:29 인시",
  "05:30~07:29 묘시",
  "07:30~09:29 진시",
  "09:30~11:29 사시",
  "11:30~13:29 오시",
  "13:30~15:29 미시",
  "15:30~17:29 신시",
  "17:30~19:29 유시",
  "19:30~21:29 술시",
  "21:30~23:29 해시",
  "23:30~23:59 야자시"
];

export default function MasterDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const data = ZODIAC_CARDS.find(card => card.id === id);
  const { setName } = useCustomerStore();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    solarLunar: 'solar',
    birthTimeSlot: '',
    unknownTime: false,
    concernText: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 8) {
      setFormData(prev => ({ ...prev, birthDate: value }));
    }
  };

  useEffect(() => {
    setName(formData.name)
  }, [formData.name, setName]);

  const validateBirthDate = (date: string) => {
    if (date.length !== 8) return false;
    const year = parseInt(date.substring(0, 4));
    const month = parseInt(date.substring(4, 6));
    const day = parseInt(date.substring(6, 8));
    const d = new Date(year, month - 1, day);
    return d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day;
  };

  const isFormValid = 
    formData.name.trim().length > 0 &&
    validateBirthDate(formData.birthDate) &&
    formData.solarLunar !== '' &&
    (formData.unknownTime || formData.birthTimeSlot !== '');

  const formatDisplayDate = (date: string) => {
    if (date.length <= 4) return date;
    if (date.length <= 6) return `${date.substring(0, 4)}.${date.substring(4, 6)}`;
    return `${date.substring(0, 4)}.${date.substring(4, 6)}.${date.substring(6, 8)}`;
  };

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-xl font-bold text-gray-500 mb-4">도사 정보를 찾을 수 없습니다.</p>
        <Button onClick={() => navigate('/')}>홈으로 돌아가기</Button>
      </div>
    );
  }

  const handleGoToCheckout = async () => {
    if (!isFormValid || isSubmitting) return;
    
    setIsSubmitting(true);
    setGlobalLoading(true);
    setLoadingMessage('정보를 저장하고 있습니다...');

    try {
      const payload = {
        product_id: data.id,
        name: formData.name,
        birth_date_raw: formData.birthDate.replace(/-/g, ''), // YYYYMMDD
        solar_lunar: formData.solarLunar,
        birth_time_slot: formData.unknownTime ? null : formData.birthTimeSlot,
        unknown_time: formData.unknownTime,
        concern_text: formData.concernText
      };

      const apiBase = (() => {
        const env = import.meta.env.VITE_API_URL || '';
        if (env) return env;
        return 'http://localhost:3000';
      })();

      const response = await fetch(`${apiBase}/api/guest/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
          const errText = await response.text();
          throw new Error(errText || 'Failed to save profile');
      }
      
      const result = await response.json();
      const guestProfileId = result.guest_profile_id;
      
      // Navigate to Checkout Page
      navigate(`/checkout?product_id=${data.id}&guest_profile_id=${guestProfileId}&customer_name=${encodeURIComponent(formData.name)}`);

    } catch (err) {
      console.error(err);
      alert('정보 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
      setGlobalLoading(false);
    }
  };

  // Define dynamic styles based on card data
  const primaryColor = data.badgeColor; // The strong accent color
  const lightBgColor = data.color; // The light pastel background color

  // Format price with comma
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-primary selection:bg-gray-100">
      <Header />

      <main className="w-full flex flex-col items-center pt-[56px]">
        {globalLoading && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[1000]">
            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center animate-fade-in">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">운세를 분석중입니다</h3>
              <p className="text-gray-600 animate-pulse">{loadingMessage}</p>
            </div>
          </div>
        )}
        
        {/* 1. Hero Section */}
        <section className="w-full relative overflow-hidden">
            {/* Background element */}
            <div 
                className="absolute inset-0 opacity-30 z-0"
                style={{ background: `linear-gradient(to bottom, ${lightBgColor}, #ffffff)` }}
            />
            
            <div className="relative z-10 w-full max-w-[1040px] px-5 py-10 md:py-20 mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-20">
                <div className="flex-1 space-y-6 md:space-y-8 text-center md:text-left order-2 md:order-1">
                    <ScrollReveal animation="slide-up">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-4">
                            <span 
                                className="inline-block px-3 py-1 rounded-full text-xs md:text-sm font-bold tracking-wide"
                                style={{ backgroundColor: 'white', color: primaryColor, border: `1px solid ${primaryColor}20` }}
                            >
                                {data.subName} 전문
                            </span>
                            <span className="inline-flex items-center px-2 py-1 rounded bg-red-100 text-red-600 text-[10px] md:text-xs font-bold shadow-sm">
                                <Clock size={10} className="mr-1" />
                                오늘만 특가
                            </span>
                        </div>
                        
                        <h1 className="text-[28px] md:text-5xl font-extrabold leading-[1.3] tracking-tight break-keep text-gray-900 mb-4">
                            <span style={{ color: primaryColor }}>{data.name}</span>가 들려주는<br />
                            당신만의 AI 리포트
                        </h1>
                        <p className="text-base md:text-xl text-gray-600 font-medium leading-[1.6] break-keep">
                            "{data.quote}"
                        </p>

                        {/* Pricing Block - Hero */}
                        <div className="mt-8 p-5 md:p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-100 shadow-sm inline-block md:block w-full max-w-md mx-auto md:mx-0">
                            <div className="flex flex-col md:flex-row items-center md:items-end gap-2 md:gap-4 justify-center md:justify-start">
                                <div className="flex items-center gap-2">
                                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-sm animate-pulse">
                                        {data.discountRate}% SALE
                                    </span>
                                    <span className="text-gray-500 text-sm md:text-base font-medium line-through decoration-gray-400">
                                        {formatPrice(data.originalPrice)}원
                                    </span>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl md:text-4xl font-extrabold text-gray-900" style={{ color: primaryColor }}>
                                        {formatPrice(data.price)}
                                    </span>
                                    <span className="text-base md:text-lg font-bold text-gray-700">원</span>
                                </div>
                            </div>
                            <div className="mt-3 flex items-center justify-center md:justify-start gap-3 text-[11px] md:text-xs text-gray-500 font-medium border-t border-gray-100 pt-3">
                                <span className="flex items-center gap-1">
                                    <Gift size={12} className="text-red-500" />
                                    첫 구매 추가 혜택
                                </span>
                                <span className="w-px h-3 bg-gray-300"></span>
                                <span>
                                    {formatPrice(data.originalPrice - data.price)}원 절약
                                </span>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal animation="slide-up" delay={200}>
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start pt-6">
                            <Button 
                                className="h-14 w-full sm:w-auto px-10 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden group"
                                style={{ backgroundColor: primaryColor }}
                                onClick={() => {
                                  const el = document.getElementById('input-section');
                                  el?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                <span className="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                                지금 바로 {data.name}에게 묻기
                            </Button>
                        </div>
                        <p className="mt-4 text-xs md:text-sm text-gray-500 font-medium flex items-center justify-center md:justify-start gap-1">
                            <Users size={12} />
                            <span>현재 {Math.floor(Math.random() * 50) + 120}명이 보고 있어요</span>
                        </p>
                    </ScrollReveal>
                </div>

                <div className="flex-1 w-full max-w-[280px] md:max-w-[420px] order-1 md:order-2">
                    <ScrollReveal animation="fade-in" delay={300} duration={800}>
                        <div className="relative aspect-[3/4] rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.01] group">
                            <img 
                                src={data.image} 
                                alt={data.name} 
                                className="w-full h-full object-cover"
                            />
                            
                            {/* Floating Price Tag on Image - Optimized Position */}
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-2 md:px-4 md:py-2.5 rounded-xl shadow-lg border border-white/50 transform transition-transform duration-300 z-10">
                                <div className="text-[10px] text-gray-600 font-bold uppercase tracking-wider mb-0.5">Special Price</div>
                                <div className="text-lg md:text-xl font-extrabold leading-none" style={{ color: primaryColor }}>
                                    {formatPrice(data.price)}원
                                </div>
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white text-left z-10">
                                <div className="text-2xl md:text-3xl font-bold mb-1 md:mb-2 tracking-tight drop-shadow-md">{data.name}</div>
                                <div className="text-white/90 text-xs md:text-sm font-medium drop-shadow-sm">{data.subName}</div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
        

        {/* 3. Value Proposition */}
        <section className="w-full py-16 md:py-24 px-5">
          <div className="max-w-[1040px] mx-auto">
            <ScrollReveal animation="slide-up">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 md:mb-16 text-gray-900 tracking-tight leading-tight">
                왜 <span style={{ color: primaryColor }}>{data.name}</span>의 해석이 필요할까요?
              </h2>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {data.masterTopics.map((topic, idx) => (
                <ScrollReveal key={idx} animation="slide-up" delay={idx * 100} className="h-full">
                  <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 h-full flex flex-col items-center text-center hover:shadow-[0_4px_25px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
                    <div 
                      className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-5 md:mb-6 text-xl md:text-2xl shadow-sm"
                      style={{ backgroundColor: lightBgColor }}
                    >
                      {idx === 0 ? '💡' : idx === 1 ? '🔍' : '🗝️'}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">{topic}</h3>
                    <p className="text-sm md:text-[15px] text-gray-600 break-keep leading-[1.6]">
                      당신의 고민을 {topic}의 관점에서 깊이 있게 들여다보고 명쾌하게 정리해드립니다.
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Social Proof */}
        <section className="w-full py-16 md:py-24 px-5 bg-white">
          <div className="max-w-[800px] mx-auto text-center">
             <ScrollReveal animation="slide-up">
              <div className="flex items-center justify-center gap-2 mb-4 md:mb-5">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" className="drop-shadow-sm" />
                  ))}
                </div>
                <span className="font-bold text-gray-800 text-base md:text-lg">4.9/5.0</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-10 md:mb-12 tracking-tight leading-tight">
                이미 많은 분들이 <br className="block sm:hidden" />
                <span style={{ color: primaryColor }}>답답함</span>을 해소했습니다
              </h2>
            </ScrollReveal>

            <div className="grid gap-4 md:gap-5 text-left">
              {[
                { user: "김** (32세, 직장인)", text: "그냥 운세인 줄 알았는데, 제 상황을 너무 정확하게 짚어서 놀랐어요. 특히 관계에 대한 조언이 현실적이었습니다." },
                { user: "이** (28세, 프리랜서)", text: "모호한 말장난이 아니라, 지금 당장 제가 고민해야 할 지점을 명확하게 알려줘서 좋았어요." },
                { user: "박** (35세, 사업가)", text: "마음이 복잡했는데, 리포트를 읽고 나니 머릿속이 정리되는 기분입니다. 다른 도사님께도 물어보고 싶네요." }
              ].map((review, idx) => (
                <ScrollReveal key={idx} animation="slide-up" delay={idx * 100}>
                  <div className="bg-white p-6 md:p-7 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <p className="text-gray-700 leading-[1.6] mb-4 text-sm md:text-[15px]">"{review.text}"</p>
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                        <Users size={12} />
                      </div>
                      <span>{review.user}</span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Feature Details */}
        <section className="w-full py-16 md:py-24 px-5 bg-gray-50/50">
          <div className="max-w-[1040px] mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-20">
            <div className="flex-1 space-y-8 md:space-y-10">
              <ScrollReveal animation="slide-up">
                <span className="font-bold tracking-widest text-xs uppercase" style={{ color: primaryColor }}>HOW IT WORKS</span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 md:mt-4 mb-6 md:mb-8 tracking-tight leading-tight">
                  12도사 AI 엔진이<br />
                  당신의 데이터를 해석합니다
                </h2>
                <ul className="space-y-6 md:space-y-8">
                  <li className="flex items-start gap-4 md:gap-5">
                    <div className="mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${primaryColor}15` }}>
                        <Check size={16} style={{ color: primaryColor }} />
                    </div>
                    <div>
                        <span className="block font-bold text-gray-800 mb-1 text-base md:text-lg">현대적 재해석</span>
                        <span className="text-sm md:text-[15px] text-gray-600 leading-[1.6]">사주 명리학 데이터를 현대적 심리학으로 재해석하여 누구나 이해하기 쉽게 전달합니다.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 md:gap-5">
                    <div className="mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${primaryColor}15` }}>
                        <Check size={16} style={{ color: primaryColor }} />
                    </div>
                    <div>
                        <span className="block font-bold text-gray-800 mb-1 text-base md:text-lg">개인화 알고리즘</span>
                        <span className="text-sm md:text-[15px] text-gray-600 leading-[1.6]">생년월일시를 기반으로 12도사만의 독창적인 알고리즘이 당신의 성향을 분석합니다.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 md:gap-5">
                    <div className="mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${primaryColor}15` }}>
                        <Check size={16} style={{ color: primaryColor }} />
                    </div>
                    <div>
                        <span className="block font-bold text-gray-800 mb-1 text-base md:text-lg">즉각적인 리포트</span>
                        <span className="text-sm md:text-[15px] text-gray-600 leading-[1.6]">복잡한 절차 없이 3초 만에 5장 분량의 심층 리포트를 생성합니다.</span>
                    </div>
                  </li>
                </ul>
              </ScrollReveal>
            </div>
            <div className="flex-1 w-full max-w-[480px]">
              <ScrollReveal animation="fade-in" delay={200}>
                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-transparent to-gray-50 rounded-bl-full -z-10"></div>
                  
                  <div className="flex items-center justify-between mb-6 md:mb-8 border-b border-gray-100 pb-4">
                     <span className="font-bold text-gray-800 text-base md:text-lg">리포트 미리보기</span>
                     <span className="text-[10px] font-bold bg-gray-900 text-white px-2 py-1 rounded">SAMPLE</span>
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    <div className="h-3 md:h-4 bg-gray-100 rounded w-3/4 animate-pulse"></div>
                    <div className="h-3 md:h-4 bg-gray-100 rounded w-full animate-pulse delay-75"></div>
                    <div className="h-3 md:h-4 bg-gray-100 rounded w-5/6 animate-pulse delay-150"></div>
                    <div className="h-28 md:h-32 bg-gray-50 rounded-xl w-full mt-5 md:mt-6 p-4 md:p-5 border border-gray-100">
                        <div className="h-2.5 md:h-3 bg-gray-200 rounded w-1/3 mb-2 md:mb-3"></div>
                        <div className="h-1.5 md:h-2 bg-gray-200 rounded w-full mb-1.5 md:mb-2"></div>
                        <div className="h-1.5 md:h-2 bg-gray-200 rounded w-full mb-1.5 md:mb-2"></div>
                        <div className="h-1.5 md:h-2 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                  <div className="mt-6 md:mt-8 p-4 md:p-5 rounded-xl border" style={{ backgroundColor: `${primaryColor}08`, borderColor: `${primaryColor}15` }}>
                    <p className="text-xs md:text-sm font-medium leading-relaxed italic" style={{ color: primaryColor }}>
                      "{data.quote}"
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 5.5 Input Section (Moved between preview and final CTA) */}
        <section id="input-section" className="w-full py-16 md:py-24 px-5 bg-gray-50/50">
          <div className="max-w-[600px] mx-auto">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
                리포트 받기 위한 정보 입력
              </h2>
              <p className="text-gray-500 font-medium">
                최소 정보로 개인 기질과 흐름을 정리해요.
              </p>
            </div>

            <div className="space-y-8 bg-white p-6 md:p-10 rounded-[32px] border border-gray-100 shadow-sm">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <User size={16} className="text-gray-400" />
                  이름 (필수)
                </label>
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="이름 또는 닉네임"
                  className="w-full h-14 px-5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                    <Calendar size={16} className="text-gray-400" />
                    생년월일 (필수)
                  </label>
                  <div className="flex gap-4">
                    {['solar', 'lunar'].map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer group">
                        <input 
                          type="radio"
                          name="solarLunar"
                          value={type}
                          checked={formData.solarLunar === type}
                          onChange={(e) => setFormData(prev => ({ ...prev, solarLunar: e.target.value }))}
                          className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                        />
                        <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                          {type === 'solar' ? '양력' : '음력'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <input 
                    type="text"
                    value={formData.birthDate}
                    onChange={handleBirthDateChange}
                    placeholder="YYYYMMDD (예: 19990101)"
                    className="w-full h-14 px-5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 tracking-widest"
                  />
                  {formData.birthDate.length > 0 && (
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 text-primary font-bold">
                      {formatDisplayDate(formData.birthDate)}
                    </div>
                  )}
                </div>
                {formData.birthDate.length === 8 && !validateBirthDate(formData.birthDate) && (
                  <p className="text-xs text-red-500 font-medium ml-1">유효하지 않은 날짜입니다.</p>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                    <Clock size={16} className="text-gray-400" />
                    태어난 시간 (필수)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox"
                      checked={formData.unknownTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, unknownTime: e.target.checked }))}
                      className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300"
                    />
                    <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                      시간모름
                    </span>
                  </label>
                </div>
                <select 
                  disabled={formData.unknownTime}
                  value={formData.birthTimeSlot}
                  onChange={(e) => setFormData(prev => ({ ...prev, birthTimeSlot: e.target.value }))}
                  className="w-full h-14 px-5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 appearance-none disabled:bg-gray-100 disabled:text-gray-400 cursor-pointer"
                >
                  <option value="">태어난 시간을 선택해주세요</option>
                  {TIME_SLOTS.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <MessageSquare size={16} className="text-gray-400" />
                  현재 고민 (선택)
                </label>
                <textarea 
                  value={formData.concernText}
                  onChange={(e) => setFormData(prev => ({ ...prev, concernText: e.target.value }))}
                  placeholder="지금 머릿속을 떠나지 않는 질문/상황을 한 줄로"
                  className="w-full h-24 p-5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 resize-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 6. Trust & Final CTA */}
        <section className="w-full py-16 md:py-24 px-5 text-center relative overflow-hidden bg-white">
           <div 
                className="absolute inset-0 opacity-20 z-0 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${lightBgColor}, transparent 70%)` }}
            />
            
           <ScrollReveal animation="slide-up" className="relative z-10">
            <div className="flex justify-center gap-6 md:gap-8 mb-8 md:mb-10 text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="w-[14px] h-[14px] md:w-4 md:h-4" />
                <span className="text-[11px] md:text-xs font-medium tracking-wide">개인정보 암호화</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-[14px] h-[14px] md:w-4 md:h-4" />
                <span className="text-[11px] md:text-xs font-medium tracking-wide">누적 {data.consultationCount} 분석</span>
              </div>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight">
              지금 바로 당신의 고민을<br />
              <span style={{ color: primaryColor }}>{data.name}</span>에게 털어놓으세요
            </h2>
            
            <p className="text-gray-500 mb-10 font-medium">
                고민하는 시간에도 <span className="text-red-500 font-bold">할인 혜택</span>은 줄어들고 있습니다
            </p>

            {/* Pricing Block - Bottom */}
            <div className="max-w-md mx-auto mb-10 bg-white p-6 rounded-3xl shadow-xl border-2 border-gray-100 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4">
                    <span className="font-bold text-gray-800">12도사 AI 리포트</span>
                    <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">
                        {data.discountRate}% OFF
                    </span>
                </div>
                <div className="flex items-end justify-center gap-3 mb-2">
                    <span className="text-gray-400 text-lg font-medium line-through decoration-gray-400">
                        {formatPrice(data.originalPrice)}원
                    </span>
                    <span className="text-4xl font-extrabold text-gray-900" style={{ color: primaryColor }}>
                        {formatPrice(data.price)}
                    </span>
                    <span className="text-lg font-bold text-gray-700 mb-1">원</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 bg-gray-50 py-2 rounded-lg mt-4">
                    <CreditCard size={14} />
                    <span>월 {formatPrice(Math.round(data.price / 3))}원 (3개월 무이자)</span>
                </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <Button 
                variant="outline" 
                className="h-14 px-8 text-lg font-medium rounded-full border-2 hover:bg-gray-50 w-full sm:w-auto bg-white"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="mr-2 w-5 h-5" />
                다른 도사 둘러보기
              </Button>
              <Button 
                className="h-14 px-10 text-lg font-bold rounded-full shadow-xl hover:scale-105 transition-all w-full sm:w-auto hover:shadow-2xl relative overflow-hidden group disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                style={{ backgroundColor: isFormValid ? primaryColor : '#cbd5e1' }}
                onClick={handleGoToCheckout}
                disabled={!isFormValid || isSubmitting}
              >
                <span className="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                {isSubmitting ? '처리 중...' : '리포트 확인하기'}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            {!isFormValid && (
              <p className="mt-4 text-sm text-gray-400 font-medium">
                생년월일과 양/음력, 태어난 시간을 입력하면 확인이 가능합니다.
              </p>
            )}
          </ScrollReveal>
        </section>

      </main>
      
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
