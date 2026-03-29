/**
 * Service Detail Section Component
 * Design: サービス詳細資料へのリンクセクション
 * FAQの直後に配置し、スライド資料への導線を提供
 * スマホファースト
 */

import { motion } from "framer-motion";
import { FileText, ArrowRight } from "lucide-react";

export default function ServiceDetailSection() {
  const slideUrl =
    "https://docs.google.com/presentation/d/1M9jZdgn4fgHic15rhyplw0i30Aej_jVaHZvTgfeDzh0/edit?usp=sharing";

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto px-4"
        >
          {/* Heading */}
          <div className="text-center mb-8">
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
              さらに詳しく知りたい方へ
            </h3>
            <p className="text-sm md:text-base text-muted-foreground">
              サービスの全体像を分かりやすく解説したスライド資料をご用意しています
            </p>
          </div>

          {/* Card Container */}
          <a
            href={slideUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="bg-white rounded-2xl border border-border shadow-soft hover:shadow-lg transition-all duration-300 overflow-hidden">
              {/* Card Content */}
              <div className="p-6 md:p-8 flex items-center justify-between gap-4">
                {/* Left Side - Icon & Text */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* Icon Container */}
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-[#FF6B35]/10 to-[#4ECDC4]/10 flex items-center justify-center group-hover:from-[#FF6B35]/20 group-hover:to-[#4ECDC4]/20 transition-colors">
                    <FileText className="w-6 h-6 md:w-7 md:h-7 text-[#FF6B35]" />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground text-base md:text-lg mb-1 group-hover:text-[#FF6B35] transition-colors">
                      Demoa-works サービス紹介資料
                    </h4>
                    <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                      LP制作×業務自動化の仕組みを12ページで詳しく解説
                    </p>
                  </div>
                </div>

                {/* Right Side - Arrow Icon */}
                <div className="flex-shrink-0 w-6 h-6 md:w-7 md:h-7 rounded-full bg-secondary flex items-center justify-center group-hover:bg-[#FF6B35] group-hover:text-white transition-all duration-300">
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              {/* Bottom Accent Bar */}
              <div className="h-1 bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] group-hover:h-1.5 transition-all" />
            </div>
          </a>

          {/* Subtext */}
          <p className="text-center text-xs md:text-sm text-muted-foreground mt-4">
            Google Slides で開きます（別ウィンドウ）
          </p>
        </motion.div>
      </div>
    </section>
  );
}
