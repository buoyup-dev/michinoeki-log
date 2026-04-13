-- ============================================================
-- Migration: 20260409000001_create_map_pins
-- Description: map_pins (マップピン) テーブルと map_pin_photos (ピン写真)
--              テーブルを作成する。ログインユーザーが地図上に写真+メモを
--              記録できる機能のためのスキーマ。
--              Storage バケット map-pin-photos も作成する。
-- ============================================================

-- ------------------------------------------------------------
-- map_pins テーブル
-- ------------------------------------------------------------

CREATE TABLE map_pins (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  latitude    float8      NOT NULL,
  longitude   float8      NOT NULL,
  memo        text,
  is_public   boolean     NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),

  -- 座標は北海道の地図表示範囲内に制限
  CONSTRAINT map_pins_latitude_range CHECK (latitude BETWEEN 40.5 AND 46.5),
  CONSTRAINT map_pins_longitude_range CHECK (longitude BETWEEN 138.0 AND 147.5)
);

COMMENT ON TABLE map_pins IS 'マップピン（地図上の写真+メモ記録）';
COMMENT ON COLUMN map_pins.user_id IS '投稿者ユーザーID';
COMMENT ON COLUMN map_pins.latitude IS '緯度（WGS84）';
COMMENT ON COLUMN map_pins.longitude IS '経度（WGS84）';
COMMENT ON COLUMN map_pins.memo IS '一言メモ（最大200文字、アプリ層でバリデーション）';
COMMENT ON COLUMN map_pins.is_public IS '公開フラグ（true=公開、false=非公開）';

-- ------------------------------------------------------------
-- map_pin_photos テーブル
-- ------------------------------------------------------------

CREATE TABLE map_pin_photos (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  pin_id          uuid        NOT NULL REFERENCES map_pins(id) ON DELETE CASCADE,
  photo_url       text        NOT NULL,
  thumbnail_url   text        NOT NULL,
  sort_order      int4        NOT NULL DEFAULT 0,
  created_at      timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE map_pin_photos IS 'マップピンの写真（将来の複数枚対応用に別テーブル）';
COMMENT ON COLUMN map_pin_photos.pin_id IS 'ピンID';
COMMENT ON COLUMN map_pin_photos.photo_url IS '表示用画像URL（Supabase Storage）';
COMMENT ON COLUMN map_pin_photos.thumbnail_url IS 'サムネイル画像URL';
COMMENT ON COLUMN map_pin_photos.sort_order IS '表示順（将来の複数枚対応用）';

-- ------------------------------------------------------------
-- インデックス
-- ------------------------------------------------------------

-- ユーザー別のピン一覧取得
CREATE INDEX idx_map_pins_user_id ON map_pins (user_id);

-- 公開ピンのフィルタリング
CREATE INDEX idx_map_pins_is_public ON map_pins (is_public);

-- ピンの写真取得
CREATE INDEX idx_map_pin_photos_pin_id ON map_pin_photos (pin_id);

-- ------------------------------------------------------------
-- RLS 有効化
-- ------------------------------------------------------------

ALTER TABLE map_pins ENABLE ROW LEVEL SECURITY;
ALTER TABLE map_pin_photos ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------
-- map_pins RLS ポリシー
-- ------------------------------------------------------------

-- SELECT: 公開ピンは誰でも参照可、非公開は投稿者本人のみ
CREATE POLICY "map_pins_select_public_or_own"
  ON map_pins FOR SELECT
  TO anon, authenticated
  USING (is_public = true OR auth.uid() = user_id);

-- INSERT: 認証ユーザーが自分のピンを作成
CREATE POLICY "map_pins_insert_own"
  ON map_pins FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: 本人のみ
CREATE POLICY "map_pins_update_own"
  ON map_pins FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: 本人のみ
CREATE POLICY "map_pins_delete_own"
  ON map_pins FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ------------------------------------------------------------
-- map_pin_photos RLS ポリシー
-- ------------------------------------------------------------

-- SELECT: 公開ピンの写真は誰でも参照可、非公開ピンの写真は投稿者本人のみ
CREATE POLICY "map_pin_photos_select_public_or_own"
  ON map_pin_photos FOR SELECT
  TO anon, authenticated
  USING (
    pin_id IN (
      SELECT id FROM map_pins
      WHERE is_public = true OR user_id = auth.uid()
    )
  );

-- INSERT: 自分のピンの写真のみ追加可
CREATE POLICY "map_pin_photos_insert_own"
  ON map_pin_photos FOR INSERT
  TO authenticated
  WITH CHECK (
    pin_id IN (
      SELECT id FROM map_pins WHERE user_id = auth.uid()
    )
  );

-- DELETE: 自分のピンの写真のみ削除可
CREATE POLICY "map_pin_photos_delete_own"
  ON map_pin_photos FOR DELETE
  TO authenticated
  USING (
    pin_id IN (
      SELECT id FROM map_pins WHERE user_id = auth.uid()
    )
  );

-- ------------------------------------------------------------
-- Storage バケット
-- ------------------------------------------------------------

INSERT INTO storage.buckets (id, name, public)
VALUES ('map-pin-photos', 'map-pin-photos', true);

-- ------------------------------------------------------------
-- Storage RLS ポリシー
-- ------------------------------------------------------------

-- アップロード: 自分のフォルダのみ
CREATE POLICY "map_pin_photos_storage_insert"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'map-pin-photos'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- 参照: バケット内の全ファイルを参照可能
-- ※ 非公開ピンの画像もURLを知ればアクセス可能だが、UUIDベースのパスで推測は困難なため許容
CREATE POLICY "map_pin_photos_storage_select"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'map-pin-photos');

-- 削除: 自分のフォルダのみ
CREATE POLICY "map_pin_photos_storage_delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'map-pin-photos'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );
