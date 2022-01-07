import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Header } from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { getLoginData } from "../store/loginSlice";
import { onlyUserReview } from "../actions/index";
import { ReactComponent as StarIcon } from "../image/star.svg";
import { updateReview } from "../actions/index";

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
  const [editReview, setEditReview] = useState(false);
  // const [reviewResponse, setReviewResponse]
  const [reviewList, setReviewList] = useState([]);
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [rating, setRating] = useState(0);
  const [reviewContent, setreviewContent] = useState("");

  useEffect(() => {
    async function getReviews() {
      const response = await onlyUserReview();
      setReviewList(response.results);
      console.log(response.results);
    }
    getReviews();
  }, []);

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
  function handleStarClick(e, idx) {
    e.preventDefault();
    let clickStates = [...clicked];
    for (let i = 1; i < 6; i++) {
      if (i <= idx) clickStates[i] = true;
      else clickStates[i] = false;
    }
    setClicked(clickStates);
    setRating(idx);
  }
  async function handleUpdateReview(e) {
    e.preventDefault();
    // let response = await updateReview(id, rating, reviewContent);
    // console.log(response);
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
              {editReview ? (
                <form className="createReview">
                  <div className="rating">
                    <StarIcon
                      className={"star " + (clicked[1] ? "clicked" : null)}
                      onClick={(e) => handleStarClick(e, 1)}
                      width="24"
                      height="24"
                    />
                    <StarIcon
                      className={"star " + (clicked[2] ? "clicked" : null)}
                      onClick={(e) => handleStarClick(e, 2)}
                      width="24"
                      height="24"
                    />
                    <StarIcon
                      className={"star " + (clicked[3] ? "clicked" : null)}
                      onClick={(e) => handleStarClick(e, 3)}
                      width="24"
                      height="24"
                    />
                    <StarIcon
                      className={"star " + (clicked[4] ? "clicked" : null)}
                      onClick={(e) => handleStarClick(e, 4)}
                      width="24"
                      height="24"
                    />
                    <StarIcon
                      className={"star " + (clicked[5] ? "clicked" : null)}
                      onClick={(e) => handleStarClick(e, 5)}
                      width="24"
                      height="24"
                    />
                  </div>
                  <textarea
                    placeholder="내용을 입력해주세요."
                    value={reviewContent}
                    onChange={(e) => {
                      setreviewContent(e.target.value);
                    }}
                  />
                  <br />
                  <button type="submit" onClick={handleUpdateReview}>
                    등록하기
                  </button>
                </form>
              ) : (
                reviewList.map((item, index) => {
                  return (
                    <div className="review" key={index}>
                      <h4>{item.username}</h4>
                      <p>{item.score}</p>
                      <p>{item.content}</p>
                      <div class="btns">
                        <button>수정</button>
                        <button>삭제</button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Mypage;
