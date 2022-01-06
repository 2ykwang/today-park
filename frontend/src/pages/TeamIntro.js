import React from "react";
import { Header } from "../components/Header";
import GitLogo from "../image/teamIntro/github-icon.png";
import Martina from "../image/teamIntro/martina-pic.jpeg";
import Heart from "../image/teamIntro/red-heart.png";
import Plane from "../image/teamIntro/paper-plane.png";
import Bubble from "../image/teamIntro/speech-bubble.png";
function TeamIntro() {
  return (
    <>
      <Header />
      <div id="teamIntro">
        <div className="header">
          <span
            style={{ color: "#47C690", fontSize: "30px", fontWeight: "bold" }}
          >
            #오늘의공원 #빈수2ㅔ
          </span>
          #좋은사람 #좋은시간
        </div>
        <div className="member">
          <ul>
            <li>
              <img className="profilePic" src={Martina} alt="profile-pic" />
              <h2>조병민</h2>
              <p>데이터분석</p>
              <div>
                <img src={GitLogo} alt="github-icon" />
                <a href="https://github.com/bmcho">bmcho</a>
              </div>
            </li>
            <li>
              <img className="profilePic" src={Martina} alt="profile-pic" />

              <h2>강면구</h2>
              <p>데이터분석</p>
              <div>
                <img src={GitLogo} alt="github-icon" />
                <a href="https://github.com/myeongu">myeongu</a>
              </div>
            </li>
            <li>
              <img className="profilePic" src={Martina} alt="profile-pic" />

              <h2>이민영</h2>
              <p>프론트엔드</p>
              <div>
                <img src={GitLogo} alt="github-icon" />
                <a href="https://github.com/minyopi">minyopi</a>
              </div>
            </li>
            <li>
              <img className="profilePic" src={Martina} alt="profile-pic" />
              <h2>양영광</h2>
              <p>백엔드</p>
              <div>
                <img src={GitLogo} alt="github-icon" />
                <a href="https://github.com/2ykwang">2ykwang</a>
              </div>
            </li>
            <li>
              <img className="profilePic" src={Martina} alt="profile-pic" />
              <h2>이영숙</h2>
              <p>백엔드(팀장)</p>
              <div>
                <img src={GitLogo} alt="github-icon" />
                <a href="https://github.com/martinalee94">martinalee94</a>
              </div>
            </li>
          </ul>
        </div>
        <div className="footer">
          <img className="heart" src={Heart} alt="heart"></img>
          <img className="plane" src={Plane} alt="plane"></img>
          <img className="bubble" src={Bubble} alt="bubble"></img>
        </div>
      </div>
    </>
  );
}

export default TeamIntro;
