import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { Person } from "@/mock/family";
import { RoseIcon } from "@/components/tree/icons";

function accentClasses(accent: Person["accent"]) {
  switch (accent) {
    case "sky":
      return "from-sky-300/30 to-sky-500/10 ring-sky-300/20";
    case "emerald":
      return "from-emerald-300/26 to-emerald-500/10 ring-emerald-300/20";
    case "amber":
      return "from-amber-300/26 to-amber-500/10 ring-amber-300/20";
    case "rose":
      return "from-rose-300/26 to-rose-500/10 ring-rose-300/20";
    case "violet":
    default:
      return "from-violet-300/26 to-violet-500/10 ring-violet-300/20";
  }
}

export function PersonNode({
  person,
  selected,
  onSelect,
}: {
  person: Person;
  selected: boolean;
  onSelect: () => void;
}) {
  const initial = person.fullNameHe.slice(0, 1);
  const accent = accentClasses(person.accent);
  const birthYear = person.birthDate?.slice(0, 4);
  const deathYear = person.deathDate?.slice(0, 4);
  const years =
    birthYear && (person.isDeceased || deathYear)
      ? `${birthYear}–${deathYear ?? "—"}`
      : birthYear
        ? birthYear
        : "—";

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      className={cn(
        "group relative w-[232px] select-none text-right outline-none",
        "rounded-2xl bg-white/[0.04] ring-1 ring-white/10 shadow-soft backdrop-blur-xl",
        "transition hover:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-violet-300/30",
        selected ? "ring-white/25 bg-white/[0.055]" : "",
      )}
      animate={{
        boxShadow: selected
          ? "0 0 0 1px rgba(255,255,255,.18), 0 20px 90px rgba(0,0,0,.65)"
          : "0 0 0 1px rgba(255,255,255,.08), 0 20px 80px rgba(0,0,0,.6)",
      }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl opacity-0 transition group-hover:opacity-100"
        animate={{ opacity: selected ? 1 : 0 }}
      />

      <div className="relative flex items-center gap-3 p-3">
        <div
          className={cn(
            "relative grid h-12 w-12 place-items-center overflow-hidden rounded-full",
            "bg-gradient-to-br",
            accent,
            "ring-1 shadow-glow",
          )}
        >
          <div className="absolute inset-0 bg-[radial-gradient(18px_18px_at_30%_25%,rgba(255,255,255,.25),rgba(255,255,255,0))]" />
          <div className="relative text-sm font-semibold tracking-tight text-pearl-50">
            {initial}
          </div>
          {person.isDeceased ? (
            <div className="absolute -left-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-ink-50/80 ring-1 ring-white/12">
              <RoseIcon className="h-3.5 w-3.5 text-rose-200/90" />
            </div>
          ) : null}
        </div>

        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold tracking-tight text-pearl-50">
            {person.fullNameHe}
          </div>
          <div className="mt-1 flex items-center justify-between gap-3">
            <span className="truncate text-[11px] text-pearl-300/80">{person.bioHe ?? "—"}</span>
            <span className="shrink-0 text-[11px] text-pearl-500/85">{years}</span>
          </div>
        </div>
      </div>

      {selected ? (
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-l from-white/0 via-violet-200/35 to-white/0" />
      ) : null}
    </motion.button>
  );
}

