-- ============================================================
-- Migration: 20260423000002_fix_spots_rls_and_constraints
-- Description:
--   1. spots_select_public RLS ポリシーを is_active = true に修正
--      （以前は USING (true) で非公開スポットも全ユーザーに見えていた）
--   2. spot_photos_select_public RLS ポリシーを親スポットの is_active で保護
--      （スポット ID が既知であれば非アクティブ写真を直接取得できる問題を修正）
--   3. spots.website_url / image_url に URL フォーマット CHECK 制約を追加
--   4. spot_photos の UPDATE ポリシーは意図的に作成しない
--      （写真の差し替えは DELETE + INSERT で行う運用のため）
-- ============================================================

-- ------------------------------------------------------------
-- 1. spots SELECT ポリシー修正
-- ------------------------------------------------------------

DROP POLICY IF EXISTS "spots_select_public" ON spots;

CREATE POLICY "spots_select_public"
  ON spots FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- ------------------------------------------------------------
-- 2. spot_photos SELECT ポリシー修正
--    親スポットが is_active = true の場合のみ写真を参照可能にする。
--    スポット ID が既知でも非アクティブスポットの写真を取得できないよう保護する。
-- ------------------------------------------------------------

DROP POLICY IF EXISTS "spot_photos_select_public" ON spot_photos;

CREATE POLICY "spot_photos_select_public"
  ON spot_photos FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM spots
      WHERE spots.id = spot_photos.spot_id
        AND spots.is_active = true
    )
  );

-- ------------------------------------------------------------
-- 3. URL フォーマット CHECK 制約
-- ------------------------------------------------------------

ALTER TABLE spots
  ADD CONSTRAINT spots_website_url_check
    CHECK (website_url IS NULL OR website_url ~ '^https?://'),
  ADD CONSTRAINT spots_image_url_check
    CHECK (image_url IS NULL OR image_url ~ '^https?://');

-- ------------------------------------------------------------
-- 4. spot_photos UPDATE ポリシーは意図的に省略
--    写真の差し替えは DELETE + INSERT で行う運用のため、
--    UPDATE ポリシーは不要。
-- ------------------------------------------------------------
