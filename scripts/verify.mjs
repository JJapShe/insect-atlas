import { readFile } from "node:fs/promises";
import vm from "node:vm";
import { insects } from "../data/insects.js";

const files = ["index.html", "styles.css", "app.js", "data/insects.js", "data/insect-schema.js"];
for (const file of files) await readFile(new URL(`../${file}`, import.meta.url), "utf8");
if (!Array.isArray(insects) || insects.length !== 0) throw new Error("Production insects data must be an empty array for this shell.");
const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
const body = app.replace(/^import .*?;\s*/m, "");
new vm.Script(body.replace(/export\s+/g, ""));
console.log("PASS: files readable, production data empty, app syntax valid");
