// Split text into chunks(200 word)
// Overlap for context retention (40 words)
export function chunkText(text, {chunkSize = 200, overlap = 40} = {}) {
    const chunks = [];
    const words = text.split(/\s+/).filter(Boolean); // split and remove empty strings

    let start = 0;
    while (start < words.length) {
        const end = Math.min(start + chunkSize, words.length);
        chunks.push(words.slice(start, end).join(" "));
        if (end === words.length) break; // break at the end
        start += chunkSize - overlap;
    }
    return chunks;
}