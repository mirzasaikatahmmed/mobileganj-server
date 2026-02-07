"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Truck,
  DollarSign,
  TrendingUp,
  Wrench,
  Plane,
  Settings,
  LogOut,
  X,
  Home,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: ShoppingCart, label: "Sales", href: "/admin/sales" },
  { icon: Users, label: "Customers", href: "/admin/customers" },
  { icon: Truck, label: "Suppliers", href: "/admin/suppliers" },
  { icon: DollarSign, label: "Expense", href: "/admin/expense" },
  { icon: TrendingUp, label: "Investment", href: "/admin/investment" },
  { icon: Wrench, label: "Servicing", href: "/admin/servicing" },
  {
    icon: Plane,
    label: "Overseas Tracking",
    href: "/admin/overseas-tracking",
    adminOnly: true,
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 w-64 bg-card border-r h-screen flex flex-col transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b flex items-center justify-center relative overflow-hidden">
          <Link
            href="/admin/dashboard"
            className="flex items-center justify-center w-full"
          >
            <img
              src="/logo.png"
              alt="Mobile GANJ"
              className="h-10 w-auto object-contain scale-200"
            />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden absolute right-2"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        <p className="px-6 text-xs text-muted-foreground text-center -mt-6 mb-4">
          POS System
        </p>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname?.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
                {item.adminOnly && (
                  <span className="ml-auto text-xs bg-orange-500 text-white px-2 py-0.5 rounded">
                    Admin
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t space-y-1">
          <Link
            href="/"
            target="_blank"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 text-primary hover:text-primary transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Visit Website</span>
            <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-50" />
          </Link>
          <Link
            href="/admin/settings"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-destructive/10 text-destructive transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
