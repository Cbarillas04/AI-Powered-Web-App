import React, { useState } from 'react';
import "./Documents.css";

const AddDocument = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [docDate, setDocDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

     async function handleAddDocument() {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/documents/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, content, src_path:"web-upload", doc_date: docDate })
            });
            const data = await response.json();
            if (response.ok) {
                console.log(`Document created successfully with ID: ${data.documentId}`);
                setTitle("");
                setContent("");
                setDocDate("");
            } else {
                setError("Failed to create document");
            }
        } catch (err) {
            console.error('Error creating document:', err);
            setError("An error occurred while creating the document");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="addDocumentContainer">
            <h2> Add a New Document: </h2>
            {loading && <p>Loading documents...</p>}
            {error && <p className="error">{error}</p>}
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
            />
            <input
                type="date"
                placeholder="Document Date"
                value={docDate}
                onChange={(e) => setDocDate(e.target.value)}
            />
            <button onClick={async () => {
                if (title.trim() === "" || content.trim() === "") {
                    setError("Title and content are required. Please fill in all required fields.");
                    return;
                }
                handleAddDocument();
            }}  disabled={loading}
            >
                {loading ? "Creating..." : "Create Document"}
            </button>
        </div>
    );
}

export default AddDocument;