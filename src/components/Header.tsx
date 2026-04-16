import Link from "next/link";
import { Button } from "./ui/button";
import { CreditCard } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-primary">
          <CreditCard className="w-6 h-6" />
          <span>PaymentSwitch</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </a>
          <a href="#for-partners" className="text-sm font-medium hover:text-primary transition-colors">
            For Partners
          </a>
          <a href="#for-developers" className="text-sm font-medium hover:text-primary transition-colors">
            For Developers
          </a>
          <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">
            Documentation
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:inline-flex" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button className="bg-primary hover:bg-primary/90" asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
