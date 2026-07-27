function dotProduct(vecA, vecB) {
    return vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
}

function magnitude(vec) {
    return Math.sqrt(vec.reduce((sum, val) => sum + val * val, 0));
}

// Finds the similarity between the question and the chunked docs -
// returns top k most similar chunks
export function findSimilarity(queryVector, rows, topK) {
    const similarities = [];
    // Loop through chunks(rows) and calculate the similarity
    for (const {id, content, embedding} of rows) {
        const cosineSimilarity = dotProduct(queryVector, embedding) / (magnitude(queryVector) * magnitude(embedding));
        similarities.push({id, content, similarity: cosineSimilarity});
    }

    return similarities.sort((a, b) => b.similarity - a.similarity).slice(0, topK);
}