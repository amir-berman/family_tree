import { AppFrame } from "@/components/app/AppFrame";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { feedItems, getPersonById } from "@/mock/family";

export default function FeedPage() {
  return (
    <AppFrame className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-pearl-50">פיד משפחתי</h1>
        <p className="max-w-2xl text-sm leading-7 text-pearl-300/80">
          זרם תוכן שמרגיש כמו ארכיון חי — זיכרונות, ציוני דרך, תמונות ווידאו (Phase 1:
          עיצוב + מבנה + נתוני דמה).
        </p>
      </div>

      <section className="grid gap-4 lg:grid-cols-[.8fr_1.2fr]">
        <Card>
          <CardHeader>
            <div className="text-sm font-semibold tracking-tight">מסננים (Placeholder)</div>
            <div className="text-xs text-pearl-400/90">
              בעתיד: אדם · ענף · שנה · סוג תוכן
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="h-10 rounded-xl bg-white/[0.04] ring-1 ring-white/10" />
            <div className="h-10 rounded-xl bg-white/[0.04] ring-1 ring-white/10" />
            <div className="h-10 rounded-xl bg-white/[0.04] ring-1 ring-white/10" />
          </CardContent>
        </Card>

        <div className="space-y-3">
          {feedItems.map((item) => {
            const people = item.personIds
              .map((id) => getPersonById(id)?.fullNameHe)
              .filter(Boolean)
              .join(" · ");

            return (
              <Card key={item.id} className="overflow-hidden">
                <div className="h-24 bg-[radial-gradient(700px_220px_at_60%_30%,rgba(255,255,255,.10),rgba(0,0,0,0)),linear-gradient(135deg,rgba(124,58,237,.20),rgba(14,165,233,.08),rgba(16,185,129,.06))]" />
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-sm font-semibold tracking-tight text-pearl-50">
                        {item.titleHe}
                      </div>
                      <div className="text-xs text-pearl-400/90">{people || "—"}</div>
                    </div>
                    <div className="shrink-0 rounded-full bg-white/[0.06] px-3 py-1 text-[11px] text-pearl-300/90 ring-1 ring-white/10">
                      {item.type === "memory" ? "זיכרון" : "ציון דרך"}
                    </div>
                  </div>
                </CardHeader>
                {item.bodyHe ? (
                  <CardContent>
                    <p className="text-sm leading-7 text-pearl-200/85">{item.bodyHe}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <div className="rounded-full bg-white/[0.05] px-3 py-1 text-[11px] text-pearl-300/90 ring-1 ring-white/10">
                        תגית (Placeholder)
                      </div>
                      <div className="rounded-full bg-white/[0.05] px-3 py-1 text-[11px] text-pearl-300/90 ring-1 ring-white/10">
                        {item.year ? `שנה: ${item.year}` : "שנה: —"}
                      </div>
                    </div>
                  </CardContent>
                ) : null}
              </Card>
            );
          })}
        </div>
      </section>
    </AppFrame>
  );
}

