/**
 * Monitor Section Component
 * Design: モニター募集を大きく訴求するセクション
 * スマホファースト・ITが苦手な人でも分かりやすいデザイン
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Gift, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function MonitorSection() {
  const benefits = [
    { icon: Gift, text: "特別モニター価格" },
    { icon: Clock, text: "丁寧なサポート対応" },
    { icon: Users, text: "一緒に作り上げる" },
  ];

  const includes = [
    "LP（ランディングページ）1ページ",
    "お問い合わせフォーム1つ",
    "自動返信メール設定",
    "運営者への通知設定",
    "スマホ対応デザイン",
    "簡単な修正対応（1回）",
  ];

  return (
    <section id="monitor" className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] text-sm font-medium mb-4">
            期間限定
          </span>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            モニター募集中
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4">
            これから事業を始める方を応援したい想いから、
            <br className="hidden md:block" />
            特別価格でLP制作をお受けしています
          </p>
        </motion.div>

        {/* Price Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-lg mx-auto mb-10 md:mb-14"
        >
          <Card className="overflow-hidden shadow-soft-lg border-0">
            <div className="gradient-sunset p-6 md:p-8 text-white text-center">
              <p className="text-sm md:text-base opacity-90 mb-2">ココナラ限定</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-lg md:text-xl">¥</span>
                <span className="text-5xl md:text-6xl font-bold">20,000</span>
              </div>
              <p className="text-sm md:text-base opacity-90 mt-2">（税込）</p>
            </div>
            <CardContent className="p-6 md:p-8">
              {/* Benefits */}
              <div className="flex flex-wrap justify-center gap-4 mb-6 pb-6 border-b border-border">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <benefit.icon className="w-4 h-4 text-[#4ECDC4]" />
                    <span>{benefit.text}</span>
                  </div>
                ))}
              </div>

              {/* Includes */}
              <h3 className="font-bold text-lg mb-4 text-center">含まれるもの</h3>
              <ul className="space-y-3 mb-6">
                {includes.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#4ECDC4]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#4ECDC4]" />
                    </div>
                    <span className="text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                className="w-full gradient-sunset text-white border-0 shadow-soft hover:opacity-90 transition-opacity py-6 text-base md:text-lg rounded-xl"
                onClick={() => window.open("https://coconala.com/", "_blank")}
              >
                ココナラで相談する
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-3">
                ※ココナラのページに移動します
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto text-center px-4"
        >
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-soft">
            <h3 className="font-bold text-lg mb-3">モニターとは？</h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              実績作りのため、特別価格でお受けしています。
              <br />
              完成後、ポートフォリオへの掲載許可をいただける方が対象です。
              <br />
              <span className="text-[#FF6B35] font-medium">一緒にあなたの事業を形にしましょう！</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
