import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LoginInfoContext } from "../store/loginInfo";
import { Header } from "./Header";

const ProfileImage = styled.div`
  background-color: #e0e0e0;
  width: 120px;
  height: 120px;
  border-radius: 9999px;
  margin: 0 auto 24px auto;
`;

export function Mypage() {
  const context = useContext(LoginInfoContext);
  const [id, setId] = useState(context["id"]);
  const [nickname, setNickname] = useState(context["nickname"]);
  const [editId, setEditId] = useState(false);
  const [editNickname, setEditNickname] = useState(false);

  useEffect(() => {
    context["id"] = id;
    context["nickname"] = nickname;
  }, [id, nickname]);

  function handleIdChange(e) {
    setId(e.target.value);
  }
  function handleNicknameChange(e) {
    setNickname(e.target.value);
  }
  function handleEditId() {
    setEditId(false);
  }
  function handleEditNickname() {
    setEditNickname(false);
  }

  return (
    <>
      <Header />
      <section class="mypage">
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
                {editId ? (
                  <input type="text" value={id} onChange={handleIdChange} />
                ) : (
                  id
                )}
                {editId ? (
                  <button className="edit" onClick={handleEditId}>
                    확정
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditId(true);
                    }}
                    className="edit"
                  >
                    수정
                  </button>
                )}
              </p>
              <p>
                닉네임 :
                {editNickname ? (
                  <input
                    type="text"
                    value={nickname}
                    onChange={handleNicknameChange}
                  />
                ) : (
                  nickname
                )}
                {editNickname ? (
                  <button className="edit" onClick={handleEditNickname}>
                    확정
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditNickname(true);
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
