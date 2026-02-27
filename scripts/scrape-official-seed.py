#!/usr/bin/env python3
"""
道の駅シードデータ生成スクリプト（公式サイトスクレイピング版）

hokkaido-michinoeki.jp から北海道の道の駅データをスクレイピングし、
Supabase stationsテーブル用のINSERT文を生成する。

出典: 北海道の道の駅（公式サイト）
https://hokkaido-michinoeki.jp/

Usage:
    python scripts/scrape-official-seed.py
    python scripts/scrape-official-seed.py --output supabase/seed.sql
    python scripts/scrape-official-seed.py --cache-dir .cache/michinoeki
    python scripts/scrape-official-seed.py --delay 1.5
    python scripts/scrape-official-seed.py --no-cache
"""

import argparse
import hashlib
import json
import re
import sys
import time
import datetime
from pathlib import Path
from typing import Optional

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("Error: beautifulsoup4 と requests が必要です。")
    print("  pip install beautifulsoup4 requests")
    sys.exit(1)

BASE_URL = "https://hokkaido-michinoeki.jp"
LIST_URL = f"{BASE_URL}/ichiran/"
OUTPUT_SQL_PATH = Path(__file__).resolve().parent.parent / "supabase" / "seed.sql"
DEFAULT_CACHE_DIR = Path(__file__).resolve().parent.parent / ".cache" / "michinoeki"
DEFAULT_DELAY = 1.5

# 公式サイトの施設ラベル → DBキー (snake_case) マッピング
# sec_facility セクション内の <li> テキストでマッチ
FACILITY_LABEL_MAP: dict[str, str] = {
    "トイレ": "toilet",
    "温水洗浄便座": "washlet",
    "身障者用トイレ": "handicap_toilet",
    "オストメイト": "ostomy",
    "駐車場": "parking",
    "屋根付き駐車場": "covered_parking",
    "EV充電器": "ev_charger",
    "Wi-Fi": "wifi",
    "ATM": "atm",
    "インフォメーション": "information",
    "ショップ": "shop",
    "レストラン": "restaurant",
    "喫茶・軽食": "cafe",
    "産地直売": "farm_market",
    "授乳室": "nursing_room",
    "おむつ交換台": "diaper_changing",
    "キッズスペース": "kids_space",
    "温泉": "onsen",
    "宿泊施設": "lodging",
    "キャンプ場": "campground",
    "展望台": "observatory",
    "ドッグラン": "dog_run",
    "公園": "park",
    "博物館・美術館": "museum",
    "体験施設": "experience",
    "無料休憩所": "rest_area",
    "クレジットカード": "credit_card",
    "キャッシュレス決済": "cashless",
    "AED": "aed",
}

ALL_FACILITY_KEYS = sorted(FACILITY_LABEL_MAP.values())

# 6区分エリアグループ
VALID_AREA_GROUPS = {"道央", "道南", "道北", "十勝", "オホーツク", "釧路・根室"}


def fetch_html(url: str, cache_dir: Optional[Path], use_cache: bool = True) -> tuple[str, bool]:
    """URLからHTMLを取得。キャッシュ対応。戻り値: (html, cache_hit)"""
    if use_cache and cache_dir:
        cache_dir.mkdir(parents=True, exist_ok=True)
        cache_key = hashlib.md5(url.encode()).hexdigest()
        cache_file = cache_dir / f"{cache_key}.html"
        if cache_file.exists():
            return cache_file.read_text(encoding="utf-8"), True

    resp = requests.get(url, timeout=30, headers={
        "User-Agent": "MichinoekiLogBot/1.0 (educational project)"
    })
    resp.raise_for_status()
    resp.encoding = resp.apparent_encoding or "utf-8"
    html = resp.text

    if use_cache and cache_dir:
        cache_file.write_text(html, encoding="utf-8")

    return html, False


