# Insect Atlas · 곤충 아틀라스

5~14세가 곤충과 주변 생물을 찾아 관찰할 수 있도록 만든 독립 프런트엔드 도감입니다. 종별 정보, 어린이 설명, 갤러리와 생활사 그림을 제공합니다. 정적 HTML·CSS·JavaScript로 실행하며 패키지 설치는 필요하지 않습니다. 배포 시에는 Node.js로 공개 파일만 `_site/`에 조립합니다.

2026-09-09, 커밋 `4051b15`에서 기본 검사는 **91종·등록 갤러리 541장**으로 통과했습니다. 이는 당시 데이터의 검사 결과이며, 현재 수량은 아래 기본 검사로 확인합니다. 이미지 형태나 사용자 최종 승인을 보증하는 수치는 아닙니다.

## 기준선과 범위

- UI의 역사적 기준선: `C:\Users\USER\.codex\worktrees\a3aa\dinosour`의 커밋 `3f91c65cb0e0fb74b9a72197cd09db827847beac` (`codex/ecosystem-composition-next`). 출처 기록이며 현재 실행에 필요한 경로가 아닙니다.
- 가져온 범위: 어두운 아틀라스 시각 언어, 사이드 탐색, 카드/탭/필터, 상세 패널, PC·모바일 반응형, 갤러리·확대 보기 인터랙션, 접근성·키보드·빈/로딩 상태, 무료·구독 및 관리자 화면 구조
- 제외 범위: 공룡·고생대·신생대의 종/분류/설명 데이터, 모든 이미지·영상·갤러리 배정·계통 좌표, 생성 프롬프트·시드·검수·출처·라이선스 기록, 기존 검수 서버/DB, 공룡 전용 문구·해부학 규칙

## 개발 안내

항상 적용되는 원칙은 [AGENTS.md](AGENTS.md), 종·어린이 설명·이미지·검수 기록의 연결 작업은 [insect-atlas-content 스킬](.agents/skills/insect-atlas-content/SKILL.md)을 따릅니다. 일반적인 화면·CSS 변경에는 콘텐츠 스킬이 필요하지 않습니다. 새 스킬은 저장소의 `.agents/skills/`에 두며, Codex에서 발견되지 않으면 새 세션 또는 재시작 후 목록을 확인합니다.

### 실행과 기본 검사

프로젝트 루트 `C:\work\insect-atlas`의 PowerShell에서 실행합니다. 기본 검사는 Node.js가 필요합니다(위 기준선은 Node.js `v24.19.0`에서 확인).

```powershell
node scripts/verify.mjs
```

이 명령은 파일을 읽어 데이터 연결·등록 자산·검수 사본·검수 목록·JavaScript 구문을 검사합니다. 파일 생성·변경이나 서버 시작은 하지 않습니다.

배포용 파일 생성과 배포 차단 검사는 다음 순서로 실행합니다(Node.js 24).

```powershell
node scripts/verify.mjs
node scripts/build.mjs
node scripts/verify-build.mjs
```

`build.mjs`는 프로젝트 루트의 `_site/`만 비우고 다시 생성합니다. `_site/`는 생성물이며 Git에서 제외합니다. `verify-build.mjs`는 생성물에 이미지 누락·손상·내부 경로·제외 대상 모듈을 일시적으로 주입해 차단되는지 확인하고 복원합니다. 원본 데이터·이미지는 수정하지 않습니다. 기본 검사는 읽기 전용이고, 이 두 배포 명령은 생성물을 씁니다.

미리보기에는 Python이 필요합니다.

```powershell
.\start-insect-atlas.ps1
```

실행 스크립트는 정상 서버를 재사용하거나 `.insect-atlas/`와 로그를 만들고 Python HTTP 서버를 시작한 뒤 브라우저를 엽니다. 읽기 전용 검사 명령이 아닙니다. 공개 앱 미리보기는 `http://127.0.0.1:8030/`, 로컬 검수 화면은 `http://127.0.0.1:8030/review.html`입니다.

### 구조와 작업별 진입점

