import { readFile } from "node:fs/promises";
import vm from "node:vm";
import { insects } from "../data/insects.js";

const files = ["index.html", "styles.css", "app.js", "review.html", "review.js", "data/insects.js", "data/insect-schema.js"];
for (const file of files) await readFile(new URL(`../${file}`, import.meta.url), "utf8");
if (!Array.isArray(insects) || insects.length === 0) throw new Error("Production insects data must contain public information records.");
const invalidRecord = insects.find((insect) => !insect.id || !insect.koreanName || !insect.scientificName || !insect.taxonomy?.order || !Array.isArray(insect.gallery) || insect.gallery.length !== 0 || insect.reviewStatus !== "draft");
if (invalidRecord) throw new Error(`Invalid public information record: ${invalidRecord?.id || "unknown"}`);
const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
const body = app.replace(/^import .*?;\s*/m, "");
new vm.Script(body.replace(/export\s+/g, ""));
const review = await readFile(new URL("../review.js", import.meta.url), "utf8");
new vm.Script(review.replace(/export\s+/g, ""));
if (/assets\/insects\/review/.test(app)) throw new Error("Review-only assets must not be referenced by the public app runtime.");
console.log(`PASS: files readable, ${insects.length} public information records have no galleries, review assets are excluded from app runtime, scripts are valid`);
