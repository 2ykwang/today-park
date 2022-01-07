import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Header } from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { getLoginData } from "../store/loginSlice";
import { onlyUserReview, deleteReview } from "../actions/index";
import { ReactComponent as StarIcon } from "../image/star.svg";
import { CreateReview } from "../components/CreateReview";
import { editUserInfo, editUserPassword, getUserInfo } from "../actions/auth";
import Cookies from "js-cookie";

const ProfileImage = styled.img`
  background-color: #e0e0e0;
  width: 120px;
  height: 120px;
  border-radius: 9999px;
  margin: 0 auto 24px auto;
`;

function Mypage() {
  const dispatch = useDispatch();
  // const loginStore = useSelector((state) => state.login);

  const [fields, setFields] = useState({
    username: Cookies.get("username"),
    oldPassword: "",
    newPassword: "",
    rePassword: "",
  });
  const [editToggle, setEditToggle] = useState({
    username: false,
    password: false,
    review: false,
  });

  const [reviewList, setReviewList] = useState([]);
  const [clickedReviewIdx, setClickedReviewIdx] = useState(0);

  // 내가 쓴 리뷰 불러오기
  useEffect(() => {
    async function getProfileImage() {
      const response = await getUserInfo();
      console.log(response.data);
    }

    async function getReviews() {
      const response = await onlyUserReview();
      setReviewList(response.results);
      console.log(response.results);
    }
    getReviews();
    getProfileImage();
  }, []);

  // 수정시, 로그인 정보 리덕스에 저장
  useEffect(() => {
    dispatch(
      getLoginData({
        email: fields.email,
        username: fields.username,
        password: fields.password,
      })
    );
  }, [fields.email, fields.username, fields.password, dispatch]);

  const handleFieldsChange = (e) => {
    const { value, name } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };
  // 유저 정보 변경을 위한 함수
  const toggleEditField = (name, editable) => {
    setEditToggle({
      ...editToggle,
      [name]: editable,
    });
  };
  return (
    <>
      <Header />
      <section className="mypage">
        <h2>마이 페이지</h2>
        <div className="mypageContainer">
          <div className="mainSide">
            <div className="image">
              <ProfileImage></ProfileImage>

              <form method="post" action="#">
                <input type="file" accept="image/*" />
              </form>
            </div>
            <div className="content">
              <p>아이디 : {Cookies.get("email")}</p>
              <p>
                닉네임 :
                {editToggle.username ? (
                  <>
                    <input
                      type="text"
                      value={fields.username}
                      onChange={handleFieldsChange}
                      name="username"
                    />
                    <button
                      className="edit"
                      onClick={async () => {
                        if (fields.username !== "") {
                          const response = await editUserInfo({
                            username: fields.username,
                          });
                          console.log(response);
                          if (response.status < 300) {
                            //성공
                            toggleEditField("username", false);
                            Cookies.set("username", fields.username);
                          }
                        }
                      }}
                    >
                      확정
                    </button>
                  </>
                ) : (
                  <>
                    {fields.username}
                    <button
                      onClick={() => {
                        toggleEditField("username", true);
                      }}
                      className="edit"
                    >
                      수정
                    </button>
                  </>
                )}
              </p>
              <p>
                {editToggle.password ? (
                  <>
                    <p>
                      기존 비밀번호 :
                      <input
                        type="password"
                        value={fields.oldPassword}
                        name="oldPassword"
                        onChange={handleFieldsChange}
                      />
                    </p>
                    <p>
                      새로운 비밀번호 :
                      <input
                        type="password"
                        value={fields.newPassword}
                        name="newPassword"
                        onChange={handleFieldsChange}
                      />
                    </p>
                    <p>
                      비밀번호 확인 :
                      <input
                        type="password"
                        value={fields.rePassword}
                        name="rePassword"
                        onChange={handleFieldsChange}
                      />
                    </p>
                    <button
                      className="edit"
                      onClick={async () => {
                        const response = await editUserPassword({
                          old_password: fields.oldPassword,
                          password: fields.newPassword,
                          re_password: fields.rePassword,
                        });
                        console.log(response);
                        if (response.status < 300) {
                          //성공
                          toggleEditField("password", false);
                        }
                      }}
                    >
                      확정
                    </button>
                  </>
                ) : (
                  <>
                    {/* 비밀번호는 평문으로 표시해주지 않음 */}
                    {/* 비밀번호 : {password} */}
                    비밀번호 {fields.password}
                    <button
                      onClick={() => {
                        toggleEditField("password", true);
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
              {editToggle.review ? (
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
                            setClickedReviewIdx(index);
                          }}
                        >
                          수정
                        </button>
                        <button
                          onClick={() => {
                            setClickedReviewIdx(index);
                            deleteReview(
                              reviewList[clickedReviewIdx].park_id,
                              reviewList[clickedReviewIdx].id
                            );
                            window.location.replace("/mypage");
                          }}
                        >
                          삭제
                        </button>
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
