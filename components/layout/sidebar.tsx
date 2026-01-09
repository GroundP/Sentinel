"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  UserCog,
  CreditCard,
  Monitor,
  DoorOpen,
  Building2,
  ShieldCheck,
  Activity,
  Settings,
  Info,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

interface NavItem {
  title: string;
  href?: string;
  icon: React.ReactNode;
  badge?: number;
  children?: { title: string; href: string; badge?: number }[];
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "User Management",
    icon: <Users className="h-5 w-5" />,
    children: [
      { title: "Users", href: "/users", badge: 32 },
      { title: "User Groups", href: "/user-groups", badge: 6 },
      { title: "Card Templates", href: "/card-templates", badge: 8 },
    ],
  },
  {
    title: "Device Management",
    icon: <Monitor className="h-5 w-5" />,
    children: [
      { title: "Devices", href: "/devices" },
      { title: "Device Groups", href: "/device-groups" },
    ],
  },
  {
    title: "Door Management",
    icon: <DoorOpen className="h-5 w-5" />,
    children: [
      { title: "Doors", href: "/doors" },
      { title: "Door Groups", href: "/door-groups" },
    ],
  },
  {
    title: "Elevator Management",
    icon: <Building2 className="h-5 w-5" />,
    children: [
      { title: "Elevators", href: "/elevators" },
      { title: "Elevator Groups", href: "/elevator-groups" },
    ],
  },
  {
    title: "Access Management",
    icon: <ShieldCheck className="h-5 w-5" />,
    children: [
      { title: "Access Levels", href: "/access-levels" },
      { title: "Access Groups", href: "/access-groups" },
    ],
  },
  {
    title: "Monitoring",
    icon: <Activity className="h-5 w-5" />,
    children: [
      { title: "Real-time", href: "/monitoring/realtime" },
      { title: "Events", href: "/monitoring/events" },
    ],
  },
  {
    title: "Advanced",
    icon: <Settings className="h-5 w-5" />,
    children: [
      { title: "Schedules", href: "/advanced/schedules" },
      { title: "Holidays", href: "/advanced/holidays" },
    ],
  },
  {
    title: "Settings",
    icon: <Settings className="h-5 w-5" />,
    children: [
      { title: "General", href: "/settings/general" },
      { title: "Security", href: "/settings/security" },
    ],
  },
  {
    title: "Information",
    icon: <Info className="h-5 w-5" />,
    children: [
      { title: "About", href: "/info/about" },
      { title: "License", href: "/info/license" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>(["User Management"]);

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => pathname === href;
  const isParentActive = (item: NavItem) => {
    if (item.children) {
      return item.children.some((child) => pathname === child.href);
    }
    return false;
  };

  return (
    <aside className="flex h-screen w-60 flex-col bg-[#1E3A5F] text-white">
      {/* Logo */}
      <div className="flex h-16 items-center px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">
            <span className="text-white">Sentinel</span>
            <span className="ml-1 text-cyan-400">Air</span>
          </span>
        </Link>
      </div>

      {/* Demo Badge */}
      <div className="mx-4 mb-4 rounded-lg bg-[#2A4A73] px-4 py-3">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-4 w-4 text-cyan-400" />
          <span className="text-sm font-medium">Sentinel Air Demo</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.title}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleExpand(item.title)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isParentActive(item)
                        ? "bg-[#3B82F6] text-white"
                        : "text-gray-300 hover:bg-[#2A4A73] hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                    {expandedItems.includes(item.title) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  {expandedItems.includes(item.title) && (
                    <ul className="mt-1 space-y-1 pl-11">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={cn(
                              "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                              isActive(child.href)
                                ? "bg-[#3B82F6] text-white"
                                : "text-gray-400 hover:bg-[#2A4A73] hover:text-white"
                            )}
                          >
                            <span>{child.title}</span>
                            {child.badge && (
                              <span className="rounded-full bg-[#2A4A73] px-2 py-0.5 text-xs">
                                ({child.badge})
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href!}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive(item.href!)
                      ? "bg-[#3B82F6] text-white"
                      : "text-gray-300 hover:bg-[#2A4A73] hover:text-white"
                  )}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-[#2A4A73] p-4">
        <p className="text-center text-xs text-gray-400">
          © 2025 Sentinel Inc.
          <br />
          All Rights Reserved.
        </p>
      </div>
    </aside>
  );
}
