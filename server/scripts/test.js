import readline from "readline";
import {embedText} from "../src/utils/embed.js";
import {generateAnswer} from "../src/utils/generate.js";
import {findSimilarity} from "../src/utils/similarity.js";
import {pool} from "../src/db/pool.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main() {
    rl.question('Enter Question: ', async(question) => {
        if(question == ""){
            console.log("You entered an empty question. Please try again.");
            rl.close();
            return;
        }

        const queryEmbedding = await embedText(question);

        const [rows] = await pool.query(
                "SELECT id, content, embedding FROM Chunks"
        );
        // Only consider top 5 chunks with similarity at least 0.3
        const similarity = findSimilarity(queryEmbedding, rows, 5)
            .filter(chunk => chunk.similarity >= 0.3).slice(0, 5);
        //console.log("Similarity:", similarity);

        const answer = await generateAnswer(question, similarity);
        console.log("Answer:", answer);
        rl.close();
    });
}

main();