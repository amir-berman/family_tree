import { AppFrame } from "@/components/app/AppFrame";
import { Hero } from "@/components/home/Hero";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { feedItems, persons } from "@/mock/family";

export default function Home() {
  const previewPeople = persons.slice(0, 3);
  const previewFeed = feedItems.slice(0, 2);

  return (
    <AppFrame className="space-y-10">
      <Hero />

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="space-y-1">
              <div className="text-sm font-semibold tracking-tight">אנשים</div>
              <div className="text-xs text-pearl-400/90">
                שכבת זהות בסיסית — מוכנה להתרחב לביוגרפיה, מדיה וציר זמן
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {previewPeople.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between rounded-xl bg-white/[0.04] px-4 py-3 ring-1 ring-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-white/[0.06] ring-1 ring-white/10 text-xs text-pearl-200/90">
                    {p.fullNameHe.slice(0, 1)}
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium text-pearl-50">{p.fullNameHe}</div>
                    <div className="text-xs text-pearl-400/90">{p.bioHe ?? "—"}</div>
                  </div>
                </div>
                <div className="text-xs text-pearl-500/80">{p.birthDate ?? ""}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="space-y-1">
              <div className="text-sm font-semibold tracking-tight">הזרם המשפחתי</div>
              <div className="text-xs text-pearl-400/90">
                פיד שהוא ארכיון — מסודר, רגשי ומסנן בעתיד לפי ענפים/שנים/סוג
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {previewFeed.map((item) => (
              <div
                key={item.id}
                className="rounded-xl bg-white/[0.04] px-4 py-3 ring-1 ring-white/10"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-pearl-50">{item.titleHe}</div>
                    {item.bodyHe ? (
                      <div className="text-xs leading-6 text-pearl-300/80">{item.bodyHe}</div>
                    ) : null}
                  </div>
                  <div className="shrink-0 rounded-full bg-white/[0.06] px-3 py-1 text-[11px] text-pearl-300/90 ring-1 ring-white/10">
                    {item.type === "memory" ? "זיכרון" : "ציון דרך"}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </AppFrame>
  );
}
