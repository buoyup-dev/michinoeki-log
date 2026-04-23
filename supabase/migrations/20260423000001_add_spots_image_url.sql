-- ============================================================
-- Migration: 20260423000001_add_spots_image_url
-- Description: spots テーブルに image_url カラムを追加する。
--              stations.image_url と同じ方式で外部URLを直接保持する。
--              将来的に spot_photos との使い分けが必要な場合は再設計する。
-- ============================================================

ALTER TABLE spots ADD COLUMN image_url text;

COMMENT ON COLUMN spots.image_url IS '代表画像URL（外部URL）';
