/**
 * CTA Section Component
 * Design: 最後のアクション誘導セクション
 * スマホファースト
 */

import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-warm opacity-90" />
      <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center opacity-20" />
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center px-4"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">
            一緒に、あなたの事業を
            <br />
            形にしませんか？
          </h2>
          
          <p className="text-white/90 text-base md:text-lg mb-8 md:mb-10 leading-relaxed">
            モニター価格でお得に始められる今がチャンス。
            <br />
            まずはお気軽にご相談ください。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-white text-[#FF6B35] hover:bg-white/90 shadow-soft-lg text-base md:text-lg px-8 py-6 rounded-xl"
              onClick={() => window.open("https://coconala.com/", "_blank")}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              ココナラで相談する
            </Button>
          </div>

          <p className="text-white/70 text-xs md:text-sm mt-6">
            ※ココナラのページに移動します
          </p>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/10 animate-float" />
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white/5 animate-float-delayed" />
      </div>
    </section>
  );
}
