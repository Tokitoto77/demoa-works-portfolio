/**
 * Works Section Component
 * Design: 制作事例を紹介するセクション
 * スマホファースト・日本語表記
 * LPリンクと提案書PDFリンク付き
 */

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Mail, Bell, FileSpreadsheet, ExternalLink, FileText } from "lucide-react";
import { motion } from "framer-motion";

interface Work {
  id: number;
  title: string;
  category: string;
  image: string;
  features: { icon: React.ElementType; label: string }[];
  status: "完成" | "制作中" | "サンプル";
  lpUrl?: string;
  proposalUrl?: string;
}

export default function WorksSection() {
  const works: Work[] = [
    {
      id: 1,
      title: "ピラティススタジオ 体験予約LP",
      category: "フィットネス",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663038959558/ghdUSOViMTxXTanr.png",
      features: [
        { icon: FileSpreadsheet, label: "スプレッドシート連携" },
        { icon: Mail, label: "自動配信メール" },
        { icon: Bell, label: "管理者通知" },
      ],
      status: "サンプル",
      lpUrl: "https://tokitoto77.github.io/portfolio-lp2",
      proposalUrl: "/docs/pilates-proposal.pdf",
    },
    {
      id: 2,
      title: "ハウスクリーニング エアコンお掃除キャンペーンLP",
      category: "ハウスクリーニング",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663038959558/SbOjtsfJmvyrlHdM.png",
      features: [
        { icon: FileSpreadsheet, label: "Google Forms連携" },
        { icon: FileSpreadsheet, label: "スプレッドシート連携" },
        { icon: Bell, label: "管理者通知" },
      ],
      status: "サンプル",
      lpUrl: "https://tokitoto77.github.io/portfolio-lp-House-cleaning/",
      proposalUrl: "/docs/house-cleaning-proposal.pdf",
    },
    {
      id: 3,
      title: "コーチング 無料相談LP",
      category: "コンサル・コーチング",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663038959558/zhjebqVFxgWBwOpR.png",
      features: [
        { icon: Calendar, label: "カレンダー予約" },
        { icon: Mail, label: "自動返信メール" },
      ],
      status: "サンプル",
    },
    {
      id: 4,
      title: "ハンドメイド 注文LP",
      category: "ハンドメイド",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663038959558/LGapKjJnDBalhNzQ.png",
      features: [
        { icon: FileSpreadsheet, label: "在庫管理連携" },
        { icon: Mail, label: "自動返信メール" },
      ],
      status: "サンプル",
    },
  ];

  const getStatusColor = (status: Work["status"]) => {
    switch (status) {
      case "完成":
        return "bg-[#4ECDC4] text-white";
      case "制作中":
        return "bg-[#FF6B35] text-white";
      case "サンプル":
        return "bg-gray-500 text-white";
    }
  };

  return (
    <section id="works" className="py-16 md:py-24 bg-secondary/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] text-sm font-medium mb-4">
            制作事例
          </span>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            こんなLPが作れます
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4">
            業種に合わせた自動化機能を組み合わせて、
            <br className="hidden md:block" />
            あなたの事業にぴったりのLPをお作りします。
          </p>
        </motion.div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-4 md:px-0">
          {works.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden border-0 shadow-soft-lg card-hover bg-white">
                <div className="relative">
                  {/* Status Badge */}
                  <Badge className={`absolute top-4 right-4 z-10 ${getStatusColor(work.status)}`}>
                    {work.status}
                  </Badge>

                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <div className="aspect-[3/4] md:aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center p-6 md:p-8">
                      {work.lpUrl ? (
                        <a
                          href={work.lpUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative w-full h-full flex items-center justify-center cursor-pointer"
                        >
                          <img
                            src={work.image}
                            alt={work.title}
                            className="max-h-full w-auto object-contain drop-shadow-lg"
                          />

                        </a>
                      ) : (
                        <img
                          src={work.image}
                          alt={work.title}
                          className="max-h-full w-auto object-contain drop-shadow-lg"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <CardContent className="p-5 md:p-6">
                  {/* Category */}
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs md:text-sm text-muted-foreground">
                      {work.category}
                    </span>
                    {work.lpUrl && (
                      <span className="text-[10px] bg-[#FF6B35]/10 text-[#FF6B35] px-2 py-0.5 rounded-full font-medium">
                        タップでLP表示
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-lg md:text-xl mt-1 mb-3">
                    {work.title}
                  </h3>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {work.features.map((feature, featureIndex) => {
                      return (
                        <div
                          key={featureIndex}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-xs md:text-sm"
                        >
                          <feature.icon className="w-3.5 h-3.5 text-[#4ECDC4]" />
                          <span>{feature.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Action Buttons */}
                  {(work.lpUrl || work.proposalUrl) && (
                    <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-gray-100">
                      {work.lpUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-2 text-[#FF6B35] border-[#FF6B35] hover:bg-[#FF6B35]/10"
                          asChild
                        >
                          <a href={work.lpUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                            LPを見る
                          </a>
                        </Button>
                      )}
                      {work.proposalUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-2 text-[#4ECDC4] border-[#4ECDC4] hover:bg-[#4ECDC4]/10"
                          asChild
                        >
                          <a href={work.proposalUrl} target="_blank" rel="noopener noreferrer">
                            <FileText className="w-4 h-4" />
                            提案書を見る
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 md:mt-14 text-center px-4"
        >
          <p className="text-sm md:text-base text-muted-foreground">
            ※サンプルは制作イメージです。
            <br />
            実際のデザインはご要望に合わせてカスタマイズします。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
