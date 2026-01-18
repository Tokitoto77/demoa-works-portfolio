/**
 * About Section Component
 * Design: 自己紹介セクション - 親しみやすく安心感を与えるデザイン
 * スマホファースト
 */

import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Heart, Lightbulb, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutSection() {
  const values = [
    {
      icon: GraduationCap,
      title: "学び続ける姿勢",
      description: "通信大学でITを学び直し中。最新の技術を取り入れています。",
    },
    {
      icon: Heart,
      title: "寄り添うサポート",
      description: "ITが苦手な方でも安心。丁寧にサポートします。",
    },
    {
      icon: Lightbulb,
      title: "効率化の追求",
      description: "面倒な作業を自動化して、本業に集中できる環境を作ります。",
    },
    {
      icon: Users,
      title: "一緒に成長",
      description: "お客様と一緒に学び、成長していきたいと考えています。",
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#4ECDC4]/10 text-[#4ECDC4] text-sm font-medium mb-4">
            自己紹介
          </span>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Demoa-works について
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto px-4">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-0 shadow-soft-lg overflow-hidden mb-10 md:mb-14">
              <CardContent className="p-0">
                <div className="md:flex">
                  {/* Avatar Area - Brand Identity Seal */}
                  <div className="md:w-1/3 bg-gradient-to-br from-[#FF6B35]/5 to-[#4ECDC4]/5 p-8 md:p-10 flex items-center justify-center relative">
                    {/* Soft background aura */}
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-sm md:hidden" />

                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-white shadow-soft-lg flex items-center justify-center p-2 border border-white/80 group/avatar">
                      <div className="transition-transform duration-700 group-hover/avatar:scale-110">
                        <img
                          src="/src/assets/logo.png"
                          alt="Demoa-works"
                          className="w-full h-auto object-contain drop-shadow-sm scale-110"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="md:w-2/3 p-6 md:p-10">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 text-gradient-sunset">Demoa-works</h3>
                    <p className="text-sm md:text-base text-muted-foreground mb-4">
                      LP制作 × GAS連携 で業務自動化をサポート
                    </p>

                    <div className="space-y-4 text-sm md:text-base leading-relaxed text-[#34322d]">
                      <p>
                        Demoa-works は、
                        <strong className="text-[#FF6B35]">LP制作と Google Apps Script（GAS）を組み合わせた業務自動化</strong>を強みとする制作サービスです。
                      </p>
                      <p>
                        単に見た目の良いLPを作るだけでなく、
                        フォーム送信後の自動返信、データの自動保存、予約管理など、
                        <strong className="text-[#FF6B35]">集客後の手間を減らす仕組みまで含めて設計</strong>します。
                        「毎回手作業で対応していた作業」を、できるだけ自動化することを目指します。
                      </p>
                      <p>
                        現在は通信大学でITを体系的に学びながら、
                        学んだ技術を「実際に使える形」に落とし込み、LP制作に活かしています。
                        学習で終わらせず、<strong className="text-[#FF6B35]">実務として価値を提供すること</strong>を大切にしています。
                      </p>
                      <p>
                        納品前には、<strong className="text-[#FF6B35]">第三者による操作確認・誤字脱字チェック・表示崩れの確認</strong>を行い、
                        複数の目で品質を確認する体制を取っています。
                        制作自体は個人で行っていますが、品質管理は一人で完結させません。
                      </p>
                      <p className="pt-2">
                        「一人で運営しているからこそ、無理のない仕組みを作りたい」<br />
                        そんな方に寄り添いながら、
                        集客や業務効率化を通して、<strong className="text-[#FF6B35]">本来やるべきことに集中できる環境</strong>をお手伝いします。
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-soft bg-white">
                  <CardContent className="p-5 md:p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B35]/10 to-[#4ECDC4]/10 flex items-center justify-center flex-shrink-0">
                        <value.icon className="w-5 h-5 text-[#FF6B35]" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">{value.title}</h4>
                        <p className="text-sm text-muted-foreground">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
