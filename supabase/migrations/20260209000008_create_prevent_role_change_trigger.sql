-- ============================================================
-- Migration: 20260209000008_create_prevent_role_change_trigger
-- Description: profiles テーブルの role カラムの直接変更を防止する
--              セキュリティトリガーを作成する。
--              管理者（is_admin() = true）のみが role を変更でき、
--              一般ユーザーが Supabase クライアント経由で role を
--              変更しようとした場合は元の値に戻す。
-- ============================================================

-- role カラムの直接変更を防止するトリガー関数
CREATE OR REPLACE FUNCTION public.prevent_role_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role THEN
    IF NOT public.is_admin() THEN
      NEW.role := OLD.role;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

-- profiles テーブルへの role 変更防止トリガー
CREATE TRIGGER on_profile_update_prevent_role_change
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_role_change();
