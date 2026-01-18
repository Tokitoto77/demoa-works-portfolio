/**
 * Footer Component
 * Design: シンプルで温かみのあるフッター
 */

import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { label: "モニター募集", href: "#monitor" },
    { label: "できること", href: "#features" },
    { label: "制作事例", href: "#works" },
    { label: "自己紹介", href: "#about" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <footer className="bg-secondary/50 py-10 md:py-14">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Logo */}
          <div className="text-center mb-8">
            <a
              href="#"
              className="inline-block"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <img
                src="/src/assets/logo.png"
                alt="Demoa-works"
                className="h-10 md:h-12 w-auto mx-auto object-contain"
              />
            </a>
            <p className="text-sm text-muted-foreground mt-2">
              LP制作 × GAS連携 で業務自動化をサポート
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Divider */}
          <div className="border-t border-border mb-8" />

          {/* Copyright */}
          <div className="text-center">
            <p className="text-xs md:text-sm text-muted-foreground flex items-center justify-center gap-1">
              © {currentYear} Demoa-works. Made with
              <Heart className="w-3 h-3 text-[#FF6B35] fill-[#FF6B35]" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