공개 앱은 `index.html` → ES module `app.js` → `data/insects.js`·`data/child-content.js` 순으로 연결됩니다. 원본 종 데이터는 `record()`가 갤러리 공급자·생활사·추가 이미지를 합쳐 구성합니다. 배포본의 `data/insects.js`는 그 결과를 그대로 직렬화한 파일이며 원본과 값이 일치하는지 검사합니다. `data/insect-schema.js`는 과거 스키마 초안, `data/dev-fixture.example.js`는 개발 예시입니다. 두 파일과 내부 생성 기록 모듈은 배포하지 않습니다.

| 작업 | 처음 볼 파일·재사용 지점 | 함께 확인할 연결 | 최소 검증 |
| --- | --- | --- | --- |
| 검색·필터·목록 | `app.js`: `filteredInsects()`, `renderExplore()`, `renderCatalog()` | 공통 상태, 탐색·도감 두 화면 | 기본 검사 + 변경한 검색·필터 조합의 화면 확인 |
| 상세·확대 보기 | `app.js`: `selectInsect()`, `openLightbox()`, `moveLightbox()` | `index.html`, `styles.css`, 갤러리 순서 | 기본 검사 + 열기·이동·닫기·키보드·모바일 표시 |
| 종·어린이 본문 | `data/insects.js`: `record()`; `data/child-content.js`: `specific`, `childContentFor()` | 종 ID·본문 1:1, 출처, 실제 갤러리 공급자 | 기본 검사 + 해당 종 검색·상세 표시 |
| 이미지·생활사 | `data/insects.js`: `galleryItem()`, `withLifeStages()`; `data/incomplete-metamorphosis.js`: `galleryAdditions()` | 해당 배치 매니페스트, 검수본·공개본, 이미지별 근거 | 기본 검사 + 변경 사본 SHA256 비교 + 형태·갤러리 확인 |
| 검수 화면·판정 | `review-data.mjs`: 매니페스트 변환; `review.js`: `saveDecision()` | 매니페스트 형식, 이미지별 `asset`, 판정 JSON·브라우저 저장 구분 | 기본 검사에 포함된 `verify-review.mjs` + 실제 대상 표시·저장 범위 확인 |
| 배포 | `scripts/build.mjs`, `.github/workflows/deploy-pages.yml` | 공개 파일 목록과 대상 커밋 | 위 배포 검사 3개 명령 + 해당 커밋의 Actions·Pages 결과, 변경한 공개 화면 확인 |

학명 검색은 이미 `filteredInsects()`에 포함되며 다른 필터와 함께 적용됩니다. 요청이 현재 기능으로 충족되는지 확인한 뒤 변경합니다. 일반 구현은 Terra, 독립적인 목록·경로 조사는 필요할 때 Luna, 요구 충돌·승인 범위·광범위한 설계 판단은 Astra에 배분할 수 있습니다. 작은 작업마다 모든 모델을 호출하지 않습니다.

### 기본 검사의 한계

- `scripts/verify.mjs`는 종수·배치별 ID·생활사 이미지 수·파일명에 고정 조건이 있습니다. 새 종이나 배치는 실제 변경 목록에 맞는 기대값을 갱신합니다. 기존 배치의 수량을 새 종의 생물학적 분류나 모든 후속 작업의 요구로 일반화하지 않습니다.
- `scripts/verify-assets.mjs`는 모든 등록 갤러리를 검수 원본과 비교합니다. 동일 파일명이 아닌 원본은 `tools/review-decisions/public-asset-baseline-20260915.json`의 명시적 대응을 사용합니다. 이미지 교체 시 검수본·공개본과 해당 대응도 함께 갱신합니다.
- 2026-09-15 기준 629장 중 622장은 검수본과 바이트가 일치합니다. 기존 7장은 프로젝트에서 일치하는 검수 원본을 찾지 못해 위 기록에 **검수원본 미확인**으로 남겼습니다. 이 7장은 기존 공개본 SHA-256의 변경만 감지하며 매번 경고합니다. 검수 완료나 승인으로 간주하지 않고, 새 미대응 이미지 또는 변경된 기존 파일은 검사에 실패합니다. 원본을 회수하거나 재검수할 때 근거를 남기고 해당 예외를 해소합니다.
- 기본 검사는 브라우저 상호작용, 이미지 형태의 정확성, 사용자 최종 승인 또는 실제 배포 성공을 증명하지 않습니다.

## 공개와 검수

