-- ============================================================
-- Migration: 20260227000001_update_area_groups
-- Description: エリア区分を4区分→6区分に変更し、areaカラムを削除する。
--              旧: 道東/道北/道央/道南
--              新: 道央/道南/道北/十勝/オホーツク/釧路・根室
-- ============================================================

-- 1. 旧CHECK制約を削除（UPDATEで新しい値を入れるため先に外す）
ALTER TABLE stations DROP CONSTRAINT stations_area_group_check;

-- 2. 既存の「道東」データを振興局(area)を使って新区分に振り分け
--    seed.sql で再投入する場合は不要だが、本番環境での安全な移行のため記述
UPDATE stations SET area_group = '十勝'
  WHERE area_group = '道東' AND area LIKE '%十勝%';
UPDATE stations SET area_group = 'オホーツク'
  WHERE area_group = '道東' AND area LIKE '%オホーツク%';
UPDATE stations SET area_group = '釧路・根室'
  WHERE area_group = '道東' AND (area LIKE '%釧路%' OR area LIKE '%根室%');

-- 3. データ移行完了後に新しい6区分のCHECK制約を追加
ALTER TABLE stations ADD CONSTRAINT stations_area_group_check
  CHECK (area_group IN ('道央', '道南', '道北', '十勝', 'オホーツク', '釧路・根室'));

-- 4. area カラムのインデックスを明示的に削除
DROP INDEX IF EXISTS idx_stations_area;

-- 5. area カラム削除（推定データで画面表示もほぼ不要のため）
ALTER TABLE stations DROP COLUMN area;

-- 6. area_group カラムのコメントを更新
COMMENT ON COLUMN stations.area_group IS 'エリアグループ（道央/道南/道北/十勝/オホーツク/釧路・根室）';