def parse_list_page(html: str) -> list[dict]:
    """一覧ページから道の駅のリストをパースする。

    テーブル構造:
      <table>
        <tr><th>番号</th><th>道の駅名</th><th>市町村名</th><th>電話番号</th><th>住所</th>...</tr>
        <tr><td>1</td><td><a href="...">三笠</a></td><td>三笠市</td><td>01267-2-5775</td><td>...</td>...</tr>
    """
    soup = BeautifulSoup(html, "html.parser")
    stations = []

    # テーブルは class なしで1つだけ存在する
    table = soup.find("table")
    if not table:
        raise RuntimeError("一覧テーブルが見つかりません")

    rows = table.find_all("tr")
    for row in rows:
        cells = row.find_all("td")
        if len(cells) < 5:
            continue

        # 「登録取消」を含むかチェック
        row_text = row.get_text()
        if "登録取消" in row_text:
            name_text = cells[1].get_text(strip=True) if len(cells) > 1 else "?"
            print(f"  [SKIP] 登録取消: {name_text}")
            continue

        # cells[1] = 道の駅名（リンク付き）
        link = cells[1].find("a")
        if not link:
            continue

        href = link.get("href", "")
        name = link.get_text(strip=True)
        if not href or not name:
            continue

        # cells[3] = 電話番号
        phone = cells[3].get_text(strip=True) if len(cells) > 3 else None

        # cells[4] = 住所（郵便番号付き）
        address_raw = cells[4].get_text(strip=True) if len(cells) > 4 else None
        # 郵便番号を除去 (例: "068-2165三笠市岡山1056番地1" → "三笠市岡山1056番地1")
        address = None
        if address_raw:
            address = re.sub(r"^\d{3}-?\d{4}\s*", "", address_raw)

        # フルURLに変換
        if href.startswith("/"):
            href = BASE_URL + href
        elif not href.startswith("http"):
            href = BASE_URL + "/" + href

        stations.append({
            "name": name,
            "detail_url": href,
            "phone": phone if phone else None,
            "address": address if address else None,
        })

    return stations


def parse_detail_page(html: str, detail_url: str) -> dict:
    """個別ページから詳細データを抽出する。

    ページ構造:
      - パンくず: .path-fixed > a (HOME > 道の駅を見る > 道央 > 三笠)
      - 座標: <script> 内の centerPos = [lat, lng]
      - 基本情報: table.profile > tr > th + td
      - 施設: .sec_facility > li (テキストでマッチ)
    """
    soup = BeautifulSoup(html, "html.parser")
    data = {}

    # === エリアグループ（パンくずリストから） ===
    # .path-fixed or .path クラスの要素
    breadcrumb = soup.find(class_="path-fixed") or soup.find(class_="path")
    if breadcrumb:
        for link in breadcrumb.find_all("a"):
            text = link.get_text(strip=True)
            if text in VALID_AREA_GROUPS:
                data["area_group"] = text
                break

    # h1内のspanからもエリアグループを取得可能
    # <h1>三笠<span>道央</span></h1>
    if "area_group" not in data:
        for h1 in soup.find_all("h1"):
            span = h1.find("span")
            if span:
                text = span.get_text(strip=True)
                if text in VALID_AREA_GROUPS:
                    data["area_group"] = text
                    break

    # === 座標 (JavaScript内の centerPos 変数) ===
    for script in soup.find_all("script"):
        if script.string and "centerPos" in script.string:
            m = re.search(r'centerPos\s*=\s*\[?\s*([\d.]+)\s*,\s*([\d.]+)', script.string)
            if m:
                data["latitude"] = float(m.group(1))
                data["longitude"] = float(m.group(2))
                break

    # === 基本情報 (table.profile) ===
    profile_table = soup.find("table", class_="profile")
    if profile_table:
        for row in profile_table.find_all("tr"):
            th = row.find("th")
            td = row.find("td")
            if not th or not td:
                continue
            label = th.get_text(strip=True)
            value = td.get_text(strip=True)
            if not value:
                continue

            if label == "住所":
                # 住所テキストから余計な情報を除去（リンクテキスト等）
                # td内にaタグがある場合、そのテキストを除去
                addr_parts = []
                for child in td.children:
                    if hasattr(child, "name") and child.name in ("a", "br"):
                        continue
                    text = child.get_text(strip=True) if hasattr(child, "get_text") else str(child).strip()
                    if text:
                        addr_parts.append(text)
                addr_text = "".join(addr_parts).strip()
                if addr_text:
                    # 括弧内の道路情報を除去 (例: "（国道12号沿い）")
                    addr_clean = re.sub(r"（[^）]*沿い[^）]*）", "", addr_text).strip()
                    data["address"] = addr_clean
            elif label == "TEL":
                data["phone"] = value
            elif label in ("開館時間", "営業時間"):
                data["business_hours"] = value
            elif label in ("休館日", "定休日"):
                data["closed_days"] = value

    # === 施設アイコン (.sec_facility) ===
    facilities: dict[str, bool] = {k: False for k in ALL_FACILITY_KEYS}

    sec_facility = soup.find(class_="sec_facility")
    if sec_facility:
        for li in sec_facility.find_all("li"):
            text = li.get_text(strip=True)
            if text in FACILITY_LABEL_MAP:
                facilities[FACILITY_LABEL_MAP[text]] = True

    data["facilities"] = facilities
    data["website_url"] = detail_url

    return data


