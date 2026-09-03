// Public species information is intentionally separate from review-only image assets.
// No gallery image is exposed here until it has passed authoritative taxonomy, rights, and image review.
const source = Object.freeze([{ label: "국립생물자원관 국가생물종지식정보시스템", url: "https://species.nibr.go.kr/" }]);
const primaryIds = Object.freeze(["lucanus-maculifemoratus", "trypoxylus-dichotomus", "harmonia-axyridis", "protaetia-brevitarsis", "anoplophora-malasiaca", "papilio-xuthus", "pieris-rapae", "sasakia-charonda", "sericinus-montela", "anax-parthenope", "sympetrum-depressiusculum", "acrida-cinerea", "gampsocleis-sedakovii", "teleogryllus-emma", "tenodera-sinensis", "hierodula-patellifera", "cryptotympana-atrata", "halyomorpha-halys", "camponotus-japonicus", "apis-cerana"]);
const detailIds = Object.freeze(["dorcus-titanus-castanicolor", "dorcus-hopei-binodulosus", "pyrocoelia-rufa", "luciola-lateralis", "orthetrum-albistylum", "rhyothemis-fuliginosa", "anotogaster-sieboldi", "calopteryx-japonica", "calopteryx-atrata", "bombus-ignitus"]);
const roleDetails = Object.freeze({
  ecology: Object.freeze({ label: "생태 관찰", body: "서식 환경에서의 관찰 후보입니다. 최종 정리 전 검수 대기 이미지입니다.", prompt: "scientific-educational natural-history ecology illustration; full insect body and diagnostic features readable in its Korean habitat; no labels, logos, watermark, deformed anatomy, or cropped body" }),
  interaction: Object.freeze({ label: "상호작용 관찰", body: "먹이·식물·수변 등 환경과의 상호작용을 보여 주는 후보입니다. 최종 정리 전 검수 대기 이미지입니다.", prompt: "scientific-educational natural-history interaction illustration; safe non-graphic ecological context; full insect anatomy readable; no labels, logos, watermark, deformed anatomy, or cropped body" }),
  morphology: Object.freeze({ label: "형태·정보 참고", body: "형태와 정보 확인을 위한 참고 이미지입니다. 생태 장면이나 대표 서식지 기록으로 해석하지 않습니다.", prompt: "full insect body, diagnostic features and readable anatomy; white or quiet information background; no labels, logos, watermark, deformed anatomy, or cropped body" }),
  individual: Object.freeze({ label: "형태·정보 참고", body: "검수 통과한 전신 형태 참고 이미지입니다. 종 식별은 현재 기록된 외형 단서와 함께 확인합니다.", prompt: "one centered adult insect; full body entirely in frame; quiet Korean habitat background; no text, labels, logos, watermark, hands, specimen pins, collage, extra limbs, deformed anatomy, hybrid species, cropped body, or background insects" }),
  "anatomy-test": Object.freeze({ label: "생성 형태 테스트", body: "형태 단서 확인을 위한 생성 테스트입니다. 최종 정리 전 검수 대기 이미지입니다.", prompt: "scientific educational morphology test; complete anatomy and diagnostic features visible; no labels, logos, watermark, extra limbs, or malformed body parts" }),
});
const specialPaths = Object.freeze({
  "lucanus-maculifemoratus:morphology": "assets/insects/approved/lucanus-maculifemoratus-morphology-white-bg-imagegen-v1.png",
  "anax-parthenope:individual": "assets/insects/approved/anax-parthenope-representative-imagegen-v1.png",
  "sympetrum-depressiusculum:individual": "assets/insects/approved/sympetrum-depressiusculum-representative-imagegen-v1.png",
});
const explicitlyPassed = new Set(["lucanus-maculifemoratus:morphology", "anax-parthenope:individual", "sympetrum-depressiusculum:individual"]);
const galleryItem = (id, kind) => {
  const details = roleDetails[kind]; const key = `${id}:${kind}`;
  return Object.freeze({
    src: specialPaths[key] || `assets/insects/approved/${id}-${kind}-imagegen-v1.png`, alt: "", role: details.label, body: details.body,
    sourceAttribution: "OpenAI built-in image generation; no external artwork was supplied as input", license: "Generated project asset; published to the Insect Atlas gallery at the user's direction on 2026-09-03", generationPrompt: details.prompt,
    generationSeed: "service-assigned; not exposed", generationWorkflow: "Built-in image generation, then an unchanged copy into the project approved path", reviewStatus: explicitlyPassed.has(key) ? "approved" : "published-pending-user-review",
  });
};
const supplementalKinds = Object.freeze({
  "lucanus-maculifemoratus": ["anatomy-test"], "trypoxylus-dichotomus": ["anatomy-test"], "tenodera-sinensis": ["anatomy-test"], "anax-parthenope": ["individual"], "sympetrum-depressiusculum": ["individual"],
});
const galleryById = Object.freeze(Object.fromEntries([...primaryIds, ...detailIds].map((id) => [id, Object.freeze([
  galleryItem(id, "ecology"), galleryItem(id, "interaction"), ...(primaryIds.includes(id) ? [galleryItem(id, "morphology")] : []), ...((supplementalKinds[id] || []).map((kind) => galleryItem(id, kind))),
])])));
const worldGalleryItem = (id, prompt, body) => Object.freeze({
  src: `assets/insects/approved/${id}-ecology-imagegen-v1.png`, alt: "", role: "생태 관찰", body,
  sourceAttribution: "OpenAI built-in image generation; no external artwork was supplied as input", license: "Generated project asset; published to the Insect Atlas gallery at the user's direction on 2026-09-03", generationPrompt: prompt,
  generationSeed: "service-assigned; not exposed", generationWorkflow: "Built-in image generation, then an unchanged copy into review and registered-gallery paths", reviewStatus: "published-pending-user-review",
});
const worldGallery = Object.freeze({
  "dynastes-hercules": Object.freeze([worldGalleryItem("dynastes-hercules", "adult male Hercules beetle with an extremely long forked head horn, shorter thoracic horn, olive-brown marked elytra, six legs, on a humid tropical rainforest log", "열대우림의 썩은 나무 주변에서 형태를 관찰하는 헤라클레스장수풍뎅이입니다.")]),
  "hymenopus-coronatus": Object.freeze([worldGalleryItem("hymenopus-coronatus", "adult orchid mantis with pale pink-white petal-like leg lobes, triangular head, raptorial forelegs and six legs among orchid blossoms", "난초 꽃 사이에서 꽃잎과 비슷한 몸빛과 다리를 관찰하는 난초사마귀입니다.")]),
  "scarabaeus-sacer": Object.freeze([worldGalleryItem("scarabaeus-sacer", "sacred scarab dung beetle rolling one rounded dung ball backwards with hind legs, shovel-like toothed forelegs and six legs on warm savanna ground", "뒷다리로 공을 굴리는 행동과 넓은 앞다리를 관찰하는 쇠똥구리입니다.")]),
  "goliathus-goliatus": Object.freeze([worldGalleryItem("goliathus-goliatus", "adult Goliath beetle with a stout scarabaeid body, bold black-and-white elytral pattern, small male head horn and six legs on a tropical African tree trunk", "굵은 몸과 검정·흰색 무늬를 관찰하는 골리앗꽃무지입니다.")]),
  "attacus-atlas": Object.freeze([worldGalleryItem("attacus-atlas", "adult Atlas moth with fully spread rust-brown wings, cream and maroon patterns, transparent wing windows and snake-head-like forewing tips on a tropical leaf", "넓은 날개와 뱀 머리를 닮은 앞날개 끝무늬를 관찰하는 아틀라스나방입니다.")]),
  "phyllium-philippinicum": Object.freeze([worldGalleryItem("phyllium-philippinicum", "Philippine leaf insect with a flattened green leaf-like body, leaf-vein pattern, broad leaf-like legs and complete six-leg anatomy on a tropical shrub", "잎맥과 닮은 몸과 다리로 위장한 필리핀잎벌레입니다.")]),
});
const record = (id, koreanName, scientificName, order, family, habitat, diet, cues, familiarityLevel = 2, options = {}) => {
  const gallery = options.gallery || galleryById[id] || [];
  return Object.freeze({
    id, koreanName, scientificName, taxonomy: { order, family }, appearancePeriod: { label: "현생 · 출현 시기 확인 중", kind: "modern" },
    habitat, diet, size: { label: "크기 확인 중", millimeters: null }, familiarityLevel, keyAppearanceCues: cues,
    gallery, sources: options.sources || source, licenseStatus: options.licenseStatus || (gallery.length ? "등록 이미지 검수 대기" : "이미지 미배정"), reviewStatus: options.reviewStatus || (gallery.length ? "gallery-published-pending-user-review" : "draft"), access: "free",
  });
};

