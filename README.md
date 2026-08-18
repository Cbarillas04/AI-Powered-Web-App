# RAG Application
Full stack Retrieval Augmented Generation app that allows user to upload their own documents and ask questions about them, with answers coming straight from the content provided instead of the model's knowledge

## Website Image
<img width="1264" height="854" alt="Website" src="https://github.com/user-attachments/assets/12d546ec-eab5-449b-9f80-0e4d3c89304b" />

## Features
- Multi-format document ingestion (txt, md, pdf, docx)
- Semantic search using OpenAI embeddings + cosine similarity with relevance thresholding
- Practical answer generation using Claude: The model will only provide reasonable answers from the given documents, otherwise it will not answer instead of defaulting to guessing
- Full CRUD document management
- Transactional document editing: Deletes old doc and rechunks new doc with automatic rollback on failure

## How It Works

### Ingestion
Uploaded files are read server sided and routed through specific text extractors, i.e., pdf-parse (PDFs), mammoth (DOCX), and direct read (TXT/MD). Extracted text is then split into overlapping chunks to preserve context across chunk boundaries. Chunks are then embedded via OpenAI's (text-embedding-3-small) and stored into MySQL.

### Retrieval
User's question is embedded the same way, then compared against every stored chunk using cosine similarity. Given a certain relevance threshold, any chunks that fall below are discarded while the top-k chunks are passed. This keeps the model's knowledge limited to those high scoring docs that have passed.

### Generation
Filtered chunks and the original question are sent to Claude with an explicit instruction to answer only from the provided context. If there doesn't exist enough context or there is none at all, the model will tell the user directly and not generate an answer.

### Tech Stack
- React(Vite)
- Node.js + Express
- MySQL
- OpenAI Embeddings API (text-embedding-3-small)
- Anthropic Claude API (Haiku 4.5)
- Multer, pdf-parse, mammoth

## Limitations
- The retrieval is more a of a brute force with O(n) complexity to scan all stored chunks. I would need to use an indexed vector store with an ANN algorithm to upscale this project.
- Editing a document's content rechunks and reembeds the entire document rather than editing the specific chunk, since chunk boundaries are content dependent and are unable to be partially updated
- Large Documents are not able to be chunked (~300+ pages) since chunks are embedded in a single batched call rather than sub batches.