def escape_sql_string(s: str) -> str:
    """SQL文字列のエスケープ（外部サイトからの入力を想定）"""
    s = s.replace("\x00", "")
    s = s.replace("\\", "\\\\")
    s = s.replace("'", "''")
    return s


def generate_insert(station: dict) -> str:
    """1件分のINSERT文を生成する。"""
    name = escape_sql_string(station.get("name", ""))
    name_kana = station.get("name_kana")
    address = escape_sql_string(station.get("address", ""))
    lat = station.get("latitude", 0)
    lng = station.get("longitude", 0)
    phone = station.get("phone")
    business_hours = station.get("business_hours")
    closed_days = station.get("closed_days")
    area_group = station.get("area_group", "道央")
    website_url = station.get("website_url")
    facilities = station.get("facilities", {})

    def sql_str(val: Optional[str]) -> str:
        if val is None:
            return "NULL"
        return f"'{escape_sql_string(val)}'"

    facilities_json = json.dumps(facilities, ensure_ascii=False, sort_keys=True)

    return f"""INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '{name}', {sql_str(name_kana)}, '{address}',
  {lat:.7f}, {lng:.7f},
  {sql_str(phone)}, {sql_str(business_hours)}, {sql_str(closed_days)},
  '{escape_sql_string(area_group)}',
  {sql_str(website_url)},
  '{escape_sql_string(facilities_json)}'::jsonb
);"""


