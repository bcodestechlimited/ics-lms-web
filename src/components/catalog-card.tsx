import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Briefcase,
  Code2,
  Globe,
  Layers,
  Megaphone,
  Palette,
  Smartphone,
} from "lucide-react";
import { Link } from "react-router";

interface CategoryMeta {
  icon: React.ElementType;
  badge: string;
  accentBg: string;
  iconColor: string;
  borderHover: string;
}

const CATEGORY_META: Record<string, CategoryMeta> = {
  "data science": {
    icon: BarChart3,
    badge: "Analytics & ML",
    accentBg: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
    iconColor: "text-blue-600",
    borderHover: "group-hover:border-blue-500/40 group-hover:shadow-blue-500/10",
  },
  design: {
    icon: Palette,
    badge: "UI/UX & Graphics",
    accentBg: "bg-pink-500/10 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400",
    iconColor: "text-pink-600",
    borderHover: "group-hover:border-pink-500/40 group-hover:shadow-pink-500/10",
  },
  marketing: {
    icon: Megaphone,
    badge: "Growth & SEO",
    accentBg: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
    iconColor: "text-amber-600",
    borderHover: "group-hover:border-amber-500/40 group-hover:shadow-amber-500/10",
  },
  technology: {
    icon: Code2,
    badge: "Engineering & IT",
    accentBg: "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400",
    iconColor: "text-cyan-600",
    borderHover: "group-hover:border-cyan-500/40 group-hover:shadow-cyan-500/10",
  },
  business: {
    icon: Briefcase,
    badge: "Management & Strategy",
    accentBg: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
    iconColor: "text-emerald-600",
    borderHover: "group-hover:border-emerald-500/40 group-hover:shadow-emerald-500/10",
  },
  "web development": {
    icon: Globe,
    badge: "Fullstack & Frontend",
    accentBg: "bg-sky-500/10 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400",
    iconColor: "text-sky-600",
    borderHover: "group-hover:border-sky-500/40 group-hover:shadow-sky-500/10",
  },
  "mobile development": {
    icon: Smartphone,
    badge: "iOS & Android",
    accentBg: "bg-violet-500/10 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400",
    iconColor: "text-violet-600",
    borderHover: "group-hover:border-violet-500/40 group-hover:shadow-violet-500/10",
  },
  "product management": {
    icon: Layers,
    badge: "Roadmap & Agile",
    accentBg: "bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400",
    iconColor: "text-rose-600",
    borderHover: "group-hover:border-rose-500/40 group-hover:shadow-rose-500/10",
  },
};

export function CatalogCard({
  title,
  category,
}: {
  title: string;
  category: string;
}) {
  const normalizedCat = category.toLowerCase().trim();
  const meta = CATEGORY_META[normalizedCat] || {
    icon: BookOpen,
    badge: "Specialized Skill",
    accentBg: "bg-primary/10 text-primary",
    iconColor: "text-primary",
    borderHover: "group-hover:border-primary/40 group-hover:shadow-primary/10",
  };

  const IconComponent = meta.icon;

  return (
    <Link
      to={`/courses/category?category=${encodeURIComponent(category)}`}
      className={`group relative w-full rounded-2xl p-5 sm:p-6 bg-card border border-border/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden cursor-pointer ${meta.borderHover}`}
    >
      {/* Decorative Gradient Background Overlay on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent transition-opacity duration-300 pointer-events-none" />

      {/* Shimmer Light Beam Effect */}
      <span className="absolute -right-12 -top-12 w-24 h-36 bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-45 transform translate-x-0 group-hover:translate-x-64 transition-transform duration-1000 ease-in-out pointer-events-none" />

      <div className="relative z-10 space-y-4">
        {/* Top Header: Category Icon & Arrow */}
        <div className="flex items-center justify-between">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold shadow-sm transition-transform duration-300 group-hover:scale-110 ${meta.accentBg}`}
          >
            <IconComponent className="w-6 h-6" />
          </div>

          <div className="w-8 h-8 rounded-full bg-muted/60 group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Content: Title & Badge */}
        <div className="space-y-1.5 text-left">
          <h3 className="font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors tracking-tight line-clamp-1">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>{meta.badge}</span>
          </p>
        </div>
      </div>

      {/* Bottom Footer Action Link */}
      <div className="relative z-10 pt-4 mt-2 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-primary group-hover:underline">
        <span>Browse Courses</span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
      </div>
    </Link>
  );
}
