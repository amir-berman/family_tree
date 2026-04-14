"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

export function Hero() {
  return (
    <section className="grid items-start gap-6 lg:grid-cols-[1.2fr_.8fr]">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="space-y-4"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-pearl-400/90">
            ארכיון חי · משפחה · זיכרון
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-pearl-50 md:text-5xl">
            לא רק עץ. <span className="text-pearl-200/90">יקום משפחתי</span>.
          </h1>
          <p className="max-w-xl text-pretty text-base leading-7 text-pearl-200/80">
            כאן שומרים רגעים, קשרים וסיפורים — כמו סרט שממשיך להיכתב.
            אינטראקטיבי. אישי. אלגנטי.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex flex-wrap items-center gap-3"
        >
          <Button href="/tree" variant="primary">
            כניסה לעץ המשפחה
          </Button>
          <Button href="/feed" variant="secondary">
            מעבר לפיד
          </Button>
          <Button href="/person/p_lev" variant="ghost">
            פרופיל לדוגמה
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <Card className="overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.10] via-transparent to-transparent" />
            <div className="h-44 bg-[radial-gradient(900px_280px_at_40%_0%,rgba(255,255,255,.12),rgba(0,0,0,0)),linear-gradient(135deg,rgba(124,58,237,.24),rgba(14,165,233,.10),rgba(16,185,129,.08))]" />
          </div>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-sm font-semibold tracking-tight">נקודת התחלה</div>
                <div className="text-xs text-pearl-400/90">
                  שכבות של קשרים, זיכרונות ומדיה
                </div>
              </div>
              <div className="h-9 w-9 rounded-full bg-white/[0.06] ring-1 ring-white/10" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="h-16 rounded-xl bg-white/[0.04] ring-1 ring-white/10" />
              <div className="h-16 rounded-xl bg-white/[0.04] ring-1 ring-white/10" />
              <div className="h-16 rounded-xl bg-white/[0.04] ring-1 ring-white/10" />
            </div>
            <div className="h-10 rounded-xl bg-white/[0.04] ring-1 ring-white/10" />
            <div className="h-10 rounded-xl bg-white/[0.04] ring-1 ring-white/10" />
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}

