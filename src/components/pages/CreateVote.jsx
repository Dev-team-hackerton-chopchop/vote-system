import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

import '../../App.css'; // App.css 파일을 import

export default function CreateVote() {
  const [voteId, setVoteId] = useState('');
  const [voteTopic, setVoteTopic] = useState('');
  const [options, setOptions] = useState(['', '', '', '']); // 기본적으로 4개의 선택지를 제공

  // 옵션 변경 핸들러
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  // 폼 제출 시의 데이터 확인 (로컬 스토리지나 상태로 전달 가능)
  const handleSubmit = () => {
    console.log('Vote ID:', voteId);
    console.log('Vote Topic:', voteTopic);
    console.log('Options:', options);
  };

  return (
    <Container className="custom-container">
      <h2>Create a New Vote</h2>
      
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
          <Link to="/Middle" onClick={handleSubmit}>
            <Button variant="primary">Submit Vote</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

