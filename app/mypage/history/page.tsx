import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase/auth";
import { getVisitHistory, getVisitCount } from "@/lib/db/queries/visits";
import { VisitHistoryItem } from "@/components/features/visit/VisitHistoryItem";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "訪問履歴",
};

const PER_PAGE = 20;

export default async function HistoryPage(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const user = await getUser();
  if (!user) {
    redirect("/auth/login?next=/mypage/history");
  }

  const { page: pageParam } = await props.searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const offset = (page - 1) * PER_PAGE;

  const [history, totalCount] = await Promise.all([
    getVisitHistory(PER_PAGE, offset),
    getVisitCount(),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / PER_PAGE));

  return (
    <>
      <Link
        href="/mypage"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        マイページに戻る
      </Link>

      <h1 className="mb-8 text-2xl font-bold text-foreground">訪問履歴</h1>

      {history.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-6 text-center">
          <p className="text-muted-foreground">まだ訪問記録がありません</p>
          <Link
            href="/stations"
            className="mt-2 inline-block text-sm text-primary hover:underline"
          >
            道の駅を探す
          </Link>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-muted-foreground">
            全{totalCount}件中 {offset + 1}〜{Math.min(offset + PER_PAGE, totalCount)}件
          </p>

          <ul className="space-y-3">
            {history.map((visit) => (
              <VisitHistoryItem key={visit.id} visit={visit} />
            ))}
          </ul>

          {/* ページネーション */}
          {totalPages > 1 && (
            <nav className="mt-8 flex items-center justify-center gap-2" aria-label="ページネーション">
              {page > 1 ? (
                <Link
                  href={`/mypage/history?page=${page - 1}`}
                  className="flex items-center gap-1 rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
                >
                  <ChevronLeft className="h-4 w-4" />
                  前へ
                </Link>
              ) : (
                <span className="flex items-center gap-1 rounded-md border border-border px-3 py-2 text-sm font-medium text-muted-foreground/50">
                  <ChevronLeft className="h-4 w-4" />
                  前へ
                </span>
              )}

              <span className="px-3 py-2 text-sm text-muted-foreground">
                {page} / {totalPages}
              </span>

              {page < totalPages ? (
                <Link
                  href={`/mypage/history?page=${page + 1}`}
                  className="flex items-center gap-1 rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
                >
                  次へ
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ) : (
                <span className="flex items-center gap-1 rounded-md border border-border px-3 py-2 text-sm font-medium text-muted-foreground/50">
                  次へ
                  <ChevronRight className="h-4 w-4" />
                </span>
              )}
            </nav>
          )}
        </>
      )}
    </>
  );
}
