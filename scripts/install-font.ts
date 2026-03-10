import * as fs from "node:fs";
import * as path from "node:path";
import dotenv from "dotenv";

dotenv.config({
	path: [".env", ".env.local"],
});

const baseURL = process.env.DATA_URL;

const fontURL = `${baseURL}/fonts/icons.ttf`;

const __dirname = import.meta.dirname;

const dest = path.join(__dirname, "/../public/fonts/ArkhamIcons");

const copy = (url: string, file: string) => {
	console.log(`downloading file ${url}`);
	fetch(url)
		.then((r) => r.arrayBuffer())
		.then((arrayBuffer) => {
			const buffer = Buffer.from(arrayBuffer);

			fs.writeFileSync(file, buffer);
			console.log(`file ${file} updated!`);
		});
};

copy(fontURL, `${dest}/ArkhamIcons.ttf`);
