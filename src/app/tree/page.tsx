import { AppFrame } from "@/components/app/AppFrame";
import { TreeScene } from "@/components/tree/TreeScene";
import { Suspense } from "react";

export default function TreePage() {
  return (
    <AppFrame className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-pearl-50">עץ משפחה</h1>
        <p className="max-w-2xl text-sm leading-7 text-pearl-300/80">
          מפה חיה של המשפחה. זוזו, התקרבו, בחרו אדם, והתמקדו — כמו כניסה לעולם של קשרים
          וזיכרונות.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="rounded-2xl bg-white/[0.04] p-6 text-sm text-pearl-300/80 ring-1 ring-white/10">
            טוען את המרחב…
          </div>
        }
      >
        <TreeScene />
      </Suspense>
    </AppFrame>
  );
}

