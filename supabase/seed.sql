-- ============================================================
-- 道の駅シードデータ（北海道）
-- 出典: 国土数値情報（道の駅データ）（国土交通省）
-- https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-P35.html
-- 元データ: P35-18（2018年時点）
-- 生成日時: 2026-02-10T14:01:52.706133
-- データ件数: 122
-- ============================================================

-- 既存データをクリア（開発環境用）
TRUNCATE TABLE stations CASCADE;

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '三笠', '北海道三笠市',
  43.2466006, 141.8045499,
  '空知総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/172/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": true, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'スタープラザ 芦別', '北海道芦別市',
  43.5255178, 142.1888941,
  '空知総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/202/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '南ふらの', '北海道空知郡南富良野町',
  43.1697013, 142.5727983,
  '上川総合振興局', '道北',
  'http://www.hokkaido-michinoeki.jp/michinoeki/222/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'しらぬか恋問', '北海道白糠郡白糠町',
  42.9927351, 144.1981267,
  '釧路総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/263/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": false, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'びふか', '北海道中川郡美深町',
  44.5588576, 142.3200331,
  '上川総合振興局', '道北',
  'http://www.hokkaido-michinoeki.jp/michinoeki/292/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '江差', '北海道檜山郡江差町',
  41.8943424, 140.1392891,
  '檜山振興局', '道南',
  'http://www.hokkaido-michinoeki.jp/michinoeki/321/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": false, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '望羊中山', '北海道虻田郡喜茂別町',
  42.8551768, 141.0965891,
  '後志総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/364/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '富士見', '北海道天塩郡遠別町',
  44.7141204, 141.7936472,
  '留萌振興局', '道北',
  'http://www.hokkaido-michinoeki.jp/michinoeki/389/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": false, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '忠類', '北海道中川郡幕別町',
  42.5588618, 143.2991945,
  '十勝総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/407/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": false, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '足寄湖', '北海道足寄郡足寄町',
  43.2522652, 143.4806105,
  '十勝総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/426/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": false, "shop": false, "baby_room": false, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '摩周温泉', '北海道川上郡弟子屈町',
  43.4923914, 144.4477187,
  '釧路総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/440/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'おといねっぷ', '北海道中川郡音威子府村',
  44.729078, 142.257872,
  '上川総合振興局', '道北',
  'http://www.hokkaido-michinoeki.jp/michinoeki/458/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": false, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'かみゆうべつ温泉チューリップの湯', '北海道紋別郡湧別町',
  44.1851816, 143.5956986,
  'オホーツク総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/472/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'いわない', '北海道岩内郡岩内町',
  42.9834347, 140.5167801,
  '後志総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/499/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": false, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'まるせっぷ', '北海道紋別郡遠軽町',
  43.9959412, 143.3287235,
  'オホーツク総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/515/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": false, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '厚岸グルメパーク', '北海道厚岸郡厚岸町',
  43.0576697, 144.8440184,
  '釧路総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/531/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'サンフラワー北竜', '北海道雨竜郡北竜町',
  43.7510483, 141.875302,
  '空知総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/546/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'みついし', '北海道日高郡新ひだか町',
  42.2208744, 142.6342261,
  '日高振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/564/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'あっさぶ', '北海道檜山郡厚沢部町',
  41.9165731, 140.2161538,
  '檜山振興局', '道南',
  'http://www.hokkaido-michinoeki.jp/michinoeki/576/',
  '{"toilet": true, "ev_charger": true, "wifi": true, "restaurant": true, "shop": true, "baby_room": false, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'よってけ！島牧', '北海道島牧郡島牧村',
  42.6867269, 140.0134173,
  '後志総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/588/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'てっくいランド大成', '北海道久遠郡せたな町',
  42.212366, 139.876681,
  '檜山振興局', '道南',
  'http://www.hokkaido-michinoeki.jp/michinoeki/611/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": false, "shop": true, "baby_room": false, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'オホーツク紋別', '北海道紋別市',
  44.3283409, 143.3750043,
  '上川総合振興局', '道北',
  'http://www.hokkaido-michinoeki.jp/michinoeki/626/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": false, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'YOU･遊･もり', '北海道茅部郡森町',
  42.098901, 140.568716,
  '渡島総合振興局', '道南',
  'http://www.hokkaido-michinoeki.jp/michinoeki/641/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'おんねゆ温泉', '北海道北見市',
  43.7546445, 143.5005308,
  'オホーツク総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/685/',
  '{"toilet": true, "ev_charger": true, "wifi": true, "restaurant": false, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'ルート229元和台', '北海道爾志郡乙部町',
  42.0113971, 140.1062194,
  '檜山振興局', '道南',
  'http://www.hokkaido-michinoeki.jp/michinoeki/704/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": false, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'ハウスヤルビ奈井江', '北海道空知郡奈井江町',
  43.4332722, 141.8888016,
  '空知総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/722/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'おびら鰊番屋', '北海道留萌郡小平町',
  44.137022, 141.654956,
  '留萌振興局', '道北',
  'http://www.hokkaido-michinoeki.jp/michinoeki/744/',
  '{"toilet": true, "ev_charger": true, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'マリーンアイランド岡島', '北海道枝幸郡枝幸町',
  44.8783757, 142.631813,
  '宗谷総合振興局', '道北',
  'http://www.hokkaido-michinoeki.jp/michinoeki/768/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": false, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'おこっぺ', '北海道紋別郡興部町',
  44.469498, 143.116955,
  'オホーツク総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/795/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": false, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '阿寒丹頂の里', '北海道釧路市',
  43.1440197, 144.1469574,
  '釧路総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/810/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'おとふけ', '北海道河東郡音更町',
  42.976584, 143.207419,
  '十勝総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/825/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'ピンネシリ', '北海道枝幸郡中頓別町',
  44.8774622, 142.2134021,
  '宗谷総合振興局', '道北',
  'http://www.hokkaido-michinoeki.jp/michinoeki/842/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": false, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'フォーレスト276大滝', '北海道伊達市',
  42.6980639, 141.1303673,
  '胆振総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/859/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '上ノ国もんじゅ', '北海道檜山郡上ノ国町',
  41.8084965, 140.0949663,
  '檜山振興局', '道南',
  'http://www.hokkaido-michinoeki.jp/michinoeki/870/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": false, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'オスコイ！かもえない', '北海道古宇郡神恵内村',
  43.1653589, 140.3855694,
  '後志総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/881/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": false, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'なかさつない', '北海道河西郡中札内村',
  42.69214, 143.126839,
  '十勝総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/892/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'マオイの丘公園', '北海道夕張郡長沼町',
  42.94998, 141.716616,
  '空知総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/906/',
  '{"toilet": true, "ev_charger": true, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '樹海ロード日高', '北海道沙流郡日高町',
  42.8767898, 142.4420074,
  '日高振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/921/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'そうべつ情報館ｉ（アイ）', '北海道有珠郡壮瞥町',
  42.559133, 140.8990485,
  '胆振総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/937/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'ニセコビュープラザ', '北海道虻田郡ニセコ町',
  42.7994921, 140.7023947,
  '後志総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/949/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'しりうち', '北海道上磯郡知内町',
  41.6012589, 140.3358339,
  '渡島総合振興局', '道南',
  'http://www.hokkaido-michinoeki.jp/michinoeki/961/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '横綱の里ふくしま', '北海道松前郡福島町',
  41.479134, 140.255731,
  '渡島総合振興局', '道南',
  'http://www.hokkaido-michinoeki.jp/michinoeki/973/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": false, "shop": true, "baby_room": false, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'サラブレッドロード新冠', '北海道新冠郡新冠町',
  42.3598362, 142.3156908,
  '日高振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/988/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'ピア21しほろ', '北海道河東郡士幌町',
  43.1443124354, 143.239275611,
  '十勝総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/1001/',
  '{"toilet": true, "ev_charger": true, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '香りの里たきのうえ', '北海道紋別郡滝上町',
  44.19689, 143.090986,
  'オホーツク総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/1016/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": false, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '田園の里うりゅう', '北海道雨竜郡雨竜町',
  43.6625089, 141.8940224,
  '空知総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/1026/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'みたら室蘭', '北海道室蘭市',
  42.342012, 140.943745,
  '胆振総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/1039/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'とうま', '北海道上川郡当麻町',
  43.844134, 142.4895,
  '上川総合振興局', '道北',
  'http://www.hokkaido-michinoeki.jp/michinoeki/1677/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'スペース・アップルよいち', '北海道余市郡余市町',
  43.1885383, 140.7887813,
  '後志総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/1699/',
  '{"toilet": true, "ev_charger": true, "wifi": false, "restaurant": false, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'ほっと?はぼろ', '北海道苫前郡羽幌町',
  44.3673322, 141.7065768,
  '留萌振興局', '道北',
  'http://www.hokkaido-michinoeki.jp/michinoeki/1747/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'サロマ湖', '北海道常呂郡佐呂間町',
  44.0999179, 143.8241425,
  'オホーツク総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/1787/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": false, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '愛ランド湧別', '北海道紋別郡湧別町',
  44.1308204, 143.7192064,
  'オホーツク総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/1951/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": false, "handicap_toilet": true, "atm": false, "information": false, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'おうむ', '北海道紋別郡雄武町',
  44.5830367, 142.9597327,
  'オホーツク総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/1975/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": false, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'さるふつ公園', '北海道宗谷郡猿払村',
  45.329219, 142.177348,
  '宗谷総合振興局', '道北',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2010/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '森と湖の里ほろかない', '北海道雨竜郡幌加内町',
  44.114633, 142.139546,
  '上川総合振興局', '道北',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2038/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'うたしないチロルの湯', '北海道歌志内市',
  43.503388, 142.004244,
  '空知総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2066/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'くろまつない', '北海道寿都郡黒松内町',
  42.6727094, 140.3800337,
  '後志総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2088/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'たきかわ', '北海道滝川市',
  43.6234396, 141.941478,
  '空知総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2107/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'スワン44ねむろ', '北海道根室市',
  43.2616741, 145.4383704,
  'オホーツク総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2143/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'つるぬま', '北海道樺戸郡浦臼町',
  43.4516011, 141.8357178,
  '空知総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2164/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'なとわ・えさん', '北海道函館市',
  41.7794873, 141.1016303,
  '渡島総合振興局', '道南',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2179/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'つど〜る・プラザ・さわら', '北海道茅部郡森町',
  42.1253109, 140.6673361,
  '渡島総合振興局', '道南',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2200/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '知床・らうす', '北海道目梨郡羅臼町',
  44.0174537, 145.1920893,
  '根室振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2217/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'さらべつ', '北海道河西郡更別村',
  42.6333115, 143.2718483,
  '十勝総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2232/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": false, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'だて歴史の杜', '北海道伊達市',
  42.4717206, 140.8771001,
  '胆振総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2253/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": false, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'あさひかわ', '北海道旭川市',
  43.7600001, 142.3484462,
  '上川総合振興局', '道北',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2272/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '自然体感しむかっぷ', '北海道勇払郡占冠村',
  42.978859, 142.39758,
  '上川総合振興局', '道北',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2298/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'にしおこっぺ花夢', '北海道紋別郡西興部村',
  44.3359883, 142.8680679,
  'オホーツク総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2325/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'オーロラタウン93りくべつ', '北海道足寄郡陸別町',
  43.467863, 143.742367,
  '十勝総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2355/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": false, "shop": true, "baby_room": false, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'はなやか（葉菜野花）小清水', '北海道斜里郡小清水町',
  43.9339211, 144.453268,
  'オホーツク総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2375/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'ライスランドふかがわ', '北海道深川市',
  43.6994831, 142.070593,
  '空知総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2390/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": true, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'なかがわ', '北海道中川郡中川町',
  44.8016913, 142.0673479,
  '上川総合振興局', '道北',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2424/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '230ルスツ', '北海道虻田郡留寿都村',
  42.7399293, 140.8845626,
  '後志総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2442/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'てしお', '北海道天塩郡天塩町',
  44.8845723, 141.7477551,
  '留萌振興局', '道北',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2467/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'コスモール大樹', '北海道広尾郡大樹町',
  42.489824, 143.273259,
  '十勝総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2483/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'ぐるっとパノラマ美幌峠', '北海道網走郡美幌町',
  43.647837, 144.24901,
  'オホーツク総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2502/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": false, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'らんこし・ふるさとの丘', '北海道磯谷郡蘭越町',
  42.7620988, 140.4789853,
  '後志総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2519/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": false, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'とようら', '北海道虻田郡豊浦町',
  42.577551, 140.722382,
  '胆振総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2533/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'メルヘンの丘めまんべつ', '北海道網走郡大空町',
  43.9173357, 144.1884881,
  'オホーツク総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2548/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'むかわ四季の館', '北海道勇払郡むかわ町',
  42.5739733, 141.9254643,
  '胆振総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2569/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": false, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'あいおい', '北海道網走郡津別町',
  43.545622, 143.980525,
  'オホーツク総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2585/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": false, "handicap_toilet": true, "atm": false, "information": false, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'しかおい', '北海道河東郡鹿追町',
  43.0977132, 142.9902764,
  '十勝総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2605/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": false, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'しらたき', '北海道紋別郡遠軽町',
  43.870061, 143.076278,
  'オホーツク総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2623/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": false, "handicap_toilet": true, "atm": false, "information": false, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'あしょろ銀河ホール21', '北海道足寄郡足寄町',
  43.244332, 143.546455,
  '十勝総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2639/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'サーモンパーク千歳', '北海道千歳市',
  42.833788, 141.65933,
  '石狩振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2654/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'ひがしかわ「道草館」', '北海道上川郡東川町',
  43.6973051, 142.5088143,
  '上川総合振興局', '道北',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2668/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": false, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '花ロードえにわ', '北海道恵庭市',
  42.8972354, 141.5856753,
  '石狩振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2684/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'シェルプラザ・港', '北海道磯谷郡蘭越町',
  42.8801825, 140.370027,
  '後志総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2702/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": false, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '真狩フラワーセンター', '北海道虻田郡真狩村',
  42.7623215, 140.8077046,
  '後志総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2715/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '鐘のなるまち・ちっぷべつ', '北海道雨竜郡秩父別町',
  43.7648305, 141.9659629,
  '空知総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2732/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": false, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'あぷた', '北海道虻田郡洞爺湖町',
  42.5289975, 140.7787362,
  '胆振総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2751/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": false, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'うりまく', '北海道河東郡鹿追町',
  43.1697466, 143.0250228,
  '十勝総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2766/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '絵本の里けんぶち', '北海道上川郡剣淵町',
  44.0938311, 142.3909798,
  '上川総合振興局', '道北',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2782/',
  '{"toilet": true, "ev_charger": true, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '風Ｗとままえ', '北海道苫前郡苫前町',
  44.3133031, 141.6564717,
  '留萌振興局', '道北',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2805/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": false, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'しほろ温泉', '北海道河東郡士幌町',
  43.138881, 143.367911,
  '十勝総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2824/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": false, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '名水の郷きょうごく', '北海道虻田郡京極町',
  42.8589072, 140.8709024,
  '後志総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2841/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'びえい「丘のくら」', '北海道上川郡美瑛町',
  43.5921253, 142.4637855,
  '上川総合振興局', '道北',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2854/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": false, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '☆ロマン街道しょさんべつ', '北海道苫前郡初山別村',
  44.5635037, 141.7768178,
  '留萌振興局', '道北',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2870/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'うとろ・シリエトク', '北海道斜里郡斜里町',
  44.0690729, 144.9906685,
  'オホーツク総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2884/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'しゃり', '北海道斜里郡斜里町',
  43.9117709, 144.6642138,
  'オホーツク総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2905/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": false, "shop": false, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'パパスランドさっつる', '北海道斜里郡清里町',
  43.7904595, 144.5339946,
  'オホーツク総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2920/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'もち米の里☆なよろ', '北海道名寄市',
  44.2874188, 142.4137718,
  '上川総合振興局', '道北',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2939/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": false, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'みなとま〜れ寿都', '北海道寿都郡寿都町',
  42.7955338, 140.2318241,
  '後志総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2959/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'とうや湖', '北海道虻田郡洞爺湖町',
  42.6645114, 140.8218199,
  '胆振総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2974/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": false, "handicap_toilet": true, "atm": false, "information": false, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '流氷街道網走', '北海道網走市',
  44.022034, 144.273893,
  'オホーツク総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/2986/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '北前船 松前', '北海道松前郡松前町',
  41.4265145, 140.1072323,
  '渡島総合振興局', '道南',
  'http://www.hokkaido-michinoeki.jp/michinoeki/3007/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'ステラ★ほんべつ', '北海道中川郡本別町',
  43.1256342, 143.6132503,
  '十勝総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/3021/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'ウトナイ湖', '北海道苫小牧市',
  42.6999513, 141.6946488,
  '胆振総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/3038/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'うらほろ', '北海道十勝郡浦幌町',
  42.81399805, 143.6636566,
  '十勝総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/3057/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'しんしのつ', '北海道石狩郡新篠津村',
  43.2141162, 141.6427006,
  '石狩振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/3070/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": false, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '夕張メロード', '北海道夕張市',
  42.93699, 142.038078,
  '空知総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/3083/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": false, "handicap_toilet": true, "atm": true, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'おだいとう', '北海道野付郡別海町',
  43.533413, 145.2368756,
  '根室振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/3099/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '縄文ロマン 南かやべ', '北海道函館市',
  41.9279214, 140.9447498,
  '渡島総合振興局', '道南',
  'http://www.hokkaido-michinoeki.jp/michinoeki/3114/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": false, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'わっかない', '北海道稚内市',
  45.41725, 141.677348,
  '上川総合振興局', '道北',
  'http://www.hokkaido-michinoeki.jp/michinoeki/3126/',
  '{"toilet": true, "ev_charger": true, "wifi": true, "restaurant": false, "shop": false, "baby_room": false, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'あかいがわ', '北海道余市郡赤井川村',
  43.05086768, 140.844843,
  '後志総合振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/3143/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'みそぎの郷 きこない', '北海道上磯郡木古内町',
  41.6780521, 140.4353634,
  '渡島総合振興局', '道南',
  'http://www.hokkaido-michinoeki.jp/michinoeki/3158/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": true, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'しかべ間歇泉公園', '北海道茅部郡鹿部町',
  42.0285219, 140.8305528,
  '渡島総合振興局', '道南',
  'http://www.hokkaido-michinoeki.jp/michinoeki/3174/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'ノンキーランド ひがしもこと', '北海道網走郡大空町',
  43.845319, 144.294951,
  'オホーツク総合振興局', '道東',
  'http://www.hokkaido-michinoeki.jp/michinoeki/13538/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": false, "handicap_toilet": false, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '北欧の風 道の駅とうべつ', '北海道石狩郡当別町',
  43.177254, 141.448498,
  '石狩振興局', '道央',
  'http://www.hokkaido-michinoeki.jp/michinoeki/13542/',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": true, "shop": true, "baby_room": true, "handicap_toilet": false, "atm": false, "information": true, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '石狩「あいろーど厚田」', '北海道石狩市',
  43.403873, 141.43118,
  '石狩振興局', '道央',
  'https://www.michi-no-eki.jp/stations/view/14165',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": false, "shop": false, "baby_room": false, "handicap_toilet": false, "atm": false, "information": false, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  'なないろ・ななえ', '北海道亀田郡七飯町',
  41.925666, 140.655973,
  '渡島総合振興局', '道南',
  'https://www.michi-no-eki.jp/stations/view/14166',
  '{"toilet": true, "ev_charger": false, "wifi": false, "restaurant": false, "shop": false, "baby_room": false, "handicap_toilet": false, "atm": false, "information": false, "parking": null}'::jsonb
);

INSERT INTO stations (
  name, address, latitude, longitude,
  area, area_group, website_url, facilities
) VALUES (
  '白金ビルケ', '北海道上川郡美瑛町',
  43.5030558333, 142.597223333,
  '上川総合振興局', '道北',
  'https://biei-info.jp/',
  '{"toilet": true, "ev_charger": false, "wifi": true, "restaurant": true, "shop": true, "baby_room": false, "handicap_toilet": true, "atm": false, "information": true, "parking": null}'::jsonb
);
