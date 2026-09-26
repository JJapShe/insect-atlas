export const manifestUrls = Object.freeze([
  "tools/generation-tests/famous-insects-20260902.json",
  "tools/generation-tests/domestic-representative-insects-20260902.json",
  "tools/generation-tests/morphology-white-background-20260903.json",
  "tools/generation-tests/representative-ecology-interaction-20260902.json",
  "tools/generation-tests/deferred-representatives-ecology-interaction-20260903.json",
  "tools/generation-tests/detail-ecology-interaction-20260903.json",
  "tools/generation-tests/world-favorites-20260903.json",
  "tools/generation-tests/gallery-expansion-20260903.json",
  "tools/generation-tests/identity-consistency-20260903.json",
  "tools/generation-tests/pose-diversity-20260903.json",
  "tools/generation-tests/tomtomi-insects-20260904.json",
  "tools/generation-tests/international-beetles-20260904.json",
  "tools/generation-tests/aquatic-familiar-insects-20260905.json",
  "tools/generation-tests/woodland-life-stages-20260905.json",
  "tools/generation-tests/seven-insects-20260905.json",
  "tools/generation-tests/life-stages-20260905.json",
  "tools/generation-tests/familiar-local-20260909.json",
  "tools/generation-tests/rare-famous-20260909.json",
  "tools/generation-tests/familiar-next-20260909.json",
  "tools/generation-tests/new-friend-representatives-20260910.json",
  "tools/generation-tests/new-friend-gallery-expansion-20260910.json",
  "tools/generation-tests/priority-representatives-20260917.json",
  "tools/generation-tests/priority-gallery-20260922.json",
  "tools/generation-tests/priority-gallery-20260922-b.json",
  "tools/generation-tests/priority-gallery-20260922-c.json",
  "tools/generation-tests/priority-gallery-20260922-d.json",
  "tools/generation-tests/priority-gallery-20260922-e.json",
  "tools/generation-tests/priority-gallery-20260922-f.json",
  "tools/generation-tests/priority-new-friends-20260922.json",
  "tools/generation-tests/priority-life-cycle-20260922.json",
  "tools/generation-tests/priority-life-cycle-20260922-b.json",
  "tools/generation-tests/priority-life-cycle-20260922-c.json",
  "tools/generation-tests/priority-new-friends-20260922-b.json",
  "tools/generation-tests/priority-life-cycle-20260922-d.json",
  "tools/generation-tests/priority-gallery-20260922-g.json",
  "tools/generation-tests/priority-new-friends-20260922-c.json",
  "tools/generation-tests/priority-new-friends-20260922-d.json",
  "tools/generation-tests/priority-new-friends-20260922-e.json",
  "tools/generation-tests/priority-life-cycle-20260922-e.json",
  "tools/generation-tests/priority-life-cycle-20260922-f.json",
  "tools/generation-tests/priority-life-cycle-20260922-g.json",
  "tools/generation-tests/priority-life-cycle-20260922-h.json",
  "tools/generation-tests/priority-life-cycle-20260922-i.json",
  "tools/generation-tests/priority-life-cycle-20260922-j.json",
  "tools/generation-tests/priority-new-friends-20260926-a.json",
  "tools/generation-tests/priority-life-cycle-20260926-a.json",
  "tools/generation-tests/priority-gallery-20260926-a.json",
  "tools/generation-tests/priority-gallery-20260926-b.json",
  "tools/generation-tests/priority-gallery-20260926-c.json",
  "tools/generation-tests/priority-life-cycle-20260926-b.json",
  "tools/generation-tests/priority-life-cycle-20260926-c.json",
  "tools/generation-tests/priority-gallery-20260926-d.json",
  "tools/generation-tests/priority-life-cycle-20260926-d.json",
  "tools/generation-tests/priority-life-cycle-20260926-e.json",
]);

