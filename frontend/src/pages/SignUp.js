import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { checkAvailableUserFields, registerUser } from "../actions/auth";
import { useSelector, useDispatch } from "react-redux";
import { getSignUpData } from "../store/signupSlice";
import RegisterLeft from "../image/register/register-left.png";
import RunIcon from "../image/register/registerRunIcon.png";

// 아이디, 닉네임, 비밀번호 거르는 정규식
const regExpId =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const regExpNickname = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]{2,20}$/;
const regExpPw =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

function SignUp() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [validResponse, setValidResponse] = useState({});
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

  const validSignupFields = async () => {
    const data = {
      username: username,
      email: email,
    };
    const response = await checkAvailableUserFields(data);
    setValidResponse(response.data);

    return (
      response.data.username.valid &&
      response.data.email.valid &&
      regExpId.test(email) &&
      regExpNickname.test(username) &&
      regExpPw.test(password) &&
      regExpPw.test(password) &&
      password === pwCheck
    );
  };

  const handleClickSignup = async (e) => {
    e.preventDefault();

    // 프론트에서 validation
    const valid = await validSignupFields();
    if (!valid) {
      return;
    }

    const response = await registerUser(
      signUpStore.username,
      signUpStore.email,
      signUpStore.password
    );
    if (response.status < 400) {
      //가입 성공 했을 때
      window.location.replace("/");
    } else {
      //가입 실패 했을 때
    }
    console.log(response);
  };

  const checkDuplicateEmailMessage = () =>
    typeof validResponse.email !== "undefined"
      ? validResponse.email.detail
      : undefined;

  const checkDuplicateUsernameMessage = () =>
    typeof validResponse.username !== "undefined"
      ? validResponse.username.detail
      : undefined;

  return (
    <>
      <Header />
      <div className="SignUp">
        <div className="SignUpContainer">
          <section className="MiniContainer Images">
            <img src={RunIcon} className="runIcon" alt="run icon"></img>
            <img
              src={RegisterLeft}
              className="background"
              alt="register banner"
            ></img>
            <p className="ImagePhrase">
              나에게 딱 맞는 야외에서 <br />
              건강 챙기자!
            </p>
          </section>
          <section className="MiniContainer">
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
                  onBlur={validSignupFields}
                />
                {/* 버튼 온클릭 사용할려면 preventDefault 해주기. 리랜더링 방지 */}
              </div>
              <p className="caution" style={{ fontSize: "12px" }}>
                {email !== "" && !regExpId.test(email)
                  ? "이메일 형식으로 입력해주세요."
                  : checkDuplicateEmailMessage()}
              </p>
              <div className="signUpItem">
                <div className="list"></div>
                <p className="text">닉네임</p>
                <input
                  type="text"
                  placeholder="닉네임을 입력해주세요"
                  value={username}
                  onChange={handleNickname}
                  onBlur={validSignupFields}
                />
              </div>
              <p className="caution" style={{ fontSize: "12px" }}>
                {username !== "" && !regExpNickname.test(username)
                  ? "특수문자 제외 영어, 숫자, 한글로 2자 이상 20자 미만 입력해주세요."
                  : checkDuplicateUsernameMessage()}
              </p>
              <div className="signUpItem">
                <div className="list"></div>
                <p className="text">비밀번호</p>
                <input
                  type="password"
                  value={password}
                  onChange={handlePassword}
                  placeholder="영어 대/소문자, 숫자, 특수문자 8글자"
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
                  onClick={handleClickSignup}
                >
                  가입하기
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}

export default SignUp;
