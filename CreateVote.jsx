import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios'; // Axios 추가

import '../../App.css'; // App.css 파일을 import

export default function CreateVote() {
  const [voteId, setVoteId] = useState('');
  const [voteTopic, setVoteTopic] = useState('');
  const [options, setOptions] = useState(['', '', '', '']); // 기본적으로 4개의 선택지를 제공
  const [error, setError] = useState(''); // 에러 상태 추가
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const navigate = useNavigate();

  // 옵션 변경 핸들러
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  // 폼 제출 핸들러
  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/votes/', {
        vote_id: voteId,
        vote_topic: voteTopic,
        options: options.filter(option => option !== '') // 빈 옵션 필터링
      });

      if (response.status === 201) {
        // 투표 생성 성공 시 다른 페이지로 이동
        navigate('/Middle');
      } else {
        setError('Failed to create vote.');
      }
    } catch (error) {
      console.error('Error creating vote:', error);
      setError('Error creating vote.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="custom-container">
      <h2>Create a New Vote</h2>

      {error && <p className="error">{error}</p>} {/* 에러 메시지 표시 */}

      <Row>
        <Col className="custom-col"> {/* custom-col 클래스를 사용 */}
          <label>Vote ID:</label>
          <input 
            type="text" 
            value={voteId}
            onChange={(e) => setVoteId(e.target.value)}
            placeholder="Enter vote ID" 
          />
        </Col>
      </Row>

      <Row className="mt-3">
        <Col className="custom-col"> {/* custom-col 클래스를 사용 */}
          <label>Vote Topic:</label>
          <input 
            type="text" 
            value={voteTopic}
            onChange={(e) => setVoteTopic(e.target.value)}
            placeholder="Enter vote topic" 
          />
        </Col>
      </Row>

      <Row className="mt-3">
        <Col className="custom-col"> {/* custom-col 클래스를 사용 */}
          <label>Options:</label>
        </Col>
      </Row>

      {options.map((option, index) => (
        <Row key={index} className="mt-2">
          <Col className="custom-col"> {/* custom-col 클래스를 사용 */}
            <input 
              type="text" 
              value={option} 
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`} 
            />
          </Col>
        </Row>
      ))}

      <Row className="mt-4">
        <Col className="custom-col"> {/* custom-col 클래스를 사용 */}
          <Button 
            variant="primary" 
            onClick={handleSubmit}
            disabled={loading} // 로딩 중일 때 버튼 비활성화
          >
            {loading ? 'Submitting...' : 'Submit Vote'}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
