import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios'; // axios import 주석 처리
import '../../App.css';
import BackgroundImage from '../../assets/images/background-img2.png';

export default function SignInPage() {
  const navigate = useNavigate();

  // 폼 데이터를 상태로 관리
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // 로딩 및 오류 상태 관리
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 입력값이 변경될 때 상태 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 폼 제출 핸들러
  /*
  const handleSubmit = async (e) => {
    e.preventDefault(); // 페이지 리로드 방지
    setLoading(true); // 로딩 상태 활성화
    setError(''); // 이전 오류 상태 초기화

    try {
      // 로그인 API 요청 보내기
      const response = await axios.post('http://localhost:8000/users/login/', {
        username: formData.username,
        password: formData.password,
      });

      if (response.status === 200) {
        // 로그인 성공 시 토큰 저장 (예시)
        const token = response.data.token;
        localStorage.setItem('authToken', token);

        // 홈 페이지로 이동
        navigate('/home');
      } else {
        // 다른 상태 코드에 대한 처리
        setError('로그인에 실패했습니다.');
      }
    } catch (error) {
      // 오류 처리
      setError('로그인 요청 중 오류가 발생했습니다.');
      console.error('로그인 요청 중 오류가 발생했습니다.', error);

      // 서버에서 반환된 오류 메시지 처리 (예시)
      if (error.response && error.response.data && error.response.data.detail) {
        setError(error.response.data.detail);
      } else {
        setError('서버에 문제가 발생했습니다.');
      }
    } finally {
      setLoading(false); // 로딩 상태 비활성화
    }
  };
  */

  // UI 테스트를 위한 간단한 핸들러
  const handleSubmit = (e) => {
    e.preventDefault(); // 페이지 리로드 방지
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/home');
    }, 1000);
  };

  const headerStyle = {
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  const formContainerStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.8)", // 반투명한 흰색 배경
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={headerStyle}>
      <div style={formContainerStyle} className="text-center">
        <h2>Sign in to us</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <p>
            <label>Username</label>
            <br />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </p>
          <p>
            <label>Password</label>
            <br />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </p>
          <p>
            <button id="sub_btn" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </p>
        </form>
        <footer>
          <p>
            First time? <Link to="/register">Create an account</Link>.
          </p>
          <p>
            <Link to="/">Back to Homepage</Link>.
          </p>
        </footer>
      </div>
    </div>
  );
}
