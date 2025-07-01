import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ChatBot = () => {
  const { topic } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askQuestion = () => {
    if (!question.trim()) return;

    setLoading(true);
    fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, question }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAnswer(data.answer);
        setLoading(false);
      })
      .catch((err) => {
        setAnswer("Error connecting to backend.");
        setLoading(false);
      });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Chatbot - Topic: {topic}</h2>
      <button onClick={() => navigate("/")}>Back to Topics</button>
      <div style={{ marginTop: "1rem" }}>
        <input
          type="text"
          placeholder="Enter your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{ width: "300px", padding: "0.5rem" }}
        />
        <button onClick={askQuestion} disabled={loading} style={{ marginLeft: "0.5rem" }}>
          Ask
        </button>
      </div>
      <div style={{ marginTop: "1rem", minHeight: "3rem" }}>
        {loading ? <em>Loading...</em> : <strong>{answer}</strong>}
      </div>
    </div>
  );
};

export default ChatBot;
