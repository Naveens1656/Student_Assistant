// src/components/FunFactCard.js
import React, { useState, useEffect } from 'react';

export default function FunFactCard() {
  const facts = [
    "The first computer bug was an actual bug — a moth stuck in a Harvard Mark II computer in 1947.",
    "Python is named after Monty Python, not the snake.",
    "The first programmer was Ada Lovelace in the 1800s.",
    "Git was created by Linus Torvalds, who also made Linux.",
    "The first website is still online: info.cern.ch."
  ];

  const [fact, setFact] = useState('');

  const getNewFact = () => {
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    setFact(randomFact);
  };

  useEffect(() => {
    getNewFact();
  }, []);

  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        margin: '20px auto',
        maxWidth: '600px',
        background: '#f0f8ff',
      }}
    >
      <p>{fact}</p>
      <button
        onClick={getNewFact}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          borderRadius: '5px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Show Another Fact
      </button>
    </div>
  );
}
