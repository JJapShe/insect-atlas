import { insects } from "./data/insects.js?v=20260903-all-gallery";

const state = { view: "explore", query: "", diet: "all", level: "all", classification: "all", mapMode: "classification", scope: "free", lightboxItems: [], lightboxIndex: 0, previousFocus: null, pinch: { distance: 0, scale: 1 } };
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function filteredInsects() {
  const query = state.query.trim().toLowerCase();
  return insects.filter((insect) => {
    const terms = [insect.koreanName, insect.scientificName, insect.taxonomy?.order, insect.taxonomy?.family, ...(insect.habitat || [])].join(" ").toLowerCase();
    const classificationMatches = state.classification === "all" || (state.classification === "order" && Boolean(insect.taxonomy?.order)) || (state.classification === "family" && Boolean(insect.taxonomy?.family));
    return (!query || terms.includes(query)) && (state.diet === "all" || insect.diet === state.diet) && (state.level === "all" || String(insect.familiarityLevel) === state.level) && classificationMatches;
  });
}

function setPressed(group, active, attribute, value) {
  $$(group).forEach((button) => { const selected = button.dataset[attribute] === value; button.classList.toggle("active", selected); button.setAttribute("aria-pressed", String(selected)); });
}

function updateMetrics() {
  const orders = new Set(insects.map((item) => item.taxonomy?.order).filter(Boolean));
  const galleryItems = insects.flatMap((item) => item.gallery || []);
  $("#speciesCount").textContent = insects.length;
  $("#orderCount").textContent = orders.size;
  $("#galleryCount").textContent = galleryItems.length;
  $("#adminSpeciesCount").textContent = insects.length;
  $("#adminImagePendingCount").textContent = insects.filter((item) => !(item.gallery || []).length).length;
  $("#adminSourceCount").textContent = insects.filter((item) => item.sources).length;
  $$("[data-scope] strong").forEach((node) => { node.textContent = state.scope === "all" ? insects.length : insects.filter((item) => item.access === "free").length; });
  $$("#classificationTabs strong").forEach((node) => { node.textContent = insects.length; });
}

function setView(nextView) {
  state.view = nextView;
  document.body.dataset.view = nextView;
  const titles = { explore: "곤충 분류 · 시기 탐색", catalog: "곤충 도감", admin: "관리자 작업대" };
  const labels = { explore: "무료 탐험판", catalog: "관찰 기록", admin: "관리 구조" };
  $("#viewTitle").textContent = titles[nextView]; $("#modeLabel").textContent = labels[nextView];
  $$(".view").forEach((view) => { const active = view.id === `${nextView}View`; view.hidden = !active; view.classList.toggle("active", active); });
  $$(".nav-tab").forEach((button) => { const active = button.dataset.viewTarget === nextView; button.classList.toggle("active", active); button.setAttribute("aria-pressed", String(active)); });
  closeSidebar();
  if (nextView === "catalog") renderCatalog();
  if (nextView === "explore") renderExplore();
}

function renderExplore() {
  const grid = $("#mapGrid"); const visible = filteredInsects();
  grid.replaceChildren();
  if (!visible.length) { grid.append($("#emptyCatalogTemplate").content.cloneNode(true)); return; }
  visible.forEach((insect) => {
    const card = document.createElement("button"); card.className = "map-species"; card.type = "button";
    const imageLabel = insect.gallery?.length ? `검수 통과 이미지 ${insect.gallery.length}장 · 정보 보기` : "이미지 검수 대기 · 정보 보기";
    card.innerHTML = `<span class="eyebrow">${insect.taxonomy.order} · ${insect.taxonomy.family}</span><strong>${insect.koreanName}</strong><em>${insect.scientificName}</em><small>${imageLabel}</small>`;
    card.addEventListener("click", () => selectInsect(insect)); grid.append(card);
  });
}

function renderCatalog() {
  const grid = $("#catalogGrid"); const visible = filteredInsects();
  grid.replaceChildren();
  if (!visible.length) { grid.append($("#emptyCatalogTemplate").content.cloneNode(true)); return; }
  visible.forEach((insect) => {
    const card = document.createElement("button"); card.className = "species-card"; card.type = "button";
    card.innerHTML = `<span class="card-art" aria-hidden="true">⌬</span><span class="eyebrow">${insect.taxonomy.order} · ${insect.taxonomy.family}</span><strong>${insect.koreanName}</strong><em>${insect.scientificName}</em><span>${insect.appearancePeriod.label}</span>`;
    card.addEventListener("click", () => selectInsect(insect)); grid.append(card);
  });
}

function selectInsect(insect) {
  const gallery = (insect.gallery || []).map((item) => ({ ...item, alt: item.alt || `${insect.koreanName} ${item.role || "갤러리 이미지"}`, title: item.title || `${insect.koreanName} · ${item.role || "갤러리 이미지"}` }));
  $("#detailPanel").innerHTML = `<p class="eyebrow">선택한 곤충</p><h3>${insect.koreanName}</h3><p class="scientific-name">${insect.scientificName}</p><p>${insect.keyAppearanceCues?.join(" · ") || "외형 단서 준비 중"}</p><div class="detail-tags"><span>${insect.taxonomy?.order || "목 미정"}</span><span>${insect.appearancePeriod?.label || "시기 미정"}</span><span>${insect.habitat?.[0] || "서식지 미정"}</span></div>${gallery.length ? `<button class="primary-action" id="openGallery" type="button">갤러리 ${gallery.length}장 보기</button>` : `<p class="image-pending">이미지는 현재 검수 중입니다. 종 정보는 먼저 볼 수 있어요.</p>`}`;
  $("#openGallery")?.addEventListener("click", () => openLightbox(gallery, 0));
}

