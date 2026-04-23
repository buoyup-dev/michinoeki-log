-- ============================================================
-- Seed: 20260423000001_seed_spots
-- Description: 定山渓エリアのスポットピン テストデータ（開発用）
--              カテゴリごとに1件ずつ、計6件を投入する。
--              座標は JYOZANKEI_BOUNDS 内（SW: 42.9589,141.1494 / NE: 42.9756,141.1824）
-- ※ 本ファイルは開発確認用のため、本番環境では実行しないこと
-- ============================================================

INSERT INTO spots (name, name_kana, category, description, latitude, longitude, address, phone, website_url, image_url, is_active)
VALUES
  -- お土産
  (
    '定山渓物産館',
    'じょうざんけいぶっさんかん',
    'souvenir',
    '定山渓温泉の玄関口にある土産物店。温泉まんじゅうや地場産品を中心に幅広く取り揃えている。',
    42.9656682963583,
    141.16136327976008,
    '北海道札幌市南区定山渓温泉東3丁目',
    '011-598-2178',
    'https://www.j-bussankan.co.jp/',
    'https://www.j-bussankan.co.jp/wp-content/uploads/top_slide002.jpg',
    true
  ),

  -- 飲食店
  (
    '生そば紅葉亭',
    'なまそばもみじてい',
    'restaurant',
    '定山渓温泉街にある地元人気のそば店。石臼挽きの手打ちそばが味わえる。',
    42.96785812297729,
    141.16735039667597,
    '北海道札幌市南区定山渓温泉西3丁目',
    '011-598-2421',
    NULL,
    'https://imgfp.hotp.jp/IMGH/51/09/P019865109/P019865109_480.jpg',
    true
  ),

  -- 公園
  (
    '定山源泉公園',
    'じょうざんげんせんこうえん',
    'park',
    '定山渓温泉の源泉が湧き出る公園。無料の足湯が楽しめる憩いのスポット。',
    42.96511163876095,
    141.16313259662215,
    '北海道札幌市南区定山渓温泉西4丁目',
    NULL,
    NULL,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGZeO-Tg_Gn2iWaf5mOWjIJhxZxr9pcv84NzgETGeGlTrpu3HFcQR88BLhTxI4jxUUMC3tZo93dggXi_kcGckv_JzL2IvLNsEjtzp_-7QQIxu0Um_s8zEuFkbnAeMuIUHmrygasvg=w408-h306-k-no',
    true
  ),

  -- 観光
  (
    '定山渓神社',
    'じょうざんけいじんじゃ',
    'attraction',
    '縁結びの神様として知られる温泉街の鎮守社。温泉街の中心エリアに位置し、地元の人や観光客が参拝に訪れる。',
    42.96487970436791,
    141.1671709385196,
    '北海道札幌市南区定山渓温泉西4丁目',
    NULL,
    NULL,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGFsvCrtFGBzXBEDuBMFNr7yqbRXtbiUP3EQS-oRb1lWnzKv_8AjViuBxC6cfwpUFopbraUwQAoP1dgD0wLfusH4zIHHts74tkLyW0rt1aSvwl95B9QPXN7YsuwdRBbRfzpdxFUOw=w408-h306-k-no',
    true
  ),

  -- 宿泊
  (
    '定山渓ビューホテル',
    'じょうざんけいびゅーほてる',
    'accommodation',
    '豊平川沿いに建つ大型温泉ホテル。日帰り入浴も可能。',
    42.969508030191385,
    141.16744045429363,
    '北海道札幌市南区定山渓温泉東2丁目',
    '011-598-3223',
    'https://www.jozankeiview.com/',
    'https://lh3.googleusercontent.com/p/AF1QipMFkXLBXy2miGqeR3NemfHZRi2Wl7ZHe4Kss9Uw=s1360-w1360-h1020-rw',
    true
  ),

  -- その他
  (
    '定山渓観光案内所',
    'じょうざんけいかんこうあんないじょ',
    'other',
    '定山渓エリアの観光情報を提供する案内所。じょうてつバスの乗車券販売やオリジナルグッズも取り扱う。',
    42.966253692601526,
    141.16700758127996,
    '北海道札幌市南区定山渓温泉西3丁目',
    '011-598-2012',
    NULL,
    'https://lh3.googleusercontent.com/gps-cs-s/APNQkAEI92BH86w3ujfZ2l_tbHpLcvbZnfMOoJURpH5gX55BmUxCQ5xQ6fLlsY0a-J9mYCfbXjU5xnSSWkmdJL1QdwhFX1RZmQa-W5kgndDGzrmK0zp8xGigw9mcBZMi8cLGpC0sU1xzCLC9XXVl=w408-h544-k-no',
    true
  );
