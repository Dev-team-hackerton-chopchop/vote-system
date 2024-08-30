import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
// import axios from 'axios'; // Axios 주석 처리

import '../../App.css'; // App.css 파일을 import

export default function CreateVote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [publishedDate, setPublishedDate] = useState(''); // 게시물 게시 날짜 추가
  const [endDate, setEndDate] = useState(''); // 투표 종료 날짜 추가
  const [nickname, setNickname] = useState(''); // 닉네임 추가
  const [department, setDepartment] = useState(''); // 부서 추가
  const [error, setError] = useState(''); // 에러 상태 추가
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const navigate = useNavigate();

  // 이미지 파일 변경 핸들러
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // 폼 제출 핸들러
  /*
  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('nickname', nickname); // 닉네임 추가
    formData.append('department', department); // 부서 추가
    if (image) {
      formData.append('image', image);
    }
    formData.append('published_date', publishedDate);
    formData.append('end_date', endDate);

    try {
      const response = await axios.post('http://localhost:8000/posts/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        navigate('/Middle'); // 투표 생성 성공 시 다른 페이지로 이동
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
  */

  // UI 테스트를 위한 간단한 핸들러
  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/Middle'); // UI 테스트를 위해 간단히 페이지 이동
    }, 1000);
  };

  return (
    <Container className="custom-container">
      <h2>Create a New Vote</h2>

      {error && <p className="error">{error}</p>} {/* 에러 메시지 표시 */}

      <Row>
        <Col className="custom-col">
          <Form.Group controlId="formTitle">
            <Form.Label>Title:</Form.Label>
            <Form.Control 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter vote title" 
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col className="custom-col">
          <Form.Group controlId="formContent">
            <Form.Label>Content:</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter vote content" 
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col className="custom-col">
          <Form.Group controlId="formNickname">
            <Form.Label>Nickname:</Form.Label>
            <Form.Control 
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Enter your nickname"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col className="custom-col">
          <Form.Group controlId="formDepartment">
            <Form.Label>Department:</Form.Label>
            <Form.Control 
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Enter your department"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col className="custom-col">
          <Form.Group controlId="formImage">
            <Form.Label>Image:</Form.Label>
            <Form.Control 
              type="file"
              onChange={handleImageChange}
              accept="image/*"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col className="custom-col">
          <Form.Group controlId="formPublishedDate">
            <Form.Label>Published Date:</Form.Label>
            <Form.Control 
              type="datetime-local"
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col className="custom-col">
          <Form.Group controlId="formEndDate">
            <Form.Label>End Date:</Form.Label>
            <Form.Control 
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col className="custom-col">
          <Button 
            variant="primary" 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Vote'}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
