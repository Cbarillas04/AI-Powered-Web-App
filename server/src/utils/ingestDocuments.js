import { pool } from "../db/pool.js";
import { chunkText } from "./chunk.js";
import { embedBatch } from "./embed.js";


export async function ingestDocuments(title, content, src_path, doc_date) {
    const chunks = chunkText(content);
    const embeddings = await embedBatch(chunks);

    const [result] = await pool.query(
                "INSERT INTO Documents (title, src_path, doc_date) VALUES (?, ?, ?)", [title, src_path, doc_date]
            );
    const docId = result.insertId;
    await ingestChunks(chunks, embeddings, docId);
    return { documentId: docId, title, chunksCount: chunks.length };
}

export async function ingestChunks(chunks, embeddings, docId, connection = pool) {
    for (let i = 0; i < chunks.length; i++) {
            await connection.query(
                "INSERT INTO Chunks (doc_id, chunk_index, content, embedding) VALUES (?, ?, ?, ?)",
                [docId, i, chunks[i], JSON.stringify(embeddings[i])]
            );
        }
    console.log(`Inserted ${chunks.length} chunks for document ${docId}.`);
    return {documentId: docId, chunksCount: chunks.length};
}