const publicReviewFolders = Object.freeze([
  ["assets/insects/review/familiar-life-expansion-20260908", new Set(["aquarius-paludum", "chrysopa-intima", "lycorma-delicatula", "trichonephila-clavata", "armadillidium-vulgare", "acusta-despecta", "pandinus-imperator"])],
  ["assets/insects/review/familiar-life-expansion-20260909", new Set(["anechura-japonica", "aphis-gossypii", "blattella-germanica", "scolopendra-subspinipes-mutilans", "bradybaena-similaris", "eisenia-fetida"])],
]);
const reviewAssetByPublicFile = new Map([
  ["trichonephila-clavata-egg-sack-imagegen-v1.png", "assets/insects/review/priority-life-cycle-20260922-e/trichonephila-clavata-egg-sack-imagegen-v1.png"],
  ["trichonephila-clavata-juvenile-imagegen-v1.png", "assets/insects/review/priority-life-cycle-20260922-e/trichonephila-clavata-juvenile-imagegen-v1.png"],
  ["acusta-despecta-egg-imagegen-v1.png", "assets/insects/review/priority-life-cycle-20260922-f/acusta-despecta-egg-imagegen-v1.png"],
  ["acusta-despecta-juvenile-imagegen-v1.png", "assets/insects/review/priority-life-cycle-20260922-f/acusta-despecta-juvenile-imagegen-v1.png"],
  ["armadillidium-vulgare-brood-imagegen-v1.png", "assets/insects/review/priority-life-cycle-20260922-g/armadillidium-vulgare-brood-imagegen-v1.png"],
  ["armadillidium-vulgare-juvenile-imagegen-v1.png", "assets/insects/review/priority-life-cycle-20260922-g/armadillidium-vulgare-juvenile-imagegen-v1.png"],
  ["pandinus-imperator-newborn-imagegen-v1.png", "assets/insects/review/priority-life-cycle-20260922-h/pandinus-imperator-newborn-imagegen-v1.png"],
  ["pandinus-imperator-juvenile-imagegen-v1.png", "assets/insects/review/priority-life-cycle-20260922-h/pandinus-imperator-juvenile-imagegen-v1.png"],
  ["actias-luna-egg-imagegen-v1.png", "assets/insects/review/priority-life-cycle-20260922-i/actias-luna-egg-imagegen-v1.png"],
  ["limulus-polyphemus-larva-imagegen-v1.png", "assets/insects/review/priority-life-cycle-20260922-j/limulus-polyphemus-larva-imagegen-v1.png"],
  ...["pagurus-minutus-individual-imagegen-v1.png", "pagurus-minutus-juvenile-imagegen-v1.png", "pagurus-minutus-shell-choice-imagegen-v1.png", "pagurus-minutus-feeding-imagegen-v1.png"].map((file) => [file, `assets/insects/review/priority-new-friends-20260926-a/${file}`]),
  ["birgus-latro-larva-imagegen-v1.png", "assets/insects/review/priority-life-cycle-20260926-a/birgus-latro-larva-imagegen-v1.png"],
  ["chrysina-gloriosa-ecology-imagegen-v1.png", "assets/insects/review/priority-gallery-20260926-a/chrysina-gloriosa-ecology-imagegen-v1.png"],
  ["danaus-plexippus-ecology-imagegen-v1.png", "assets/insects/review/priority-gallery-20260926-b/danaus-plexippus-ecology-imagegen-v1.png"],
  ["deroplatys-desiccata-ecology-imagegen-v1.png", "assets/insects/review/priority-gallery-20260926-c/deroplatys-desiccata-ecology-imagegen-v1.png"],
  ["macroglossum-pyrrhosticta-egg-imagegen-v1.png", "assets/insects/review/priority-life-cycle-20260926-b/macroglossum-pyrrhosticta-egg-imagegen-v1.png"],
  ["kallima-inachus-pupa-imagegen-v1.png", "assets/insects/review/priority-life-cycle-20260926-c/kallima-inachus-pupa-imagegen-v1.png"],
  ["ranatra-chinensis-ecology-imagegen-v1.png", "assets/insects/review/priority-gallery-20260926-d/ranatra-chinensis-ecology-imagegen-v1.png"],
  ["meloimorpha-japonica-egg-imagegen-v1.png", "assets/insects/review/priority-life-cycle-20260926-d/meloimorpha-japonica-egg-imagegen-v1.png"],
  ["gryllus-bimaculatus-egg-imagegen-v1.png", "assets/insects/review/priority-life-cycle-20260926-e/gryllus-bimaculatus-egg-imagegen-v1.png"],
  ["trypoxylus-dichotomus-interaction-imagegen-v1.png", "assets/insects/review/replaced-combat-20260905/trypoxylus-dichotomus-interaction-2-imagegen-v1.png"],
  ["tenodera-sinensis-interaction-imagegen-v1.png", "assets/insects/review/replaced-combat-20260905/tenodera-sinensis-interaction-2-imagegen-v1.png"],
  ...["dipentium-japonicum-ecology-2-imagegen-v1.png", "pulex-irritans-ecology-2-imagegen-v1.png", "monomorium-chinense-ecology-2-imagegen-v1.png", "brephidium-exilis-ecology-2-imagegen-v1.png", "eriophyes-tiliae-ecology-2-imagegen-v1.png", "lissachatina-fulica-ecology-2-imagegen-v1.png", "limax-flavus-ecology-2-imagegen-v1.png", "maratus-volans-ecology-2-imagegen-v1.png", "greta-oto-ecology-2-imagegen-v1.png", "sphaerocoris-annulus-ecology-2-imagegen-v1.png", "catoxantha-purpurea-ecology-2-imagegen-v1.png", "polymita-picta-ecology-2-imagegen-v1.png", "bombyx-mori-larva-imagegen-v1.png", "tenebrio-molitor-larva-imagegen-v1.png"].map((file) => [file, `assets/insects/review/new-friend-gallery-expansion-20260910/${file}`]),
]);
export const unresolvedPublicFiles = new Set([
  "dorcus-titanus-castanicolor-interaction-2-imagegen-v1.png",
  "lethocerus-deyrolli-interaction-2-imagegen-v1.png",
  "cicindela-chinensis-flammifera-interaction-2-imagegen-v1.png",
  "platerodrilus-ngi-ecology-imagegen-v1.png",
  "platerodrilus-ngi-morphology-imagegen-v1.png",
  "platerodrilus-ngi-interaction-imagegen-v1.png",
  "platerodrilus-ngi-interaction-2-imagegen-v1.png",
]);

