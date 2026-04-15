-- ============================================================
-- Migration: 20260414000001_add_map_pins_updated_at_trigger
-- Description: map_pins テーブルの updated_at 自動更新トリガーを追加する。
--              UPDATE 時に updated_at が自動的に現在時刻に設定される。
-- ============================================================

-- map_pins テーブルの updated_at 自動更新トリガー
-- ※ update_updated_at() 関数は 20260209000007 で定義済み
CREATE TRIGGER on_map_pins_updated
  BEFORE UPDATE ON map_pins
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();