def main():
    parser = argparse.ArgumentParser(description="公式サイトから道の駅データをスクレイピング")
    parser.add_argument("--output", type=Path, default=OUTPUT_SQL_PATH, help="出力SQLファイルパス")
    parser.add_argument("--cache-dir", type=Path, default=DEFAULT_CACHE_DIR, help="HTMLキャッシュディレクトリ")
    parser.add_argument("--delay", type=float, default=DEFAULT_DELAY, help="リクエスト間隔（秒）")
    parser.add_argument("--no-cache", action="store_true", help="キャッシュを無視")
    args = parser.parse_args()

    use_cache = not args.no_cache
    cache_dir = args.cache_dir if use_cache else None

    print("=== 道の駅データ スクレイピング開始 ===")
    print(f"出力先: {args.output}")
    print(f"キャッシュ: {'無効' if args.no_cache else args.cache_dir}")
    print(f"リクエスト間隔: {args.delay}秒")
    print()

    # 1. 一覧ページ取得
    print("[1/3] 一覧ページを取得中...")
    try:
        list_html, _ = fetch_html(LIST_URL, cache_dir, use_cache)
    except Exception as e:
        print(f"[FATAL] 一覧ページの取得に失敗: {e}", file=sys.stderr)
        sys.exit(1)

    stations_list = parse_list_page(list_html)
    print(f"  {len(stations_list)}件の道の駅を検出")
    print()

    if not stations_list:
        print("[FATAL] 道の駅が0件です。HTMLの構造が変更された可能性があります。", file=sys.stderr)
        sys.exit(1)

    # 2. 各道の駅の詳細ページを取得
    print("[2/3] 詳細ページを取得中...")
    results = []
    skipped = []

    for i, station in enumerate(stations_list, 1):
        name = station["name"]
        url = station["detail_url"]
        print(f"  [{i}/{len(stations_list)}] {name} ...", end=" ", flush=True)

        try:
            detail_html, cache_hit = fetch_html(url, cache_dir, use_cache)
            detail = parse_detail_page(detail_html, url)

            # 詳細ページの情報で上書き（一覧ページの情報をフォールバックとして使用）
            if "address" in detail and detail["address"]:
                station["address"] = detail["address"]
            if "phone" in detail and detail["phone"]:
                station["phone"] = detail["phone"]
            # 一覧にはない項目
            for key in ("latitude", "longitude", "area_group", "business_hours",
                        "closed_days", "facilities", "website_url", "name_kana"):
                if key in detail:
                    station[key] = detail[key]

            # 座標がないと INSERT できない（NOT NULL制約）
            if "latitude" not in station or "longitude" not in station:
                print("SKIP (座標なし)")
                skipped.append((name, "座標取得失敗"))
                continue

            # 座標の範囲チェック
            lat = station["latitude"]
            lng = station["longitude"]
            if not (41.0 <= lat <= 46.0 and 139.0 <= lng <= 146.0):
                print(f"SKIP (座標範囲外: {lat}, {lng})")
                skipped.append((name, f"座標範囲外: {lat}, {lng}"))
                continue

            # エリアグループが取得できていなければ警告
            if "area_group" not in station:
                print("WARN (エリア不明→道央)", end=" ")
                station["area_group"] = "道央"

            results.append(station)
            print("OK")

        except Exception as e:
            print(f"WARN ({e})")
            skipped.append((name, str(e)))
            cache_hit = False

        # 次のリクエストまで待機（キャッシュヒット時はスキップ）
        if i < len(stations_list) and not cache_hit:
            time.sleep(args.delay)

    print()
    print(f"  成功: {len(results)}件")
    if skipped:
        print(f"  スキップ: {len(skipped)}件")
        for name, reason in skipped:
            print(f"    - {name}: {reason}")
    print()

    # 3. SQL生成
    print("[3/3] SQLファイルを生成中...")
    now = datetime.datetime.now().isoformat()

    lines = [
        "-- ============================================================",
        "-- 道の駅シードデータ（北海道）",
        "-- 出典: 北海道の道の駅（公式サイト）",
        "-- https://hokkaido-michinoeki.jp/",
        f"-- 生成日時: {now}",
        f"-- データ件数: {len(results)}",
        "-- ============================================================",
        "",
        "-- 既存データをクリア（開発環境用）",
        "TRUNCATE TABLE stations CASCADE;",
        "",
    ]

    # 名前順にソート
    results.sort(key=lambda s: s.get("name", ""))

    for station in results:
        lines.append(generate_insert(station))
        lines.append("")

    sql_content = "\n".join(lines)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(sql_content, encoding="utf-8")

    print(f"  {args.output} に {len(results)}件を出力しました")

    # エリアグループ別集計
    area_counts: dict[str, int] = {}
    for s in results:
        ag = s.get("area_group", "不明")
        area_counts[ag] = area_counts.get(ag, 0) + 1
    print("\n  エリア別:")
    for area, count in sorted(area_counts.items()):
        print(f"    {area}: {count}件")

    print("\n=== 完了 ===")


if __name__ == "__main__":
    main()
