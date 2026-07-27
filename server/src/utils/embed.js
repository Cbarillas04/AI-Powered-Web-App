import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

// Single text strings, returns a single embedding
export async function embedText(text) {
    const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
    });
    return response.data[0].embedding;
}

// Larger batches of texts(docs), returns an array of embeddings
export async function embedBatch(texts) {
    const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: texts,
    });
    return response.data.map((d) => d.embedding);
}