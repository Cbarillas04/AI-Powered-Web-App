import {chunkText} from "./chunk.js";
import {embedBatch} from "./embed.js";
import fs from "fs";

async function readRawDocs(filename) {
    try {
        const data = await fs.promises.readFile(filename, "utf-8");
        const chunks = chunkText(data);
        const embeddings = await embedBatch(chunks);
        console.log(`Processed ${chunks.length} chunks from ${filename}`);
    } catch (err) {
        console.error(`Error reading file ${filename}:`, err);
        throw err;
    }
}

for (const file of fs.readdirSync("./data")) {
    if (file.endsWith(".txt") || file.endsWith(".md")) {
        const filePath = `./data/${file}`;
        try {
            await readRawDocs(filePath);
        } catch (err) {
            console.error(`Error processing file ${filePath}:`, err);
        }
    }
}