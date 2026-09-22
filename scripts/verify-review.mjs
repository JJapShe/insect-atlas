import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { insects } from "../data/insects.js";
import { generatedImages } from "../data/incomplete-metamorphosis.js";
import { manifestUrls, recordsForManifest, recordsForPublicGallery, uniqueAssets, unresolvedPublicFiles } from "../review-data.mjs";

const recordsByManifest = new Map(await Promise.all(manifestUrls.map(async (url) => [url, recordsForManifest(JSON.parse(await readFile(new URL(`../${url}`, import.meta.url), "utf8")))])));
const expected = new Map([
  ["tools/generation-tests/familiar-local-20260909.json", 32],
  ["tools/generation-tests/rare-famous-20260909.json", 24],
  ["tools/generation-tests/familiar-next-20260909.json", 16],
  ["tools/generation-tests/new-friend-representatives-20260910.json", 18],
  ["tools/generation-tests/new-friend-gallery-expansion-20260910.json", 40],
  ["tools/generation-tests/priority-representatives-20260917.json", 34],
  ["tools/generation-tests/priority-gallery-20260922.json", 5],
  ["tools/generation-tests/priority-gallery-20260922-b.json", 5],
]);
for (const [url, count] of expected) {
  const records = recordsByManifest.get(url);
  assert.equal(records.length, count, `${url} review entries`);
  assert.ok(records.every((record) => record.asset && record.id && record.role), `${url} requires image-level entries`);
  await Promise.all(records.map((record) => readFile(new URL(`../${record.asset}`, import.meta.url))));
}
const records = [...recordsByManifest.values()].flat();
assert.equal(uniqueAssets(records).length, new Set(records.map((record) => record.asset)).size, "review assets must render once per path");
assert.equal(uniqueAssets([{ asset: "same.png", id: "first" }, { asset: "same.png", id: "second" }]).length, 1, "duplicate paths collapse");
const publicGalleryRecords = recordsForPublicGallery(insects);
assert.equal(publicGalleryRecords.length, 82, "public gallery review sources and unresolved public fallbacks must stay registered");
await Promise.all(publicGalleryRecords.map((record) => readFile(new URL(`../${record.asset}`, import.meta.url))));
const sourceRecords = [...records, ...generatedImages, ...publicGalleryRecords.filter((record) => record.reviewStatus !== "공개본 · 검수원본 미확인")];
const hash = async (asset) => createHash("sha256").update(await readFile(new URL(`../${asset}`, import.meta.url))).digest("hex");
const reviewHashes = new Set(await Promise.all(sourceRecords.map((record) => hash(record.asset))));
const unresolved = [];
for (const image of insects.flatMap((insect) => insect.gallery || [])) if (!reviewHashes.has(await hash(image.src))) unresolved.push(image.src.split("/").at(-1));
assert.deepEqual(unresolved.sort(), [...unresolvedPublicFiles].sort(), "only tracked public assets may lack a byte-identical review source");
const fallbackRecords = publicGalleryRecords.filter((record) => record.reviewStatus === "공개본 · 검수원본 미확인");
assert.equal(fallbackRecords.length, unresolvedPublicFiles.size, "each unresolved public asset needs an explicit review fallback");
const metadata = recordsForManifest({ workflow: "batch workflow", reviewStatus: "batch status", species: [{ id: "test", roles: ["individual"], asset: "test.png", generationPrompt: "item prompt", reviewStatus: "item status" }] })[0];
assert.equal(metadata.generationPrompt, "item prompt", "species prompt overrides batch metadata");
assert.equal(metadata.reviewStatus, "item status", "species review status overrides batch metadata");
console.log(`PASS: ${manifestUrls.length} manifests, ${records.length} manifest entries, ${publicGalleryRecords.length - fallbackRecords.length} review copies, ${fallbackRecords.length} unresolved public fallbacks`);
