import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  colorClass?: string;
}

export default function StatCard({ title, value, icon: Icon, trend, colorClass }: StatCardProps) {
  return (
    <motion.div 
      className={cn(
        "group relative overflow-hidden rounded-2xl p-6 backdrop-blur-sm transition-all duration-300",
        colorClass || "bg-card/50 border-2 border-border hover:border-primary/50"
      )}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br",
          colorClass ? "from-white/10 to-transparent" : "from-primary/5 to-transparent"
        )} />
      </div>

      {/* Content */}
      <div className="relative space-y-3">
        {/* Icon & Trend Row */}
        <div className="flex items-start justify-between">
          <motion.div
            className={cn(
              "p-2.5 rounded-xl",
              colorClass ? "bg-white/20" : "bg-primary/10"
            )}
            whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className={cn(
              "w-5 h-5",
              colorClass ? "text-white" : "text-primary"
            )} />
          </motion.div>

          {trend && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className={cn(
                "flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold",
                trend.isPositive
                  ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-500/20 text-rose-600 dark:text-rose-400"
              )}
            >
              <span className="text-sm">{trend.isPositive ? '↗' : '↘'}</span>
              {trend.value}
            </motion.div>
          )}
        </div>

        {/* Value */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className={cn(
            "text-3xl font-bold tracking-tight",
            colorClass ? "text-white" : "text-foreground"
          )}>
            {typeof value === 'number' ? `৳${(value / 1000).toFixed(0)}k` : value}
          </h3>
        </motion.div>

        {/* Title */}
        <p className={cn(
          "text-sm font-medium",
          colorClass ? "text-white/70" : "text-muted-foreground"
        )}>
          {title}
        </p>
      </div>

      {/* Bottom Accent Bar */}
      <motion.div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-1",
          colorClass ? "bg-white/30" : "bg-gradient-to-r from-primary/50 via-primary to-primary/50"
        )}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      />

      {/* Shine Effect on Hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
}
