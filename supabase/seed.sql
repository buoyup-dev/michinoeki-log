-- ============================================================
-- 道の駅シードデータ（北海道）
-- 出典: 北海道の道の駅（公式サイト）
-- https://hokkaido-michinoeki.jp/
-- 生成日時: 2026-02-27T00:27:08.946592
-- データ件数: 128
-- ============================================================

-- 既存データをクリア（開発環境用）
TRUNCATE TABLE stations CASCADE;

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'YOU・遊・もり', NULL, '茅部郡森町字上台町326-18',
  42.0995700, 140.5680000,
  '01374-2-4886', '9：00～17：30（3月21日～10月20日）9：00～17：00（10月21日～3月20日）', '年末年始（12月30日午後～1月3日）',
  '道南',
  'https://hokkaido-michinoeki.jp/michinoeki/641/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": false, "park": true, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": false, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '☆ロマン街道しょさんべつ', NULL, '苫前郡初山別村字豊岬153-1',
  44.5632630, 141.7775080,
  '0164-67-2525', '売店、喫茶10：00～21：00（4月～10月）10：00～20：00（11月～3月）', '毎週火曜日年末年始',
  '道北',
  'https://hokkaido-michinoeki.jp/michinoeki/2870/',
  '{"aed": false, "atm": false, "cafe": true, "campground": true, "cashless": false, "covered_parking": false, "credit_card": false, "diaper_changing": false, "dog_run": true, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": true, "museum": false, "nursing_room": false, "observatory": false, "onsen": true, "ostomy": false, "park": true, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'あいおい', NULL, '網走郡津別町字相生83番地1',
  43.5454800, 143.9803700,
  '0152-75-9101', '道の駅9：00～17：00そば処11：00～15：00', '毎週火曜日※祝日の場合は翌日休館そば処毎週月曜日、毎週火曜日※祝日の場合は翌日休館年末年始（12月31日～不定休）',
  'オホーツク',
  'https://hokkaido-michinoeki.jp/michinoeki/2585/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": false, "credit_card": false, "diaper_changing": false, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": false, "park": true, "parking": true, "rest_area": false, "restaurant": false, "shop": false, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'あかいがわ', NULL, '余市郡赤井川村字都190番地16',
  43.0514400, 140.8444200,
  '0135-34-6699', '道の駅8：30～18：00（5月～10月）9：00～17：00（11月～4月）テイクアウト9：00～17：00（LO17：00）（5月～10月）9：00～15：00（LO15：00）（11月～4月）イートイン11：00～17：00（LO15：00）（5月～10月）11：00～15：00（LO14：30）（11月～4月）直売所9：00～17：00（5月～10月）※商品状況により17：00前に閉店することがあります。', '第3水曜日（5月～10月）第1、第3水曜日（11月～4月）年始（1月1日～1月3日）直売所第3水曜日（5月～10月）',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/3143/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": true, "credit_card": false, "diaper_changing": false, "dog_run": true, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'あさひかわ', NULL, '旭川市神楽4条6丁目1番12号',
  43.7599300, 142.3485700,
  '0166-61-2283', '道の駅9：00～21：00売店9：00～19：00（4月～10月）夏時間9：00～18：00（11月～3月）冬時間ベーカリー10：00～17：00フードコート各店により異なる', '道の駅年末年始（12月30日～1月4日）売店年末年始（12月31日～1月2日）',
  '道北',
  'https://hokkaido-michinoeki.jp/michinoeki/2272/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": false, "museum": true, "nursing_room": true, "observatory": false, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'あしょろ銀河ホール21', NULL, '足寄郡足寄町北1条1丁目3番地',
  43.2443300, 143.5464500,
  '0156-25-6131', '道の駅8：00～18：00（5月～9月）8：00～17：00（10月～4月）売店10：00～18：00（5月～9月）10：00～17：00（10月～4月）レストラン11：00～15：00', '毎週木曜日（7月～8月を除く）年末年始（12月30日～1月3日）',
  '十勝',
  'https://hokkaido-michinoeki.jp/michinoeki/2639/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": false, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": true, "lodging": false, "museum": false, "nursing_room": true, "observatory": false, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'あっさぶ', NULL, '檜山郡厚沢部町緑町72-1※国道229号（乙部町）通行止め区間があります。',
  41.9166300, 140.2162400,
  '0139-64-3738', '道の駅、あっさぶ物産センター（直売所）8：30～18：00（5月～10月）9：00～17：00（11月～4月）※令和７年１１月１３日（木）より仮店舗にて運営しています。新建物でのオープンは令和8年11月以降を予定。商業施設 ASSAN道の駅シアター（映像空間）9：00～17：00アッサンベーカリー9：00～18：00（冬期は9：00～17：00）味処 停車場10：00～18：00（LO17：30）（冬期は10：00～17：00（LO16：30）', '年末年始（12月30日～1月5日）お休み処 百姓屋（12月中旬～2月（予定）休業）令和７年１１月４日（火）～令和７年１１月１２日（水）の間は休業となります。※リニューアル工事に伴う仮店舗への移動のため',
  '道南',
  'https://hokkaido-michinoeki.jp/michinoeki/576/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": false, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'あびら D51(デゴイチ)ステーション', NULL, '勇払郡安平町追分柏が丘49-1',
  42.8758100, 141.8187100,
  '0145-29-7751', '道の駅9：00～18：00（4月～9月）9：00～17：00（10月～3月）テイクアウトコーナー9：00～17：30（4月～9月）9：00～16：30（10月～3月）農産物直売9：00～17：00※11月中旬～4月下旬まで道の駅本館で営業', '年末年始（12月30日～1月3日）※機械設備等メンテナンスの為、不定期で臨時休館あり（年3回程度）',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/19505/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": false, "dog_run": true, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'あぷた', NULL, '虻田郡洞爺湖町入江84-2',
  42.5290100, 140.7786700,
  '0142-76-5501', '道の駅9：00～18：00（4月～9月）9：00～17：00（10月～3月）レストラン11：00～14：00テイクアウトメニュー9：00～16：30（4月～9月）9：00～15：30（10月～3月）売店9：00～18：00（4月～9月）9：00～17：00（10月～3月）', '定休日なし（3月～12月）毎週火曜日（1月～2月）年末年始（12月30日～1月5日）',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/2751/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'いわない', NULL, '岩内郡岩内町万代47-4',
  42.9834500, 140.5168200,
  '0135-63-1155', '9：00～18：00（4月～10月）9：00～17：00（11月～3月）', '定休日なし（4月最終月曜日～10月31日）毎週月曜日（11月～4月最終月曜日）※月曜日が祝日の場合は翌日年末年始（12月31日～1月3日）',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/499/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": false, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": false, "park": false, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'うたしないチロルの湯', NULL, '歌志内市字中村72番地2',
  43.5033300, 142.0058700,
  '0125-42-5566', '道の駅9：00～18：00（4月～10月）10：00～16：00（11月～3月）レストラン10：00～18：00（4月～10月）11：00～16：00（11月～3月）', '毎週月曜日年末年始（12月30日～1月4日）',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/2066/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": true, "credit_card": false, "diaper_changing": false, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": true, "museum": false, "nursing_room": false, "observatory": false, "onsen": true, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": false, "shop": false, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'うとろ・シリエトク', NULL, '斜里郡斜里町ウトロ西186-8※国道334号知床横断道路は冬期間（11月～4月）通行止めになります',
  44.0690500, 144.9907100,
  '0152-22-5000（代表）※売店・レストランは別番号です', '道の駅9：00～17：00レストラン10：00～15：00', '毎週木曜日（12月のみ）年末年始（12月29日～1月3日）',
  'オホーツク',
  'https://hokkaido-michinoeki.jp/michinoeki/2884/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": true, "nursing_room": true, "observatory": false, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'うらほろ', NULL, '十勝郡浦幌町字北町16-3',
  42.8139100, 143.6636400,
  '015-576-5678', '9：00～17：00', '年末年始（12月30日～1月5日）',
  '十勝',
  'https://hokkaido-michinoeki.jp/michinoeki/3057/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": false, "diaper_changing": true, "dog_run": true, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'うりまく', NULL, '河東郡鹿追町瓜幕西3丁目',
  43.1699000, 143.0250900,
  '0156-67-2626', '9：00～17：00（4月下旬～11月上旬）9：00～16：00（11月中旬～4月中旬）', '年末年始（12月29日～1月4日）',
  '十勝',
  'https://hokkaido-michinoeki.jp/michinoeki/2766/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": false, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'えんべつ富士見', NULL, '天塩郡遠別町富士見46-21',
  44.7138600, 141.7921800,
  '01632-9-7555', '道の駅・売店9：00～18：00（4月～10月）10：00～17：00（11月～3月）レストラン・テイクアウト店10：00～17：00（4月～10月）※ラストオーダー16：5011：00～16：00（11月～3月）※ラストオーダー15：50', '年末年始（12月30日～1月3日）',
  '道北',
  'https://hokkaido-michinoeki.jp/michinoeki/389/',
  '{"aed": false, "atm": false, "cafe": true, "campground": true, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": false, "museum": false, "nursing_room": true, "observatory": true, "onsen": false, "ostomy": false, "park": true, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'おうむ', NULL, '紋別郡雄武町字雄武1885番地14',
  44.5830800, 142.9596200,
  '0158-84-2403', '道の駅8：00～21：00（5月～10月）8：00～20：00（11月～4月）売店10：00～16：30（4月中旬～11月末日）', '年始（1月1日）',
  'オホーツク',
  'https://hokkaido-michinoeki.jp/michinoeki/1975/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": false, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": true, "onsen": false, "ostomy": false, "park": false, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'おこっぺ', NULL, '紋別郡興部町興部1322-21',
  44.4694300, 143.1168900,
  '0158-82-2385', '道の駅9：00～18：00（5月～10月）9：00～17：00（11月～4月）特産品販売拡大販売9：00～17：00（4月上旬～10月下旬頃）縮小販売9：30～16：30（11月上旬～4月上旬頃）', '年末年始（12月31日～1月5日）',
  'オホーツク',
  'https://hokkaido-michinoeki.jp/michinoeki/795/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": false, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'おだいとう', NULL, '野付郡別海町尾岱沼5-27',
  43.5333600, 145.2368800,
  '0153-86-2449', '道の駅9：00～17：00（5月～10月）9：00～16：00（11月～4月）', '定休日なし年末年始（12月31日～1月5日）は休館',
  '釧路・根室',
  'https://hokkaido-michinoeki.jp/michinoeki/3099/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": false, "nursing_room": true, "observatory": true, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'おといねっぷ', NULL, '中川郡音威子府村字音威子府155番地',
  44.7291600, 142.2578400,
  '01656-5-3111', NULL, NULL,
  '道北',
  'https://hokkaido-michinoeki.jp/michinoeki/458/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": false, "nursing_room": true, "observatory": false, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'おとふけ', NULL, '河東郡音更町なつぞら2番地',
  42.9749300, 143.1812900,
  '0155-65-0822', '4月～10月 9：00～19：0011月～3月 9：00～18：00', '年末年始',
  '十勝',
  'https://hokkaido-michinoeki.jp/michinoeki/825/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": false, "dog_run": true, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": true, "lodging": false, "museum": false, "nursing_room": true, "observatory": false, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'おびら鰊番屋', NULL, '留萌郡小平町字鬼鹿広富',
  44.1376000, 141.6552700,
  '0164-56-1828', '道の駅9：00～17：00売店・旧花田家番屋9：00～17：00（5月～10月）9：00～16：00（11月～4月）食堂11：00～16：00（5月～10月）11：00～14：00（12月～3月）', '年末年始（12月30日～1月3日）観光交流センター売店年末年始のみ食堂毎週月曜日・年末年始旧花田家番屋毎週月曜日（12月1日～3月中旬まで休館）TEL 0164-57-1411',
  '道北',
  'https://hokkaido-michinoeki.jp/michinoeki/744/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": false, "museum": false, "nursing_room": true, "observatory": false, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'おんねゆ温泉', NULL, '北見市留辺蘂町松山1番地4',
  43.7535500, 143.5006300,
  '0157-45-3373', '道の駅9：00～17：30北の大地の水族館9：00～17：30', '4月8日～14日第2月曜日～金曜日（12月）年末年始（12月31日～1月1日）',
  'オホーツク',
  'https://hokkaido-michinoeki.jp/michinoeki/685/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": false, "handicap_toilet": false, "information": true, "kids_space": true, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'かみしほろ', NULL, '河東郡上士幌町字上士幌東3線227番地1',
  43.2249700, 143.2908300,
  '01564-7-7722', '道の駅9：00～18：00（4月下旬～10月上旬）9：00～17：00（10月中旬～4月中旬）レストランモーニング 8：00～10：00（LO 9：30）ランチ 　　11：00～16：00（LO15：30）※冬期ランチ営業時間変動ありテイクアウト（tobachi）※営業時間については、道の駅にお問い合わせください。', '年末年始（12月31日～1月3日）※各テナントについては休業の場合があります。詳しくはお問い合わせください。',
  '十勝',
  'https://hokkaido-michinoeki.jp/michinoeki/23227/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": false, "dog_run": true, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": true, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'かみゆうべつ温泉チューリップの湯', NULL, '紋別郡湧別町中湧別中町3020-1',
  44.1842500, 143.5948400,
  '01586-4-1126', '道の駅10：00～22：00（4月～11月）11：00～21：00（12月～3月）夏期温泉・売店10：00～22：00（最終受付時間21：00）（4月～11月）レストラン11：00～21：00 （LO20：30）（4月～11月）冬期温泉・売店11：00～21：00（最終受付時間20：00）（12月～3月）レストラン11：00～21：00（LO20：30）（12月～3月）', '年始（1月1日～1月2日）※10月にボイラーメンテナンス休館あり',
  'オホーツク',
  'https://hokkaido-michinoeki.jp/michinoeki/472/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": false, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": false, "kids_space": true, "lodging": false, "museum": true, "nursing_room": true, "observatory": false, "onsen": true, "ostomy": false, "park": true, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": false, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'くろまつない', NULL, '寿都郡黒松内町字白井川8番地10',
  42.6727500, 140.3798200,
  '0136-71-2222', '道の駅9：00～18：00（4月～9月）9：00～17：00（10月～3月）軽食9：00～16：00ピザ10：00～16：00※無くなり次第終了売店9：00～17：00', '定休日なし（4月～10月）毎週火曜日（11月～3月）※火曜日が祝日の場合は翌日年末年始（12月31日～1月1日）',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/2088/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": false, "park": false, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'ぐるっとパノラマ美幌峠', NULL, '網走郡美幌町字古梅',
  43.6482800, 144.2479500,
  '050-1725-9694（自動音声）', '道の駅10：00〜16：00（売店は道の駅開館時間に同じ）', '年末年始※要問い合わせ',
  'オホーツク',
  'https://hokkaido-michinoeki.jp/michinoeki/2502/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": true, "onsen": false, "ostomy": false, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'さらべつ', NULL, '河西郡更別村字弘和464番地1',
  42.6333500, 143.2719400,
  '0155-53-3663', '道の駅9：00～18：00レストラン9：30～17：00', '年末年始（12月29日〜1月3日）',
  '十勝',
  'https://hokkaido-michinoeki.jp/michinoeki/2232/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": false, "park": true, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'さるふつ公園', NULL, '宗谷郡猿払村浜鬼志別214番地7',
  45.3291400, 142.1773100,
  '01635-2-2311', '道の駅窓口（グッズ販売、観光案内）TEL 01635-2-23119：00～17：30夢喰間（売店）TEL 01635-2-34339：00～17：30（4月上旬～10月末）さるふつまるごと館　※ガチャピンズラリー販売店TEL 01635-4-77809：00～17：30（4月～11月）10：00～17：30（12月～3月）ホテルさるふつ内売店9：00～17：30ホテルさるふつ内レストランTEL 01635-3-431411：00～14：0017：00～19：30（LO19：00）ホテルさるふつ内 憩いの湯13：00～19：30（最終受付19：00）※道の駅窓口、各店舗、悪天候等状況により期間・時間変動、臨時休業あり', '年末年始（道の駅窓口、各施設等期間は異なります）道の駅窓口（グッズ販売、観光案内）毎週木曜日（11月～4月）臨時休業（2025年7月18日～21日、8月23～24日、10月5日）夢喰間（売店）毎週火曜日※祝日を除く冬期休業（11月～4月上旬）さるふつまるごと館不定休（4月～11月）毎週水曜日（12月～3月）キャンプ場、バンガロー臨時休業日（2025年7月18日～21日、8月23～24日、10月5日）パークゴルフ場臨時休業日（2025年7月19日、20日）ホテルさるふつ内憩いの湯、レストラン、売店毎週木曜日※道の駅窓口、各店舗、悪天候等状況により期間・時間変動、臨時休業あり',
  '道北',
  'https://hokkaido-michinoeki.jp/michinoeki/2010/',
  '{"aed": false, "atm": false, "cafe": true, "campground": true, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": true, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'しかおい', NULL, '河東郡鹿追町東町3丁目2',
  43.0980700, 142.9885300,
  '0156-66-1125', '9：00～17：00（4月～10月）10：00～16：00（11月～3月）', '不定休年末年始',
  '十勝',
  'https://hokkaido-michinoeki.jp/michinoeki/2605/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": false, "credit_card": false, "diaper_changing": false, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": false, "museum": true, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": false, "shop": false, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'しかべ間歇泉公園', NULL, '茅部郡鹿部町字鹿部18番地1（道道大沼公園鹿部線（路線番号　道道43号））',
  42.0286200, 140.8306000,
  '01372-7-5655', '道の駅9：00～17：00（3月20日～11月30日）月曜日～木曜日 10：00～15：00（12月1日～3月19日）金曜日～日曜日 10：00～17：00（12月1日～3月19日）浜のかあさん食堂11：00～14：00こいたのおかず屋10：00～15：00湯けむり処 しかべ焼き10：00～16：00（3月20日～11月30日）10：00～15：00（12月1日～3月19日）', '定休日なし（3月20日～12月29日）毎週水曜日（1月2日～3月19日）年末年始（12月30日～1月1日）※急な定休日に関しましては、公式HPに記載いたします。https://shikabe-tara.com/開館時間道の駅9：00～17：00（3月20日～11月30日）月曜日～木曜日 10：00～15：00（12月1日～3月19日）金曜日～日曜日 10：00～17：00（12月1日～3月19日）浜のかあさん食堂11：00～14：00こいたのおかず屋10：00～15：00湯けむり処 しかべ焼き10：00～16：00（3月20日～11月30日）10：00～15：00（12月1日～3月19日）駐車場大型：6台普通車：40台スタンプ押印時間24時間押印可能※休館日も押せます※24時間トイレ入口通路内にスタンプコーナーを設置しております。登録年月日平成27年11月5日（2015年）【登録番号117】',
  '道南',
  'https://hokkaido-michinoeki.jp/michinoeki/3174/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'しほろ温泉', NULL, '河東郡士幌町字下居辺西2線134番地',
  43.1382100, 143.3674800,
  '01564-5-3630', '道の駅10：00～21：00', '不定休',
  '十勝',
  'https://hokkaido-michinoeki.jp/michinoeki/2824/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": false, "kids_space": true, "lodging": true, "museum": false, "nursing_room": false, "observatory": false, "onsen": true, "ostomy": false, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": false, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'しゃり', NULL, '斜里郡斜里町本町37番地',
  43.9117800, 144.6641300,
  '0152-26-8888', '道の駅9：00～19：00COBAKO shari9：00～17：30（季節変動あり）', '年末年始（12月31日～1月5日）',
  'オホーツク',
  'https://hokkaido-michinoeki.jp/michinoeki/2905/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'しらたき', NULL, '紋別郡遠軽町奥白滝白滝パーキングエリア（奥白滝IC）に隣接）',
  43.8698600, 143.0763900,
  '0158-48-2175', '物産館（売店）9：00～17：00レストラン9：00～17：00（4月下旬～10月31日）11：00～16：00（11月1日～4月下旬）※休館日・営業時間はやむを得ず変更になる場合がございますのでご確認ください。', '年末年始（12月31日～1月3日）レストラン毎週月曜日※月曜日が祝日の場合は翌日',
  'オホーツク',
  'https://hokkaido-michinoeki.jp/michinoeki/2623/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": true, "credit_card": false, "diaper_changing": false, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'しらぬか恋問館', NULL, '白糠郡白糠町恋問3丁目2-1',
  42.9907190, 144.1898160,
  '01547-5-3317', '本館/直売店9：00～19：00テナント10：00～19：00（LO18：30）※定休日は各テナントによる', '年末年始（12月30日～1月3日）',
  '釧路・根室',
  'https://hokkaido-michinoeki.jp/michinoeki/263/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": true, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": true, "lodging": false, "museum": false, "nursing_room": true, "observatory": false, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'しりうち', NULL, '上磯郡知内町字湯の里48-13',
  41.6012500, 140.3357900,
  '01392-6-2270', '8：30～18：00（4月～10月）9：00～17：00（11月～3月）', '定休日なし（4月～10月）毎週月曜日年末年始（12月30日～1月3日）',
  '道南',
  'https://hokkaido-michinoeki.jp/michinoeki/961/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": false, "information": false, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": true, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": false, "shop": false, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'しんしのつ', NULL, '石狩郡新篠津村第45線北2番地',
  43.2141300, 141.6425200,
  '0126-58-3166', '7：00～21：00※休館日の翌日は10：00開館', '3月17日、4月7日～4月9日、5月7日、6月16日、9月8日、10月20日、11月17日、12月15日～17日※変更する場合があります（要問い合わせ）',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/3070/',
  '{"aed": false, "atm": false, "cafe": false, "campground": true, "cashless": false, "covered_parking": false, "credit_card": false, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": false, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": true, "museum": false, "nursing_room": false, "observatory": true, "onsen": true, "ostomy": false, "park": true, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'そうべつ情報館i（アイ）', NULL, '有珠郡壮瞥町字滝之町384番地1',
  42.5589995, 140.8989406,
  '0142-66-2750', '9：00～17：30（4月1日～11月15日）9：00～17：00（11月16日～3月31日）', '定休日なし（4月1日～11月15日）毎週火曜日（11月16日～3月31日）年末年始（12月31日～1月5日）',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/937/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": true, "nursing_room": true, "observatory": true, "onsen": false, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'たきかわ', NULL, '滝川市江部乙町東11丁目13-3',
  43.6234400, 141.9413600,
  '0125-26-5500070-6525-7172（レストランのみ）', '道の駅、売店9：00～18：00（4月～10月）10：00～17：00（11月～3月）レストラン（キッチンララ）【金曜日以外】11：00～14：00（LO 13：50）15：00～17：00（LO 16：30）【金曜日】11：00～14：00（LO 13：50）15：00～16：30（LO 16：00）18：00～21：00（LO 20：30）※ディナー営業テイクアウト10：00～13：5015：00～16：30', '年末年始（12月31日～1月4日）',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/2107/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": false, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'だて歴史の杜', NULL, '伊達市松ヶ枝町34番地1',
  42.4705700, 140.8755200,
  '0142-25-5567', '道の駅9：00～18：00テナント9：00～18：00（4月～10月）9：00～17：00（11月～3月）', '年末年始（12月31日～1月4日）',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/2253/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": true, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'つど～る・プラザ・さわら', NULL, '茅部郡森町字砂原2丁目358番地1',
  42.1253200, 140.6673800,
  '01374-8-2828', '9：00～17：00', '年末年始（12月30日午後～1月5日）',
  '道南',
  'https://hokkaido-michinoeki.jp/michinoeki/2200/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": false, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": true, "onsen": false, "ostomy": false, "park": false, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'つるぬま', NULL, '樺戸郡浦臼町字キナウスナイ188',
  43.4503000, 141.8358500,
  '0125-68-2626', '10：00～18：00（4月下旬～9月30日）10：00～17：00（10月1日～4月下旬）', '毎週月曜日※月曜日が祝日の場合は翌日年末年始（12月31日～1月4日）',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/2164/',
  '{"aed": false, "atm": false, "cafe": true, "campground": true, "cashless": false, "covered_parking": false, "credit_card": false, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": true, "ostomy": false, "park": true, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'てしお', NULL, '天塩郡天塩町新開通4-7227-2',
  44.8844600, 141.7479000,
  '01632-9-2155', '道の駅9：00～19：00（4月～10月）9：00～17：00（11月～3月）レストラン11：00～17：00（LO16：15）（4月～12月）11：00～15：00（LO14：15）（1月～3月）売店（レストラン内）10：00～17：00（4月～12月）10：00～15：00（1月～3月）SHOP　天塩の國9：00～19：00（4月～10月）9：00～17：00（11月～3月）インフォメーション10：00～17：00（5月～10月）', '道の駅年始（1月1日～1月2日）レストラン、売店（レストラン内）毎週日曜日（11月～4月中旬）※道の駅キップの販売については売店営業時間内となっています',
  '道北',
  'https://hokkaido-michinoeki.jp/michinoeki/2467/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": false, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'てっくいランド大成', NULL, '久遠郡せたな町大成区平浜378',
  42.2126600, 139.8765200,
  '01398-4-6561', '9：00～17：00（4月～10月）9：00～16：00（11月～3月）', '年末年始（12月30日～1月3日）',
  '道南',
  'https://hokkaido-michinoeki.jp/michinoeki/611/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": false, "credit_card": false, "diaper_changing": false, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": false, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": false, "park": false, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'とうま', NULL, '上川郡当麻町宇園別2区',
  43.8440300, 142.4892900,
  '0166-58-8639', '道の駅9：00～18：00御食事処11：00～16：00（LO15：30）', '年末年始（12月31日～1月3日）',
  '道北',
  'https://hokkaido-michinoeki.jp/michinoeki/1677/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": false, "museum": false, "nursing_room": true, "observatory": false, "onsen": false, "ostomy": false, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'とうや湖', NULL, '虻田郡洞爺湖町香川9番地4',
  42.6644900, 140.8219900,
  '0142-87-2200', '道の駅8：30～17：00（4月～10月）9：00～16：00（11月～3月）食堂11：00～15：00（LO15：00）', '定休日なし（4月～10月）毎週火曜日（11月～3月）年末年始（12月29日～1月3日）',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/2974/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": false, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": true, "onsen": false, "ostomy": false, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'とようら', NULL, '虻田郡豊浦町字旭町65-8',
  42.5775600, 140.7223700,
  '0142-83-1010', '道の駅9：00～17：00テイクアウトコーナー10：00～16：00（LO15：30）', '定休日なし（4月～10月）毎週水曜日（11月～3月）年末年始（12月31日～1月5日）※12月30日は直売所のみ12：00まで営業',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/2533/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": false, "shop": false, "toilet": true, "washlet": false, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'なかがわ', NULL, '中川郡中川町字誉498-1',
  44.8016900, 142.0670100,
  '01656-7-2683', '道の駅9：00～17：00レストラン11：00〜13：30売店9：00〜17：00', '年末年始（12月30日〜1月4日）',
  '道北',
  'https://hokkaido-michinoeki.jp/michinoeki/2424/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": false, "kids_space": true, "lodging": false, "museum": false, "nursing_room": true, "observatory": false, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'なかさつない', NULL, '河西郡中札内村大通南7丁目14番地',
  42.6922300, 143.1268600,
  '0155-67-2811', '9：00～18：00（4月～10月）9：00～17：00（11月～3月）※店舗により営業時間、定休日は異なります。', '定休日なし（4月～11月）毎週月曜日（12月～3月）年末年始（12月29日～1月3日）',
  '十勝',
  'https://hokkaido-michinoeki.jp/michinoeki/892/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": true, "lodging": false, "museum": true, "nursing_room": true, "observatory": false, "onsen": false, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": false, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'なとわ・えさん', NULL, '函館市日ノ浜町31番地2',
  41.7794500, 141.1016300,
  '0138-85-4010', '道の駅9：00～18：00（4月～9月）9：00～17：00（10月～3月）売店9：30～17：30（4月～9月）9：30～16：30（10月～3月）レストラン11：00～15：00（LO14：30）※冬期間休業（12月～3月）', '毎週月曜日※月曜日が祝日の場合は翌日年末年始（12月29日～1月3日）',
  '道南',
  'https://hokkaido-michinoeki.jp/michinoeki/2179/',
  '{"aed": false, "atm": false, "cafe": false, "campground": true, "cashless": false, "covered_parking": false, "credit_card": false, "diaper_changing": false, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": false, "kids_space": true, "lodging": false, "museum": false, "nursing_room": false, "observatory": true, "onsen": false, "ostomy": false, "park": true, "parking": true, "rest_area": false, "restaurant": false, "shop": false, "toilet": true, "washlet": false, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'なないろ・ななえ', NULL, '亀田郡七飯町字峠下380-2',
  41.9259800, 140.6572300,
  '0138-86-5195', '9：00～18：00', '年末年始（12月31日～1月3日（予定））',
  '道南',
  'https://hokkaido-michinoeki.jp/michinoeki/14941/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": true, "lodging": false, "museum": false, "nursing_room": true, "observatory": false, "onsen": false, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'にしおこっぺ花夢', NULL, '紋別郡西興部村字上興部37番地',
  44.3359600, 142.8679500,
  '0158-87-2333', '9：00～17：00（3月～10月）9：00～16：00（11月～2月）', '毎週火曜日※火曜日が祝日の場合は翌日',
  'オホーツク',
  'https://hokkaido-michinoeki.jp/michinoeki/2325/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": false, "credit_card": false, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": false, "park": true, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'はなやか(葉菜野花)小清水', NULL, '斜里郡小清水町浜小清水474-7',
  43.9337100, 144.4534700,
  '0152-67-7752', '道の駅9：00～18：00（4月～10月）9：00～17：30（11月～3月）レストラン10：00〜17：00（LO16：30）（4月〜10月）10：00〜16：30（LO16：00）（11月〜3月）', '年始（1月1日）',
  'オホーツク',
  'https://hokkaido-michinoeki.jp/michinoeki/2375/',
  '{"aed": false, "atm": false, "cafe": true, "campground": true, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": false, "kids_space": true, "lodging": false, "museum": false, "nursing_room": false, "observatory": true, "onsen": false, "ostomy": false, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'ひがしかわ「道草館」', NULL, '上川郡東川町東町1丁目1-15',
  43.6972900, 142.5088500,
  '0166-68-4777', '9：00～18：00（4月～9月）9：00～17：00（10月～3月）', '年末年始（12月31日～1月4日）',
  '道北',
  'https://hokkaido-michinoeki.jp/michinoeki/2668/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": false, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'びえい「丘のくら」', NULL, '上川郡美瑛町本町1丁目9番21号',
  43.5921500, 142.4638100,
  '0166-92-0920', '道の駅、売店9：00〜17：00（3月〜5月、9月〜11月）9：00〜18：00（6月〜8月）10：00〜17：00（12月〜2月）香麦食堂11：00〜15：00（LO14：30）', '年末年始（12月31日～1月2日）※12月30日は午前のみ営業',
  '道北',
  'https://hokkaido-michinoeki.jp/michinoeki/2854/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": false, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": true, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'びえい「白金ビルケ」', NULL, '上川郡美瑛町字白金',
  43.5030800, 142.5972300,
  '0166-94-3355', '9：00～17：00（3月～5月、9月～11月）9：00～18：00（6月～8月）10：00～17：00（12月～２月）', '年末年始（12月31日～1月2日）※12月30日は午前のみ営業BETWEEN THE BREAD、美瑛 白金ビルケ THE NORTH FACEコーナー毎週水曜日、毎週木曜日（11月～4月）※年末年始は、変動あり',
  '道北',
  'https://hokkaido-michinoeki.jp/michinoeki/16028/',
  '{"aed": false, "atm": false, "cafe": true, "campground": true, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": true, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": false, "park": false, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'びふか', NULL, '中川郡美深町字大手307番地1',
  44.5588700, 142.3202200,
  '01656-2-1000', '道の駅9：00～18：00（4月下旬～10月）9：00～17：30（11月～4月中旬）レストランTEL 01656-2-3080※営業時間は要確認びふか温泉TEL 01656-2-2900入浴時間11：00～21：0017：30～21：00 ※月曜日のみ', '年末年始（12月31日～1月2日）',
  '道北',
  'https://hokkaido-michinoeki.jp/michinoeki/292/',
  '{"aed": false, "atm": false, "cafe": true, "campground": true, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": true, "museum": false, "nursing_room": true, "observatory": true, "onsen": true, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'ふるびらたらこミュージアム', NULL, '古平郡古平町大字浜町40-4',
  43.2653073, 140.6388457,
  '0135-48-8131', '道の駅9：00〜18：00（4月〜10月）9：00〜17：00（11月〜3月）レストラン11：00〜17：00（LO16：00）※食事がなくなり次第終了の場合ありテイクアウト10：00〜17：00（LO16：00）※季節によって変動ありショップコーナー9：00〜18：00※季節によって変動あり', '年末年始（12月31日～1月3日）※変更の場合あり',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/55776/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": false, "dog_run": true, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'ほっと・はぼろ', NULL, '苫前郡羽幌町北3条1丁目29番地',
  44.3672100, 141.7065100,
  '0164-62-3800', '売店7：00～21：00レストランランチ11：30～14：30（LO14：00）ディナー17：30～20：30（LO20：00）', '年2回メンテナンス休館（4月7日・8日、11月10日・11日）',
  '道北',
  'https://hokkaido-michinoeki.jp/michinoeki/1747/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": true, "museum": false, "nursing_room": false, "observatory": false, "onsen": true, "ostomy": false, "park": true, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'みそぎの郷　きこない', NULL, '上磯郡木古内町字本町338-14',
  41.6778400, 140.4353900,
  '01392-2-3161', '道の駅9：00～18：009：00～17：00（12月～2月）キッチンキーコ9：00～17：00（季節により変動あり）レストランどうなんde`s11：00～14：00（LO）コッペん道土10：00～17：00（なくなり次第終了）', '年末年始（12月31日〜1月1日）レストランどうなん de’s、コッペん道土不定休',
  '道南',
  'https://hokkaido-michinoeki.jp/michinoeki/3158/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": true, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": true, "lodging": false, "museum": false, "nursing_room": true, "observatory": false, "onsen": false, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'みたら室蘭', NULL, '室蘭市祝津町4丁目16番地15',
  42.3419200, 140.9436300,
  '0143-26-2030', '9：30～19：00（4月～10月）9：30～17：00（11月～3月）※館内各店舗の営業時間は店舗により異なります。', '定休日なし（4月～10月）毎週木曜日（11月～3月）※木曜日が祝日の場合は翌日年末年始（12月31日～1月1日）※年末年始の休館日を除く12月30日～翌年の1月7日までの木曜日は営業する',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/1039/',
  '{"aed": false, "atm": false, "cafe": true, "campground": true, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": true, "lodging": false, "museum": true, "nursing_room": true, "observatory": false, "onsen": true, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'みついし', NULL, '日高郡新ひだか町三石鳧舞161-2',
  42.2210700, 142.6342900,
  '0146-34-2333', '道の駅8：45～22：00（4月～9月）8：45～17：30（10月～3月）※各賞への手続き及び道の駅グッズ等の販売手続きは17：00までレストラン（みついし昆布温泉蔵三内）TEL 0146-34-230011：30～14：00（LO）17：00～19：30（LO）特産品販売センターTEL 0146-34-22819：00～18：00（4月～9月）9：00～17：00（10月～3月）', '年末年始（12月31日～1月5日）特産品販売センター毎週水曜日',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/564/',
  '{"aed": false, "atm": false, "cafe": false, "campground": true, "cashless": false, "covered_parking": true, "credit_card": false, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": true, "museum": false, "nursing_room": false, "observatory": true, "onsen": true, "ostomy": false, "park": true, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'みなとま～れ寿都', NULL, '寿都郡寿都町字大磯町29-1',
  42.7954700, 140.2317400,
  '0136-62-2550', '道の駅、売店9：00～18：00（4月～9月）9：00～17：00（10月～3月）飲食コーナー9：00～18：00（LO17：30）（4月～9月）9：00～17：00（LO16：30）（10月～3月）', '定休日なし（4月〜9月）第1・第3月曜日（10月～3月）※月曜日が祝日の場合は翌日年末年始（12月31日～1月1日）',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/2959/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": true, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'むかわ四季の館', NULL, '勇払郡むかわ町美幸3丁目3-1',
  42.5738500, 141.9254500,
  '0145-42-4171', '道の駅8：00～22：00レストラン11：00～14：3017：00～19：50（LO）温泉10：00～22：00', '定休日なし※メンテナンスのため年2回休館日あり',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/2569/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": true, "museum": true, "nursing_room": false, "observatory": false, "onsen": true, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'もち米の里☆なよろ', NULL, '名寄市風連町西町334番地1',
  44.2874100, 142.4137800,
  '01655-7-8686', '道の駅、売店9：00～18：00（4月～10月）9：00～17：00（11月～3月）レストラン11：00～17：00（LO16：30）（4月～10月）11：00～16：30（LO16：00）（11月～3月）', '年始（1月1日）',
  '道北',
  'https://hokkaido-michinoeki.jp/michinoeki/2939/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": false, "kids_space": true, "lodging": false, "museum": false, "nursing_room": true, "observatory": false, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'よってけ！島牧', NULL, '島牧郡島牧村字千走11-1',
  42.6865900, 140.0130000,
  '0136-74-5183', '道の駅9：00～17：00レストラン11：00～14：00', '毎週火曜日※火曜日が祝日の場合は翌日年末年始',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/588/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": false, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": true, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": false, "park": true, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'らんこし・ふるさとの丘', NULL, '磯谷郡蘭越町字相生969',
  42.7621511, 140.4793286,
  '0136-55-3251', '9：00～17：00（4月～10月）9：00～16：00（11月～3月）', '定休日なし（4月～10月）毎週火曜日（11月～3月）年末年始（12月31日～1月5日）',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/2519/',
  '{"aed": false, "atm": false, "cafe": false, "campground": true, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": false, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": false, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": false, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'るもい', NULL, '留萌市船場町2丁目114',
  43.9444000, 141.6487500,
  '0164-43-1501', '道の駅9：00～17：00屋内交流・遊戯施設「ちゃいるも」9：00～17：00「ちゃいるも」内 遊戯広場10：00～16：00※平日クール制なし土日祝日・夏休み・冬休み期間3クール制1クール 10：00～11：302クール 12：30～14：003クール 14：30～16：00', '年末年始（12月29日～1月3日）',
  '道北',
  'https://hokkaido-michinoeki.jp/michinoeki/23225/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": true, "ev_charger": true, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": true, "lodging": false, "museum": false, "nursing_room": true, "observatory": false, "onsen": false, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'わっかない', NULL, '稚内市開運2丁目',
  45.4169900, 141.6768600,
  '0162-29-0277', '休憩コーナー5：00～22：00観光案内所9：00～18：00売店8：30～18：00（7月～9月）9：00～18：00（10月～6月）カフェ8：00～17：00食事処10：00～17：00スイーツ店10：00～17：00', '年末年始（12月30日～1月1日）観光案内所年末年始売店、飲食店年末年始（12月30日～1月1日）スイーツ店毎週水曜日、年末年始',
  '道北',
  'https://hokkaido-michinoeki.jp/michinoeki/3126/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": true, "lodging": false, "museum": false, "nursing_room": true, "observatory": false, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'ウトナイ湖', NULL, '苫小牧市字植苗156ｰ30',
  42.6999400, 141.6946000,
  '0144-58-4137', '道の駅、売店9：00～18：00（3月～10月）9：00～17：00（11月～2月）レストラン・軽食各テナントによる', '年末年始（12月31日～1月2日）',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/3038/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": true, "lodging": false, "museum": false, "nursing_room": true, "observatory": true, "onsen": false, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'オスコイ！かもえない', NULL, '古宇郡神恵内村大字赤石村字大森292-1',
  43.1653500, 140.3856000,
  '0135-76-5800', '9：00～17：00', '年末年始（12月31日～1月3日）',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/881/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": false, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": true, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": false, "park": false, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'オホーツク紋別', NULL, '紋別市元紋別11',
  44.3283200, 143.3749500,
  '0158-23-5400', '9：00〜17：00', '毎週月曜日※月曜日が祝日の場合は翌日定休日なし（1月4日〜3月31日）年末年始（12月29日〜1月3日）',
  'オホーツク',
  'https://hokkaido-michinoeki.jp/michinoeki/626/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": true, "nursing_room": true, "observatory": true, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'オーロラタウン93りくべつ', NULL, '足寄郡陸別町大通',
  43.4677100, 143.7423700,
  '0156-27-2012', '観光物産館8：00～18：00（4月～10月）9：00～17：00（11月～3月）', '観光物産館年末年始（12月30日～1月3日）',
  '十勝',
  'https://hokkaido-michinoeki.jp/michinoeki/2355/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": true, "museum": true, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'ガーデンスパ十勝川温泉', NULL, '河東郡音更町十勝川温泉北14丁目1',
  42.9331600, 143.3012500,
  '0155-46-2447', '道の駅月曜日～木曜日9：00～19：00（5月～10月）金曜日～日曜日、祝日9：00～21：00（5月～10月）9：00～19：00（11月～4月）道の駅記念きっぷの販売9：00～18：00※その他、道の駅グッズ販売時間は公式HP等でご確認ください。※休館日・開館時間は変更になる場合があります。※各店舗により定休日・営業時間は異なります。事前に公式HP等でご確認ください。', '第2火曜日（5月～10月）※8月は第4火曜日毎週火曜日（11月～4月）※火曜日が祝日の場合は翌日年始（1月1日）',
  '十勝',
  'https://hokkaido-michinoeki.jp/michinoeki/26870/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": true, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": false, "nursing_room": true, "observatory": false, "onsen": true, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'コスモール大樹', NULL, '広尾郡大樹町西本通98番地',
  42.4894200, 143.2739300,
  '01558-6-5220', '特産品コーナー9：00〜17：30※十勝バス大樹案内所も同じコープさっぽろ たいき店9：00〜20：00', '年末年始特産品コーナー（12月31日〜1月3日）コープさっぽろ たいき店（1月1日、2日）※各テナント臨時休業あり',
  '十勝',
  'https://hokkaido-michinoeki.jp/michinoeki/2483/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": true, "lodging": false, "museum": false, "nursing_room": true, "observatory": false, "onsen": false, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'サラブレッドロード新冠', NULL, '新冠郡新冠町字中央町1番地の20',
  42.3597400, 142.3158700,
  '0146-45-7070', '9：00～18：00（GW及び7月～9月）10：00～17：00（11月～2月）10：00～18：00（上記以外）', '毎週月曜日（11月～3月）※月曜日が祝日の場合は翌日年末年始（12月30日～1月3日）',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/988/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": true, "nursing_room": false, "observatory": true, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'サロマ湖', NULL, '常呂郡佐呂間町字浪速121-3',
  44.0996900, 143.8237100,
  '01587-5-2828', '道の駅9：00～18：00（4月中旬～10月中旬）9：00～17：00（10月中旬～4月中旬）ファーストフードコーナー9：30～16：00', '年末年始（12月30日～1月3日）',
  'オホーツク',
  'https://hokkaido-michinoeki.jp/michinoeki/1787/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": true, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": false, "park": false, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'サンフラワー北竜', NULL, '雨竜郡北竜町字板谷163番地2',
  43.7510800, 141.8752500,
  '0164-34-3321', '道の駅8：00～22：00レストラン11：00～14：30（LO14：00）17：00～20：00（LO19：30）売店8：00～21：00', '11月中旬に4日間レストラン毎週水曜日（7月、8月を除く）',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/546/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": true, "museum": false, "nursing_room": true, "observatory": false, "onsen": true, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'サーモンパーク千歳', NULL, '千歳市花園2丁目4番2号',
  42.8341300, 141.6590200,
  '0123-29-3972', '道の駅9：00～17：00（通年）レストラン、フードコート（一部店舗除く）10：00～16：00（LO）BonBonBERRY HOKKAIDO STAND9：00～16：00（LO）ベーカリー空とメロン9：00～17：00 ※なくなり次第終了※冬期は飲食店の営業時間に変更の可能性あり', '定休日なし（通年）',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/2654/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": true, "lodging": false, "museum": false, "nursing_room": true, "observatory": false, "onsen": false, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'シェルプラザ・港', NULL, '磯谷郡蘭越町港町1402番地1',
  42.8800800, 140.3700700,
  '0136-56-2700', '9：00～17：00（4月～10月）9：00～16：00（11月～3月）', '定休日なし（4月～10月）毎週火曜日（11月～3月）年末年始（12月31日～1月5日）',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/2702/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": false, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": false, "museum": true, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": false, "park": false, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": false, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'スタープラザ　芦別', NULL, '芦別市北4条東1丁目1番地',
  43.5252000, 142.1893600,
  '0124-23-1437', '道の駅9：00～18：00（4月～6月、9月～10月）9：00～19：00（7月～8月）9：00～17：00（11月～3月）レストラン11：00～18：00（4月～6月、9月～10月）11：00～19：00（7月～8月）10：00～17：00（11月～3月）売店9：30～17：00（4月～6月、9月～3月）9：30～18：00（7月～8月）※都合により休館日や閉館時間が変更になる事がありますので、詳しくはお問い合わせください。また、レストランは準備中の時間帯があります。', '定休日なし（5月～10月）毎週木曜日※木曜日が祝日の場合は翌日年末年始（12月31日～1月3日）',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/202/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": true, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": true, "lodging": false, "museum": true, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'ステラ★ほんべつ', NULL, '中川郡本別町北3丁目1-1',
  43.1256706, 143.6132501,
  '0156-22-5819', '道の駅9：00～18：00（4月末～10月）9：00～17：00（11月～4月）9：00～13：00（12月30日）レストラン11：30～14：0017：00～20：00', '年末年始（12月31日～1月3日）レストラン毎週火曜日※施設メンテナンスの為11月中に休館日あり※振替休日・臨時休業あり（レストラン）',
  '十勝',
  'https://hokkaido-michinoeki.jp/michinoeki/3021/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": false, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'スペース・アップルよいち', NULL, '余市郡余市町黒川町6-4-1',
  43.1888800, 140.7888000,
  '0135-22-1515', '宇宙記念館・ミュージアムショップ、売店9：00～17：00', '余市宇宙記念館、ミュージアムショップ毎週月曜日（4月21日～11月30日）冬期休館（12月1日～4月17日）売店定休日なし（4月21日～11月3日）毎週月曜日（11月10日～4月13日）※月曜日が祝日の場合は翌日年末年始（12月28日～1月3日）',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/1699/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": true, "nursing_room": true, "observatory": false, "onsen": false, "ostomy": false, "park": false, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": false, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'スワン44ねむろ', NULL, '根室市酪陽1番地',
  43.2617700, 145.4385700,
  '0153-25-3055', '道の駅9：00～17：00（4月～10月）10：00～16：00（11月～3月）レストラン11：00～15：30（LO15：00）（4月～10月）11：00～14：30（LO14：00）（11月～3月）', '毎週月曜日※月曜日が祝日の場合は翌日年末年始（12月29日～1月5日）',
  '釧路・根室',
  'https://hokkaido-michinoeki.jp/michinoeki/2143/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": true, "onsen": false, "ostomy": false, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'ニセコビュープラザ', NULL, '虻田郡ニセコ町字元町77番地10',
  42.7993800, 140.7021400,
  '0136-43-2051', '道の駅9：00～18：00農産物直売コーナー8：30～17：00（4月下旬～10月）9：00～17：00（11月～4月下旬）テイクアウトコーナー9：30～16：30（4月下旬～10月）10：00～16：00（11月～4月下旬）', '年末年始（12月31日～1月3日）農産物直売コーナー年末年始テイクアウトコーナー年末年始 定休日あり※店舗によって異なります',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/949/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": false, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'ノンキーランド　ひがしもこと', NULL, '網走郡大空町東藻琴100番地',
  43.8450000, 144.2947000,
  '0152-66-3600', '売店9：00〜18：00レストランランチタイム11：00〜15：00（LO14：00）ディナータイム17：00〜20：00（LO19：00）', '年末年始（12月31日〜1月5日）',
  'オホーツク',
  'https://hokkaido-michinoeki.jp/michinoeki/13538/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": false, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": true, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'ハウスヤルビ奈井江', NULL, '空知郡奈井江町字奈井江28番地1',
  43.4331800, 141.8887300,
  '0125-65-4601', '道の駅8：30～18：00喫茶みみずく10：00～17：00（4月中旬～10月）10：00～16：00（11月～4月中旬）ミルクファクトリー10：00～17：00（4月中旬～10月）毎週木曜日10：00～16：30（4月中旬～10月）10：00～16：00（11月～4月中旬）', '喫茶みみずく毎週月曜日、年末年始ミルクファクトリー年末年始',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/722/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": false, "diaper_changing": false, "dog_run": true, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": false, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": false, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'パパスランドさっつる', NULL, '斜里郡清里町字神威1071番地',
  43.7903700, 144.5340000,
  '0152-26-2288', '道の駅9：00～21：00レストラン10：30～16：30（LO16：00）売店9：00～20：00温泉10：00～21：00（最終受付20：00）', '年始（1月1日～1月2日）レストラン定休日なし',
  'オホーツク',
  'https://hokkaido-michinoeki.jp/michinoeki/2920/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": false, "dog_run": true, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": true, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'ピア21しほろ', NULL, '河東郡士幌町字士幌西2線134番地1',
  43.1443500, 143.2393500,
  '01564-5-3940', '道の駅9：00～17：009：00～18：00（GW、お盆休み期間）にじいろ食堂11：00～15：00カフェ 寛一9：00～17：00（LO16：30）', '年末年始（12月31日～1月5日）',
  '十勝',
  'https://hokkaido-michinoeki.jp/michinoeki/1001/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": true, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": true, "lodging": false, "museum": false, "nursing_room": true, "observatory": false, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'ピンネシリ', NULL, '枝幸郡中頓別町字敏音知72-7',
  44.8774000, 142.2134600,
  '01634-7-8510', '9：00～17：30', '年末年始（12月30日～1月3日）',
  '道北',
  'https://hokkaido-michinoeki.jp/michinoeki/842/',
  '{"aed": false, "atm": false, "cafe": false, "campground": true, "cashless": false, "covered_parking": false, "credit_card": false, "diaper_changing": false, "dog_run": true, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": true, "museum": false, "nursing_room": false, "observatory": false, "onsen": true, "ostomy": false, "park": true, "parking": true, "rest_area": false, "restaurant": false, "shop": false, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'マオイの丘公園', NULL, '夕張郡長沼町東10線南7番地',
  42.9496500, 141.7168500,
  '0123-84-2120', '道の駅7：30～18：00（4月～11月）9：00～17：00（12月～3月）1階：売店9：00～18：00（4月～11月）9：00～17：00（12月～3月）2階：ピッツェリアモーニング7：30～10：30（LO10：00）（4月～10月）ランチ11：00～16：00（LO15：30）（4月～11月）11：00～15：00（LO15：00）（12月～3月）カフェタイム15：00～17：00（LO16：30）（12月～3月）4階：屋上展望台（冬期閉鎖）開放時間10：00～17：00（4月、11月）10：00～18：00（5月～10月）※営業時間は変更になる場合があります。事前に公式HP（https://maoinooka.jp/）でご確認ください。', '年末年始（12月31日～1月3日）ピッツェリア毎週水曜日（12月～3月）',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/906/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": false, "museum": false, "nursing_room": true, "observatory": true, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'マリーンアイランド岡島', NULL, '枝幸郡枝幸町岡島1978番地13',
  44.8783400, 142.6318700,
  '0163-62-2860', '道の駅9：00～16：30（4月下旬～6月、10月）9：00～17：00（7月～9月）9：30～15：30（11月～4月下旬）レストラン10：00～14：00（4月～10月）11：00～13：30（11月～3月）', '毎週月曜日年末年始※冬期間悪天候時に休館レストラン不定休',
  '道北',
  'https://hokkaido-michinoeki.jp/michinoeki/768/',
  '{"aed": false, "atm": false, "cafe": true, "campground": true, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": false, "museum": false, "nursing_room": true, "observatory": true, "onsen": false, "ostomy": false, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'メルヘンの丘めまんべつ', NULL, '網走郡大空町女満別昭和96番地の1',
  43.9173800, 144.1886400,
  '0152-75-6165', '9：00～18：00', '年末年始（12月30日～1月5日）',
  'オホーツク',
  'https://hokkaido-michinoeki.jp/michinoeki/2548/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": true, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": false, "park": true, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'ライスランドふかがわ', NULL, '深川市音江町広里59-7',
  43.6995700, 142.0706600,
  '0164-26-3636', '道の駅9：00～18：00（4月～10月）9：00～17：00（11月～3月）レストラン11：00～20：00（LO19：00）（4月～10月）11：00～18：00（LO17：00）（11月～3月）※その他店舗により異なります', '年末年始（12月31日～1月2日）',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/2390/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  'ルート２２９元和台', NULL, '爾志郡乙部町字元和169',
  42.0115100, 140.1063200,
  '0139-62-3009', '8：30～18：00（4月～10月）9：00～16：00（11月～3月）', '年末年始（12月30日～1月3日）',
  '道南',
  'https://hokkaido-michinoeki.jp/michinoeki/704/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": true, "credit_card": false, "diaper_changing": false, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": true, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '三笠', NULL, '三笠市岡山1056番地1',
  43.2466200, 141.8043800,
  '01267-2-5775', '道の駅8：30～17：00売店9：00～17：00レストラン11：00～23：00', '毎週月曜日※月曜日が祝日の場合は翌日年末年始（12月30日～1月4日）※レストラン（ラーメンだるまや）は不定休',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/172/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": true, "credit_card": false, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": true, "museum": false, "nursing_room": false, "observatory": false, "onsen": true, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '上ノ国もんじゅ', NULL, '檜山郡上ノ国町字原歌3',
  41.8085000, 140.0950900,
  '0139-55-3955', '文珠館9：00～17：00特産品販売所9：00～17：00（4月～10月）10：00～17：00（11月～3月）レストラン11：00～15：00（LO14：30）', '文珠館年末年始（12月31日～1月5日）特産品販売所、レストラン定休日なし（4月～10月）毎週月曜日（11月～3月）※月曜が祝日の場合は翌平日※年末年始は要問い合わせ',
  '道南',
  'https://hokkaido-michinoeki.jp/michinoeki/870/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": true, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": true, "onsen": false, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '北オホーツクはまとんべつ', NULL, '枝幸郡浜頓別町中央北21番地1',
  45.1250824, 142.3605813,
  '01634-8-7887', '道の駅9：00～19：00（4月～10月）9：00～18：00（11月～3月）交流ショップ（道の駅グッズ、特産品）9：00～18：00こんがり堂（パン、土産）9：00～18：00', '年末年始（12月29日〜1月3日）',
  '道北',
  'https://hokkaido-michinoeki.jp/michinoeki/19522/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": false, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": true, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '北前船 松前', NULL, '松前郡松前町字唐津379番地',
  41.4266000, 140.1072700,
  '0139-46-2211', '道の駅9：00～17：00（通年）食堂11：00～15：00（LO14：30）', '年末年始（12月31日～1月1日）※12月30日、1月2日は売店のみの営業（9：00～15：00）',
  '道南',
  'https://hokkaido-michinoeki.jp/michinoeki/3007/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": false, "credit_card": false, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": true, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '北欧の風 道の駅とうべつ', NULL, '石狩郡当別町当別太774番地11',
  43.1772000, 141.4480700,
  '0133-27-5260', '道の駅9：00～17：00（3月～12月）10：00～16：00（1月～2月）レストラン11：00～16：00（LO）（3月～12月）11：00～15：00（LO）（1月～2月）※天候により閉店時間が変動することがあります。', '定休日なし（3月～12月）毎週水曜日（1月・2月のみ）年末年始（12月30日～1月3日）',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/13542/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": true, "lodging": false, "museum": false, "nursing_room": true, "observatory": false, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '南ふらの', NULL, '空知郡南富良野町字幾寅687番地',
  43.1696400, 142.5728000,
  '0167-52-2100', '道の駅9：00～17：00（4月～5月）（10月～3月）9：00～19：00（6月～9月）', '年末年始（12月31日～1月2日）※冬期2日程度臨時休館あり',
  '道北',
  'https://hokkaido-michinoeki.jp/michinoeki/222/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": true, "ev_charger": true, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": true, "lodging": true, "museum": false, "nursing_room": true, "observatory": false, "onsen": false, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '厚岸グルメパーク', NULL, '厚岸郡厚岸町住の江２丁目２番地',
  43.0576200, 144.8440800,
  '0153-52-4139', '道の駅9：00～18：00（4月）9：00～19：00（5月～9月）10：00～18：00（10月～3月）※各飲食店舗や売店の営業時間と異なります。詳しくは「厚岸味覚ターミナル・コンキリエHP」をご覧ください。', '毎週月曜日※月曜日が祝日の場合は翌日年末年始（12月27日～1月2日）',
  '釧路・根室',
  'https://hokkaido-michinoeki.jp/michinoeki/531/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": true, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": true, "lodging": false, "museum": false, "nursing_room": false, "observatory": true, "onsen": false, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '名水の郷きょうごく', NULL, '虻田郡京極町字川西45番地1',
  42.8589500, 140.8708400,
  '0136-42-2292', '道の駅9：00〜17：00売店9：00〜17：00レストラン11：00〜16：00（LO15：30）', '定休日なし（4月中旬〜11月）毎週水曜日（12月〜4月中旬）年末年始（12月29日〜1月5日）※4月中旬〜11月の水曜日のレストランは喫茶のみの営業',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/2841/',
  '{"aed": false, "atm": false, "cafe": true, "campground": true, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": true, "onsen": true, "ostomy": false, "park": true, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '夕張メロード', NULL, '夕張市紅葉山526-19',
  42.9369200, 142.0379900,
  '0123-53-8111', '9：00～18：00（4月23日～4月30日）9：00～18：30（5月2日～8月）10：00～18：30（9月1日～9月30日）10：00～18：00（10月～12月）10：00～17：30（1月～2月）10：00～18：00（3月～4月21日）※変更の可能性あり', '毎週月曜日1月31日、5月1日、7月31日、10月31日、11月19日年始（1月1日～1月5日）',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/3083/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": false, "park": false, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": false, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '忠類', NULL, '中川郡幕別町忠類白銀町384番地12',
  42.5589300, 143.2991700,
  '01558-8-3236', '9：00～18：00（4月～11月）9：00～17：00（12月～3月）', '年末年始（12月31日～1月3日）',
  '十勝',
  'https://hokkaido-michinoeki.jp/michinoeki/407/',
  '{"aed": false, "atm": false, "cafe": true, "campground": true, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": true, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": true, "museum": true, "nursing_room": true, "observatory": true, "onsen": true, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '愛ランド湧別', NULL, '紋別郡湧別町志撫子6番地',
  44.1314000, 143.7190500,
  '01586-8-2455', 'レストラン11：00〜16：00物販9：30〜17：00', '毎週月曜日年末年始（12月30日～1月4日）',
  'オホーツク',
  'https://hokkaido-michinoeki.jp/michinoeki/1951/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": false, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": false, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '摩周温泉', NULL, '川上郡弟子屈町湯の島3丁目5番5号',
  43.4924000, 144.4476100,
  '015-482-2500', '8：00～18：00（5月～10月）9：00～17：00（11月～4月）', '年末年始（12月30日～1月3日）',
  '釧路・根室',
  'https://hokkaido-michinoeki.jp/michinoeki/440/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": true, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": false, "nursing_room": true, "observatory": false, "onsen": true, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '望羊中山', NULL, '虻田郡喜茂別町字川上345番地',
  42.8559300, 141.0972000,
  '0136-33-2671', '道の駅8：30～17：30売店、テイクアウトコーナー8：30～17：25レストラン11：00～15：00', '道の駅定休日なし（通年）レストラン毎週火曜日、水曜日',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/364/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": true, "onsen": false, "ostomy": false, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": false, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '森と湖の里ほろかない', NULL, '雨竜郡幌加内町字政和第一',
  44.1144100, 142.1383300,
  '0165-37-2070', '道の駅10：00～21：00（入浴最終受付20：30）※12月29日～1月3日は営業時間の短縮ありレストラン昼の部　11：30～14：00夜の部　17：00～20：30（LO20：00）17：00～20：00（LO19：30）（12月～3月）※夜の部の営業時間は変更になる場合もございます売店10：00～20：30幌加内町物産館10：00～17：00', '道の駅毎週水曜日せいわ温泉ルオント毎週水曜日※水曜日が祝日の場合は翌日幌加内町物産館毎週火曜日（冬期間休業）',
  '道北',
  'https://hokkaido-michinoeki.jp/michinoeki/2038/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": false, "nursing_room": true, "observatory": false, "onsen": true, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '横綱の里ふくしま', NULL, '松前郡福島町字福島143-1',
  41.4796100, 140.2556500,
  '0139-47-4072', '9：00～17：00', '年末年始（12月30日～1月4日）',
  '道南',
  'https://hokkaido-michinoeki.jp/michinoeki/973/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": false, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": false, "information": true, "kids_space": false, "lodging": false, "museum": true, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": false, "park": false, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": false, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '樹海ロード日高', NULL, '沙流郡日高町本町東1丁目298番地の１',
  42.8768300, 142.4420700,
  '01457-6-2008（日高総合支所）01457-6-2106（カーナビ検索）', '道の駅9：00～19：00（木曜日は9：00～18：00）そば処11：00～19：00喫茶店9：00～17：00特産品直売所9：00～17：00※営業時間は季節に より変更の可能性あり売店10：00～19：00（5月～10月）10：00～18：00（11月～4月）無料休憩所9：00～19：00（木曜日は9：00～18：00）', '年末年始（12月31日～1月3日）そば処毎週木曜日喫茶店毎週月曜日※不定休日あり特産品直売所※定休日は季節により変更の可能性あり売店毎週木曜日',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/921/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": false, "museum": true, "nursing_room": true, "observatory": false, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '江差', NULL, '檜山郡江差町字尾山町１番地',
  41.8942700, 140.1392700,
  '0139-52-1177', '9：00～17：00（4月～11月）10：00～16：00（12月～3月）', '定休日なし（4月～10月）毎週月曜日（11月～3月）※月曜日が祝日の場合は翌日年末年始（12月31日～1月5日）',
  '道南',
  'https://hokkaido-michinoeki.jp/michinoeki/321/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": true, "credit_card": false, "diaper_changing": false, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": false, "park": false, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '流氷街道網走', NULL, '網走市南3条東4丁目5-1',
  44.0220600, 144.2739800,
  '0152-67-5007', '道の駅9：00～18：30（4月～9月）9：00～18：00（10月～3月）観光案内所・地域特産品販売コーナー9：00～18：00テイクアウトコーナー10：00～16：00休憩・飲食コーナー11：00～15：30', '年末年始（12月31日～1月1日）',
  'オホーツク',
  'https://hokkaido-michinoeki.jp/michinoeki/2986/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": true, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '田園の里うりゅう', NULL, '雨竜郡雨竜町字満寿28番地3',
  43.6624100, 141.8940700,
  '0125-79-2100', '9：00～17：00（3月～10月）9：00～18：00（5月のGW、8月／7月と9月の土、日、祝日）10：00～16：00（11月～2月）', '年末年始（12月31日～1月4日）',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/1026/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": true, "nursing_room": true, "observatory": false, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '真狩フラワーセンター', NULL, '虻田郡真狩村字光8番地3',
  42.7623300, 140.8078000,
  '0136-48-2007', '道の駅9：00～17：30（4月下旬～10月31日）9：30～16：30（11月1日～4月下旬）本館内 レストラン11：00～15：30（LO15：00）（4月下旬～10月31日）11：00～14：30（LO14：00）（11月1日～4月下旬）別棟 敷地内軽食9：00～18：00（4月下旬～10月31日）9：30～16：30（11月～4月下旬）', '年末年始（12月31日～1月3日）本館内 レストラン※夏期冬期とも不定休別棟 敷地内軽食毎週火曜日（4月下旬～10月31日）毎週火曜日、水曜日（11月～4月下旬）※祝日の臨時開業、荒天時の臨時休業あり',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/2715/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": true, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": true, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '知床・らうす', NULL, '目梨郡羅臼町本町361-1※国道334号知床横断道路は冬期間（11月～4月）通行止めになります',
  44.0172280, 145.1919866,
  '0153-87-3330', '9：00～17：00（4月～10月）10：00～16：00（11月～3月）', '年末年始（12月29日～1月5日）',
  '釧路・根室',
  'https://hokkaido-michinoeki.jp/michinoeki/2217/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": false, "credit_card": false, "diaper_changing": true, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": false, "information": true, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": true, "onsen": false, "ostomy": false, "park": false, "parking": true, "rest_area": false, "restaurant": false, "shop": false, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '石狩「あいろーど厚田」', NULL, '石狩市厚田区厚田98番地2',
  43.4042900, 141.4313400,
  '0133-78-2300', '9：30～18：00（4月～5月）（9月～10月）9：30～18：00（6月～8月）10：00～16：00（11月～3月）', '年末年始（12月29日～1月3日）そば処一純、BAKERY&PIZZA HOME（11月1日～3月31日 冬期休業）石狩二三一、GEALATO LICOLICO 厚田店（11月上旬～3月下旬 冬期休業）',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/14938/',
  '{"aed": false, "atm": false, "cafe": true, "campground": true, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": false, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": true, "lodging": false, "museum": false, "nursing_room": true, "observatory": true, "onsen": false, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '絵本の里けんぶち', NULL, '上川郡剣淵町東町2420番地',
  44.0937500, 142.3914900,
  '0165-34-3811', '9：00～17：00（5月～9月）9：00～16：00（10月～4月）10：00～15：00（1月2日・3日）', '年末年始（12月31日～1月1日）※※設備等の点検にともなう臨時休業あり',
  '道北',
  'https://hokkaido-michinoeki.jp/michinoeki/2782/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": true, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": true, "lodging": false, "museum": false, "nursing_room": true, "observatory": false, "onsen": false, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '縄文ロマン　南かやべ', NULL, '函館市臼尻町551-1',
  41.9277400, 140.9451100,
  '0138-25-2030', '道の駅9：00～17：00（4月～10月）9：00～16：30（11月～3月）', '毎週月曜日※月曜日が祝日の場合は翌日年末年始（12月29日～1月3日）',
  '道南',
  'https://hokkaido-michinoeki.jp/michinoeki/3114/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": true, "credit_card": false, "diaper_changing": false, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": true, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '羊のまち 侍・しべつ', NULL, '士別市大通東5丁目440番地23',
  44.1763898, 142.3929001,
  '0165-26-7353', '道の駅9：00～18：00（5月～10月）10：00～17：00（11月～4月）レストラン10：00～20：30（LO20：00）アンテナショップ9：00～18：00（5月～10月）10：00～17：00（11月～4月）', '年末年始（12月31日～1月3日）',
  '道北',
  'https://hokkaido-michinoeki.jp/michinoeki/33477/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": false, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": true, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '自然体感　しむかっぷ', NULL, '勇払郡占冠村字中央',
  42.9788000, 142.3976400,
  '0167-39-8010', '道の駅9：00～18：00（4月1日～10月31日）9：00～17：00（11月1日～3月31日）売店㈲エムアイ企画 9：00～17：00※道の駅切符・道の駅ピンズガチャラリー取扱店', '年末年始（12月31日～1月3日）飲食店※各飲食店定休日・臨時休業あり',
  '道北',
  'https://hokkaido-michinoeki.jp/michinoeki/2298/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": false, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": false, "handicap_toilet": true, "information": true, "kids_space": true, "lodging": false, "museum": false, "nursing_room": true, "observatory": false, "onsen": false, "ostomy": false, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '花ロードえにわ', NULL, '恵庭市南島松817番地18',
  42.8972700, 141.5857300,
  '0123-37-8787', '道の駅9：00～18：00（4月～10月）9：00～17：00（11月～3月）飲食9：00～18：00（LO17：30）（4月～10月）9：00～17：00（LO16：30）（11月～3月）', '年末年始（12月31日～1月2日）',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/2684/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": false, "dog_run": false, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": true, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '遠軽 森のオホーツク', NULL, '紋別郡遠軽町野上150番地1',
  44.0219300, 143.4958300,
  '0158-42-4536', '道の駅9：00～18：00ドッグラン9：00～18：00または日没※冬期休業フードコートソフトドリンク・ソフトクリーム9：00～17：30（LO17：00）ホットスナック・食事10：00～17：30（LO17：00）ショップ・高濃度炭酸泉足湯9：00～18：00えんがるロックバレースキー場9：00～20：00（12月中旬～3月下旬）※ゲレンデ状況や気象状況、施設の都合などにより変更及び営業を休止または中止する場合があります。※リフトの最終乗車は、営業終了時間15分前となります。※夏期アクティビティ営業については道の駅HP（https://engaru-mori-no-okhotsk.jp/）を確認下さい。', '定休日なし（通年）',
  'オホーツク',
  'https://hokkaido-michinoeki.jp/michinoeki/22139/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": true, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": false, "museum": false, "nursing_room": true, "observatory": true, "onsen": false, "ostomy": false, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '鐘のなるまち・ちっぷべつ', NULL, '雨竜郡秩父別町2085番地',
  43.7649200, 141.9651500,
  '0164-33-3902', '9：00～17：00（4月～10月）9：00～16：00（11月～3月）', '毎週火曜日（11月～3月）年末年始（12月30日～1月5日）',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/2732/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": false, "credit_card": false, "diaper_changing": false, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": true, "museum": false, "nursing_room": false, "observatory": false, "onsen": true, "ostomy": false, "park": false, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '阿寒丹頂の里', NULL, '釧路市阿寒町上阿寒２３線３６番地１',
  43.1442500, 144.1449500,
  '0154-66-2969', '道の駅9：00～18：00（5月～9月）9：00～17：00（10月～4月）レストラン11：00～20：30（LO20：00）', '年中無休※設備メンテナンス等による休館の際は告知します',
  '釧路・根室',
  'https://hokkaido-michinoeki.jp/michinoeki/810/',
  '{"aed": false, "atm": false, "cafe": true, "campground": true, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": true, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": true, "museum": true, "nursing_room": true, "observatory": false, "onsen": true, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '風Ｗとままえ', NULL, '苫前郡苫前町字苫前119番地の１',
  44.3132300, 141.6565200,
  '0164-64-2810', '道の駅7：00～22：00（通年）レストラン11：30～15：00（LO14：30）17：00～21：00（LO20：30）売店（直売所）8：00～18：00', '定休日なし（通年）',
  '道北',
  'https://hokkaido-michinoeki.jp/michinoeki/2805/',
  '{"aed": false, "atm": false, "cafe": true, "campground": true, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": true, "museum": false, "nursing_room": false, "observatory": false, "onsen": true, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '香りの里たきのうえ', NULL, '紋別郡滝上町旭町',
  44.1968100, 143.0910700,
  '0158-29-3300', '道の駅、1F 特産品案内所9：00～17：302F 観光案内所（オホーツクユニバーサルツーリズムセンター滝上 併設）9：00～17：00', '棚卸日（9月、3月）年末年始（12月30日～1月3日）',
  'オホーツク',
  'https://hokkaido-michinoeki.jp/michinoeki/1016/',
  '{"aed": false, "atm": false, "cafe": true, "campground": false, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": true, "dog_run": true, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": false, "lodging": false, "museum": false, "nursing_room": true, "observatory": false, "onsen": false, "ostomy": true, "park": false, "parking": true, "rest_area": false, "restaurant": false, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '２３０ルスツ', NULL, '虻田郡留寿都村字留寿都127-191',
  42.7400600, 140.8846700,
  '0136-47-2068', '道の駅9：00～18：00（4月～10月）9：00～17：00（11月～3月）', '年末年始（12月31日～1月4日）',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/2442/',
  '{"aed": false, "atm": false, "cafe": false, "campground": false, "cashless": false, "covered_parking": true, "credit_card": false, "diaper_changing": false, "dog_run": true, "ev_charger": false, "experience": false, "farm_market": true, "handicap_toilet": true, "information": false, "kids_space": false, "lodging": false, "museum": false, "nursing_room": false, "observatory": false, "onsen": false, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);

