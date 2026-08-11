import React, {useState} from "react";
import "./Question.css";

const Question = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleQuestion() {
        try {
            const response = await fetch('http://localhost:5000/api/query/question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question })
            });
            const data = await response.json();
            setAnswer(data.answer);
        } catch (err) {
            console.error('Error fetching answer:', err);
            setError("An error occurred while fetching the answer. Please try again.");
        }
    }

    function emptyQuestion() {
        if (question.trim() === "") {
            setError("You entered an empty question. Please try again.");
            return true;
        }
        return false;
    }

    return (
        <div className="questionContainer">
            <h2> Ask a Question: </h2>
            <input 
                type="text" 
                placeholder="Type your question here..." 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            <button
                onClick={async () => {
                    if (emptyQuestion()) {
                        return;
                    }
                    setLoading(true);
                    await handleQuestion();
                    setLoading(false);
                    setQuestion("");
                }}
            >
                {loading ? "Loading..." : "Ask"}
            </button>
            {error && <p className="error">{error}</p>}
            {answer && <p>Answer: {answer}</p>}
        </div>
    )
}

export default Question;