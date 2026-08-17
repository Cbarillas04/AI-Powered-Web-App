import React, {useEffect, useState} from "react";
import "./Documents.css";

const DocumentsView = ({refreshTrigger}) => {
    const [documents, setDocuments] = useState([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDocuments = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:5000/api/documents?page=${page}&limit=10`);
                const data = await response.json();
                setDocuments(data.documents);
                setTotalCount(data.total);
            } catch (err) {
                console.error('Error fetching answer:', err);
                setError("Failed to fetch documents");
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, [page, refreshTrigger]);

    async function deleteDocument(id) {
        try {
            await fetch(`http://localhost:5000/api/documents/${id}`, {
                method: 'DELETE',
            });
            const remainingOnPage = documents.length - 1;
            setTotalCount(totalCount - 1);
            if (remainingOnPage === 0 && page > 1) {
                setPage(page - 1);
            }else{
                setDocuments(documents.filter((doc) => doc.id !== id));
            }
        } catch (err) {
            console.error('Error deleting document:', err);
            setError("Failed to delete document");
        }
    };

    return (
        <div className="documentsContainer">
            <h2> Current Documents: </h2>
            {loading && <p>Loading documents...</p>}
            {error && <p className="error">{error}</p>}
            <p className="docCount"> 
                <span className="docCountNumber">
                    {totalCount}
                </span> {" "}
                document{totalCount !== 1 ? "s" : ""} uploaded 
            </p>
            <ul className="documentsList">
                {(documents || []).map((doc) => (
                    <li key={doc.id}>
                        <strong> ID: {doc.id} </strong>
                        <strong>Title:</strong> {doc.title} <br />
                        <button onClick={() => deleteDocument(doc.id)}> Delete</button>
                    </li>
                ))}
            </ul>
            <div className="pagination">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                    Previous
                </button>
                <span> {page} </span>
                <button onClick={() => setPage(page + 1)} disabled={page === Math.ceil(totalCount / 10)}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default DocumentsView;