import Link from "next/link";
import { notFound } from "next/navigation";
import { AppFrame } from "@/components/app/AppFrame";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { getPersonById, type PersonId, relationships } from "@/mock/family";

type PageProps = {
  params: Promise<{ personId: string }>;
};

export default async function PersonPage({ params }: PageProps) {
  const { personId } = await params;
  const person = getPersonById(personId as PersonId);

  if (!person) notFound();

  const relationCount = relationships.filter(
    (r) => r.fromPersonId === person.id || r.toPersonId === person.id,
  ).length;

  return (
    <AppFrame className="space-y-6">
      <div className="space-y-2">
        <div className="text-xs uppercase tracking-[0.22em] text-pearl-400/90">
          פרופיל · Placeholder
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-pearl-50">
          {person.fullNameHe}
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-pearl-300/80">
          {person.bioHe ?? "—"}
        </p>
      </div>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
        <Card className="overflow-hidden">
          <div className="h-32 bg-[radial-gradient(700px_240px_at_30%_30%,rgba(255,255,255,.12),rgba(0,0,0,0)),linear-gradient(135deg,rgba(124,58,237,.22),rgba(14,165,233,.10),rgba(16,185,129,.08))]" />
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-sm font-semibold tracking-tight">זהות</div>
                <div className="text-xs text-pearl-400/90">מבנה מוכן לציר זמן ומדיה</div>
              </div>
              <div className="rounded-full bg-white/[0.06] px-3 py-1 text-[11px] text-pearl-300/90 ring-1 ring-white/10">
                {person.birthDate ?? "—"}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-xl bg-white/[0.04] px-4 py-3 ring-1 ring-white/10">
                <div className="text-xs text-pearl-400/90">שם (EN)</div>
                <div className="mt-1 text-sm text-pearl-50">{person.fullNameEn ?? "—"}</div>
              </div>
              <div className="rounded-xl bg-white/[0.04] px-4 py-3 ring-1 ring-white/10">
                <div className="text-xs text-pearl-400/90">קשרים</div>
                <div className="mt-1 text-sm text-pearl-50">{relationCount}</div>
              </div>
            </div>

            <div className="rounded-xl bg-white/[0.04] px-4 py-3 ring-1 ring-white/10">
              <div className="text-xs text-pearl-400/90">גלריה</div>
              <div className="mt-2 grid grid-cols-3 gap-2">
                <div className="h-16 rounded-xl bg-white/[0.04] ring-1 ring-white/10" />
                <div className="h-16 rounded-xl bg-white/[0.04] ring-1 ring-white/10" />
                <div className="h-16 rounded-xl bg-white/[0.04] ring-1 ring-white/10" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="text-sm font-semibold tracking-tight">ניווט מהיר</div>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link
              href="/tree"
              className="flex items-center justify-between rounded-xl bg-white/[0.04] px-4 py-3 text-sm text-pearl-50 ring-1 ring-white/10 hover:bg-white/[0.06]"
            >
              <span>חזרה לעץ</span>
              <span className="text-pearl-400/90">→</span>
            </Link>
            <Link
              href="/feed"
              className="flex items-center justify-between rounded-xl bg-white/[0.04] px-4 py-3 text-sm text-pearl-50 ring-1 ring-white/10 hover:bg-white/[0.06]"
            >
              <span>לפתוח את הפיד</span>
              <span className="text-pearl-400/90">→</span>
            </Link>
            <div className="rounded-xl bg-white/[0.03] px-4 py-3 text-xs leading-6 text-pearl-300/80 ring-1 ring-white/10">
              Phase 1: העמוד הזה הוא שלד לפרופיל. בהמשך נוסיף יחסים מפורטים, ציר זמן,
              מדיה אמיתית, והגדרות פרטיות/שיתוף.
            </div>
          </CardContent>
        </Card>
      </section>
    </AppFrame>
  );
}

