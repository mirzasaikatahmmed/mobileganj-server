"use client";

import {
  DollarSign,
  TrendingUp,
  AlertCircle,
  CreditCard,
  RotateCcw,
  Wallet,
  PiggyBank,
  Truck,
  Wrench,
} from "lucide-react";
import { motion } from "framer-motion";
import StatCard from "./_components/StatCard";
import QuickActions from "./_components/QuickActions";
import RecentSales from "./_components/RecentSales";
import DueList from "./_components/DueList";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your business overview.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <StatCard
            title="Total Sales"
            value={1250000}
            icon={DollarSign}
            trend={{ value: "+12.5%", isPositive: true }}
            colorClass="bg-gradient-to-br from-purple-500 to-purple-600 text-white"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard
            title="Instant Paid"
            value={980000}
            icon={CreditCard}
            trend={{ value: "+8.2%", isPositive: true }}
            colorClass="bg-gradient-to-br from-green-500 to-green-600 text-white"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard
            title="Total Due Sale"
            value={270000}
            icon={AlertCircle}
            colorClass="bg-gradient-to-br from-orange-500 to-orange-600 text-white"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard
            title="Due Paid"
            value={125000}
            icon={TrendingUp}
            trend={{ value: "+15.3%", isPositive: true }}
            colorClass="bg-gradient-to-br from-teal-500 to-teal-600 text-white"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard
            title="Total Return"
            value={45000}
            icon={RotateCcw}
            colorClass="bg-gradient-to-br from-red-500 to-red-600 text-white"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard
            title="Total Expense"
            value={185000}
            icon={Wallet}
            colorClass="bg-gradient-to-br from-blue-500 to-blue-600 text-white"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard
            title="Total Profit"
            value={895000}
            icon={PiggyBank}
            trend={{ value: "+18.7%", isPositive: true }}
            colorClass="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard
            title="Supplier Due"
            value={320000}
            icon={Truck}
            colorClass="bg-gradient-to-br from-amber-500 to-amber-600 text-white"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard
            title="Service Profit"
            value={85000}
            icon={Wrench}
            trend={{ value: "+22.1%", isPositive: true }}
            colorClass="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white"
          />
        </motion.div>
      </motion.div>

      {/* Quick Actions & Lists */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <QuickActions />
        <RecentSales />
        <DueList />
      </motion.div>
    </div>
  );
}
