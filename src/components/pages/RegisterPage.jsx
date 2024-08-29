import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios import 추가
import '../../App.css';

export default function SignUpPage() {
  const navigate = useNavigate();

  // 폼 데이터를 상태로 관리
  const [formData, setFormData] = useState({
    first_name: '',
    email: '',
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
  const handleSubmit = async (e) => {
    e.preventDefault(); // 페이지 리로드 방지
    setLoading(true); // 로딩 상태 활성화
    setError(''); // 이전 오류 상태 초기화

    try {
      // API 요청 보내기
      const response = await axios.post('http://your-api-domain/users/register/', {
        username: formData.first_name,
        email: formData.email,
        password: formData.password,
        password2: formData.password, // 비밀번호 확인용
      });

      if (response.status === 201) {
        // 회원가입 성공 시 홈 페이지로 이동
        navigate('/home');
      } else {
        // 다른 상태 코드에 대한 처리
        setError('회원가입에 실패했습니다.');
      }
    } catch (error) {
      // 오류 처리
      setError('회원가입 요청 중 오류가 발생했습니다.');
      console.error('회원가입 요청 중 오류가 발생했습니다.', error);
    } finally {
      setLoading(false); // 로딩 상태 비활성화
    }
  };

  return (
    <div className="text-center m-5-auto">
      <h2>Join us</h2>
      <h5>Create your personal account</h5>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <p>
          <label>Username</label>
          <br />
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label>Email address</label>
          <br />
          <input
            type="email"
            name="email"
            value={formData.email}
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
            {loading ? 'Registering...' : 'Register'}
          </button>
        </p>
      </form>
      <footer>
        <p>
          <Link to="/">Back to Homepage</Link>.
        </p>
      </footer>
    </div>
  );
}