`assets/insects/approved/`는 공개 파일 경로이며, 폴더 이름만으로 사용자 최종 승인 여부를 판정하지 않습니다. 새 자산의 승인·형태 검수 원칙은 AGENTS.md를 따릅니다.

2026-09-03의 기존 README에는 주인님 지시에 따라 탈락 외 후보를 임시 공개했다는 이력이 기록되어 있습니다. 위 조사 기준선의 공개 갤러리 상태는 `published-pending-user-review` 539장, `approved` 2장이며, 종 레코드에는 `gallery-published-pending-user-review` 상태도 사용됩니다. 이는 기존 기록의 설명이지 새 배치의 공개 허가가 아닙니다. 기존 상태를 승인으로 일괄 변경하거나 자산을 자동 제거하지 않습니다. 사용자가 새 예외를 명시하면 날짜·대상·지시 근거를 해당 검수 기록에 남깁니다.

이미지 메타데이터는 실제 갤러리 항목의 평면 필드(`sourceAttribution`, `license`, `generationPrompt`, `generationSeed`, `generationWorkflow`, `reviewStatus` 등)를 기준으로 확인합니다. 생물학적 근거와 역할별 단서는 `tools/generation-tests/`의 해당 배치 자료도 함께 확인합니다. 제공되지 않은 시드는 미제공 사실을 기록하며, 관찰 근거와 복원·가설 설명을 구분합니다.

검수 화면은 `review.html`·`review.js`의 별도 로컬 도구입니다.

- `review-data.mjs`가 매니페스트 목록과 이미지별 변환을 관리합니다. `records`, `batches`, `species`의 역할 목록 또는 개별 `asset` 형식을 지원합니다. 같은 `asset` 경로는 한 번만 표시하며 기존 판정 키는 유지합니다.
- 새 배치의 지원 여부는 파일명이 아니라 실제 이미지별 `asset`과 표시 결과로 확인합니다. `scripts/verify-review.mjs`가 변환 결과·자산 존재·중복과 공개 갤러리의 검수 목록 대응을 검사합니다.
- 판정 버튼은 `localStorage`의 `insect-atlas-review-decisions-v1`에만 저장합니다. `tools/review-decisions/image-review-decisions-20260903.json`이나 공개 데이터·이미지는 자동 변경하지 않습니다. 브라우저 판정은 해당 기기의 메모이며, 공개 반영에는 프로젝트 검수 기록과 자산·데이터의 대조가 필요합니다.
- `scripts/`에는 데이터·검수 검사와 공개 사이트 조립·검사가 있습니다. 새 이미지나 근거 매니페스트를 자동 생성하는 명령은 없으며, 생성 이력 JSON은 실행 파일이 아닙니다.

## 배포 범위

`master` 푸시는 `.github/workflows/deploy-pages.yml`을 실행합니다. Node.js 24에서 기본 검사 → 공개 사이트 조립·검증 → 배포 차단 검사 순서로 통과한 경우에만 Pages 파일을 업로드합니다.

공개 파일은 `index.html`, `app.js`, `styles.css`, `app.webmanifest`, 직렬화한 `data/insects.js`, `data/child-content.js`, 등록 갤러리의 `assets/insects/approved/` 이미지, manifest에 등록한 아이콘, `.nojekyll`입니다. 모바일 설치 manifest와 아이콘도 보존합니다.

검수 화면·검수 원본·`tools/`·스키마 초안·개발 예시·문서·스킬과 `data/incomplete-metamorphosis.js`는 배포하지 않습니다. 원본 모듈의 생성 경로와 출처 이력은 저장소에 보존합니다. 공개 종 데이터의 출처·라이선스·프롬프트·검수 상태도 그대로 유지하며, 빌드는 승인 상태를 변경하지 않습니다.

빌드는 공개 파일 목록, 내부 경로 유무, 원본·공개 데이터의 값 일치, 복사된 자산의 바이트 일치를 검사합니다. 새 런타임 파일이나 이미지 형식을 도입하면 빌드의 공개 파일 목록과 관련 검증도 함께 갱신합니다. 미리보기 서버에서 `http://127.0.0.1:8030/_site/`를 열면 실제 배포 범위로 화면을 확인할 수 있습니다.
