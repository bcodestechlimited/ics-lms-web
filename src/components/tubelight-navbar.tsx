"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(() => {
    const currentPath = location.pathname;
    const activeItem = items.find((item) => item.url === currentPath);
    return activeItem
      ? activeItem.name.toLowerCase()
      : items[0].name.toLowerCase();
  });

  const [isMobile, setIsMobile] = useState(false);
  console.log("isMobile", isMobile);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update active tab when location changes
  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = items.find((item) => item.url === currentPath);
    if (activeItem) {
      setActiveTab(activeItem.name.toLowerCase());
    }
  }, [items]);

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-[99999] mb-6 sm:pt-6 h-fit",
        className
      )}
    >
      <div className="flex items-center gap-3 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg bg-white/5">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive =
            activeTab.toLocaleLowerCase() === item.name.toLocaleLowerCase();

          return (
            <Link
              key={item.name}
              to={item.url}
              onClick={() => setActiveTab(item.name.toLocaleLowerCase())}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-foreground/80 hover:text-primary",
                isActive && "bg-muted text-primary"
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10 "
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
