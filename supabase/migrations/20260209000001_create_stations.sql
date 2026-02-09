-- ============================================================
-- Migration: 20260209000001_create_stations
-- Description: stations (道の駅マスター) テーブルを作成する。
--              北海道の道の駅の基本情報を管理するマスターテーブル。
--              初期データはシードで約130件を投入する。
-- ============================================================

CREATE TABLE stations (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text        NOT NULL,
  name_kana     text,
  address       text        NOT NULL,
  latitude      float8      NOT NULL,
  longitude     float8      NOT NULL,
  phone         text,
  business_hours text,
  closed_days   text,
  website_url   text,
  image_url     text,
  area          text        NOT NULL,
  area_group    text        NOT NULL,
  description   text,
  facilities    jsonb       DEFAULT '{}'::jsonb,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT stations_area_group_check
    CHECK (area_group IN ('道東', '道北', '道央', '道南')),
  CONSTRAINT stations_latitude_check
    CHECK (latitude BETWEEN 41.0 AND 46.0),
  CONSTRAINT stations_longitude_check
    CHECK (longitude BETWEEN 139.0 AND 146.0)
);

COMMENT ON TABLE stations IS '道の駅マスターテーブル（北海道）';
COMMENT ON COLUMN stations.name IS '道の駅名（例: 道の駅 あさひかわ）';
COMMENT ON COLUMN stations.name_kana IS 'ふりがな（例: あさひかわ）';
COMMENT ON COLUMN stations.address IS '住所';
COMMENT ON COLUMN stations.latitude IS '緯度（WGS84）';
COMMENT ON COLUMN stations.longitude IS '経度（WGS84）';
COMMENT ON COLUMN stations.phone IS '電話番号';
COMMENT ON COLUMN stations.business_hours IS '営業時間（自由記述）';
COMMENT ON COLUMN stations.closed_days IS '定休日（自由記述）';
COMMENT ON COLUMN stations.website_url IS '公式サイトURL';
COMMENT ON COLUMN stations.image_url IS 'メイン画像URL';
COMMENT ON COLUMN stations.area IS '振興局名（例: 上川総合振興局）';
COMMENT ON COLUMN stations.area_group IS 'エリアグループ（道東/道北/道央/道南）';
COMMENT ON COLUMN stations.description IS '説明文';
COMMENT ON COLUMN stations.facilities IS '設備情報（JSONB）';
