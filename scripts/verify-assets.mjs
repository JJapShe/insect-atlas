import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { insects } from "../data/insects.js";

const root = new URL("../", import.meta.url);
const baseline = JSON.parse(await readFile(new URL("tools/review-decisions/public-asset-baseline-20260915.json", root), "utf8"));
const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");
function checkCopy(name, bytes, copies, unresolvedHash) {
  if (unresolvedHash) assert.equal(digest(bytes), unresolvedHash, `Unresolved legacy public image changed: ${name}`);
  else assert(copies.some((copy) => bytes.equals(copy)), `Review/public copies differ or review source is missing: ${name}`);
}

// Exercise both failure paths without changing project images.
const original = Buffer.from("reviewed image"), modified = Buffer.from("changed image");
checkCopy("same", original, [original]);
assert.throws(() => checkCopy("changed", modified, [original]), /copies differ/);
assert.throws(() => checkCopy("missing", original, []), /source is missing/);
checkCopy("legacy", original, [], digest(original));
assert.throws(() => checkCopy("legacy-changed", modified, [], digest(original)), /legacy public image changed/);

const byName = new Map();
for (const entry of await readdir(new URL("assets/insects/review/", root), { recursive: true, withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith(".png")) byName.set(entry.name, [...(byName.get(entry.name) || []), resolve(entry.parentPath, entry.name)]);
}
const gallery = insects.flatMap((insect) => insect.gallery);
const names = new Set(gallery.map((image) => image.src.split("/").at(-1)));
for (const name of [...Object.keys(baseline.reviewCopies), ...Object.keys(baseline.unresolved)]) assert(names.has(name), `Stale public asset baseline: ${name}`);
for (const image of gallery) {
  const name = image.src.split("/").at(-1);
  const alias = baseline.reviewCopies[name];
  if (alias) assert.match(alias, /^assets\/insects\/review\/(?:[a-z0-9-]+\/)+[a-z0-9-]+\.png$/, `Invalid review copy: ${name}`);
  const paths = alias ? [new URL(alias, root)] : byName.get(name) || [];
  const copies = await Promise.all(paths.map((path) => readFile(path)));
  checkCopy(name, await readFile(new URL(image.src, root)), copies, baseline.unresolved[name]?.sha256);
}
const unresolvedCount = Object.keys(baseline.unresolved).length;
if (unresolvedCount) console.warn(`REVIEW REQUIRED: ${unresolvedCount} unchanged legacy images have no matching review original; see public-asset-baseline-20260915.json. This is not approval.`);
console.log(`PASS: ${gallery.length - unresolvedCount} review/public image pairs, ${unresolvedCount} pinned legacy images; missing/changed copies fail`);
