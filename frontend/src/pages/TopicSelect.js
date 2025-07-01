import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TopicSelect = () => {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/topics")
      .then((res) => res.json())
      .then((data) => setTopics(data.topics))
      .catch((err) => console.error("Error fetching topics:", err));
  }, []);

  const handleSelect = (topic) => {
    navigate(`/chat/${encodeURIComponent(topic)}`);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Select a Topic</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic}>
            <button onClick={() => handleSelect(topic)}>{topic}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicSelect;
