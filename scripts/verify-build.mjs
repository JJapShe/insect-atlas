import assert from "node:assert/strict";
import { readFile, rm, writeFile } from "node:fs/promises";
import { site, verifySite } from "./build.mjs";
import { insects } from "../data/insects.js";

await verifySite();
// Fault injection affects only the generated _site and always restores its files.
const image = new URL(insects[0].gallery[0].src, site);
const bytes = await readFile(image);
try {
  await rm(image);
  await assert.rejects(verifySite(), /file list/);
  await writeFile(image, Buffer.from("corrupt image"));
  await assert.rejects(verifySite(), /Public copy differs/);
} finally {
  await writeFile(image, bytes);
}

const dataFile = new URL("data/insects.js", site);
const data = await readFile(dataFile, "utf8");
try {
  await writeFile(dataFile, data + '\n// C:\\Users\\example\\.codex\\generated_images\\private.png\n');
  await assert.rejects(verifySite(), /Internal path/);
} finally {
  await writeFile(dataFile, data);
}

const extraFile = new URL("data/dev-fixture.example.js", site);
try {
  await writeFile(extraFile, "export const fixture = [];\n", { flag: "wx" });
  await assert.rejects(verifySite(), /file list/);
} finally {
  await rm(extraFile, { force: true });
}
await verifySite();
console.log("PASS: missing/corrupt images, private paths and unlisted modules block publication");
