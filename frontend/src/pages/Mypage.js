import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Header } from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { getLoginData } from "../store/loginSlice";

const ProfileImage = styled.div`
  background-color: #e0e0e0;
  width: 120px;
  height: 120px;
  border-radius: 9999px;
  margin: 0 auto 24px auto;
`;

function Mypage() {
  const dispatch = useDispatch();
  const loginStore = useSelector((state) => state.login);

  const [email, setEmail] = useState(loginStore.email);
  const [username, setUsername] = useState(loginStore.username);
  const [password, setPassword] = useState(loginStore.password);
  const [editEmail, setEditEmail] = useState(false);
  const [editUsername, setEditUsername] = useState(false);

  useEffect(() => {
    dispatch(
      getLoginData({ email: email, username: username, password: password })
    );
  }, [email, username, dispatch]);

  function handleIdChange(e) {
    setEmail(e.target.value);
  }
  function handleNicknameChange(e) {
    setUsername(e.target.value);
  }
  function handleEditId() {
    setEditEmail(false);
  }
  function handleEditNickname() {
    setEditUsername(false);
  }

  return (
    <>
      <Header />
      <section className="mypage">
        <h2>마이 페이지</h2>
        <div className="mypageContainer">
          <div className="mainSide">
            <div className="image">
              <ProfileImage />
              <form method="post" action="#">
                <input type="file" accept="image/*" />
              </form>
            </div>
            <div className="content">
              <p>
                아이디 :
                {editEmail ? (
                  <input type="text" value={email} onChange={handleIdChange} />
                ) : (
                  email
                )}
                {editEmail ? (
                  <button className="edit" onClick={handleEditId}>
                    확정
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditEmail(true);
                    }}
                    className="edit"
                  >
                    수정
                  </button>
                )}
              </p>
              <p>
                닉네임 :
                {editUsername ? (
                  <input
                    type="text"
                    value={username}
                    onChange={handleNicknameChange}
                  />
                ) : (
                  username
                )}
                {editUsername ? (
                  <button className="edit" onClick={handleEditNickname}>
                    확정
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditUsername(true);
                    }}
                    className="edit"
                  >
                    수정
                  </button>
                )}
              </p>
              <div className="sns">
                <h3>소셜 계정 연동하기</h3>
                <button>네이버</button>
                <button className="kakao">카카오</button>
              </div>
            </div>
          </div>
          <div className="reviewSide">
            <h3>내가 방문 했던 산스장</h3>
            <div className="reviewList">
              <div className="review">
                {/* 여기는 아마 리뷰 db에 get 보내서 받은 내용을 보여주는거겠지? */}
                <h4>엘리스 공원</h4>
                <p>2021.12.27</p>
                <p>사람이 너무 많아요</p>
              </div>
              <div className="review">
                <h4>엘리스 공원</h4>
                <p>2021.12.27</p>
                <p>사람이 너무 많아요</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Mypage;
