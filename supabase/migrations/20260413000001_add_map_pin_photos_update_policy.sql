-- ============================================================
-- Migration: 20260413000001_add_map_pin_photos_update_policy
-- Description: map_pin_photos に UPDATE ポリシーを追加する。
--              画像の差し替え（updateMapPinPhoto）で photo_url /
--              thumbnail_url を更新するために必要。
-- ============================================================

-- UPDATE: 自分のピンの写真のみ更新可
CREATE POLICY "map_pin_photos_update_own"
  ON map_pin_photos FOR UPDATE
  TO authenticated
  USING (
    pin_id IN (
      SELECT id FROM map_pins WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    pin_id IN (
      SELECT id FROM map_pins WHERE user_id = auth.uid()
    )
  );
