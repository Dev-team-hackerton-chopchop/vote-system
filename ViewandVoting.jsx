import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ViewandVoting() {
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 서버에서 투표 데이터 불러오기
  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/votes/'); // 투표 목록을 가져오는 API 호출
        setVotes(response.data); // 서버에서 받은 데이터를 상태로 설정
        setLoading(false);
      } catch (err) {
        setError('Failed to load votes');
        setLoading(false);
      }
    };

    fetchVotes();
  }, []);

  // 투표 처리 핸들러
  const handleVote = async (id, type) => {
    try {
      const voteToUpdate = votes.find(vote => vote.id === id);
      const updatedVote = {
        ...voteToUpdate,
        agree: type === 'agree' ? voteToUpdate.agree + 1 : voteToUpdate.agree,
        disagree: type === 'disagree' ? voteToUpdate.disagree + 1 : voteToUpdate.disagree,
      };

      // 서버에 업데이트 요청 보내기
      await axios.patch(`http://localhost:8000/votes/${id}/`, updatedVote);

      // 상태 업데이트
      setVotes(votes.map(vote => (vote.id === id ? updatedVote : vote)));
    } catch (err) {
      setError('Failed to submit your vote');
    }
  };

  if (loading) {
    return <p>Loading votes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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

