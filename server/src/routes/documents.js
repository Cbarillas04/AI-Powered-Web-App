import express from 'express';
import { pool } from '../db/pool.js';
import { ingestDocuments } from '../utils/ingestDocuments.js';
import { ingestChunks } from '../utils/ingestDocuments.js';
import { chunkText } from '../utils/chunk.js';
import { embedBatch } from '../utils/embed.js';


const router = express.Router();

// Get all documents from the database
router.get('/', async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        
        const [rows] = await pool.query('SELECT * FROM Documents ORDER BY id LIMIT ? OFFSET ?', [limit, offset]);
        const [secondRows] = await pool.query('SELECT COUNT(*) AS total FROM Documents');
        const totalCount = secondRows[0].total;
        
        res.json({ documents: rows, total: totalCount, page, limit });
    } catch (err) {
        next(err);
    }
});

// Add a new document
router.post('/create', async (req, res, next) => {
    try{
        const {title, content, src_path, doc_date} = req.body;
        const result = await ingestDocuments(title, content, src_path, doc_date);
        res.json({ message: 'Document created successfully', documentId: result.documentId });

    } catch (err) {
        next(err);
    }
});


// Update a document by Id
router.put('/:id', async (req, res, next) => {
    const chunks = chunkText(req.body.content);
    const embeddings = await embedBatch(chunks);
    const {title, content, src_path, doc_date} = req.body;
    const connection = await pool.getConnection();
    // If any part of the update fails, rolls back the entire transaction
    try {
        await connection.beginTransaction();

        await connection.query('DELETE FROM Chunks WHERE doc_id = ?', [req.params.id]);
        await connection.query(`
            UPDATE Documents SET title = ?, src_path = ?, doc_date = ? WHERE id = ?`, 
            [title, src_path, doc_date, req.params.id]);
        // Only insert the new chunks and embeddings (since document already exists)
        await ingestChunks(chunks, embeddings, req.params.id, connection);
        
        await connection.commit();
        res.json({ message: 'Document updated successfully' });
    } catch (err) {
        await connection.rollback();
        next(err);
    } finally {
        connection.release();
    }
});

// Delete a document by Id
router.delete('/:id', async (req, res, next) => {
    try{
        await pool.query('DELETE FROM Documents WHERE id = ?', [req.params.id]);
        res.json({ message: 'Document deleted successfully' });
    } catch (err) {
        next(err);
    }
});

export default router;