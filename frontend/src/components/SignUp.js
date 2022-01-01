import React, { useContext, useState, useEffect } from "react";
import { Header } from "./Header";
import { UserContext } from "../store/user";

export function SignUp() {
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [pwCheck, setPwCheck] = useState("");

  const context = useContext(UserContext);

  // 아이디, 닉네임, 비밀번호 거르는 정규식
  const regExpId =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const regExpNickname = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]{2,20}$/;
  const regExpPw =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const getId = (e) => {
    setId(e.target.value);
  };
  const getNickname = (e) => {
    setNickname(e.target.value);
  };
  const getPassword = (e) => {
    setPassword(e.target.value);
  };
  const checkPassword = (e) => {
    setPwCheck(e.target.value);
  };
  useEffect(() => {
    context["id"] = id;
    context["nickname"] = nickname;
  }, [id, nickname]);

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
              value={id}
              onChange={getId}
            />
            {/* 버튼 온클릭 사용할려면 preventDefault 해주기. 리랜더링 방지 */}
            <button className="checkBtn">중복 확인</button>
          </div>
          <p className="caution" style={{ fontSize: "12px" }}>
            {id !== "" && !regExpId.test(id)
              ? "이메일 형식으로 입력해주세요."
              : undefined}
          </p>

          <div className="signUpItem">
            <div className="list"></div>
            <p className="text">닉네임</p>
            <input
              type="text"
              placeholder="닉네임을 입력해주세요"
              value={nickname}
              onChange={getNickname}
            />
          </div>
          <p className="caution" style={{ fontSize: "12px" }}>
            {nickname !== "" && !regExpNickname.test(nickname)
              ? "특수문자 제외 영어, 숫자, 한글로 2자 이상 20자 미만 입력해주세요."
              : undefined}
          </p>

          <div className="signUpItem">
            <div className="list"></div>
            <p className="text">비밀번호</p>
            <input
              type="password"
              value={password}
              onChange={getPassword}
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
            <button type="submit" className="signUpBtn">
              가입하기
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
