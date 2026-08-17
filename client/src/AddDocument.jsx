import React, { useState } from 'react';
import "./Documents.css";

const AddDocument = ({onDocumentAdded}) => {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [docDate, setDocDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

     async function handleAddDocument() {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("title", title);
            formData.append("doc_date", docDate);
            const response = await fetch('http://localhost:5000/api/documents/create', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (response.ok) {
                console.log(`Document created successfully with ID: ${data.documentId}`);
                setTitle("");
                setFile(null);
                setDocDate("");
                onDocumentAdded();
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
            {loading && <p>Adding Document...</p>}
            {error && <p className="error">{error}</p>}
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="file"
                accept=".txt,.pdf,.docx,.md"
                onChange={(e) => setFile(e.target.files[0])}
            />
            <input
                type="date"
                placeholder="Document Date"
                value={docDate}
                onChange={(e) => setDocDate(e.target.value)}
            />
            <button onClick={async () => {
                if (title.trim() === "" || !file) {
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