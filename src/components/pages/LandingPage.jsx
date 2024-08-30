import React from 'react';
import { Link } from 'react-router-dom';

// App.css 파일을 import하여 스타일 적용
import '../../App.css';
// 배경 이미지 파일 import
import BackgroundImage from '../../assets/images/background-img1.png';

export default function LandingPage() {
    return (
        // 헤더 섹션: 전체 페이지를 커버하는 배경 이미지와 텍스트를 포함
        <header style={headerStyle}>
            {/* 메인 제목 */}
            <h1 className="main-title text-center">Web3 Voting system</h1>
            {/* 부제목 */}
            <p className="main-para text-center">debutler-dev </p>
            {/* 로그인 및 회원가입 버튼 */}
            <div className="buttons text-center">
                <Link to="/login">
                    <button className="primary-button">log in</button>
                </Link>
                <Link to="/register">
                    <button className="primary-button" id="reg_btn"><span>register</span></button>
                </Link>
            </div>
        </header>
    );
}

// 헤더 스타일 설정: 배경 이미지 및 크기 조정
const headerStyle = {
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
};

