/**
 * Demoa-works Portfolio - Home Page
 * Design Philosophy: Warm Gradient - 温かみのあるグラデーション
 * - 柔らかなグラデーションと大きな余白で、親しみやすさと洗練さを両立
 * - 「一人で頑張る人を応援したい」という想いを、温かみのある色彩で表現
 */

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MonitorSection from "@/components/MonitorSection";
import FeaturesSection from "@/components/FeaturesSection";
import WorksSection from "@/components/WorksSection";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main>
        <HeroSection />
        <MonitorSection />
        <FeaturesSection />
        <WorksSection />
        <AboutSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
