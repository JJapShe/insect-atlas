const manifestUrls = [
  "tools/generation-tests/famous-insects-20260902.json",
  "tools/generation-tests/domestic-representative-insects-20260902.json",
  "tools/generation-tests/morphology-white-background-20260903.json",
  "tools/generation-tests/representative-ecology-interaction-20260902.json",
  "tools/generation-tests/deferred-representatives-ecology-interaction-20260903.json",
  "tools/generation-tests/detail-ecology-interaction-20260903.json",
  "tools/generation-tests/world-favorites-20260903.json",
  "tools/generation-tests/gallery-expansion-20260903.json",
  "tools/generation-tests/identity-consistency-20260903.json",
];
const decisionManifestUrl = "tools/review-decisions/image-review-decisions-20260903.json";
const koreanNames = new Map();
const decisionKey = "insect-atlas-review-decisions-v1";
const localDecisions = JSON.parse(localStorage.getItem(decisionKey) || "{}");
let publishedDecisions = {}; let assets = []; let roleFilter = "all";
const $ = (selector) => document.querySelector(selector);
const label = { morphology:"형태·정보", ecology:"생태", interaction:"상호작용", test:"생성 테스트" };

function decisionOf(asset) { return localDecisions[asset.key] || publishedDecisions[asset.key] || "pending"; }
function saveDecision(asset, decision) { localDecisions[asset.key] = decision; localStorage.setItem(decisionKey, JSON.stringify(localDecisions)); render(); }
function normalise(record, manifest) {
  const asset = record.asset;
  if (!asset) return null;
  const sourceId = record.id || record.testSubject || asset;
  const rawRole = record.role || record.kind || (manifest.includes("morphology") ? "morphology" : manifest.includes("famous") ? "test" : "review");
  const role = rawRole.includes("ecology") || rawRole === "habitat-ecology" ? "ecology" : rawRole.includes("interaction") || rawRole.includes("context") || rawRole.includes("resource") ? "interaction" : rawRole === "morphology" || manifest.includes("morphology") ? "morphology" : rawRole === "test" || manifest.includes("famous") ? "test" : "morphology";
  return { key:asset, asset, id:sourceId, name:record.koreanName || koreanNames.get(sourceId) || record.testSubject || sourceId, role, prompt:record.prompt || record.generationPrompt || manifest, status:record.reviewStatus || "review hold" };
}
function recordsForManifest(data) {
  const directRecords = data.records || [];
  const batchedRecords = (data.batches || []).flatMap((batch) => (batch.ids || []).map((id) => ({
    id, koreanName: batch.koreanNames?.[id], role: batch.role,
    asset: batch.assetTemplate.replace("{id}", id), generationPrompt: batch.generationPrompt,
    reviewStatus: batch.reviewStatus,
  })));
  return [...directRecords, ...batchedRecords];
}
async function loadAssets() {
  const [documents, decisionManifest] = await Promise.all([Promise.all(manifestUrls.map(async (url) => [url, await (await fetch(url)).json()])), fetch(decisionManifestUrl).then((response) => response.json())]);
  publishedDecisions = Object.fromEntries((decisionManifest.records || []).map((record) => [record.asset, record.decision]));
  documents.forEach(([url, data]) => recordsForManifest(data).forEach((record) => { if (record.id && record.koreanName) koreanNames.set(record.id, record.koreanName); }));
  assets = documents.flatMap(([url, data]) => recordsForManifest(data).map((record) => normalise(record, url)).filter(Boolean));
  render();
}
function render() {
  const decisionFilter = $("#decisionFilter").value;
  const visible = assets.filter((asset) => (roleFilter === "all" || asset.role === roleFilter) && (decisionFilter === "all" || decisionOf(asset) === decisionFilter));
  $("#summary").textContent = `총 ${assets.length}장 · 표시 ${visible.length}장 · 통과 ${assets.filter((x) => decisionOf(x) === "pass").length} · 탈락 ${assets.filter((x) => decisionOf(x) === "reject").length}`;
  const grid = $("#grid"); grid.replaceChildren();
  visible.forEach((asset) => {
    const decision = decisionOf(asset); const card = document.createElement("article");
    card.innerHTML = `<img src="${asset.asset}" alt="${asset.name} ${label[asset.role]} 검수 후보"><div class="copy"><h2>${asset.name}</h2><div class="meta">${label[asset.role]} · ${asset.status}</div><span class="status ${decision}">${decision === "pass" ? "통과" : decision === "reject" ? "탈락" : "보류"}</span><div class="controls"><button class="pass">통과</button><button class="hold">보류</button><button class="reject">탈락</button></div></div>`;
    card.querySelector("img").addEventListener("click", () => openViewer(asset));
    card.querySelector(".pass").addEventListener("click", () => saveDecision(asset, "pass")); card.querySelector(".hold").addEventListener("click", () => saveDecision(asset, "pending")); card.querySelector(".reject").addEventListener("click", () => saveDecision(asset, "reject"));
    grid.append(card);
  });
}
function openViewer(asset) { $("#viewerImage").src = asset.asset; $("#viewerImage").alt = `${asset.name} 큰 보기`; $("#viewerTitle").textContent = `${asset.name} · ${label[asset.role]}`; $("#viewerMeta").textContent = asset.prompt; $("#viewer").showModal(); }
document.querySelectorAll("[data-filter]").forEach((button) => button.addEventListener("click", () => { roleFilter = button.dataset.filter; document.querySelectorAll("[data-filter]").forEach((item) => item.classList.toggle("active", item === button)); render(); }));
$("#decisionFilter").addEventListener("change", render); $("#closeViewer").addEventListener("click", () => $("#viewer").close());
loadAssets().catch((error) => { $("#summary").textContent = `검수 목록을 불러오지 못했습니다: ${error.message}`; });
