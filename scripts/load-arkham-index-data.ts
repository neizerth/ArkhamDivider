import * as fs from "node:fs";
import * as path from "node:path";
import "./env";

const __dirname = import.meta.dirname;
const outDir = path.join(__dirname, "../public/data");

const baseUrl = process.env.VITE_ARKHAM_INDEX_URL;

const sourceUrl = `${baseUrl}/data.json`;
console.log(`Fetching ${sourceUrl}…`);

const res = await fetch(sourceUrl);
const json = await res.json();

const outFile = path.join(outDir, "arkham-index.json");

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, `${JSON.stringify(json, null, "\t")}\n`, "utf-8");
console.log(`Wrote ${outFile}`);
