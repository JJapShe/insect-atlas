import { readFile } from "node:fs/promises";
import vm from "node:vm";
import { insects } from "../data/insects.js";
import { generatedImages, incompleteMetamorphosisIds } from "../data/incomplete-metamorphosis.js";
import { childContentFor, childContentIds } from "../data/child-content.js";

const files = ["index.html", "styles.css", "app.js", "review.html", "review.js", "data/insects.js", "data/insect-schema.js", "data/child-content.js"];
for (const file of files) await readFile(new URL(`../${file}`, import.meta.url), "utf8");
const decisions = JSON.parse(await readFile(new URL("../tools/review-decisions/image-review-decisions-20260903.json", import.meta.url), "utf8"));
if ((decisions.records || []).filter((record) => record.decision === "pass").length !== 3 || (decisions.records || []).filter((record) => record.decision === "reject").length !== 18) throw new Error("Published review decision counts are incomplete.");
const newFriendRepresentativeIds = new Set(["cerura-felina", "chrysiridia-rhipheus", "theraphosa-blondi", "mymaridae", "dipentium-japonicum", "pulex-irritans", "monomorium-chinense", "brephidium-exilis", "eriophyes-tiliae", "lissachatina-fulica", "limax-flavus", "maratus-volans", "greta-oto", "sphaerocoris-annulus", "catoxantha-purpurea", "polymita-picta", "bombyx-mori", "tenebrio-molitor"]);
const newFriendExpansionIds = new Set(["cerura-felina", "chrysiridia-rhipheus", "theraphosa-blondi", "mymaridae", "dipentium-japonicum", "pulex-irritans", "monomorium-chinense", "brephidium-exilis", "eriophyes-tiliae", "lissachatina-fulica", "limax-flavus", "maratus-volans"]);
const illustratedNonInsectIds = new Set(["trichonephila-clavata", "armadillidium-vulgare", "acusta-despecta", "pandinus-imperator"]);
const illustratedFamiliarInsectIds = new Set(["aquarius-paludum", "chrysopa-intima", "lycorma-delicatula"]);
const illustratedExpansionIds = new Set(["anechura-japonica", "aphis-gossypii", "blattella-germanica", "scolopendra-subspinipes-mutilans", "bradybaena-similaris", "eisenia-fetida"]);
const familiarLocalIds = new Set(["coccinella-septempunctata", "zizeeria-maha", "meimuna-mongolica", "episyrphus-balteatus", "oxya-japonica", "atractomorpha-lata", "plutella-xylostella", "formica-japonica"]);
const familiarLocalStages = new Map([["coccinella-septempunctata", "larva"], ["zizeeria-maha", "pupa"], ["meimuna-mongolica", "nymph"], ["episyrphus-balteatus", "larva"], ["oxya-japonica", "nymph"], ["atractomorpha-lata", "nymph"], ["plutella-xylostella", "pupa"], ["formica-japonica", "pupa"]]);
const rareFamousIds = new Set(["gromphadorhina-portentosa", "atta-cephalotes", "phyllium-giganteum", "archispirostreptus-gigas", "euchroma-giganteum", "trachelophorus-giraffa"]);
const rareFamousStages = new Map([["gromphadorhina-portentosa", "nymph"], ["atta-cephalotes", "pupa"], ["phyllium-giganteum", "nymph"], ["archispirostreptus-gigas", "egg"], ["euchroma-giganteum", "larva"], ["trachelophorus-giraffa", "pupa"]]);
const familiarNextIds = new Set(["eurema-mandarina", "myrmeleon-formicarius", "diestrammena-asynamora", "diplonychus-japonicus"]);
const familiarNextStages = new Map([["eurema-mandarina", "pupa"], ["myrmeleon-formicarius", "larva"], ["diestrammena-asynamora", "nymph"], ["diplonychus-japonicus", "nymph"]]);
const familiarLifeStages = new Map([["aquarius-paludum", ["egg", "nymph"]], ["chrysopa-intima", ["egg", "larva", "pupa"]], ["lycorma-delicatula", ["egg", "nymph"]], ["anechura-japonica", ["egg"]], ["aphis-gossypii", ["nymph"]], ["blattella-germanica", ["nymph"]], ["scolopendra-subspinipes-mutilans", ["egg"]], ["bradybaena-similaris", ["egg"]], ["eisenia-fetida", ["cocoon"]]]);
if (!Array.isArray(insects) || insects.length !== 113 || new Set(insects.map((insect) => insect.id)).size !== 113 || [...familiarLocalIds, ...rareFamousIds, ...familiarNextIds, ...newFriendRepresentativeIds].some((id) => !insects.some((insect) => insect.id === id))) throw new Error("Production data must contain 113 unique records, including new-friend representative images.");
if (childContentIds.length !== insects.length || new Set(childContentIds).size !== insects.length || childContentIds.some((id) => !insects.some((insect) => insect.id === id))) throw new Error("Child content must map 1:1 to public species records.");
for (const insect of insects) {
  const content = childContentFor(insect);
  if (![content.intro, content.habitat, content.diet, content.appearance, content.growth, content.lifespan, content.observe].every((value) => typeof value === "string" && value.length > 10) || !content.sources.length || content.sources.some((source) => !source.label || !source.url || !source.checkedOn || !source.supports)) throw new Error(`Incomplete child content: ${insect.id}`);
}
const invalidRecord = insects.find((insect) => !insect.id || !insect.koreanName || !insect.scientificName || !insect.taxonomy?.order || !insect.taxonomy?.family || !insect.lifespan?.label || !Array.isArray(insect.gallery) || (insect.gallery.length === 0 && insect.reviewStatus !== "draft") || (insect.gallery.length > 0 && insect.reviewStatus !== "gallery-published-pending-user-review"));
if (invalidRecord) throw new Error(`Invalid public information record: ${invalidRecord?.id || "unknown"}`);
const publicGalleryItems = insects.flatMap((insect) => insect.gallery || []);
if (insects.some((insect) => insect.gallery.length && ![4, 5, 6, 7].includes(insect.gallery.length) && !(newFriendRepresentativeIds.has(insect.id) && [1, 2].includes(insect.gallery.length)))) throw new Error("Illustrated species must retain four standard images, except staged new-friend galleries.");
const completeMetamorphosisIds = new Set([
  "lucanus-maculifemoratus", "trypoxylus-dichotomus", "harmonia-axyridis", "protaetia-brevitarsis", "anoplophora-malasiaca", "papilio-xuthus", "pieris-rapae", "sasakia-charonda", "sericinus-montela", "attacus-atlas", "callambulyx-tatarinovii", "actias-artemis", "langia-zenzeroides-nawai", "camponotus-japonicus", "apis-cerana", "dorcus-titanus-castanicolor", "dorcus-hopei-binodulosus", "pyrocoelia-rufa", "luciola-lateralis", "bombus-ignitus", "culex-pipiens-pallens", "musca-domestica", "cybister-japonicus", "dynastes-hercules", "scarabaeus-sacer", "goliathus-goliatus", "chalcosoma-chiron", "eupatorus-gracilicornis", "prosopocoilus-inclinatus", "cicindela-chinensis-flammifera", "carabus-smaragdinus", "callipogon-relictus", "platerodrilus-ngi", "morpho-menelaus", "chrysochroa-fulgidissima", "paraponera-clavata", "euproctis-subflava", "meloe-proscarabaeus", "vespa-mandarinia", "pheropsophus-jessoensis", "thysania-agrippina", "ascotis-selenaria-larva",
]);
const lifeStages = ["egg", "larva", "pupa"];
const lifeStageSpecies = insects.filter((insect) => completeMetamorphosisIds.has(insect.id));
if (completeMetamorphosisIds.size !== 42 || lifeStageSpecies.length !== completeMetamorphosisIds.size || lifeStageSpecies.some((insect) => insect.gallery.length !== 7)) throw new Error("Every complete-metamorphosis species must retain seven gallery images.");
if (incompleteMetamorphosisIds.length !== 22 || new Set(incompleteMetamorphosisIds).size !== 22 || insects.filter((insect) => insect.reviewStatus !== "draft" && !completeMetamorphosisIds.has(insect.id) && !illustratedNonInsectIds.has(insect.id) && !illustratedFamiliarInsectIds.has(insect.id) && !illustratedExpansionIds.has(insect.id) && !familiarLocalIds.has(insect.id) && !rareFamousIds.has(insect.id) && !familiarNextIds.has(insect.id) && !newFriendRepresentativeIds.has(insect.id)).some((insect) => !incompleteMetamorphosisIds.includes(insect.id))) throw new Error("The incomplete-metamorphosis goal must cover all illustrated insect records.");
if ([...newFriendRepresentativeIds].some((id) => {
  const insect = insects.find((item) => item.id === id);
  return !insect || insect.gallery.length !== (newFriendExpansionIds.has(id) ? 2 : 1) || insect.reviewStatus !== "gallery-published-pending-user-review" || insect.gallery[0].role !== "생태 대표 관찰" || insect.familiarityLevel !== 1 || !insect.region.includes("새로운 친구");
})) throw new Error("New-friend records must expose their single reviewed representative cut.");
for (const [id, stages] of familiarLifeStages) {
  const insect = insects.find((item) => item.id === id);
  const baseImageCount = illustratedExpansionIds.has(id) ? 3 : 4;
  if (!insect || insect.gallery.length !== baseImageCount + stages.length || !stages.every((stage) => insect.gallery.some((item) => item.src.endsWith(`${id}-${stage}-imagegen-v1.png`)))) throw new Error(`Familiar-life gallery is incomplete: ${id}`);
  for (const stage of stages) {
    const fileName = `${id}-${stage}-imagegen-v1.png`;
    const reviewFolder = illustratedExpansionIds.has(id) ? "familiar-life-expansion-20260909" : "familiar-life-expansion-20260908";
    const reviewCopy = await readFile(new URL(`../assets/insects/review/${reviewFolder}/${fileName}`, import.meta.url));
    const publicCopy = await readFile(new URL(`../assets/insects/approved/${fileName}`, import.meta.url));
    if (!reviewCopy.equals(publicCopy)) throw new Error(`Review and public copies differ: ${fileName}`);
  }
}
for (const id of illustratedExpansionIds) {
  const insect = insects.find((item) => item.id === id);
  if (!insect || insect.gallery.length !== 4) throw new Error(`Familiar-life expansion needs four varied images: ${id}`);
  for (const image of insect.gallery) {
    const fileName = image.src.split("/").at(-1);
    const reviewCopy = await readFile(new URL(`../assets/insects/review/familiar-life-expansion-20260909/${fileName}`, import.meta.url));
    const publicCopy = await readFile(new URL(`../assets/insects/approved/${fileName}`, import.meta.url));
    if (!reviewCopy.equals(publicCopy)) throw new Error(`Review and public copies differ: ${fileName}`);
  }
}
for (const [id, stage] of familiarLocalStages) {
  const insect = insects.find((item) => item.id === id);
  if (!insect || insect.gallery.length !== 4 || !insect.gallery.some((item) => item.src.endsWith(`${id}-${stage}-imagegen-v1.png`)) || !insect.sources?.length) throw new Error(`Familiar local record is incomplete: ${id}`);
  for (const image of insect.gallery) {
    const fileName = image.src.split("/").at(-1);
    const reviewCopy = await readFile(new URL(`../assets/insects/review/familiar-local-20260909/${fileName}`, import.meta.url));
    const publicCopy = await readFile(new URL(`../assets/insects/approved/${fileName}`, import.meta.url));
    if (!reviewCopy.equals(publicCopy)) throw new Error(`Review and public copies differ: ${fileName}`);
  }
}
for (const [id, stage] of rareFamousStages) {
  const insect = insects.find((item) => item.id === id);
  if (!insect || insect.gallery.length !== 4 || insect.familiarityLevel !== 1 || !insect.region.includes("새로운 친구") || !insect.gallery.some((item) => item.src.endsWith(`${id}-${stage}-imagegen-v1.png`)) || !insect.sources?.length) throw new Error(`Rare or famous new-friend record is incomplete: ${id}`);
  for (const image of insect.gallery) {
    const fileName = image.src.split("/").at(-1);
    const reviewCopy = await readFile(new URL(`../assets/insects/review/rare-famous-20260909/${fileName}`, import.meta.url));
    const publicCopy = await readFile(new URL(`../assets/insects/approved/${fileName}`, import.meta.url));
    if (!reviewCopy.equals(publicCopy)) throw new Error(`Review and public copies differ: ${fileName}`);
  }
}
for (const [id, stage] of familiarNextStages) {
  const insect = insects.find((item) => item.id === id);
  if (!insect || insect.gallery.length !== 4 || insect.familiarityLevel !== 1 || !insect.region.includes("새로운 친구") || !insect.gallery.some((item) => item.src.endsWith(`${id}-${stage}-imagegen-v1.png`)) || !insect.sources?.length) throw new Error(`Familiar new-friend record is incomplete: ${id}`);
  for (const image of insect.gallery) {
    const fileName = image.src.split("/").at(-1);
    const reviewCopy = await readFile(new URL(`../assets/insects/review/familiar-next-20260909/${fileName}`, import.meta.url));
    const publicCopy = await readFile(new URL(`../assets/insects/approved/${fileName}`, import.meta.url));
    if (!reviewCopy.equals(publicCopy)) throw new Error(`Review and public copies differ: ${fileName}`);
  }
}
const familiarLocalManifest = JSON.parse(await readFile(new URL("../tools/generation-tests/familiar-local-20260909.json", import.meta.url), "utf8"));
if (familiarLocalManifest.species?.length !== familiarLocalIds.size || familiarLocalManifest.species.some((entry) => !familiarLocalIds.has(entry.id) || entry.roles?.length !== 4 || !entry.sources?.length || !entry.supports)) throw new Error("Familiar local image provenance manifest is incomplete.");
const rareFamousManifest = JSON.parse(await readFile(new URL("../tools/generation-tests/rare-famous-20260909.json", import.meta.url), "utf8"));
if (rareFamousManifest.species?.length !== rareFamousIds.size || rareFamousManifest.species.some((entry) => !rareFamousIds.has(entry.id) || entry.roles?.length !== 4 || !entry.sources?.length || !entry.supports)) throw new Error("Rare and famous image provenance manifest is incomplete.");
const familiarNextManifest = JSON.parse(await readFile(new URL("../tools/generation-tests/familiar-next-20260909.json", import.meta.url), "utf8"));
if (familiarNextManifest.species?.length !== familiarNextIds.size || familiarNextManifest.species.some((entry) => !familiarNextIds.has(entry.id) || entry.roles?.length !== 4 || !entry.sources?.length || !entry.supports)) throw new Error("Familiar new-friend image provenance manifest is incomplete.");
const familiarLifeGalleryCount = [...illustratedNonInsectIds, ...illustratedFamiliarInsectIds, ...illustratedExpansionIds, ...familiarLocalIds, ...rareFamousIds, ...familiarNextIds, ...newFriendRepresentativeIds].reduce((total, id) => total + insects.find((insect) => insect.id === id).gallery.length, 0);
if (publicGalleryItems.length !== 378 + generatedImages.length + familiarLifeGalleryCount) throw new Error("Registered gallery count must match the baseline plus individually reviewed additions.");
const newFriendManifest = JSON.parse(await readFile(new URL("../tools/generation-tests/new-friend-representatives-20260910.json", import.meta.url), "utf8"));
if (newFriendManifest.species?.length !== newFriendRepresentativeIds.size || newFriendManifest.species.some((entry) => !newFriendRepresentativeIds.has(entry.id) || entry.roles?.join(",") !== "individual" || !entry.asset || !entry.supports)) throw new Error("New-friend representative provenance manifest is incomplete.");
for (const entry of newFriendManifest.species) {
  const fileName = entry.asset.split("/").at(-1);
  const reviewCopy = await readFile(new URL(`../${entry.asset}`, import.meta.url));
  const publicCopy = await readFile(new URL(`../assets/insects/approved/${fileName}`, import.meta.url));
  if (!reviewCopy.equals(publicCopy)) throw new Error(`Review and public copies differ: ${fileName}`);
}
const newFriendExpansionManifest = JSON.parse(await readFile(new URL("../tools/generation-tests/new-friend-gallery-expansion-20260910.json", import.meta.url), "utf8"));
if (newFriendExpansionManifest.species?.length !== newFriendExpansionIds.size || newFriendExpansionManifest.species.some((entry) => !newFriendExpansionIds.has(entry.id) || !entry.kind || !entry.asset || !entry.supports)) throw new Error("New-friend gallery expansion provenance manifest is incomplete.");
for (const entry of newFriendExpansionManifest.species) {
  const fileName = entry.asset.split("/").at(-1);
  const reviewCopy = await readFile(new URL(`../${entry.asset}`, import.meta.url));
  const publicCopy = await readFile(new URL(`../assets/insects/approved/${fileName}`, import.meta.url));
  if (!reviewCopy.equals(publicCopy)) throw new Error(`Review and public copies differ: ${fileName}`);
}
if (new Set(generatedImages.map((image) => image.src)).size !== generatedImages.length) throw new Error("New images must not be registered twice.");
for (const image of generatedImages) {
  if (!incompleteMetamorphosisIds.includes(image.id) || !["egg", "nymph", "ecology", "morphology", "interaction", "interaction-2"].includes(image.role) || !image.sources?.length || !image.reviewNotes || !image.body.includes("AI 생성")) throw new Error(`Missing life-stage provenance or invalid role: ${image.id}/${image.role}`);
  if (!insects.find((insect) => insect.id === image.id)?.gallery.some((item) => item.src === image.src)) throw new Error(`Unregistered new image: ${image.src}`);
  const reviewCopy = await readFile(new URL(`../${image.asset}`, import.meta.url));
  const publicCopy = await readFile(new URL(`../${image.src}`, import.meta.url));
  if (!reviewCopy.equals(publicCopy)) throw new Error(`Review and public copies differ: ${image.src}`);
}
for (const id of incompleteMetamorphosisIds) {
  const insect = insects.find((item) => item.id === id);
  const stages = generatedImages.filter((image) => image.id === id && ["egg", "nymph"].includes(image.role));
  if (!insect || insect.gallery.length !== 4 + stages.length || !insect.lifeCycle.includes("약충") || insect.gallery.some((image) => /번데기|유충 관찰/.test(image.role))) throw new Error(`Invalid incomplete-metamorphosis gallery: ${id}`);
  if (process.argv.includes("--complete") && !["egg", "nymph"].every((stage) => stages.some((image) => image.role === stage))) throw new Error(`Goal unfinished: ${id} still needs egg/nymph images.`);
}
for (const insect of lifeStageSpecies) for (const stage of lifeStages) {
  const fileName = `${insect.id}-${stage}-imagegen-v1.png`;
  if (!insect.gallery.some((item) => item.src.endsWith(fileName))) throw new Error(`Missing ${stage} gallery asset for ${insect.id}.`);
  await readFile(new URL(`../assets/insects/review/life-stages-20260905/${fileName}`, import.meta.url));
}
const lifeStageManifest = JSON.parse(await readFile(new URL("../tools/generation-tests/life-stages-20260905.json", import.meta.url), "utf8"));
for (const stage of lifeStages) {
  const ids = new Set(lifeStageManifest.batches.filter((batch) => batch.role === stage).flatMap((batch) => batch.ids));
  if (ids.size !== completeMetamorphosisIds.size || [...completeMetamorphosisIds].some((id) => !ids.has(id))) throw new Error(`Life-stage manifest is incomplete for ${stage}.`);
}
if (publicGalleryItems.length < 144 || publicGalleryItems.length !== insects.reduce((total, insect) => total + insect.gallery.length, 0) || publicGalleryItems.some((item) => !item.src?.startsWith("assets/insects/approved/") || !item.license || !item.generationPrompt || !item.generationSeed || !item.generationWorkflow || !["approved", "published-pending-user-review"].includes(item.reviewStatus))) throw new Error("Public galleries must contain only fully recorded registered assets.");
const supersededPublicCandidates = new Set(["anax-parthenope-representative-imagegen-v1.png", "anotogaster-sieboldi-ecology-imagegen-v1.png", "anotogaster-sieboldi-interaction-imagegen-v1.png", "hymenopus-coronatus-morphology-imagegen-v1.png", "harmonia-axyridis-interaction-2-imagegen-v1.png", "papilio-xuthus-interaction-imagegen-v1.png", "pieris-rapae-interaction-imagegen-v1.png", "acrida-cinerea-ecology-imagegen-v1.png", "tenodera-sinensis-ecology-imagegen-v1.png", "gampsocleis-sedakovii-ecology-imagegen-v1.png", "teleogryllus-emma-interaction-2-imagegen-v1.png", "anoplophora-malasiaca-interaction-2-imagegen-v1.png", "apis-cerana-interaction-2-imagegen-v1.png", "orthetrum-albistylum-interaction-2-imagegen-v1.png", "calopteryx-atrata-interaction-2-imagegen-v1.png"]);
if (publicGalleryItems.some((item) => supersededPublicCandidates.has(item.src.split("/").at(-1)))) throw new Error("Superseded identity-inconsistent candidates must not remain in public galleries.");
await Promise.all(publicGalleryItems.map((item) => readFile(new URL(`../${item.src}`, import.meta.url))));
const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
if (app.includes("gallery.slice(0, 3)")) throw new Error("Life-stage galleries must expose every registered image in the detail panel.");
if (!app.includes('image.reviewStatus === "approved"') || !app.includes("사용자 검수 대기 이미지")) throw new Error("Public cards must distinguish pending-user-review galleries from approved galleries.");
if (!app.includes("...(insect.aliases || [])")) throw new Error("Search must include registered common-name aliases.");
const body = app.replace(/^import .*?;\s*/gm, "");
new vm.Script(body.replace(/export\s+/g, ""));
const review = await readFile(new URL("../review.js", import.meta.url), "utf8");
new vm.Script(review.replace(/^import .*?;\s*/gm, "").replace(/export\s+/g, ""));
if (!review.includes("familiar-local-20260909.json") || !review.includes("rare-famous-20260909.json") || !review.includes("familiar-next-20260909.json") || !review.includes("new-friend-representatives-20260910.json") || !review.includes("data.species")) throw new Error("Review screen must load every species-based provenance manifest.");
if (/assets\/insects\/review/.test(app)) throw new Error("Review-only assets must not be referenced by the public app runtime.");
console.log(`PASS: files readable, ${insects.length} public information records include ${publicGalleryItems.length} registered gallery assets, review assets are excluded from app runtime, scripts are valid`);
