"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Share2,
  Receipt,
  ShieldCheck,
  CreditCard,
  Wallet,
  MessageSquare,
  Truck,
  Search,
  Paintbrush,
  Shield,
  Monitor,
  Plane,
  Save,
  RotateCcw,
  Download,
  Upload,
  Loader2,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { showToast } from "@/lib/toast";
import { AllSettings } from "@/types/settings";
import {
  getSettings,
  updateSettings,
  resetSettings,
  exportSettings,
  importSettings,
} from "@/services/settings-service";

// Dynamic imports for tab components
import StoreInfoTab from "./_components/StoreInfoTab";
import SocialLinksTab from "./_components/SocialLinksTab";
import InvoiceTab from "./_components/InvoiceTab";
import WarrantyTab from "./_components/WarrantyTab";
import EMITab from "./_components/EMITab";
import PaymentTab from "./_components/PaymentTab";
import NotificationTab from "./_components/NotificationTab";
import DeliveryTab from "./_components/DeliveryTab";
import SEOTab from "./_components/SEOTab";
import AppearanceTab from "./_components/AppearanceTab";
import SecurityTab from "./_components/SecurityTab";
import POSTab from "./_components/POSTab";
import OverseasTab from "./_components/OverseasTab";

// Tab configuration
const tabs = [
  {
    id: "store",
    label: "Store Info",
    icon: Building2,
    description: "Business name, address, hours",
  },
  {
    id: "social",
    label: "Social Links",
    icon: Share2,
    description: "Facebook, WhatsApp, etc.",
  },
  {
    id: "invoice",
    label: "Invoice",
    icon: Receipt,
    description: "Invoice format & receipt",
  },
  {
    id: "warranty",
    label: "Warranty",
    icon: ShieldCheck,
    description: "Warranty terms & tracking",
  },
  {
    id: "emi",
    label: "EMI / Installment",
    icon: CreditCard,
    description: "EMI plans & documents",
  },
  {
    id: "payment",
    label: "Payment",
    icon: Wallet,
    description: "bKash, Nagad, Bank, Online",
  },
  {
    id: "notification",
    label: "Notifications",
    icon: MessageSquare,
    description: "SMS, Email, Push",
  },
  {
    id: "delivery",
    label: "Delivery",
    icon: Truck,
    description: "Delivery areas & courier",
  },
  {
    id: "seo",
    label: "SEO",
    icon: Search,
    description: "Meta tags & analytics",
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: Paintbrush,
    description: "Theme, colors, banner",
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
    description: "Auth, backup, sessions",
  },
  {
    id: "pos",
    label: "POS",
    icon: Monitor,
    description: "Point of sale config",
  },
  {
    id: "overseas",
    label: "Overseas",
    icon: Plane,
    description: "Import, currency, tracking",
  },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("store");
  const [settings, setSettings] = useState<AllSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load settings
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const data = await getSettings();
      setSettings(data);
    } catch {
      showToast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  // Update section
  const updateSection = useCallback(
    <K extends keyof AllSettings>(section: K, data: AllSettings[K]) => {
      if (!settings) return;
      setSettings({ ...settings, [section]: data });
      setHasChanges(true);
    },
    [settings],
  );

  // Save
  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      await updateSettings(settings);
      setHasChanges(false);
      showToast.success("Settings saved successfully! ✅");
    } catch {
      showToast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  // Reset
  const handleReset = async () => {
    if (
      !confirm(
        "Are you sure you want to reset all settings to defaults? This cannot be undone.",
      )
    )
      return;
    try {
      const data = await resetSettings();
      setSettings(data);
      setHasChanges(false);
      showToast.success("Settings reset to defaults");
    } catch {
      showToast.error("Failed to reset settings");
    }
  };

  // Export
  const handleExport = async () => {
    try {
      const json = await exportSettings();
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `mobileganj-settings-${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast.success("Settings exported!");
    } catch {
      showToast.error("Failed to export settings");
    }
  };

  // Import
  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        const data = await importSettings(text);
        setSettings(data);
        setHasChanges(false);
        showToast.success("Settings imported successfully!");
      } catch {
        showToast.error("Invalid settings file");
      }
    };
    input.click();
  };

  // Render active tab content
  const renderTabContent = () => {
    if (!settings) return null;

    switch (activeTab) {
      case "store":
        return (
          <StoreInfoTab
            data={settings.store}
            onChange={(d) => updateSection("store", d)}
          />
        );
      case "social":
        return (
          <SocialLinksTab
            data={settings.social}
            onChange={(d) => updateSection("social", d)}
          />
        );
      case "invoice":
        return (
          <InvoiceTab
            data={settings.invoice}
            onChange={(d) => updateSection("invoice", d)}
          />
        );
      case "warranty":
        return (
          <WarrantyTab
            data={settings.warranty}
            onChange={(d) => updateSection("warranty", d)}
          />
        );
      case "emi":
        return (
          <EMITab
            data={settings.emi}
            onChange={(d) => updateSection("emi", d)}
          />
        );
      case "payment":
        return (
          <PaymentTab
            data={settings.payment}
            onChange={(d) => updateSection("payment", d)}
          />
        );
      case "notification":
        return (
          <NotificationTab
            data={settings.notification}
            onChange={(d) => updateSection("notification", d)}
          />
        );
      case "delivery":
        return (
          <DeliveryTab
            data={settings.delivery}
            onChange={(d) => updateSection("delivery", d)}
          />
        );
      case "seo":
        return (
          <SEOTab
            data={settings.seo}
            onChange={(d) => updateSection("seo", d)}
          />
        );
      case "appearance":
        return (
          <AppearanceTab
            data={settings.appearance}
            onChange={(d) => updateSection("appearance", d)}
          />
        );
      case "security":
        return (
          <SecurityTab
            data={settings.security}
            onChange={(d) => updateSection("security", d)}
          />
        );
      case "pos":
        return (
          <POSTab
            data={settings.pos}
            onChange={(d) => updateSection("pos", d)}
          />
        );
      case "overseas":
        return (
          <OverseasTab
            data={settings.overseas}
            onChange={(d) => updateSection("overseas", d)}
          />
        );
      default:
        return null;
    }
  };

  const activeTabInfo = tabs.find((t) => t.id === activeTab)!;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your store configuration & preferences
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleImport}>
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="text-destructive hover:text-destructive"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button
            onClick={handleSave}
            disabled={!hasChanges || saving}
            size="sm"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : hasChanges ? (
              <Save className="w-4 h-4 mr-2" />
            ) : (
              <CheckCircle2 className="w-4 h-4 mr-2" />
            )}
            {saving ? "Saving..." : hasChanges ? "Save Changes" : "Saved"}
          </Button>
        </div>
      </motion.div>

      {/* Unsaved Changes Warning */}
      <AnimatePresence>
        {hasChanges && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3 flex items-center justify-between"
          >
            <p className="text-sm text-amber-700 dark:text-amber-300">
              ⚠️ You have unsaved changes. Don&apos;t forget to save!
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={handleSave}
              className="border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-900"
            >
              Save Now
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Tab Selector */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-full card-base p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <activeTabInfo.icon className="w-5 h-5 text-primary" />
            <div className="text-left">
              <p className="font-semibold">{activeTabInfo.label}</p>
              <p className="text-xs text-muted-foreground">
                {activeTabInfo.description}
              </p>
            </div>
          </div>
          <ChevronRight
            className={cn(
              "w-5 h-5 transition-transform",
              mobileMenuOpen && "rotate-90",
            )}
          />
        </button>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="card-base mt-2 p-2 space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setMobileMenuOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="text-sm font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Content Area */}
      <div className="flex gap-6">
        {/* Desktop Sidebar Tabs */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="card-base p-2 sticky top-6">
            <ScrollArea className="h-[calc(100vh-280px)]">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all text-left group",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "hover:bg-accent text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">
                          {tab.label}
                        </p>
                        <p
                          className={cn(
                            "text-xs truncate",
                            isActive
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground",
                          )}
                        >
                          {tab.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </ScrollArea>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 min-w-0">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="card-base p-6"
          >
            {/* Tab header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b">
              <div className="p-2 rounded-lg bg-primary/10">
                <activeTabInfo.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{activeTabInfo.label}</h2>
                <p className="text-sm text-muted-foreground">
                  {activeTabInfo.description}
                </p>
              </div>
            </div>

            {/* Tab content */}
            {renderTabContent()}
          </motion.div>

          {/* Bottom Save Button (Mobile) */}
          <div className="lg:hidden mt-4 sticky bottom-4">
            <Button
              onClick={handleSave}
              disabled={!hasChanges || saving}
              className="w-full"
              size="lg"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
