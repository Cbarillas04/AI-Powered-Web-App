import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";

dotenv.config();
const anthropic = new Anthropic({apiKey: process.env.ANTHROPIC_API_KEY});

// Set prompt that will ask the model to answer based on the best Chunks
export async function generateAnswer(question, topChunks) {
    const prompt = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 500,
        messages: [
            { role: "user", content: `Here is some context from the user's notes:
            Chunks: ${topChunks.map(chunk => chunk.content).join("\n")}
            Question: ${question}\n
            Answer the question based on the context provided. If the answer is not present or lacks sufficient information, say so. Do not make up an answer.`}
        ]
    });
    return prompt.content[0].text;
}