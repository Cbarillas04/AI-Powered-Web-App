import express from 'express';
import { embedText } from "../utils/embed.js";
import { generateAnswer } from "../utils/generate.js";
import { findSimilarity } from "../utils/similarity.js";
import { pool } from '../db/pool.js';

const router = express.Router();

router.post('/question', async (req, res, next) => {
    try{ 
       const {question, topChunks} = req.body;

        if(question == ""){
            res.status(400).json({ error: "You entered an empty question. Please try again." });
            return;
        }
        // Default 5, max 10
        const requestedTopN = Number(topChunks);
        const topN = Number.isInteger(requestedTopN) && requestedTopN > 0
            ? Math.min(requestedTopN, 10): 5;

        const [rows] = await pool.query( 'SELECT id, content, embedding FROM Chunks');
        // Only consider top N chunks with similarity at least 0.3
        const similarity = findSimilarity(await embedText(question), rows)
            .filter(chunk => chunk.similarity >= 0.3).slice(0, topN);
        const answer = await generateAnswer(question, similarity);
        res.json({ message: 'Answer generated successfully', answer });
    }catch (err){
        next(err);
    }
});

export default router;
