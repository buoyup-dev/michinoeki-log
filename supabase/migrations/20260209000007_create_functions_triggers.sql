-- ============================================================
-- Migration: 20260209000007_create_functions_triggers
-- Description: updated_at カラムを自動更新するトリガー関数と、
--              stations / profiles テーブルへのトリガーを作成する。
--              UPDATE 時に updated_at が自動的に現在時刻に設定される。
-- ============================================================

-- updated_at を自動更新する汎用トリガー関数
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- stations テーブルの updated_at 自動更新トリガー
CREATE TRIGGER on_stations_updated
  BEFORE UPDATE ON stations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- profiles テーブルの updated_at 自動更新トリガー
CREATE TRIGGER on_profiles_updated
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();
