function dotProduct(vecA, vecB) {
    return vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
}

function magnitude(vec) {
    return Math.sqrt(vec.reduce((sum, val) => sum + val * val, 0));
}

// returns X most similar chunks based cosine similarity between the query vector and the chunk embeddings
export function findSimilarity(queryVector, rows){
    const similarities = [];
    // Loop through chunks(rows) and calculate the similarity
    for (const {id, content, embedding} of rows) {
        const cosineSimilarity = dotProduct(queryVector, embedding) / (magnitude(queryVector) * magnitude(embedding));
            similarities.push({id, content, similarity: cosineSimilarity});
    }
    return similarities.sort((a, b) => b.similarity - a.similarity);
}