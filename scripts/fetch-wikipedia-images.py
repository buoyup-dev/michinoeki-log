#!/usr/bin/env python3
"""
道の駅Wikipedia画像取得スクリプト

Wikipedia（Wikimedia Commons）から各道の駅の代表画像URLを取得し、
Supabase stationsテーブル用のUPDATE文を生成する。

画像はWikimedia CommonsのCCライセンスに基づきホットリンクで利用。
MediaWiki API の prop=pageimages でサムネイルURLを取得する。

Usage:
    python scripts/fetch-wikipedia-images.py
    python scripts/fetch-wikipedia-images.py --thumb-size 800
    python scripts/fetch-wikipedia-images.py --dry-run
"""

import re
import sys
import time
import argparse
import datetime
import urllib.request
import urllib.parse
import json
from pathlib import Path

SEED_SQL_PATH = Path(__file__).resolve().parent.parent / "supabase" / "seed.sql"
OUTPUT_SQL_PATH = Path(__file__).resolve().parent.parent / "supabase" / "seed-images.sql"

WIKI_API_URL = "https://ja.wikipedia.org/w/api.php"
USER_AGENT = "MichinoekiLogBot/1.0 (https://github.com/buoyup/michinoeki-log)"

DEFAULT_THUMB_SIZE = 960
BATCH_SIZE = 50  # MediaWiki API の titles パラメータ上限
SLEEP_BETWEEN_BATCHES = 1.0  # 秒

# seed.sql の name と Wikipedia 記事タイトルが一致しないケースの手動マッピング
# キー: seed.sql の name, 値: Wikipedia の記事タイトル（「道の駅」付き）
MANUAL_MAPPING: dict[str, str] = {
    "北欧の風 道の駅とうべつ": "北欧の風 道の駅とうべつ",
    "そうべつ情報館ｉ（アイ）": "道の駅そうべつ情報館i",
    "YOU･遊･もり": "道の駅YOU・遊・もり",
    "ほっと?はぼろ": "道の駅ほっと♡はぼろ",
    "☆ロマン街道しょさんべつ": "道の駅☆ロマン街道しょさんべつ",
    "風Ｗとままえ": "道の駅風Wとままえ",
    "ステラ★ほんべつ": "道の駅ステラ★ほんべつ",
    "もち米の里☆なよろ": "道の駅もち米の里☆なよろ",
    "みなとま〜れ寿都": "道の駅みなとま〜れ寿都",
    "つど〜る・プラザ・さわら": "道の駅つど〜る・プラザ・さわら",
    "石狩「あいろーど厚田」": "道の駅石狩「あいろーど厚田」",
    "ひがしかわ「道草館」": "道の駅ひがしかわ「道草館」",
    "びえい「丘のくら」": "道の駅びえい「丘のくら」",
    "はなやか（葉菜野花）小清水": "道の駅はなやか小清水",
    "しかべ間歇泉公園": "道の駅しかべ間歇泉公園",
    "知床・らうす": "道の駅知床・らうす",
    "スワン44ねむろ": "道の駅スワン44ねむろ",
    # Wikipedia 検索で判明した正確なタイトル
    "スタープラザ 芦別": "道の駅スタープラザ芦別",
    "よってけ！島牧": "道の駅よってけ!島牧",
    "オスコイ！かもえない": "道の駅オスコイ!かもえない",
    "ノンキーランド ひがしもこと": "道の駅ノンキーランド ひがしもこと",
    "北前船 松前": "道の駅北前船 松前",
    "縄文ロマン 南かやべ": "道の駅縄文ロマン 南かやべ",
    "みそぎの郷 きこない": "道の駅みそぎの郷 きこない",
    "白金ビルケ": "道の駅びえい「白金ビルケ」",
}


def parse_station_names(sql_path: Path) -> list[str]:
    """seed.sql から道の駅名を抽出する"""
    content = sql_path.read_text(encoding="utf-8")
    # INSERT 文の name フィールドを抽出: '名前' のパターン
    # VALUES の直後の最初のクォート文字列が name
    pattern = r"VALUES\s*\(\s*'([^']*(?:''[^']*)*)'"
    matches = re.findall(pattern, content)
    # SQL エスケープを戻す
    names = [m.replace("''", "'") for m in matches]
    return names


def build_wiki_title(name: str) -> str:
    """道の駅名から Wikipedia 記事タイトルを推定する"""
    if name in MANUAL_MAPPING:
        return MANUAL_MAPPING[name]
    # デフォルト: 「道の駅」プレフィックスを付与
    return f"道の駅{name}"


