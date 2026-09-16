import assert from "node:assert/strict";
import { copyFile, lstat, mkdir, readFile, readdir, realpath, rm, writeFile } from "node:fs/promises";
import { dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { insects } from "../data/insects.js";

const root = new URL("../", import.meta.url);
export const site = new URL("../_site/", import.meta.url);
const staticFiles = ["index.html", "app.js", "styles.css", "app.webmanifest", "data/child-content.js"];
const manifest = JSON.parse(await readFile(new URL("app.webmanifest", root), "utf8"));
const assets = [...new Set([...insects.flatMap((insect) => insect.gallery.map((image) => image.src)), ...manifest.icons.map((icon) => icon.src)])];
const expectedFiles = [...staticFiles, "data/insects.js", ".nojekyll", ...assets].sort();
const privateText = /\b[A-Za-z]:[\\/]|file:\/\/|(?:^|[\s"'])\/(?:Users|home)\/|\.codex|assets\/insects\/review|["']outputFile["']/;

// Only these project-local assets can be copied into a deployable site.
for (const asset of assets) assert.match(asset, /^assets\/(?:insects\/approved|icons)\/[a-z0-9-]+\.png$/, `Invalid public asset: ${asset}`);

export async function verifySite() {
  const actualFiles = [];
  for (const entry of await readdir(site, { recursive: true, withFileTypes: true })) {
    assert(!entry.isSymbolicLink(), `Public site contains a link: ${entry.name}`);
    if (entry.isFile()) actualFiles.push(relative(fileURLToPath(site), resolve(entry.parentPath, entry.name)).split(sep).join("/"));
  }
  assert.deepEqual(actualFiles.sort(), expectedFiles, "Public site file list differs from the runtime allowlist");
  for (const file of [...staticFiles, "data/insects.js"]) {
    const text = await readFile(new URL(file, site), "utf8");
    assert(!privateText.test(text), `Internal path or review provenance leaked into ${file}`);
  }
  const publicData = await readFile(new URL("data/insects.js", site), "utf8");
  const { insects: published } = await import(`data:text/javascript;base64,${Buffer.from(publicData).toString("base64")}`);
  assert.deepEqual(published, insects, "Public species data differs from source records");
  for (const file of [...staticFiles, ...assets]) {
    assert((await readFile(new URL(file, site))).equals(await readFile(new URL(file, root))), `Public copy differs: ${file}`);
  }
  console.log(`PASS: public site contains ${published.length} species, ${assets.length} registered images/icons, no internal modules or paths`);
}

export async function buildSite() {
  // Resolve and constrain the sole disposable output before recursive cleanup.
  assert.equal(dirname(fileURLToPath(site)), fileURLToPath(root).replace(/[\\/]$/, ""));
  const existing = await lstat(site).catch((error) => { if (error.code !== "ENOENT") throw error; });
  if (existing) {
    assert(existing.isDirectory() && !existing.isSymbolicLink(), "Refusing to replace a linked or non-directory _site");
    assert.equal(await realpath(site), resolve(fileURLToPath(root), "_site"));
    await rm(site, { recursive: true });
  }
  for (const file of [...staticFiles, ...assets]) {
    const destination = new URL(file, site);
    await mkdir(dirname(fileURLToPath(destination)), { recursive: true });
    await copyFile(new URL(file, root), destination);
  }
  // Materialize the public export; original modules and provenance stay in the repository.
  await writeFile(new URL("data/insects.js", site), `export const insects = ${JSON.stringify(insects)};\n`);
  await writeFile(new URL(".nojekyll", site), "");
  await verifySite();
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) await buildSite();