function showDialog(dialog) { state.previousFocus = document.activeElement; dialog.hidden = false; dialog.setAttribute("aria-hidden", "false"); document.body.classList.add("modal-open"); $("[role=dialog]", dialog)?.focus(); }
function closeDialog(dialog) { dialog.hidden = true; dialog.setAttribute("aria-hidden", "true"); document.body.classList.remove("modal-open"); state.previousFocus?.focus?.(); }
function openLightbox(items, index) { if (!items.length) return; state.lightboxItems = items; state.lightboxIndex = index; renderLightbox(); showDialog($("#imageLightbox")); }
function renderLightbox() { const item = state.lightboxItems[state.lightboxIndex]; if (!item) return; $("#lightboxImage").src = item.src; $("#lightboxImage").alt = item.alt || "곤충 갤러리 이미지"; $("#lightboxTitle").textContent = item.title || "곤충 관찰 이미지"; $("#lightboxKind").textContent = item.role || "곤충 그림"; $("#lightboxBody").textContent = item.body || ""; $("#lightboxCount").textContent = `${state.lightboxIndex + 1} / ${state.lightboxItems.length}`; }
function moveLightbox(direction) { const total = state.lightboxItems.length; if (!total) return; state.lightboxIndex = (state.lightboxIndex + direction + total) % total; renderLightbox(); }
function distance(touches) { return Math.hypot(touches[0].clientX - touches[1].clientX, touches[0].clientY - touches[1].clientY); }

function openSidebar() { document.body.classList.add("sidebar-open"); $("#sidebarScrim").hidden = false; $("#menuButton").setAttribute("aria-expanded", "true"); }
function closeSidebar() { document.body.classList.remove("sidebar-open"); $("#sidebarScrim").hidden = true; $("#menuButton").setAttribute("aria-expanded", "false"); }

function bindEvents() {
  $$('[data-view-target]').forEach((button) => button.addEventListener("click", () => setView(button.dataset.viewTarget)));
  $("#searchInput").addEventListener("input", (event) => { state.query = event.target.value; renderExplore(); renderCatalog(); });
  $$("#dietFilter button").forEach((button) => button.addEventListener("click", () => { state.diet = button.dataset.diet; setPressed("#dietFilter button", "active", "diet", state.diet); renderExplore(); renderCatalog(); }));
  $$("#levelFilter button").forEach((button) => button.addEventListener("click", () => { state.level = button.dataset.level; setPressed("#levelFilter button", "active", "level", state.level); renderExplore(); renderCatalog(); }));
  $("#resetFilters").addEventListener("click", () => { state.query = ""; state.diet = "all"; state.level = "all"; $("#searchInput").value = ""; setPressed("#dietFilter button", "active", "diet", "all"); setPressed("#levelFilter button", "active", "level", "all"); renderExplore(); renderCatalog(); });
  $$("[data-map-mode]").forEach((button) => button.addEventListener("click", () => { state.mapMode = button.dataset.mapMode; $$("[data-map-mode]").forEach((item) => { const active = item === button; item.classList.toggle("active", active); item.setAttribute("aria-selected", String(active)); }); }));
  $$("[data-classification]").forEach((button) => button.addEventListener("click", () => { state.classification = button.dataset.classification; setPressed("[data-classification]", "active", "classification", state.classification); renderExplore(); }));
  $$("[data-scope]").forEach((button) => button.addEventListener("click", () => { state.scope = button.dataset.scope; setPressed("[data-scope]", "active", "scope", state.scope); updateMetrics(); }));
  $("#tierButton").addEventListener("click", () => showDialog($("#subscriptionDialog")));
  $$('[data-dialog-close]').forEach((button) => button.addEventListener("click", () => closeDialog($("#subscriptionDialog"))));
  $$('[data-lightbox-action]').forEach((button) => button.addEventListener("click", () => { const action = button.dataset.lightboxAction; if (action === "close") closeDialog($("#imageLightbox")); else moveLightbox(action === "next" ? 1 : -1); }));
  $("#menuButton").addEventListener("click", openSidebar); $("#sidebarScrim").addEventListener("click", closeSidebar);
  $("#lightboxStage").addEventListener("click", (event) => { if (event.target === $("#lightboxStage") || event.target === $("#lightboxImage")) { $("#imageLightbox").classList.add("nav-hidden"); window.setTimeout(() => $("#imageLightbox").classList.remove("nav-hidden"), 1500); } });
  $("#lightboxStage").addEventListener("touchstart", (event) => { if (event.touches.length === 2) state.pinch.distance = distance(event.touches); }, { passive: true });
  $("#lightboxStage").addEventListener("touchmove", (event) => { if (event.touches.length === 2 && state.pinch.distance) { state.pinch.scale = Math.min(3, Math.max(1, state.pinch.scale * (distance(event.touches) / state.pinch.distance))); state.pinch.distance = distance(event.touches); $("#lightboxImage").style.transform = `scale(${state.pinch.scale})`; } }, { passive: true });
  $("#lightboxStage").addEventListener("touchend", () => { state.pinch.distance = 0; }, { passive: true });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") { [$("#imageLightbox"), $("#subscriptionDialog")].filter((dialog) => !dialog.hidden).forEach(closeDialog); } if (!$("#imageLightbox").hidden && event.key === "ArrowRight") moveLightbox(1); if (!$("#imageLightbox").hidden && event.key === "ArrowLeft") moveLightbox(-1); });
}

bindEvents(); updateMetrics(); renderExplore(); renderCatalog();
