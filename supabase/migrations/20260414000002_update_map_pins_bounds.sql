-- ============================================================
-- Migration: 20260414000002_update_map_pins_bounds
-- Description: map_pins の座標 CHECK 制約を UI/バリデーション層と統一する。
--              旧制約は青森県北部（lat 40.5〜41.1）を含む範囲だったため、
--              北海道の実際の地理的範囲に合わせて縮小する。
--
--              変更後の範囲:
--                latitude:  41.1〜45.8（白神岬〜宗谷岬、函館をカバー）
--                longitude: 139.0〜146.5（潮首岬〜納沙布岬）
-- ============================================================

ALTER TABLE map_pins
  DROP CONSTRAINT map_pins_latitude_range,
  DROP CONSTRAINT map_pins_longitude_range;

ALTER TABLE map_pins
  ADD CONSTRAINT map_pins_latitude_range
    CHECK (latitude BETWEEN 41.1 AND 45.8),
  ADD CONSTRAINT map_pins_longitude_range
    CHECK (longitude BETWEEN 139.0 AND 146.5);