export const insects = Object.freeze([
  record("lucanus-maculifemoratus", "사슴벌레", "Lucanus maculifemoratus", "딱정벌레목", "사슴벌레과", ["활엽수림", "수액원"], "식물", ["짝 큰턱", "딱지날개", "6다리"], 4),
  record("trypoxylus-dichotomus", "장수풍뎅이", "Trypoxylus dichotomus", "딱정벌레목", "풍뎅이과", ["활엽수림", "수액원"], "식물", ["머리뿔", "앞가슴뿔", "딱지날개"], 4),
  record("harmonia-axyridis", "무당벌레", "Harmonia axyridis", "딱정벌레목", "무당벌레과", ["초지", "정원"], "다른 동물", ["둥근 딱지날개", "검은 점무늬", "6다리"], 4),
  record("protaetia-brevitarsis", "꽃무지", "Protaetia brevitarsis", "딱정벌레목", "풍뎅이과", ["초지", "꽃밭"], "식물", ["금속성 녹색 몸", "타원형 딱지날개", "6다리"], 3),
  record("anoplophora-malasiaca", "알락하늘소", "Anoplophora malasiaca", "딱정벌레목", "하늘소과", ["활엽수림", "나무줄기"], "식물", ["긴 더듬이", "점무늬", "6다리"], 3),
  record("papilio-xuthus", "호랑나비", "Papilio xuthus", "나비목", "호랑나비과", ["초지", "정원"], "식물", ["노란 날개", "검은 맥무늬", "꼬리 돌기"], 4),
  record("pieris-rapae", "배추흰나비", "Pieris rapae", "나비목", "흰나비과", ["밭", "초지"], "식물", ["흰 날개", "검은 날개끝", "6다리"], 4),
  record("sasakia-charonda", "왕오색나비", "Sasakia charonda", "나비목", "네발나비과", ["활엽수림", "숲 가장자리"], "식물", ["청자색 광택", "날개 띠무늬", "6다리"], 3),
  record("sericinus-montela", "꼬리명주나비", "Sericinus montela", "나비목", "호랑나비과", ["강변", "숲 가장자리"], "식물", ["긴 뒷날개 꼬리", "검정·붉은 무늬", "6다리"], 3),
  record("anax-parthenope", "왕잠자리", "Anax parthenope", "잠자리목", "왕잠자리과", ["연못", "습지"], "다른 동물", ["큰 겹눈", "긴 배", "두 쌍의 날개"], 3),
  record("sympetrum-depressiusculum", "고추잠자리", "Sympetrum depressiusculum", "잠자리목", "잠자리과", ["습지", "논 주변"], "다른 동물", ["붉은 배", "겹눈", "두 쌍의 날개"], 4),
  record("acrida-cinerea", "방아깨비", "Acrida cinerea", "메뚜기목", "메뚜기과", ["초지", "논둑"], "식물", ["기울어진 얼굴", "긴 뒷다리", "6다리"], 3),
  record("gampsocleis-sedakovii", "여치", "Gampsocleis sedakovii", "메뚜기목", "여치과", ["초지", "관목"], "여러 가지", ["긴 더듬이", "접힌 앞날개", "긴 뒷다리"], 3),
  record("teleogryllus-emma", "귀뚜라미", "Teleogryllus emma", "메뚜기목", "귀뚜라미과", ["밭 가장자리", "낙엽층"], "여러 가지", ["아주 긴 더듬이", "접힌 앞날개", "긴 뒷다리"], 3),
  record("tenodera-sinensis", "사마귀", "Tenodera sinensis", "사마귀목", "사마귀과", ["초지", "정원"], "다른 동물", ["삼각형 머리", "포획앞다리", "긴 앞가슴"], 4),
  record("hierodula-patellifera", "왕사마귀", "Hierodula patellifera", "사마귀목", "사마귀과", ["관목", "초지"], "다른 동물", ["넓은 앞가슴", "포획앞다리", "접힌 날개"], 3),
  record("cryptotympana-atrata", "말매미", "Cryptotympana atrata", "매미목", "매미과", ["활엽수림", "도시 수목"], "식물", ["큰 겹눈", "투명한 날개", "넓은 머리"], 4),
  record("halyomorpha-halys", "썩덩나무노린재", "Halyomorpha halys", "노린재목", "노린재과", ["밭", "수목"], "식물", ["방패 모양 몸", "얼룩무늬", "띠 더듬이"], 3),
  record("camponotus-japonicus", "일본왕개미", "Camponotus japonicus", "벌목", "개미과", ["숲 바닥", "정원"], "여러 가지", ["잘록한 허리", "굽은 더듬이", "6다리"], 3),
  record("apis-cerana", "동양종꿀벌", "Apis cerana", "벌목", "꿀벌과", ["초지", "과수원"], "식물", ["털 난 가슴", "줄무늬 배", "두 쌍의 날개"], 4),
  record("dorcus-titanus-castanicolor", "넓적사슴벌레", "Dorcus titanus castanicolor", "딱정벌레목", "사슴벌레과", ["활엽수림", "수액원"], "식물", ["넓고 납작한 몸", "큰턱", "딱지날개"], 3),
  record("dorcus-hopei-binodulosus", "왕사슴벌레", "Dorcus hopei binodulosus", "딱정벌레목", "사슴벌레과", ["활엽수림", "수액원"], "식물", ["튼튼한 큰턱", "넓은 머리", "딱지날개"], 3),
  record("pyrocoelia-rufa", "늦반딧불이", "Pyrocoelia rufa", "딱정벌레목", "반딧불이과", ["습한 숲", "숲 가장자리"], "여러 가지", ["발광 기관", "부드러운 딱지날개", "긴 더듬이"], 3),
  record("luciola-lateralis", "애반딧불이", "Luciola lateralis", "딱정벌레목", "반딧불이과", ["논", "수로"], "여러 가지", ["작은 발광 기관", "부드러운 딱지날개", "긴 더듬이"], 3),
  record("orthetrum-albistylum", "밀잠자리", "Orthetrum albistylum", "잠자리목", "잠자리과", ["연못", "습지"], "다른 동물", ["겹눈", "긴 배", "네 날개"], 3),
  record("rhyothemis-fuliginosa", "나비잠자리", "Rhyothemis fuliginosa", "잠자리목", "잠자리과", ["습지", "연못"], "다른 동물", ["어두운 날개 무늬", "겹눈", "긴 배"], 3),
  record("anotogaster-sieboldi", "장수잠자리", "Anotogaster sieboldi", "잠자리목", "왕잠자리과", ["산지 계류", "숲 가장자리"], "다른 동물", ["튼튼한 몸", "큰 겹눈", "넓은 날개"], 3),
  record("calopteryx-japonica", "물잠자리", "Calopteryx japonica", "잠자리목", "물잠자리과", ["맑은 하천", "수변 식생"], "다른 동물", ["금속광택 몸", "접어 세운 날개", "긴 배"], 3),
  record("calopteryx-atrata", "검은물잠자리", "Calopteryx atrata", "잠자리목", "물잠자리과", ["숲 계류", "수변 식생"], "다른 동물", ["검은 날개", "접어 세운 날개", "긴 배"], 3),
  record("bombus-ignitus", "호박벌", "Bombus (Bombus) ignitus", "벌목", "꿀벌과", ["초지", "산지 초원"], "식물", ["검정·노란 털", "꽃가루 바구니", "두 쌍의 날개"], 3),
  record("dynastes-hercules", "헤라클레스장수풍뎅이", "Dynastes hercules", "딱정벌레목", "풍뎅이과", ["중남미 열대우림", "썩은 나무"], "식물", ["매우 긴 머리뿔", "짧은 앞가슴뿔", "큰 딱지날개"], 4, { gallery: worldGallery["dynastes-hercules"], sources: Object.freeze([{ label: "GBIF Backbone Taxonomy · Dynastes hercules", url: "https://www.gbif.org/taxon/6DPX9" }]) }),
  record("hymenopus-coronatus", "난초사마귀", "Hymenopus coronatus", "사마귀목", "난초사마귀과", ["동남아시아 열대림", "난초 주변"], "다른 동물", ["꽃잎 같은 다리", "삼각형 머리", "포획앞다리"], 4, { gallery: worldGallery["hymenopus-coronatus"], sources: Object.freeze([{ label: "GBIF Backbone Taxonomy · Hymenopus coronatus", url: "https://www.gbif.org/species/1406471" }]) }),
  record("scarabaeus-sacer", "성스러운 쇠똥구리", "Scarabaeus sacer", "딱정벌레목", "풍뎅이과", ["사바나", "건조 초지"], "여러 가지", ["둥근 검은 몸", "넓은 앞다리", "공 굴리기"], 4, { gallery: worldGallery["scarabaeus-sacer"], sources: Object.freeze([{ label: "GBIF Backbone Taxonomy · Scarabaeus sacer", url: "https://www.gbif.org/taxon/4V2G9" }]) }),
  record("goliathus-goliatus", "골리앗꽃무지", "Goliathus goliatus", "딱정벌레목", "풍뎅이과", ["열대 아프리카 숲", "나무줄기"], "식물", ["아주 큰 몸", "검정·흰색 무늬", "딱지날개"], 4, { gallery: worldGallery["goliathus-goliatus"], sources: Object.freeze([{ label: "GBIF Backbone Taxonomy · Goliathus goliatus", url: "https://www.gbif.org/species/1076779" }]) }),
  record("attacus-atlas", "아틀라스나방", "Attacus atlas", "나비목", "왕잠자리나방과", ["동남아시아 열대림", "큰 잎"], "식물", ["매우 넓은 날개", "투명한 날개창", "뱀 머리 같은 날개끝"], 4, { gallery: worldGallery["attacus-atlas"], sources: Object.freeze([{ label: "GBIF Backbone Taxonomy · Attacus atlas", url: "https://www.gbif.org/taxon/JMDM" }]) }),
  record("phyllium-philippinicum", "필리핀잎벌레", "Phyllium philippinicum", "대벌레목", "잎대벌레과", ["필리핀 열대림", "관목"], "식물", ["잎맥 무늬", "넓은 잎 모양 다리", "나뭇잎 위장"], 4, { gallery: worldGallery["phyllium-philippinicum"], sources: Object.freeze([{ label: "GBIF Catalogue of Life · Phyllium philippinicum", url: "https://www.gbif.org/taxon/VGCRL" }]) }),
]);
