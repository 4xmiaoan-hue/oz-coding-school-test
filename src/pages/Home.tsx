import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Hero } from '../components/sections/Hero';
import { DifferenceSection } from '../components/sections/DifferenceSection';
import ReportPreviewSection from '../components/sections/ReportPreviewSection';
import { Footer } from '../components/layout/Footer';
import { GridCardSection } from '../components/sections/GridCardSection';
import { ScrollToTopButton } from '../components/ui/ScrollToTopButton';
import { AdminControlPanel } from '../components/admin/AdminControlPanel';
import { useUiSettingsStore } from '../store/uiSettings';

export default function Home() {
  const isReportPreviewVisible = useUiSettingsStore((state) => state.isReportPreviewVisible);

  return (
    <div className="min-h-screen bg-background font-sans text-primary selection:bg-gray-100 relative">
      <Header />
      
      <main className="w-full flex flex-col items-center">
        <Hero />
        <DifferenceSection />
        
        {/* Grid Card Section with Header */}
        <div className="w-full mt-16 md:mt-24 mb-10 section-grid-cards flex flex-col items-center">
          <div className="flex flex-col items-center mb-2 animate-bounce">
             <ArrowDown className="text-gray-400 w-6 h-6 md:w-8 md:h-8" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 md:mb-10 text-center tracking-tight">
            나의 고민을 들어줄 도사 고르기
          </h2>
          <GridCardSection />
        </div>

        <div style={{ display: isReportPreviewVisible ? 'block' : 'none' }}>
          <ReportPreviewSection />
        </div>
      </main>
      
      <Footer />
      <ScrollToTopButton />
      <AdminControlPanel />
    </div>
  );
}