const fileName = (path) => path.split("/").at(-1);
const roleForFile = (file) => ["individual", "ecology", "interaction", "egg", "larva", "nymph", "pupa", "cocoon"].find((role) => file.includes(`-${role}`)) || "morphology";

export function recordsForManifest(data) {
  const directRecords = data.records || [];
  const batchedRecords = (data.batches || []).flatMap((batch) => (batch.ids || []).map((id) => ({
    id, koreanName: batch.koreanNames?.[id], role: batch.role,
    asset: batch.assetTemplate.replace("{id}", id), generationPrompt: batch.generationPrompt,
    reviewStatus: batch.reviewStatus,
  })));
  const speciesRecords = (data.species || []).flatMap((species) => {
    const roles = species.roles || (species.kind ? [species.kind] : []);
    return roles.map((role) => ({
      id: species.id, koreanName: species.koreanName, role,
      asset: species.asset && roles.length === 1 ? species.asset : `${data.reviewFolder}/${species.id}-${role}-imagegen-v1.png`,
      generationPrompt: species.generationPrompt || species.prompt || data.generationPrompt || data.workflow,
      reviewStatus: species.reviewStatus || data.reviewStatus || "published-pending-user-review",
    }));
  });
  return [...directRecords, ...batchedRecords, ...speciesRecords];
}

export function recordsForPublicGallery(insects) {
  return insects.flatMap((insect) => (insect.gallery || []).flatMap((image) => {
    const file = fileName(image.src);
    const asset = reviewAssetByPublicFile.get(file) || (() => {
      const folder = publicReviewFolders.find(([, ids]) => ids.has(insect.id))?.[0];
      return folder && `${folder}/${file}`;
    })();
    if (asset) return [{ id: insect.id, koreanName: insect.koreanName, role: roleForFile(file), asset, generationPrompt: image.generationPrompt, reviewStatus: image.reviewStatus }];
    return unresolvedPublicFiles.has(file) ? [{ id: insect.id, koreanName: insect.koreanName, role: roleForFile(file), asset: image.src, generationPrompt: image.generationPrompt, reviewStatus: "공개본 · 검수원본 미확인" }] : [];
  }));
}

export function uniqueAssets(records) {
  return [...new Map(records.filter((record) => record.asset).map((record) => [record.asset, record])).values()];
}