INSERT INTO stations (
  name, name_kana, address, latitude, longitude,
  phone, business_hours, closed_days,
  area_group, website_url, facilities
) VALUES (
  '２７５つきがた', NULL, '樺戸郡月形町81番地10',
  43.3411165, 141.6800721,
  '0126-37-2188', '道の駅9：00～21：00日帰り温泉11：00～21：00（最終入場20：30）売店9：00～21：00レストラン・テイクアウト11：00～19：30（LO19：00）※冬期間の営業時間が変更になる場合もございます。産地直売所10：00～17：00（冬期休業）', '毎月第3火曜日※第3火曜日が祝日の場合は翌日産地直売所毎週火曜日（祝日の場合営業）',
  '道央',
  'https://hokkaido-michinoeki.jp/michinoeki/53300/',
  '{"aed": false, "atm": false, "cafe": false, "campground": true, "cashless": false, "covered_parking": true, "credit_card": true, "diaper_changing": false, "dog_run": false, "ev_charger": true, "experience": false, "farm_market": true, "handicap_toilet": true, "information": true, "kids_space": true, "lodging": true, "museum": false, "nursing_room": false, "observatory": false, "onsen": true, "ostomy": true, "park": true, "parking": true, "rest_area": false, "restaurant": true, "shop": true, "toilet": true, "washlet": true, "wifi": true}'::jsonb
);
