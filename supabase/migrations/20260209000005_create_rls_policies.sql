-- ============================================================
-- Migration: 20260209000005_create_rls_policies
-- Description: Phase 1 全テーブル（stations, profiles, visits, favorites）の
--              Row Level Security (RLS) を有効化し、ポリシーを設定する。
--              管理者判定ヘルパー関数 is_admin() も作成する。
-- ============================================================

-- ------------------------------------------------------------
-- 管理者判定ヘルパー関数
-- ------------------------------------------------------------

-- 現在のユーザーが管理者かどうかを返す関数
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
      AND role = 'admin'
  );
$$;

-- ------------------------------------------------------------
-- RLS 有効化
-- ------------------------------------------------------------

ALTER TABLE stations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------
-- stations テーブルのポリシー
-- ------------------------------------------------------------

-- SELECT: 誰でも閲覧可能（SSG/ISR でも取得可能にするため anon ロールにも許可）
CREATE POLICY "stations_select_all"
  ON stations FOR SELECT
  TO anon, authenticated
  USING (true);

-- INSERT: 管理者のみ
CREATE POLICY "stations_insert_admin"
  ON stations FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

-- UPDATE: 管理者のみ
CREATE POLICY "stations_update_admin"
  ON stations FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- DELETE: 管理者のみ
CREATE POLICY "stations_delete_admin"
  ON stations FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ------------------------------------------------------------
-- profiles テーブルのポリシー
-- ------------------------------------------------------------

-- SELECT: 本人のみ自分のプロフィールを取得
CREATE POLICY "profiles_select_own"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- INSERT: 本人のみ（トリガーで自動作成、手動作成時の安全策）
CREATE POLICY "profiles_insert_own"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- UPDATE: 本人のみ（display_name, avatar_url の変更）
CREATE POLICY "profiles_update_own"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- DELETE: 不可（auth.users 削除時に CASCADE で自動削除）
-- ポリシーなし = 削除不可

-- ------------------------------------------------------------
-- visits テーブルのポリシー
-- ------------------------------------------------------------

-- SELECT: 本人のみ
CREATE POLICY "visits_select_own"
  ON visits FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- INSERT: 認証ユーザーが自分の訪問記録を作成
CREATE POLICY "visits_insert_own"
  ON visits FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: 本人のみ（メモの編集等）
CREATE POLICY "visits_update_own"
  ON visits FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: 本人のみ
CREATE POLICY "visits_delete_own"
  ON visits FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ------------------------------------------------------------
-- favorites テーブルのポリシー
-- ------------------------------------------------------------

-- SELECT: 本人のみ
CREATE POLICY "favorites_select_own"
  ON favorites FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- INSERT: 認証ユーザーが自分のお気に入りを追加
CREATE POLICY "favorites_insert_own"
  ON favorites FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: 不可（ポリシーなし）
-- お気に入りは追加/削除のみ。更新する属性がない。

-- DELETE: 本人のみ
CREATE POLICY "favorites_delete_own"
  ON favorites FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
