-- ============================================================
-- Migration: 20260209000003_create_visits
-- Description: visits (訪問記録) テーブルを作成する。
--              同一道の駅への複数回訪問を許可する（ユニーク制約なし）。
--              再訪問は履歴として記録され、達成率は
--              COUNT(DISTINCT station_id) で計算する。
-- ============================================================

CREATE TABLE visits (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  station_id      uuid        NOT NULL REFERENCES stations(id) ON DELETE RESTRICT,
  visited_at      date        NOT NULL DEFAULT CURRENT_DATE,
  memo            text,
  latitude        float8,
  longitude       float8,
  is_gps_verified boolean     NOT NULL DEFAULT false,
  created_at      timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE visits IS '訪問記録テーブル（同一道の駅への複数回訪問を許可）';
COMMENT ON COLUMN visits.user_id IS 'ユーザーID';
COMMENT ON COLUMN visits.station_id IS '道の駅ID';
COMMENT ON COLUMN visits.visited_at IS '訪問日';
COMMENT ON COLUMN visits.memo IS 'メモ（自由記述）';
COMMENT ON COLUMN visits.latitude IS '訪問時のGPS緯度';
COMMENT ON COLUMN visits.longitude IS '訪問時のGPS経度';
COMMENT ON COLUMN visits.is_gps_verified IS 'GPS位置認証済みか（道の駅から半径1km以内ならtrue）';
