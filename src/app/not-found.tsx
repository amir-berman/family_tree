import Link from "next/link";
import { AppFrame } from "@/components/app/AppFrame";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

export default function NotFound() {
  return (
    <AppFrame className="space-y-6">
      <Card>
        <CardHeader>
          <div className="text-sm font-semibold tracking-tight">לא נמצא</div>
          <div className="text-xs text-pearl-400/90">העמוד לא קיים או הוסר.</div>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full bg-white/95 px-5 py-3 text-sm font-medium text-ink-50 shadow-glow"
          >
            חזרה לבית
          </Link>
          <Link
            href="/tree"
            className="rounded-full bg-white/[0.06] px-5 py-3 text-sm font-medium text-pearl-50 ring-1 ring-white/10 hover:bg-white/[0.09]"
          >
            עץ משפחה
          </Link>
        </CardContent>
      </Card>
    </AppFrame>
  );
}

