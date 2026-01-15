/**
 * Hero Section Component
 * Design: Warm Gradient - スマホファースト・ITが苦手な人でも分かりやすいデザイン
 */

import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const scrollToMonitor = () => {
    const element = document.querySelector("#monitor");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-bg.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-soft mb-6 md:mb-8"
          >
            <Sparkles className="w-4 h-4 text-[#FF6B35]" />
            <span className="text-sm font-medium text-charcoal">モニター募集中</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6 text-charcoal"
          >
            <span className="text-gradient-sunset">LP制作</span>
            <span className="mx-2">×</span>
            <span className="text-gradient-teal">自動化</span>
            <br className="md:hidden" />
            <span className="block mt-2 md:mt-4 text-2xl md:text-4xl lg:text-5xl">
              で、あなたの事業を応援
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg lg:text-xl text-muted-foreground mb-8 md:mb-10 leading-relaxed px-4"
          >
            スマホで簡単に運用できるLPページと
            <br className="hidden md:block" />
            面倒な事務作業を自動化する仕組みをセットでお届け
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto gradient-sunset text-white border-0 shadow-soft-lg hover:opacity-90 transition-all text-base md:text-lg px-8 py-6 rounded-xl"
              onClick={scrollToMonitor}
            >
              モニター価格を見る
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto bg-white/80 backdrop-blur-sm hover:bg-white text-base md:text-lg px-8 py-6 rounded-xl"
              onClick={() => {
                const element = document.querySelector("#works");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
            >
              制作事例を見る
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 md:mt-16"
          >
            <button
              onClick={scrollToMonitor}
              className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="下にスクロール"
            >
              <span className="text-xs md:text-sm">詳しく見る</span>
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
