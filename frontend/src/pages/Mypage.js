import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Header } from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { getLoginData } from "../store/loginSlice";
import { onlyUserReview } from "../actions/index";
import { ReactComponent as StarIcon } from "../image/star.svg";
import { CreateReview } from "../components/CreateReview";

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
  const [reviewList, setReviewList] = useState([]);
  const [clickedReviewIdx, setClickedReviewIdx] = useState(0);

  // 내가 쓴 리뷰 불러오기
  useEffect(() => {
    async function getReviews() {
      const response = await onlyUserReview();
      setReviewList(response.results);
      console.log(response.results);
    }
    getReviews();
  }, []);

  // 수정시, 로그인 정보 수정
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
                  <>
                    <input
                      type="text"
                      value={email}
                      onChange={handleIdChange}
                    />
                    <button
                      className="edit"
                      onClick={() => {
                        if (username !== "") handleEditId();
                      }}
                    >
                      확정
                    </button>
                  </>
                ) : (
                  <>
                    {email}
                    <button
                      onClick={() => {
                        setEditEmail(true);
                      }}
                      className="edit"
                    >
                      수정
                    </button>
                  </>
                )}
              </p>
              <p>
                닉네임 :
                {editUsername ? (
                  <>
                    <input
                      type="text"
                      value={username}
                      onChange={handleNicknameChange}
                    />
                    <button
                      className="edit"
                      onClick={() => {
                        if (username !== "") handleEditNickname();
                      }}
                    >
                      확정
                    </button>
                  </>
                ) : (
                  <>
                    {username}
                    <button
                      onClick={() => {
                        setEditUsername(true);
                      }}
                      className="edit"
                    >
                      수정
                    </button>
                  </>
                )}
              </p>
              {/* <div className="sns">
                <h3>소셜 계정 연동하기</h3>
                <button>네이버</button>
                <button className="kakao">카카오</button>
              </div> */}
            </div>
          </div>
          <div className="reviewSide">
            <h3>내가 방문 했던 공원</h3>
            <div className="reviewList">
              {editReview ? (
                <CreateReview
                  parkId={reviewList[clickedReviewIdx].park_id}
                  reviewId={reviewList[clickedReviewIdx].id}
                  type={"PUT"}
                  score={reviewList[clickedReviewIdx].score}
                  content={reviewList[clickedReviewIdx].content}
                />
              ) : (
                reviewList.map((item, index) => {
                  return (
                    <div className="review" key={index}>
                      <h4>
                        {item.parkname}
                        <p className="rate">
                          <StarIcon
                            width="24"
                            height="24"
                            fill="#FFB800"
                            className="star"
                          />
                          {item.score}
                        </p>
                      </h4>
                      <p>{item.created_at.slice(0, 10).split("-").join(".")}</p>
                      <p>{item.content}</p>
                      <div className="btns">
                        <button
                          onClick={() => {
                            setEditReview(true);
                            setClickedReviewIdx(index);
                          }}
                        >
                          수정
                        </button>
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
