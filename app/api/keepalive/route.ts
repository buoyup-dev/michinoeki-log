import { NextResponse } from "next/server";
import { createStaticClient } from "@/lib/supabase/static";

// Supabase 無料プランは一定期間アクセスがないとプロジェクトが一時停止するため、
// Vercel Cron Jobs（vercel.json の crons）から毎日このエンドポイントを叩き、
// DB へ到達させ続けて停止を防ぐ。
// アクセス制御は middleware で行う:
//   - Vercel Cron からの呼び出しは `Authorization: Bearer <CRON_SECRET>` で通す
//   - それ以外は Basic 認証配下（外部からの無差別アクセスを防ぐ）
// ※ GitHub Actions のスケジュール実行はリポジトリに 60 日間活動がないと
//    自動停止されるため、リポジトリの活動に依存しない Vercel Cron を使う。
export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };

export async function GET() {
  try {
    const supabase = createStaticClient();
    // 行データは取得せず HEAD + count のみ。RLS で匿名 SELECT が許可されている stations を利用
    const { error } = await supabase
      .from("stations")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("keepalive error:", error.message, error.code);
      return NextResponse.json(
        { status: "error", message: "database unreachable" },
        { status: 503, headers: NO_STORE }
      );
    }

    return NextResponse.json({ status: "ok" }, { headers: NO_STORE });
  } catch (e) {
    console.error("keepalive exception:", e);
    return NextResponse.json(
      { status: "error", message: "internal error" },
      { status: 503, headers: NO_STORE }
    );
  }
}
