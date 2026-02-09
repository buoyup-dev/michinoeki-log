-- ============================================================
-- Migration: 20260209000002_create_profiles
-- Description: profiles (ユーザープロフィール) テーブルを作成する。
--              auth.users と 1:1 で紐づき、ユーザー登録時に
--              handle_new_user トリガーで自動作成される。
-- ============================================================

CREATE TABLE profiles (
  id            uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name  text,
  avatar_url    text,
  role          text        NOT NULL DEFAULT 'user',
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT profiles_role_check
    CHECK (role IN ('user', 'admin'))
);

COMMENT ON TABLE profiles IS 'ユーザープロフィールテーブル（auth.users と 1:1）';
COMMENT ON COLUMN profiles.id IS '主キー（= auth.users.id）';
COMMENT ON COLUMN profiles.display_name IS '表示名';
COMMENT ON COLUMN profiles.avatar_url IS 'アバター画像URL';
COMMENT ON COLUMN profiles.role IS 'ユーザー権限（user / admin）';

-- ユーザー登録時に profiles レコードを自動作成する関数
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'avatar_url', NEW.raw_user_meta_data ->> 'picture', '')
  );
  RETURN NEW;
END;
$$;

-- auth.users への INSERT をトリガーに profiles を作成
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
