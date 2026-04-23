-- ============================================================
-- Migration: 20260422000001_create_spots
-- Description: spots（スポットピン）テーブルと spot_photos（スポット写真）
--              テーブルを作成する。管理者が登録した周辺スポットを
--              カテゴリ別色分けピンとして地図表示するためのスキーマ。
--              Storage バケット spot-photos も作成する。
-- ============================================================

-- ------------------------------------------------------------
-- spots テーブル
-- ------------------------------------------------------------

CREATE TABLE spots (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text        NOT NULL,
  name_kana    text,
  category     text        NOT NULL,
  description  text,
  latitude     float8      NOT NULL,
  longitude    float8      NOT NULL,
  address      text,
  phone        text,
  website_url  text,
  is_active    boolean     NOT NULL DEFAULT true,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),

  -- カテゴリは定義済みの値のみ許可
  CONSTRAINT spots_category_check
    CHECK (category IN (
      'souvenir', 'restaurant', 'park',
      'attraction', 'accommodation', 'other'
    )),

  -- 座標は北海道の範囲内に制限
  CONSTRAINT spots_latitude_check
    CHECK (latitude BETWEEN 41.0 AND 46.0),
  CONSTRAINT spots_longitude_check
    CHECK (longitude BETWEEN 139.0 AND 146.0)
);

COMMENT ON TABLE spots IS 'スポットピン（管理者が登録した周辺スポット）';
COMMENT ON COLUMN spots.name IS 'スポット名';
COMMENT ON COLUMN spots.name_kana IS 'ふりがな';
COMMENT ON COLUMN spots.category IS 'カテゴリ（souvenir/restaurant/park/attraction/accommodation/other）';
COMMENT ON COLUMN spots.description IS '説明文';
COMMENT ON COLUMN spots.latitude IS '緯度（WGS84）';
COMMENT ON COLUMN spots.longitude IS '経度（WGS84）';
COMMENT ON COLUMN spots.address IS '住所';
COMMENT ON COLUMN spots.phone IS '電話番号';
COMMENT ON COLUMN spots.website_url IS 'WebサイトURL';
COMMENT ON COLUMN spots.is_active IS '表示フラグ（true=表示、false=非表示）';

-- ------------------------------------------------------------
-- spot_photos テーブル
-- ------------------------------------------------------------

CREATE TABLE spot_photos (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  spot_id        uuid        NOT NULL REFERENCES spots(id) ON DELETE CASCADE,
  photo_url      text        NOT NULL,
  thumbnail_url  text        NOT NULL,
  sort_order     int4        NOT NULL DEFAULT 0,
  created_at     timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE spot_photos IS 'スポット写真（将来の複数枚対応用に別テーブル）';
COMMENT ON COLUMN spot_photos.spot_id IS 'スポットID';
COMMENT ON COLUMN spot_photos.photo_url IS '表示用画像URL（Supabase Storage）';
COMMENT ON COLUMN spot_photos.thumbnail_url IS 'サムネイル画像URL（Supabase Storage）';
COMMENT ON COLUMN spot_photos.sort_order IS '表示順（将来の複数枚対応用）';

-- ------------------------------------------------------------
-- インデックス
-- ------------------------------------------------------------

-- カテゴリ別フィルタリング
CREATE INDEX idx_spots_category ON spots (category);

-- 表示フラグでのフィルタリング
CREATE INDEX idx_spots_is_active ON spots (is_active);

-- スポットの写真取得
CREATE INDEX idx_spot_photos_spot_id ON spot_photos (spot_id);

-- ------------------------------------------------------------
-- RLS 有効化
-- ------------------------------------------------------------

ALTER TABLE spots ENABLE ROW LEVEL SECURITY;
ALTER TABLE spot_photos ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------
-- spots RLS ポリシー
-- ------------------------------------------------------------

-- SELECT: 全ユーザー（未ログイン含む）が参照可
CREATE POLICY "spots_select_public"
  ON spots FOR SELECT
  TO anon, authenticated
  USING (true);

-- INSERT: 管理者のみ
CREATE POLICY "spots_insert_admin"
  ON spots FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- UPDATE: 管理者のみ
CREATE POLICY "spots_update_admin"
  ON spots FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- DELETE: 管理者のみ
CREATE POLICY "spots_delete_admin"
  ON spots FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ------------------------------------------------------------
-- spot_photos RLS ポリシー
-- ------------------------------------------------------------

-- SELECT: 全ユーザー（未ログイン含む）が参照可
CREATE POLICY "spot_photos_select_public"
  ON spot_photos FOR SELECT
  TO anon, authenticated
  USING (true);

-- INSERT: 管理者のみ
CREATE POLICY "spot_photos_insert_admin"
  ON spot_photos FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- DELETE: 管理者のみ
CREATE POLICY "spot_photos_delete_admin"
  ON spot_photos FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ------------------------------------------------------------
-- Storage バケット
-- ------------------------------------------------------------

INSERT INTO storage.buckets (id, name, public)
VALUES ('spot-photos', 'spot-photos', true);

-- ------------------------------------------------------------
-- Storage RLS ポリシー
-- ------------------------------------------------------------

-- アップロード: 管理者のみ
CREATE POLICY "spot_photos_storage_insert"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'spot-photos'
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 参照: 全ユーザー
CREATE POLICY "spot_photos_storage_select"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'spot-photos');

-- 削除: 管理者のみ
CREATE POLICY "spot_photos_storage_delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'spot-photos'
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
