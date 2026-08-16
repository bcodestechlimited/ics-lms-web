/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {useEffect, useState} from "react";
import {motion} from "framer-motion";

import {LucideIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {Link} from "react-router";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export function NavBar({items, className}: NavBarProps) {
  const [activeTab, setActiveTab] = useState(() => {
    const currentPath = location.pathname;
    const activeItem = items.find((item) => item.url === currentPath);
    return activeItem
      ? activeItem.name.toLowerCase()
      : items[0].name.toLowerCase();
  });

  const [_isMobile, setIsMobile] = useState(false);

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
        "fixed bottom-4 sm:bottom-auto sm:top-3 left-1/2 -translate-x-1/2 z-50 h-fit max-w-[95vw]",
        className
      )}
    >
      <div className="flex items-center gap-1 sm:gap-2 border border-border/80 backdrop-blur-md py-1 px-1.5 rounded-full shadow-lg bg-background/90 text-foreground">
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
                "relative cursor-pointer text-xs sm:text-sm font-semibold px-3 sm:px-5 py-1.5 sm:py-2 rounded-full transition-colors flex items-center justify-center min-w-[40px] sm:min-w-0",
                "text-foreground/70 hover:text-primary",
                isActive && "bg-muted text-primary font-bold"
              )}
            >
              <span className="hidden sm:inline">{item.name}</span>
              <span className="sm:hidden flex items-center justify-center">
                <Icon size={18} strokeWidth={2.2} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/10 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-1 sm:-top-2 left-1/2 -translate-x-1/2 w-6 sm:w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-8 sm:w-12 h-4 sm:h-6 bg-primary/20 rounded-full blur-md -top-2 -left-1" />
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
