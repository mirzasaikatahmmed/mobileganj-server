'use client';

import { Bell, Calendar, ChevronDown, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/shared/ThemeToggle';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="h-16 border-b bg-card sticky top-0 z-10 flex items-center justify-between px-4 md:px-6">
      {/* Left Side - Mobile Menu + Filters */}
      <div className="flex items-center gap-2 md:gap-4 flex-1">
        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Branch Filter - Hidden on mobile */}
        <Select defaultValue="all">
          <SelectTrigger className="w-[140px] md:w-[180px] hidden sm:flex">
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Branches</SelectItem>
            <SelectItem value="main">Main Branch</SelectItem>
            <SelectItem value="branch1">Branch 1</SelectItem>
            <SelectItem value="branch2">Branch 2</SelectItem>
          </SelectContent>
        </Select>

        {/* Date Filter - Hidden on mobile */}
        <Select defaultValue="today">
          <SelectTrigger className="w-[140px] md:w-[180px] hidden md:flex">
            <Calendar className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Select Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Theme Toggle */}
        <ThemeToggle />
        
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </Button>

        {/* User Menu - Compact on mobile */}
        <Button variant="ghost" className="gap-2 px-2 md:px-4">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div className="text-left hidden md:block">
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-muted-foreground">admin@mobileganj.com</p>
          </div>
          <ChevronDown className="w-4 h-4 hidden md:block" />
        </Button>
      </div>
    </header>
  );
}
