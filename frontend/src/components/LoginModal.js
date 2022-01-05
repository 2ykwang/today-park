import React, { useEffect, useContext } from "react";
import { LoginInfoContext } from "../store/loginInfo";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as CloseButton } from "../image/closebutton.svg";
import { userLogin, getUserInfo } from "../api/index";
import Logo from "../image/logo.png";

export const BasicLink = styled(Link)`
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

export function LoginModal(props) {
  const context = useContext(LoginInfoContext);
  return (
    <>
      <div className="ModalContainer">
        <Background>
          <ModalContainer>
            <h2>
              <img src={Logo} alt="logo" width="200" />
            </h2>
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
                onClick={async (e) => {
                  e.preventDefault();
                  let response = await userLogin(context.id, context.password);
                  // 로그인이 성공한다면? -> 로컬 스토리지에 토큰이 저장됨.
                  // makeheaders() -> 헤더를 만들어줌.
                  response = await getUserInfo();
                  console.log(response);
                  context.nickname = response.username;
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
