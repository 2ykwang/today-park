import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { registerUser } from "../actions/index";
import { useSelector, useDispatch } from "react-redux";
import { getSignUpData } from "../store/signupSlice";

// 아이디, 닉네임, 비밀번호 거르는 정규식
const regExpId =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const regExpNickname = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]{2,20}$/;
const regExpPw =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pwCheck, setPwCheck] = useState("");

  const dispatch = useDispatch();
  const signUpStore = useSelector((state) => state.signup);

  const handleId = (e) => {
    setEmail(e.target.value);
  };
  const handleNickname = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const checkPassword = (e) => {
    setPwCheck(e.target.value);
  };

  useEffect(() => {
    dispatch(
      getSignUpData({ email: email, username: username, password: password })
    );
  }, [email, username, password, dispatch]);

  return (
    <>
      <Header />
      <div className="SignUpContainer">
        <h1>회원가입</h1>
        <form>
          <div className="signUpItem">
            <div className="list"></div>
            <p className="text">아이디</p>
            <input
              type="text"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={handleId}
            />
            {/* 버튼 온클릭 사용할려면 preventDefault 해주기. 리랜더링 방지 */}
            <button className="checkBtn">중복 확인</button>
          </div>
          <p className="caution" style={{ fontSize: "12px" }}>
            {email !== "" && !regExpId.test(email)
              ? "이메일 형식으로 입력해주세요."
              : undefined}
          </p>

          <div className="signUpItem">
            <div className="list"></div>
            <p className="text">닉네임</p>
            <input
              type="text"
              placeholder="닉네임을 입력해주세요"
              value={username}
              onChange={handleNickname}
            />
          </div>
          <p className="caution" style={{ fontSize: "12px" }}>
            {username !== "" && !regExpNickname.test(username)
              ? "특수문자 제외 영어, 숫자, 한글로 2자 이상 20자 미만 입력해주세요."
              : undefined}
          </p>

          <div className="signUpItem">
            <div className="list"></div>
            <p className="text">비밀번호</p>
            <input
              type="password"
              value={password}
              onChange={handlePassword}
              placeholder="영어 대/소문자, 숫자, 특수문자 포함 8글자 이상"
            />
          </div>
          <p className="caution" style={{ fontSize: "12px" }}>
            {password !== "" && !regExpPw.test(password)
              ? "형식에 맞지 않는 비밀번호 입니다."
              : undefined}
          </p>

          <div className="signUpItem">
            <div className="list"></div>
            <p className="text">비밀번호 확인</p>
            <input type="password" value={pwCheck} onChange={checkPassword} />
          </div>
          {pwCheck ? (
            <p className="caution" style={{ fontSize: "12px" }}>
              {pwCheck !== "" && password === pwCheck
                ? "비밀번호가 일치합니다"
                : "비밀번호가 일치하지 않습니다"}
            </p>
          ) : undefined}

          <div className="signUpBtn-container">
            <button
              type="submit"
              className="signUpBtn"
              onClick={async (e) => {
                e.preventDefault();
                let response = await registerUser(
                  signUpStore.username,
                  signUpStore.email,
                  signUpStore.password
                );
                console.log(response);
              }}
            >
              가입하기
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;
