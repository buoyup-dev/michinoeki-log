-- ============================================================
-- Migration: 20260209000004_create_favorites
-- Description: favorites (お気に入り) テーブルを作成する。
--              ユーザーが「巡りたいリスト」に登録した道の駅を管理する。
--              同一道の駅への重複登録を防止するユニーク制約付き。
-- ============================================================

CREATE TABLE favorites (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  station_id  uuid        NOT NULL REFERENCES stations(id) ON DELETE RESTRICT,
  created_at  timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT uq_favorites_user_station
    UNIQUE (user_id, station_id)
);

COMMENT ON TABLE favorites IS 'お気に入り（巡りたいリスト）テーブル';
COMMENT ON COLUMN favorites.user_id IS 'ユーザーID';
COMMENT ON COLUMN favorites.station_id IS '道の駅ID';
