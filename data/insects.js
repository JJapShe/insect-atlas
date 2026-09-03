// Public species information is intentionally separate from review-only image assets.
// No gallery image is exposed here until it has passed authoritative taxonomy, rights, and image review.
const source = Object.freeze([{ label: "국립생물자원관 국가생물종지식정보시스템", url: "https://species.nibr.go.kr/" }]);
const approvedGallery = Object.freeze({
  "lucanus-maculifemoratus": Object.freeze([Object.freeze({ src: "assets/insects/approved/lucanus-maculifemoratus-morphology-white-bg-imagegen-v1.png", alt: "흰 배경에서 전신 형태를 확인하는 사슴벌레", title: "사슴벌레 · 형태 정보 참고", role: "형태·정보 참고", body: "검수 통과한 흰 배경 형태 참고 이미지입니다. 생태 장면이나 대표 서식지 기록으로 해석하지 않습니다.", sourceAttribution: "OpenAI built-in image generation, local-image edit from a project review source", license: "Generated project asset; approved for Insect Atlas distribution on 2026-09-03", generationPrompt: "Replace the source background only with seamless pure white. Preserve the exact full insect body, pose, diagnostic features, framing, and anatomy.", generationSeed: "service-assigned; not exposed", generationWorkflow: "ImageGen local-image edit, 2026-09-03", reviewStatus: "approved" })]),
  "anax-parthenope": Object.freeze([Object.freeze({ src: "assets/insects/approved/anax-parthenope-representative-imagegen-v1.png", alt: "갈대에 앉은 왕잠자리의 전신", title: "왕잠자리 · 형태 정보 참고", role: "형태·정보 참고", body: "검수 통과한 전신 형태 참고 이미지입니다. 종 식별은 현재 기록된 외형 단서와 함께 확인합니다.", sourceAttribution: "OpenAI built-in image generation; no external artwork was supplied as input", license: "Generated project asset; approved for Insect Atlas distribution on 2026-09-03", generationPrompt: "adult lesser emperor dragonfly perched on reed; large compound eyes, long segmented abdomen, two pairs transparent wings, six legs", generationSeed: "service-assigned; not exposed", generationWorkflow: "Built-in image generation, then an unchanged copy into the project approved path", reviewStatus: "approved" })]),
  "sympetrum-depressiusculum": Object.freeze([Object.freeze({ src: "assets/insects/approved/sympetrum-depressiusculum-representative-imagegen-v1.png", alt: "갈대에 앉은 고추잠자리의 전신", title: "고추잠자리 · 형태 정보 참고", role: "형태·정보 참고", body: "검수 통과한 전신 형태 참고 이미지입니다. 종 식별은 현재 기록된 외형 단서와 함께 확인합니다.", sourceAttribution: "OpenAI built-in image generation; no external artwork was supplied as input", license: "Generated project asset; approved for Insect Atlas distribution on 2026-09-03", generationPrompt: "adult red dragonfly perched on reed; red segmented abdomen, large compound eyes, two pairs transparent wings, six legs", generationSeed: "service-assigned; not exposed", generationWorkflow: "Built-in image generation, then an unchanged copy into the project approved path", reviewStatus: "approved" })]),
});
const record = (id, koreanName, scientificName, order, family, habitat, diet, cues, familiarityLevel = 2, options = {}) => Object.freeze({
  id, koreanName, scientificName, taxonomy: { order, family }, appearancePeriod: { label: "현생 · 출현 시기 확인 중", kind: "modern" },
  habitat, diet, size: { label: "크기 확인 중", millimeters: null }, familiarityLevel, keyAppearanceCues: cues,
  gallery: options.gallery || [], sources: source, licenseStatus: options.licenseStatus || "이미지 미배정", reviewStatus: options.reviewStatus || "draft", access: "free",
});

export const insects = Object.freeze([
  record("lucanus-maculifemoratus", "사슴벌레", "Lucanus maculifemoratus", "딱정벌레목", "사슴벌레과", ["활엽수림", "수액원"], "식물", ["짝 큰턱", "딱지날개", "6다리"], 4, { gallery: approvedGallery["lucanus-maculifemoratus"], licenseStatus: "검수 통과 이미지 1장", reviewStatus: "image-approved" }),
  record("trypoxylus-dichotomus", "장수풍뎅이", "Trypoxylus dichotomus", "딱정벌레목", "풍뎅이과", ["활엽수림", "수액원"], "식물", ["머리뿔", "앞가슴뿔", "딱지날개"], 4),
  record("harmonia-axyridis", "무당벌레", "Harmonia axyridis", "딱정벌레목", "무당벌레과", ["초지", "정원"], "다른 동물", ["둥근 딱지날개", "검은 점무늬", "6다리"], 4),
  record("protaetia-brevitarsis", "꽃무지", "Protaetia brevitarsis", "딱정벌레목", "풍뎅이과", ["초지", "꽃밭"], "식물", ["금속성 녹색 몸", "타원형 딱지날개", "6다리"], 3),
  record("anoplophora-malasiaca", "알락하늘소", "Anoplophora malasiaca", "딱정벌레목", "하늘소과", ["활엽수림", "나무줄기"], "식물", ["긴 더듬이", "점무늬", "6다리"], 3),
  record("papilio-xuthus", "호랑나비", "Papilio xuthus", "나비목", "호랑나비과", ["초지", "정원"], "식물", ["노란 날개", "검은 맥무늬", "꼬리 돌기"], 4),
  record("pieris-rapae", "배추흰나비", "Pieris rapae", "나비목", "흰나비과", ["밭", "초지"], "식물", ["흰 날개", "검은 날개끝", "6다리"], 4),
  record("sasakia-charonda", "왕오색나비", "Sasakia charonda", "나비목", "네발나비과", ["활엽수림", "숲 가장자리"], "식물", ["청자색 광택", "날개 띠무늬", "6다리"], 3),
  record("sericinus-montela", "꼬리명주나비", "Sericinus montela", "나비목", "호랑나비과", ["강변", "숲 가장자리"], "식물", ["긴 뒷날개 꼬리", "검정·붉은 무늬", "6다리"], 3),
  record("anax-parthenope", "왕잠자리", "Anax parthenope", "잠자리목", "왕잠자리과", ["연못", "습지"], "다른 동물", ["큰 겹눈", "긴 배", "두 쌍의 날개"], 3, { gallery: approvedGallery["anax-parthenope"], licenseStatus: "검수 통과 이미지 1장", reviewStatus: "image-approved" }),
  record("sympetrum-depressiusculum", "고추잠자리", "Sympetrum depressiusculum", "잠자리목", "잠자리과", ["습지", "논 주변"], "다른 동물", ["붉은 배", "겹눈", "두 쌍의 날개"], 4, { gallery: approvedGallery["sympetrum-depressiusculum"], licenseStatus: "검수 통과 이미지 1장", reviewStatus: "image-approved" }),
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
]);
