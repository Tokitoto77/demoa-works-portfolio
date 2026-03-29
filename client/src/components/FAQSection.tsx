/**
 * FAQ Section Component
 * Design: よくある質問セクション - アコーディオン形式で分かりやすく
 * スマホファースト
 */

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

export default function FAQSection() {
  const faqs = [
    {
      question: "モニター¥20,000の範囲はどこまで？",
      answer:
        "1LP／CTA1つ／フォーム1つ／自動化Level1（記録＋通知＋自動返信）までです。予約確定・決済・LINE連携などはオプションです。",
    },
    {
      question: "何を準備すればいいですか？",
      answer:
        "ヒアリング回答だけでOKです。ロゴ・写真・料金・実績があると仕上がりが良くなります（素材が少なくても相談しながら進めます）。",
    },
    {
      question: "GASは自分で触る必要がありますか？",
      answer:
        "初期設定（設置・通知/自動返信・動作確認）はすべてこちらで行います。納品後の変更は運用マニュアルで自己対応できます。",
    },
    {
      question: "サーバー・ドメインは必要ですか？",
      answer:
        "独自ドメインで公開する場合は必要です。準備ガイドで迷わないように案内します（分からなくてもOK）。",
    },
    {
      question: "どうやって依頼すればいいですか？（流れ）",
      answer:
        "ココナラでご相談→ヒアリング→提案書→制作→テスト→公開・納品、の流れです。購入前に相談も可能です。",
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-secondary/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] text-sm font-medium mb-4">
            よくある質問
          </span>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">FAQ</h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4">
            ご依頼前によくいただくご質問をまとめました。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto px-4"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-xl border-0 shadow-soft overflow-hidden"
              >
                <AccordionTrigger className="px-5 md:px-6 py-4 md:py-5 text-left hover:no-underline hover:bg-secondary/30 transition-colors">
                  <span className="flex items-start gap-3 text-sm md:text-base font-medium pr-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#4ECDC4] text-white text-xs flex items-center justify-center font-bold">
                      Q
                    </span>
                    <span>{faq.question}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-5 md:px-6 pb-4 md:pb-5">
                  <div className="flex items-start gap-3 text-sm md:text-base text-muted-foreground leading-relaxed pl-0 md:pl-9">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4ECDC4]/10 text-[#4ECDC4] text-xs flex items-center justify-center font-bold md:hidden">
                      A
                    </span>
                    <span>{faq.answer}</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Additional Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 md:mt-14 text-center px-4"
        >
          <p className="text-sm md:text-base text-muted-foreground">
            その他ご不明な点がございましたら、
            <br className="md:hidden" />
            お気軽にお問い合わせください。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
