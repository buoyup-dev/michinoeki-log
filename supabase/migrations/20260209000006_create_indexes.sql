-- ============================================================
-- Migration: 20260209000006_create_indexes
-- Description: Phase 1 テーブル（stations, visits）のインデックスを作成する。
--              stations には pg_trgm を利用したあいまい検索用 GIN インデックス、
--              visits にはユーザー別・道の駅別の検索用 BTREE インデックスを設定。
--              favorites のインデックスは UNIQUE 制約でカバー済みのため不要。
-- ============================================================

-- pg_trgm 拡張（あいまい検索用トライグラムインデックスに必要）
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- ------------------------------------------------------------
-- stations インデックス
-- ------------------------------------------------------------

-- エリアグループでのフィルタリング（道東/道北/道央/道南）
CREATE INDEX idx_stations_area_group ON stations (area_group);

-- 振興局でのフィルタリング（将来の詳細フィルタ用）
CREATE INDEX idx_stations_area ON stations (area);

-- 道の駅名のあいまい検索
CREATE INDEX idx_stations_name_search ON stations USING gin (name gin_trgm_ops);

-- ふりがなのあいまい検索
CREATE INDEX idx_stations_name_kana_search ON stations USING gin (name_kana gin_trgm_ops);

-- 住所のあいまい検索
CREATE INDEX idx_stations_address_search ON stations USING gin (address gin_trgm_ops);

-- 座標範囲検索用（現在地周辺の道の駅検索）
CREATE INDEX idx_stations_location ON stations (latitude, longitude);

-- ------------------------------------------------------------
-- visits インデックス
-- ------------------------------------------------------------

-- ユーザーの訪問記録一覧
CREATE INDEX idx_visits_user_id ON visits (user_id);

-- 達成率計算・バッジ判定: COUNT(DISTINCT station_id) / BOOL_OR(is_gps_verified)
CREATE INDEX idx_visits_user_station ON visits (user_id, station_id);

-- 訪問履歴の時系列表示（新しい順）
CREATE INDEX idx_visits_user_visited_at ON visits (user_id, visited_at DESC);

-- 道の駅別の訪問数集計（Phase 3 ランキング用）
CREATE INDEX idx_visits_station_id ON visits (station_id);

-- ------------------------------------------------------------
-- favorites インデックス
-- ------------------------------------------------------------
-- UNIQUE 制約 (user_id, station_id) がインデックスを兼ねるため追加不要。
-- user_id 単体でのフィルタも複合ユニークインデックスでカバーされる
-- （複合インデックスの左端一致原則）。
