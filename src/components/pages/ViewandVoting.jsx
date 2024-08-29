import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// 임시 투표 데이터
const initialVotes = [
  { id: 1, topic: 'Vote on Climate Change', agree: 10, disagree: 2 },
  { id: 2, topic: 'Vote on Remote Work', agree: 15, disagree: 5 },
  { id: 3, topic: 'Vote on Free Internet', agree: 20, disagree: 10 },
];

export default function ViewandVoting() {
  const [votes, setVotes] = useState(initialVotes);

  // 투표 처리 핸들러
  const handleVote = (id, type) => {
    const newVotes = votes.map((vote) => {
      if (vote.id === id) {
        return {
          ...vote,
          agree: type === 'agree' ? vote.agree + 1 : vote.agree,
          disagree: type === 'disagree' ? vote.disagree + 1 : vote.disagree,
        };
      }
      return vote;
    });
    setVotes(newVotes);
  };

  return (
    <div>
      <h2>Available Votes</h2>
      {votes.map((vote) => (
        <div key={vote.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h3>{vote.topic}</h3>
          <div>
            <button onClick={() => handleVote(vote.id, 'agree')}>Agree</button>
            <button onClick={() => handleVote(vote.id, 'disagree')}>Disagree</button>
          </div>
          <div style={{ marginTop: '10px' }}>
            <p>Agree: {vote.agree}</p>
            <p>Disagree: {vote.disagree}</p>
          </div>
        </div>
      ))}

      <footer>
        <Link to="/">Back to Homepage</Link>
      </footer>
    </div>
  );
}

