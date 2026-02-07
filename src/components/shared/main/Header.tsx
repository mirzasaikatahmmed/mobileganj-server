"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Phone,
  ChevronDown,
  ChevronRight,
  Smartphone,
  Headphones,
  BatteryCharging,
  ShieldCheck,
  Zap,
  Tag,
  Gift,
  RefreshCw,
  Package,
  CreditCard,
  Star,
  Sparkles,
  Heart,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/hooks/use-cart";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { cn } from "@/lib/utils";

/* ─── Menu Data ─── */
interface MegaMenuColumn {
  title: string;
  icon?: React.ReactNode;
  links: { href: string; label: string; badge?: string }[];
}

interface NavItem {
  label: string;
  href?: string;
  highlight?: boolean;
  icon?: React.ReactNode;
  megaMenu?: {
    columns: MegaMenuColumn[];
    featured?: {
      title: string;
      description: string;
      href: string;
      image?: string;
    };
  };
}

const navItems: NavItem[] = [
  {
    label: "ফোন",
    icon: <Smartphone className="h-4 w-4" />,
    megaMenu: {
      columns: [
        {
          title: "ব্র্যান্ড অনুযায়ী",
          icon: <Star className="h-4 w-4" />,
          links: [
            { href: "/shop?brand=Apple", label: "Apple iPhone" },
            { href: "/shop?brand=Samsung", label: "Samsung Galaxy" },
            { href: "/shop?brand=Google", label: "Google Pixel" },
            { href: "/shop?brand=OnePlus", label: "OnePlus" },
            { href: "/shop?brand=Xiaomi", label: "Xiaomi / Redmi" },
            { href: "/shop", label: "সব ব্র্যান্ড দেখুন →" },
          ],
        },
        {
          title: "ধরন অনুযায়ী",
          icon: <Package className="h-4 w-4" />,
          links: [
            {
              href: "/shop?condition=new",
              label: "Brand New (সিলড)",
              badge: "🆕",
            },
            { href: "/shop?condition=used", label: "Used Phone", badge: "♻️" },
            {
              href: "/shop?tag=dubai-import",
              label: "Dubai Import",
              badge: "🇦🇪",
            },
            { href: "/shop?tag=official", label: "Official Warranty" },
            { href: "/pre-order", label: "Pre-Order", badge: "🔥" },
          ],
        },
        {
          title: "বাজেট অনুযায়ী",
          icon: <CreditCard className="h-4 w-4" />,
          links: [
            { href: "/shop?max=15000", label: "১৫,০০০ টাকার নীচে" },
            { href: "/shop?min=15000&max=30000", label: "১৫,০০০ - ৩০,০০০" },
            { href: "/shop?min=30000&max=60000", label: "৩০,০০০ - ৬০,০০০" },
            { href: "/shop?min=60000&max=100000", label: "৬০,০০০ - ১,০০,০০০" },
            { href: "/shop?min=100000", label: "১,০০,০০০+ ফ্ল্যাগশিপ" },
          ],
        },
      ],
      featured: {
        title: "🔥 iPhone 15 Pro Max",
        description: "Dubai Import - ১ বছরের ওয়ারেন্টি সহ মাত্র ১,৩৯,০০০৳",
        href: "/product/iphone-15-pro-max",
      },
    },
  },
  {
    label: "এক্সেসরিজ",
    icon: <Headphones className="h-4 w-4" />,
    megaMenu: {
      columns: [
        {
          title: "ক্যাটাগরি",
          icon: <Package className="h-4 w-4" />,
          links: [
            { href: "/accessories?cat=earphone", label: "🎧 ইয়ারফোন / বাডস" },
            {
              href: "/accessories?cat=charger",
              label: "🔌 চার্জার / অ্যাডাপ্টার",
            },
            { href: "/accessories?cat=powerbank", label: "🔋 পাওয়ার ব্যাংক" },
            { href: "/accessories?cat=cover", label: "📱 ফোন কভার / কেস" },
            { href: "/accessories?cat=glass", label: "🛡️ স্ক্রিন প্রটেক্টর" },
            { href: "/accessories", label: "সব দেখুন →" },
          ],
        },
        {
          title: "ব্র্যান্ড",
          icon: <Star className="h-4 w-4" />,
          links: [
            { href: "/accessories?brand=Apple", label: "Apple Accessories" },
            {
              href: "/accessories?brand=Samsung",
              label: "Samsung Accessories",
            },
            { href: "/accessories?brand=Others", label: "Third Party" },
          ],
        },
      ],
    },
  },
  {
    label: "Used Phone",
    href: "/buy-phone",
    icon: <RefreshCw className="h-4 w-4" />,
  },
  {
    label: "ফোন বিক্রি",
    href: "/sell-phone",
    icon: <Tag className="h-4 w-4" />,
  },
  {
    label: "Pre-Order",
    href: "/pre-order",
    icon: <Gift className="h-4 w-4" />,
    highlight: true,
  },
  {
    label: "অফার",
    href: "/offers",
    icon: <Sparkles className="h-4 w-4" />,
    highlight: true,
  },
  {
    label: "EMI সুবিধা",
    href: "/emi",
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    label: "যোগাযোগ",
    href: "/contact",
    icon: <MapPin className="h-4 w-4" />,
  },
];

