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
                  {/* Avatar Area */}
                  <div className="md:w-1/3 bg-gradient-to-br from-[#FF6B35]/10 to-[#4ECDC4]/10 p-8 md:p-10 flex items-center justify-center">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white shadow-soft flex items-center justify-center">
                      {/* Placeholder for avatar - user will replace */}
                      <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-[#FF6B35]/20 to-[#4ECDC4]/20 flex items-center justify-center">
                        <span className="text-4xl md:text-5xl font-bold text-gradient-sunset">D</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Area */}
                  <div className="md:w-2/3 p-6 md:p-10">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">Demoa-works</h3>
                    <p className="text-sm md:text-base text-muted-foreground mb-4">
                      LP制作 × GAS連携 で業務自動化をサポート
                    </p>
                    
                    <div className="space-y-4 text-sm md:text-base leading-relaxed">
                      <p>
                        はじめまして。Demoa-worksです。
                      </p>
                      <p>
                        ITを使った自動化や効率化に興味があり、現在は通信大学でITの勉強をしています。
                        学んだことを誰かの役に立てたいと思い、ココナラでLP制作を始めました。
                      </p>
                      <p>
                        私自身も一人で色々なことに挑戦しているので、
                        <span className="text-[#FF6B35] font-medium">
                          これから何かを始めたい方や、一人で頑張っている方
                        </span>
                        の気持ちがよく分かります。
                      </p>
                      <p>
                        集客や事務作業の効率化で、あなたの挑戦を応援させてください。
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
