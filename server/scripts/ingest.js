import {chunkText} from "../src/utils/chunk.js";
import {embedBatch} from "../src/utils/embed.js";
import {pool} from "../src/db/pool.js";
import fs from "fs";
import path from "path";

async function readRawDocs(filename) {
    try {
        const data = await fs.promises.readFile(filename, "utf-8");
        const chunks = chunkText(data);
        const embeddings = await embedBatch(chunks);

        const [result] = await pool.query(
            "INSERT INTO Documents (title, src_path) VALUES (?, ?)", [path.basename(filename), filename]
        );
        const docId = result.insertId;

        for (let i = 0; i < chunks.length; i++) {
            await pool.query(
                "INSERT INTO Chunks (doc_id, chunk_index, content, embedding) VALUES (?, ?, ?, ?)",
                [docId, i, chunks[i], JSON.stringify(embeddings[i])]
            );
        }

        console.log(`Processed ${chunks.length} chunks from ${filename}`);
    } catch (err) {
        console.error(`Error reading file ${filename}:`, err);
        throw err;
    }
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