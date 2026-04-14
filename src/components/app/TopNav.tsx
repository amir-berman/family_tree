"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const navItems = [
  { href: "/tree", label: "עץ משפחה" },
  { href: "/feed", label: "פיד משפחתי" },
] as const;

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ink-50/60 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="group inline-flex items-baseline gap-2">
          <span className="text-sm font-semibold tracking-tight text-pearl-50">
            family_tree
          </span>
          <span className="text-xs text-pearl-400/90">— ארכיון חי</span>
        </Link>

        <nav className="flex items-center gap-2">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition",
                  "ring-1 ring-transparent hover:ring-white/10 hover:bg-white/[0.06]",
                  active ? "bg-white/[0.08] ring-white/12 text-pearl-50" : "text-pearl-200/90",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

