import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Phone,
  Mail,
  MapPin,
  Smartphone,
  ShieldCheck,
  Truck,
  CreditCard,
  Clock,
  MessageCircle,
  Heart,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

const quickLinks = [
  { href: "/shop", label: "শপ" },
  { href: "/buy-phone", label: "ফোন কিনুন" },
  { href: "/accessories", label: "এক্সেসরিজ" },
  { href: "/sell-phone", label: "ফোন বিক্রি করুন" },
  { href: "/pre-order", label: "প্রি-অর্ডার" },
  { href: "/offers", label: "অফার সমূহ" },
];

const customerLinks = [
  { href: "/about", label: "আমাদের সম্পর্কে" },
  { href: "/contact", label: "যোগাযোগ" },
  { href: "/emi", label: "ইএমআই সুবিধা" },
  { href: "/warranty", label: "ওয়ারেন্টি পলিসি" },
  { href: "/return", label: "রিটার্ন পলিসি" },
];

const features = [
  {
    icon: ShieldCheck,
    title: "অফিসিয়াল ওয়ারেন্টি",
    description: "সকল পণ্যে গ্যারান্টি",
  },
  {
    icon: Truck,
    title: "দ্রুত ডেলিভারি",
    description: "সারাদেশে হোম ডেলিভারি",
  },
  {
    icon: CreditCard,
    title: "ইএমআই সুবিধা",
    description: "সহজ কিস্তিতে কিনুন",
  },
  {
    icon: Clock,
    title: "২৪/৭ সাপোর্ট",
    description: "যেকোনো সময় সাহায্য",
  },
];

export default function Footer() {
  return (
    <footer className="mt-16">
      {/* ─── Features Strip ─── */}
      <div className="border-t border-b border-border/40 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className={`flex items-center gap-3 py-5 px-4 ${
                  i < features.length - 1
                    ? "border-r border-border/40 max-lg:last:border-r-0 max-lg:[&:nth-child(2)]:border-r-0"
                    : ""
                } ${i >= 2 ? "max-lg:border-t max-lg:border-border/40" : ""}`}
              >
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <feature.icon className="h-4.5 w-4.5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight">
                    {feature.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Main Footer ─── */}
      <div className="bg-muted/40">
        <div className="container mx-auto px-4 py-10 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
            {/* ─ Brand & About ─ */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-flex items-center gap-2 mb-4">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <Smartphone className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <span className="font-bold text-lg leading-none">
                    Mobile<span className="text-primary">GANJ</span>
                  </span>
                  <p className="text-[10px] text-muted-foreground leading-none mt-0.5">
                    মোবাইল গঞ্জ
                  </p>
                </div>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-xs">
                প্রিমিয়াম স্মার্টফোন ও এক্সেসরিজের বিশ্বস্ত ঠিকানা। দুবাই
                ইমপোর্ট, অফিসিয়াল ওয়ারেন্টি সহ সারাদেশে দ্রুত ডেলিভারি।
              </p>

              {/* Social */}
              <div className="flex items-center gap-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-all duration-200"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-all duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-all duration-200"
                  aria-label="YouTube"
                >
                  <Youtube className="h-4 w-4" />
                </a>
                <a
                  href="https://wa.me/8801234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-all duration-200"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* ─ Quick Links ─ */}
            <div className="lg:col-span-2">
              <h3 className="font-bold text-sm mb-4 flex items-center gap-1.5">
                <ChevronRight className="h-4 w-4 text-primary" />
                দ্রুত লিংক
              </h3>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary hover:translate-x-0.5 transition-all duration-200 inline-flex items-center gap-1.5 group"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ─ Customer Service ─ */}
            <div className="lg:col-span-3">
              <h3 className="font-bold text-sm mb-4 flex items-center gap-1.5">
                <ChevronRight className="h-4 w-4 text-primary" />
                কাস্টমার সার্ভিস
              </h3>
              <ul className="space-y-2.5">
                {customerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary hover:translate-x-0.5 transition-all duration-200 inline-flex items-center gap-1.5 group"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ─ Contact Info ─ */}
            <div className="lg:col-span-3">
              <h3 className="font-bold text-sm mb-4 flex items-center gap-1.5">
                <ChevronRight className="h-4 w-4 text-primary" />
                যোগাযোগ করুন
              </h3>
              <ul className="space-y-3.5">
                <li>
                  <a
                    href="tel:+8801234567890"
                    className="flex items-start gap-2.5 group"
                  >
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Phone className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium group-hover:text-primary transition-colors">
                        +৮৮০ ১২৩৪-৫৬৭৮৯০
                      </p>
                      <p className="text-xs text-muted-foreground">
                        +৮৮০ ১৯৮৭-৬৫৪৩২১
                      </p>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@mobileganj.com"
                    className="flex items-center gap-2.5 group"
                  >
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Mail className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                      info@mobileganj.com
                    </p>
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      ঢাকা, বাংলাদেশ
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                      সকাল ১০টা — রাত ১০টা
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ─── Bottom Bar ─── */}
        <div className="border-t border-border/40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground text-center sm:text-left">
                &copy; {new Date().getFullYear()} MobileGanj — সর্বস্বত্ব
                সংরক্ষিত।
              </p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span>তৈরি করেছে</span>
                <Heart className="h-3 w-3 text-red-500 fill-red-500" />
                <span className="font-medium text-foreground">
                  MobileGanj Team
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
