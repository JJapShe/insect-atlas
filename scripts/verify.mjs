import { readFile } from "node:fs/promises";
import vm from "node:vm";
import { insects } from "../data/insects.js";

const files = ["index.html", "styles.css", "app.js", "review.html", "review.js", "data/insects.js", "data/insect-schema.js"];
for (const file of files) await readFile(new URL(`../${file}`, import.meta.url), "utf8");
const decisions = JSON.parse(await readFile(new URL("../tools/review-decisions/image-review-decisions-20260903.json", import.meta.url), "utf8"));
if ((decisions.records || []).filter((record) => record.decision === "pass").length !== 3 || (decisions.records || []).filter((record) => record.decision === "reject").length !== 18) throw new Error("Published review decision counts are incomplete.");
if (!Array.isArray(insects) || insects.length !== 63) throw new Error("Production insects data must contain the expected public information records.");
const invalidRecord = insects.find((insect) => !insect.id || !insect.koreanName || !insect.scientificName || !insect.taxonomy?.order || !insect.taxonomy?.family || !insect.lifespan?.label || !Array.isArray(insect.gallery) || (insect.gallery.length === 0 && insect.reviewStatus !== "draft") || (insect.gallery.length > 0 && insect.reviewStatus !== "gallery-published-pending-user-review"));
if (invalidRecord) throw new Error(`Invalid public information record: ${invalidRecord?.id || "unknown"}`);
const publicGalleryItems = insects.flatMap((insect) => insect.gallery || []);
if (insects.some((insect) => insect.gallery.length && ![4, 7].includes(insect.gallery.length))) throw new Error("Illustrated public species must contain four standard images or seven images including a complete life-stage set.");
const completeMetamorphosisIds = new Set([
  "lucanus-maculifemoratus", "trypoxylus-dichotomus", "harmonia-axyridis", "protaetia-brevitarsis", "anoplophora-malasiaca", "papilio-xuthus", "pieris-rapae", "sasakia-charonda", "sericinus-montela", "attacus-atlas", "callambulyx-tatarinovii", "actias-artemis", "langia-zenzeroides-nawai", "camponotus-japonicus", "apis-cerana", "dorcus-titanus-castanicolor", "dorcus-hopei-binodulosus", "pyrocoelia-rufa", "luciola-lateralis", "bombus-ignitus", "culex-pipiens-pallens", "musca-domestica", "cybister-japonicus", "dynastes-hercules", "scarabaeus-sacer", "goliathus-goliatus", "chalcosoma-chiron", "eupatorus-gracilicornis", "prosopocoilus-inclinatus", "cicindela-chinensis-flammifera", "carabus-smaragdinus", "callipogon-relictus", "platerodrilus-ngi", "morpho-menelaus", "chrysochroa-fulgidissima", "paraponera-clavata", "euproctis-subflava", "meloe-proscarabaeus", "vespa-mandarinia", "pheropsophus-jessoensis", "thysania-agrippina", "ascotis-selenaria-larva",
]);
const lifeStages = ["egg", "larva", "pupa"];
const lifeStageSpecies = insects.filter((insect) => completeMetamorphosisIds.has(insect.id));
if (completeMetamorphosisIds.size !== 42 || lifeStageSpecies.length !== completeMetamorphosisIds.size || lifeStageSpecies.some((insect) => insect.gallery.length !== 7) || insects.filter((insect) => !completeMetamorphosisIds.has(insect.id)).some((insect) => insect.gallery.length !== 4)) throw new Error("Every designated complete-metamorphosis species must have exactly seven gallery images, while all remaining species retain four.");
if (publicGalleryItems.length !== 378) throw new Error("The completed catalog must contain exactly 378 registered gallery assets.");
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
const body = app.replace(/^import .*?;\s*/m, "");
new vm.Script(body.replace(/export\s+/g, ""));
const review = await readFile(new URL("../review.js", import.meta.url), "utf8");
new vm.Script(review.replace(/export\s+/g, ""));
if (/assets\/insects\/review/.test(app)) throw new Error("Review-only assets must not be referenced by the public app runtime.");
console.log(`PASS: files readable, ${insects.length} public information records include ${publicGalleryItems.length} registered gallery assets, review assets are excluded from app runtime, scripts are valid`);
