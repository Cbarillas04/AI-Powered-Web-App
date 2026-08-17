import React, {useState, useEffect} from "react";
import "./Question.css";

const Question = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [displayedAnswer, setDisplayedAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!answer) return;

        setDisplayedAnswer("");
        let i = 0;

        const interval = setInterval(() => {
            setDisplayedAnswer((prev) => prev + answer[i]);
            i++;
            if (i >= answer.length) {
                clearInterval(interval);
            }
        }, 20); // mm per character

        return () => clearInterval(interval);
    }, [answer]);

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
            <h3 className="header"> Ask a Question: </h3>
            <textarea
                placeholder="Type your question here..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={3}
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
                {loading ? "Loading..." : "Sumbit"}
            </button>
            {error && <p className="error">{error}</p>}
            <div className="answerContainer">
                {answer && <p>{displayedAnswer}</p>}
            </div>
        </div>
    )
}

export default Question;