import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LoginInfoContext } from "../store/loginInfo";
import styled from "styled-components";
import { ReactComponent as CloseButton } from "../image/closeButton.svg";

const BasicLink = styled(Link)`
  text-decoration: none;
  color: #000;
  cursor: pointer;
`;
const LoginLink = styled(Link)`
  text-decoration: none;
  color: #757575;
  cursor: pointer;
  padding: 0 6px;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 0;
`;
const ModalContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-width: 480px;
  height: 540px;
  background-color: #fff;
`;

// 이슈 발생
// 방안 1) form 태그에 아래 함수 만들어서 받아오기
// function submitHandler(e){
//   context['id'] = e.target.loginId.value;
//   context['password'] = e.target.loginPw.value;
// }

function LoginModal(props) {
  return (
    <>
      <div className="ModalContainer">
        <Background>
          <ModalContainer>
            <h2>산스장</h2>
            <CloseButton className="closeBtn" onClick={props.handleClose} />
            <form>
              <input
                type="text"
                placeholder="이메일"
                id="loginId"
                onInput={props.getId}
              />
              <br />
              <input
                type="password"
                placeholder="비밀번호"
                id="loginPw"
                onChange={props.getPassword}
              />
              <br />
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                로그인
              </button>
              <br />
              <LoginLink to="#">아이디 찾기</LoginLink>
              <LoginLink to="#">비밀번호 찾기</LoginLink>
              <LoginLink to="/signUp">회원가입</LoginLink>
            </form>
          </ModalContainer>
        </Background>
      </div>
    </>
  );
}

function LoginHeader() {
  const context = useContext(LoginInfoContext);
  const [showModal, setShowModal] = useState(false);

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    context["id"] = id;
    context["password"] = password;
  }, [id, password]);

  function handleLogin() {
    setShowModal(true);
  }
  function handleClose() {
    setShowModal(false);
  }
  function getId(e) {
    setId(e.target.value);
  }
  function getPassword(e) {
    setPassword(e.target.value);
  }

  return (
    <>
      <header className="mainHeader">
        <div className="logo">
          <BasicLink to="/">산스장</BasicLink>
        </div>
        <div className="menuContainer">
          <nav className="mainMenu">
            <BasicLink to="#" className="menu">
              프롤로그
            </BasicLink>
            <BasicLink to="/map" className="menu">
              산스장 찾아보기
            </BasicLink>
            <BasicLink to="#" className="menu">
              팀 소개
            </BasicLink>
          </nav>
          <nav className="user">
            <BasicLink to="#" className="userMenu" onClick={handleLogin}>
              로그인
            </BasicLink>
            <BasicLink to="/signUp" className="userMenu">
              회원 가입
            </BasicLink>
          </nav>
        </div>
      </header>
      {showModal ? (
        <LoginModal
          handleClose={handleClose}
          getId={getId}
          getPassword={getPassword}
          showModal={showModal}
        />
      ) : undefined}
    </>
  );
}

function LogoutHeader() {
  const context = useContext(LoginInfoContext);
  function handleLogout() {
    context["id"] = "";
    context["password"] = "";
  }

  return (
    <>
      <header className="mainHeader">
        <div className="logo">
          <BasicLink to="/">산스장</BasicLink>
        </div>
        <div className="menuContainer">
          <nav className="mainMenu">
            <BasicLink to="#" className="menu">
              프롤로그
            </BasicLink>
            <BasicLink to="/map" className="menu">
              산스장 찾아보기
            </BasicLink>
            <BasicLink to="#" className="menu">
              팀 소개
            </BasicLink>
          </nav>
          <nav className="user">
            <BasicLink to="/mypage" className="userMenu">
              {context["nickname"]}님
            </BasicLink>
            <button type="button" className="userMenu" onClick={handleLogout}>
              로그아웃
            </button>
          </nav>
        </div>
      </header>
    </>
  );
}

export function Header() {
  const context = useContext(LoginInfoContext);
  return (
    <>
      {/* 로그인 성공하면  */}
      {context["id"] !== "" && context["password"] !== "" ? (
        <LogoutHeader />
      ) : (
        <LoginHeader />
      )}
      {/* <LoginHeader />
  <LogoutHeader /> */}
    </>
  );
}
