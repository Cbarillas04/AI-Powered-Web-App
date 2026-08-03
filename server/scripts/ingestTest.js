//Script to ingest sample documents from the docs folder into the database, for testing purposes. 
import { ingestDocuments } from "../src/utils/ingestDocuments.js";
import fs from "fs";
import path from "path";

async function readRawDocs(filename) {
    const data = await fs.promises.readFile(filename, "utf-8");
    await ingestDocuments(path.basename(filename), data, filename, null);
}

for (const file of fs.readdirSync("./docs")) {
    if (file.endsWith(".txt") || file.endsWith(".md")) {
        const filePath = `./docs/${file}`;
        try {
            await readRawDocs(filePath);
        } catch (err) {
            console.error(`Error processing file ${filePath}:`, err);
        }
    }
}