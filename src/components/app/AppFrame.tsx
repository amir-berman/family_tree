import { TopNav } from "@/components/app/TopNav";
import { cn } from "@/lib/cn";

export function AppFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="min-h-dvh bg-ink-50 text-pearl-50 bg-noise">
      <div className="absolute inset-0 -z-10 bg-cinematic-radial" />
      <TopNav />
      <main className={cn("mx-auto w-full max-w-6xl px-5 py-10", className)}>
        {children}
      </main>
      <footer className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6 text-xs text-pearl-400/90">
          <span>נבנה כדי לשמור את הסיפור — לא רק לתעד אותו.</span>
          <span className="text-pearl-500/80">Phase 1 · Shell</span>
        </div>
      </footer>
    </div>
  );
}