def fetch_pageimages(titles: list[str], thumb_size: int) -> dict[str, str]:
    """
    MediaWiki API で複数記事の代表画像サムネイルURLを一括取得する。
    戻り値: {記事タイトル: サムネイルURL}
    """
    params = {
        "action": "query",
        "titles": "|".join(titles),
        "prop": "pageimages",
        "pithumbsize": str(thumb_size),
        "format": "json",
        "redirects": "1",
    }
    url = f"{WIKI_API_URL}?{urllib.parse.urlencode(params)}"

    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = json.loads(resp.read().decode("utf-8"))

    # リダイレクト解決: from → to マッピング
    redirects_map: dict[str, str] = {}
    for r in data.get("query", {}).get("redirects", []):
        redirects_map[r["to"]] = r["from"]
    # normalized: from → to マッピング
    normalized_map: dict[str, str] = {}
    for n in data.get("query", {}).get("normalized", []):
        normalized_map[n["to"]] = n["from"]

    result: dict[str, str] = {}
    pages = data.get("query", {}).get("pages", {})
    for page in pages.values():
        if "thumbnail" not in page:
            continue
        thumb_url = page["thumbnail"]["source"]
        page_title = page["title"]

        # ページタイトルを元のリクエストタイトルに逆変換
        original_title = page_title
        if page_title in redirects_map:
            original_title = redirects_map[page_title]
        if original_title in normalized_map:
            original_title = normalized_map[original_title]

        result[original_title] = thumb_url

    return result


def escape_sql(s: str) -> str:
    return "'" + s.replace("'", "''") + "'"


def main():
    parser = argparse.ArgumentParser(description="道の駅Wikipedia画像取得スクリプト")
    parser.add_argument(
        "--thumb-size", type=int, default=DEFAULT_THUMB_SIZE,
        help=f"サムネイル幅（デフォルト: {DEFAULT_THUMB_SIZE}px）"
    )
    parser.add_argument(
        "--dry-run", action="store_true",
        help="API呼び出しのみ実行し、SQLファイルは生成しない"
    )
    args = parser.parse_args()

    # 1. seed.sql から道の駅名を抽出
    print(f"Reading: {SEED_SQL_PATH}")
    names = parse_station_names(SEED_SQL_PATH)
    print(f"Found {len(names)} stations in seed.sql")

    # 2. Wikipedia タイトルを生成
    title_to_name: dict[str, str] = {}  # wiki_title → seed name
    for name in names:
        wiki_title = build_wiki_title(name)
        title_to_name[wiki_title] = name

    # 3. バッチで API 呼び出し
    all_titles = list(title_to_name.keys())
    wiki_results: dict[str, str] = {}  # wiki_title → thumb_url

    for i in range(0, len(all_titles), BATCH_SIZE):
        batch = all_titles[i:i + BATCH_SIZE]
        batch_num = i // BATCH_SIZE + 1
        total_batches = (len(all_titles) + BATCH_SIZE - 1) // BATCH_SIZE
        print(f"Fetching batch {batch_num}/{total_batches} ({len(batch)} titles)...")

        result = fetch_pageimages(batch, args.thumb_size)
        wiki_results.update(result)

        if i + BATCH_SIZE < len(all_titles):
            time.sleep(SLEEP_BETWEEN_BATCHES)

    # 4. 結果をマッピング: seed name → thumb_url
    name_to_url: dict[str, str] = {}
    matched_names: list[str] = []
    unmatched_names: list[str] = []

    for wiki_title, seed_name in title_to_name.items():
        if wiki_title in wiki_results:
            name_to_url[seed_name] = wiki_results[wiki_title]
            matched_names.append(seed_name)
        else:
            unmatched_names.append(seed_name)

    # 5. レポート出力
    print(f"\n{'='*60}")
    print(f"Results: {len(matched_names)}/{len(names)} matched ({100*len(matched_names)/len(names):.1f}%)")
    print(f"{'='*60}")

    if unmatched_names:
        print(f"\nUnmatched stations ({len(unmatched_names)}):")
        for name in sorted(unmatched_names):
            wiki_title = build_wiki_title(name)
            print(f"  - {name} (tried: {wiki_title})")

    if args.dry_run:
        print("\n[dry-run] SQL file not generated.")
        return

    # 6. SQL ファイル生成
    now = datetime.datetime.now().isoformat()
    lines = [
        f"-- Wikipedia（Wikimedia Commons）から取得した道の駅画像URL",
        f"-- 生成日時: {now}",
        f"-- マッチ件数: {len(matched_names)}/{len(names)}",
        f"-- サムネイルサイズ: {args.thumb_size}px",
        "",
    ]

    # seed.sql の順序を維持
    for name in names:
        if name in name_to_url:
            url = name_to_url[name]
            lines.append(
                f"UPDATE stations SET image_url = {escape_sql(url)} WHERE name = {escape_sql(name)};"
            )

    lines.append("")  # 末尾改行

    OUTPUT_SQL_PATH.write_text("\n".join(lines), encoding="utf-8")
    print(f"\nOutput: {OUTPUT_SQL_PATH}")
    print(f"Done! {len(matched_names)} UPDATE statements generated.")

    if unmatched_names:
        print(f"\nHint: Add manual mappings for unmatched stations in MANUAL_MAPPING dict.",
              file=sys.stderr)
        sys.exit(0)


if __name__ == "__main__":
    main()