/* ─── Desktop Mega Menu Dropdown ─── */
function DesktopMegaMenu({
  item,
  isOpen,
  onOpen,
  onClose,
  cancelClose,
}: {
  item: NavItem;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  cancelClose: () => void;
}) {
  const pathname = usePathname();
  const isActive = item.href ? pathname === item.href : false;

  const handleEnter = () => {
    cancelClose();
    onOpen();
  };

  const handleLeave = () => {
    onClose();
  };

  if (!item.megaMenu) {
    return (
      <Link
        href={item.href || "#"}
        className={cn(
          "relative flex items-center gap-1.5 px-3.5 py-3 text-[13px] font-semibold transition-all duration-200 whitespace-nowrap",
          item.highlight
            ? "text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300"
            : isActive
              ? "text-primary"
              : "text-foreground/70 hover:text-foreground",
        )}
      >
        {item.icon}
        {item.label}
        {/* Active indicator */}
        {isActive && (
          <motion.div
            layoutId="nav-active"
            className="absolute bottom-0 left-3 right-3 h-[2.5px] bg-primary rounded-full"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        className={cn(
          "relative flex items-center gap-1.5 px-3.5 py-3 text-[13px] font-semibold transition-all duration-200 whitespace-nowrap",
          isOpen ? "text-primary" : "text-foreground/70 hover:text-foreground",
        )}
      >
        {item.icon}
        {item.label}
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
        {isOpen && (
          <motion.div
            layoutId="nav-active"
            className="absolute bottom-0 left-3 right-3 h-[2.5px] bg-primary rounded-full"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-50"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            {/* Invisible bridge to prevent gap flickering */}
            <div className="h-2" />
            <div className="rounded-xl border bg-popover shadow-2xl ring-1 ring-black/5 dark:ring-white/5 p-6 min-w-[600px]">
              <div className="flex gap-8">
                {/* Columns */}
                <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-1 lg:grid-cols-3">
                  {item.megaMenu.columns.map((col) => (
                    <div key={col.title}>
                      <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                        {col.icon}
                        {col.title}
                      </h4>
                      <ul className="space-y-1">
                        {col.links.map((link) => (
                          <li key={link.href + link.label}>
                            <Link
                              href={link.href}
                              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground/80 hover:text-foreground hover:bg-accent transition-colors"
                              onClick={onClose}
                            >
                              {link.label}
                              {link.badge && (
                                <span className="text-xs">{link.badge}</span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Banner */}
              {item.megaMenu.featured && (
                <Link
                  href={item.megaMenu.featured.href}
                  className="mt-5 block rounded-lg bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-100 dark:border-blue-900/30 p-4 hover:shadow-md transition-shadow"
                  onClick={onClose}
                >
                  <p className="font-semibold text-sm">
                    {item.megaMenu.featured.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.megaMenu.featured.description}
                  </p>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Mobile Accordion Menu Item ─── */
function MobileMenuItem({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  if (!item.megaMenu) {
    return (
      <Link
        href={item.href || "#"}
        className={cn(
          "flex items-center gap-3 py-3 px-4 rounded-lg text-sm font-medium transition-colors",
          item.highlight
            ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10"
            : "hover:bg-accent",
        )}
        onClick={onClose}
      >
        {item.icon}
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full py-3 px-4 rounded-lg text-sm font-medium hover:bg-accent transition-colors"
      >
        <span className="flex items-center gap-3">
          {item.icon}
          {item.label}
        </span>
        <ChevronRight
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            expanded && "rotate-90",
          )}
        />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-4 pb-2 space-y-1">
              {item.megaMenu.columns.map((col) => (
                <div key={col.title} className="py-2">
                  <p className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    {col.title}
                  </p>
                  {col.links.map((link) => (
                    <Link
                      key={link.href + link.label}
                      href={link.href}
                      className="flex items-center gap-2 py-2 px-4 text-sm text-foreground/80 hover:text-foreground rounded-md hover:bg-accent transition-colors"
                      onClick={onClose}
                    >
                      {link.label}
                      {link.badge && (
                        <span className="text-xs">{link.badge}</span>
                      )}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Header ─── */
export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scheduleClose = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => setOpenMegaMenu(null), 150);
  };

  const cancelClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        {/* ─── Top Bar ─── */}
        <div className="bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 flex justify-between items-center text-xs sm:text-sm h-9">
            <div className="flex items-center gap-2">
              <Zap className="h-3.5 w-3.5" />
              <p className="hidden sm:block">
                Dubai Import | ৭ দিনে ডেলিভারি | EMI সুবিধা | ওয়ারেন্টি
              </p>
              <p className="sm:hidden">🚀 EMI সুবিধা | ৭ দিনে ডেলিভারি</p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="tel:+8801234567890"
                className="flex items-center gap-1 hover:underline"
              >
                <Phone className="h-3 w-3" />
                <span className="hidden sm:inline">+880 1234-567890</span>
                <span className="sm:hidden">কল করুন</span>
              </a>
              <span className="hidden sm:inline text-primary-foreground/50">
                |
              </span>
              <Link href="/shop" className="hidden sm:inline hover:underline">
                Track Order
              </Link>
            </div>
          </div>
        </div>

        {/* ─── Main Header ─── */}
        <div className="border-b bg-background">
          <div className="container mx-auto px-4 h-16 flex items-center">
            {/* Logo — Left */}
            <Link href="/" className="shrink-0 mr-8 scale-200 ml-10">
              <img src="/logo.png" alt="Mobile GANJ" className="h-9 w-auto" />
            </Link>

            {/* Search Bar — Center (takes remaining space) */}
            <div className="hidden md:flex flex-1 justify-center">
              <div className="relative w-full max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="iPhone, Samsung, AirPods... খুঁজুন"
                  className={cn(
                    "pl-11 pr-24 h-11 rounded-full border-2 transition-all duration-200 bg-muted/30",
                    searchFocused
                      ? "border-primary ring-2 ring-primary/20 bg-background"
                      : "border-transparent hover:border-muted-foreground/20",
                  )}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
                <Button
                  size="sm"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full h-8 px-5 text-xs font-semibold"
                >
                  Search
                </Button>
              </div>
            </div>

            {/* Actions — Right */}
            <div className="flex items-center gap-1 shrink-0 ml-auto">
              <ThemeToggle />

              {/* Wishlist */}
              <Link href="/offers" className="hidden md:inline-flex">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative rounded-full hover:bg-accent"
                >
                  <Heart className="h-[18px] w-[18px]" />
                </Button>
              </Link>

              {/* Separator */}
              <div className="hidden lg:block w-px h-6 bg-border mx-1" />

              {/* User / Login */}
              <Link href="/login" className="hidden md:inline-flex">
                <Button
                  variant="ghost"
                  size="default"
                  className="gap-2 text-sm rounded-full hover:bg-accent px-3"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="hidden lg:inline text-xs font-semibold">
                    লগইন / রেজিস্টার
                  </span>
                </Button>
              </Link>

              {/* Separator */}
              <div className="hidden md:block w-px h-6 bg-border mx-1" />

              {/* Cart */}
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative rounded-full hover:bg-accent"
                >
                  <ShoppingCart className="h-[18px] w-[18px]" />
                  {totalItems > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-[18px] min-w-[18px] rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold px-1">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Search Bar - Mobile */}
          <div className="md:hidden px-4 pb-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ফোন, অ্যাক্সেসরিজ খুঁজুন..."
                className="pl-10 h-10 rounded-full bg-muted/40 border-transparent"
              />
            </div>
          </div>
        </div>

        {/* ─── Desktop Navigation with Mega Menu ─── */}
        <nav className="hidden md:block border-b bg-background/80 backdrop-blur-sm py-2">
          <div className="container mx-auto px-4">
            <div className="flex items-center">
              {/* All Categories button */}
              <div
                className="relative"
                onMouseEnter={() => {
                  cancelClose();
                  setOpenMegaMenu("__all__");
                }}
                onMouseLeave={scheduleClose}
              >
                <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-[13px] font-semibold mr-3 shadow-sm hover:bg-primary/90 transition-colors">
                  <Menu className="h-4 w-4" />
                  ক্যাটাগরি
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>

                <AnimatePresence>
                  {openMegaMenu === "__all__" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full z-50"
                    >
                      {/* Invisible bridge */}
                      <div className="h-2" />
                      <div className="rounded-xl border bg-popover shadow-2xl ring-1 ring-black/5 dark:ring-white/5 p-2 min-w-60">
                        {[
                          {
                            icon: <Smartphone className="h-4 w-4" />,
                            label: "📱 মোবাইল ফোন",
                            href: "/shop?category=Phone",
                          },
                          {
                            icon: <Headphones className="h-4 w-4" />,
                            label: "🎧 ইয়ারফোন / বাডস",
                            href: "/shop?category=Earphone",
                          },
                          {
                            icon: <BatteryCharging className="h-4 w-4" />,
                            label: "🔌 চার্জার",
                            href: "/shop?category=Charger",
                          },
                          {
                            icon: <Zap className="h-4 w-4" />,
                            label: "🔋 পাওয়ার ব্যাংক",
                            href: "/shop?category=Power Bank",
                          },
                          {
                            icon: <ShieldCheck className="h-4 w-4" />,
                            label: "🛡️ স্ক্রিন প্রটেক্টর",
                            href: "/shop?category=Glass",
                          },
                          {
                            icon: <Package className="h-4 w-4" />,
                            label: "📦 ফোন কভার / কেস",
                            href: "/shop?category=Cover",
                          },
                          {
                            icon: <Tag className="h-4 w-4" />,
                            label: "🎁 অন্যান্য এক্সেসরিজ",
                            href: "/accessories",
                          },
                        ].map((cat) => (
                          <Link
                            key={cat.href}
                            href={cat.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] hover:bg-accent transition-colors group/cat"
                            onClick={() => setOpenMegaMenu(null)}
                          >
                            {cat.label}
                            <ChevronRight className="h-3 w-3 ml-auto opacity-0 -translate-x-1 group-hover/cat:opacity-50 group-hover/cat:translate-x-0 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Separator */}
              <div className="w-px h-5 bg-border mx-1" />

              {/* Nav Items with mega menus */}
              {navItems.map((item) => (
                <DesktopMegaMenu
                  key={item.label}
                  item={item}
                  isOpen={openMegaMenu === item.label}
                  onOpen={() => {
                    cancelClose();
                    setOpenMegaMenu(item.label);
                  }}
                  onClose={scheduleClose}
                  cancelClose={cancelClose}
                />
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* ─── Mobile Slide-in Menu (outside header to avoid backdrop-filter containing block) ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[60] md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-background z-[70] md:hidden overflow-y-auto"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <span className="text-lg font-bold">
                    Mobile<span className="text-primary">GANJ</span>
                  </span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* User Section */}
              <div className="p-4 border-b">
                <Link
                  href="/login"
                  className="flex items-center gap-3 p-3 rounded-xl bg-accent/50 hover:bg-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">লগইন / রেজিস্টার</p>
                    <p className="text-xs text-muted-foreground">
                      অ্যাকাউন্টে প্রবেশ করুন
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />
                </Link>
              </div>

              {/* Navigation */}
              <div className="p-3 space-y-0.5">
                <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  মেনু
                </p>
                {navItems.map((item) => (
                  <MobileMenuItem
                    key={item.label}
                    item={item}
                    onClose={() => setMobileMenuOpen(false)}
                  />
                ))}
              </div>

              {/* Quick Links */}
              <div className="p-3 border-t">
                <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  কুইক লিংক
                </p>
                <Link
                  href="/warranty"
                  className="flex items-center gap-3 py-3 px-4 rounded-lg text-sm hover:bg-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ShieldCheck className="h-4 w-4" />
                  ওয়ারেন্টি চেক
                </Link>
                <Link
                  href="/emi"
                  className="flex items-center gap-3 py-3 px-4 rounded-lg text-sm hover:bg-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <CreditCard className="h-4 w-4" />
                  EMI ক্যালকুলেটর
                </Link>
                <Link
                  href="/return"
                  className="flex items-center gap-3 py-3 px-4 rounded-lg text-sm hover:bg-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <RefreshCw className="h-4 w-4" />
                  রিটার্ন পলিসি
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
