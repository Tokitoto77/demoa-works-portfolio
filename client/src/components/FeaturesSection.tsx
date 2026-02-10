/**
 * Features Section Component
 * Design: GAS連携でできることを分かりやすく紹介
 * スマホファースト・ITが苦手な人でも分かりやすいデザイン
 */

import { Card, CardContent } from "@/components/ui/card";
import { Mail, Calendar, Bell, FileSpreadsheet, Smartphone, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  const features = [
    {
      icon: Mail,
      title: "自動返信メール",
      description: "お問い合わせがあったら、自動でお礼メールを送信。24時間対応できます。",
      color: "#FF6B35",
    },
    {
      icon: Calendar,
      title: "カレンダー予約連携",
      description: "Googleカレンダーと連携して、空き状況から予約を受付。ダブルブッキングを防止。",
      color: "#4ECDC4",
    },
    {
      icon: Bell,
      title: "LINE・メール通知",
      description: "予約や問い合わせがあったら、すぐにLINEやメールでお知らせ。見逃しません。",
      color: "#FF6B35",
    },
    {
      icon: FileSpreadsheet,
      title: "スプレッドシート連携",
      description: "顧客情報や注文を自動でスプレッドシートに記録。管理が楽になります。",
      color: "#4ECDC4",
    },
    {
      icon: Smartphone,
      title: "スマホで簡単運用",
      description: "難しい操作は不要。スマホから予約確認や顧客管理ができます。",
      color: "#FF6B35",
    },
    {
      icon: Zap,
      title: "事務作業を自動化",
      description: "手作業で行っていた事務作業を自動化。本業に集中できる時間が増えます。",
      color: "#4ECDC4",
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#4ECDC4]/10 text-[#4ECDC4] text-sm font-medium mb-4">
            できること
          </span>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            LPページ + 自動化の仕組み
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4">
            ただのLPページではありません。
            <br />
            面倒な事務作業を自動化する仕組みもセットでお届けします。
          </p>
        </motion.div>

        {/* Automation Flow Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 md:mb-16"
        >
          <div className="max-w-4xl mx-auto px-4">
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663038959558/ykGOtSnSXwpENrvc.png"
              alt="自動化の流れ：お問い合わせ → 自動返信メール → カレンダー予約・スプレッドシート・LINE通知"
              className="w-full rounded-2xl shadow-soft-lg"
            />
          </div>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4 md:px-0">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-0 shadow-soft card-hover bg-white">
                <CardContent className="p-6 md:p-8">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${feature.color}15` }}
                  >
                    <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 md:mt-16 text-center px-4"
        >
          <p className="text-sm md:text-base text-muted-foreground">
            ※連携内容はご要望に合わせてカスタマイズ可能です。
            <br />
            まずはお気軽にご相談ください。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
