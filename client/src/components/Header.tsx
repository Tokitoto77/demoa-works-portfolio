/**
 * Header Component
 * Design: Warm Gradient theme - シンプルで温かみのあるナビゲーション
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "モニター募集", href: "#monitor" },
    { label: "できること", href: "#features" },
    { label: "制作事例", href: "#works" },
    { label: "自己紹介", href: "#about" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a 
            href="#" 
            className="font-display font-bold text-xl md:text-2xl text-gradient-sunset"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Demoa-works
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Button 
              className="gradient-sunset text-white border-0 shadow-soft hover:opacity-90 transition-opacity"
              onClick={() => scrollToSection("#monitor")}
            >
              お問い合わせ
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="メニューを開く"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {item.label}
                </a>
              ))}
              <Button 
                className="gradient-sunset text-white border-0 shadow-soft hover:opacity-90 transition-opacity w-full mt-2"
                onClick={() => scrollToSection("#monitor")}
              >
                お問い合わせ
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
