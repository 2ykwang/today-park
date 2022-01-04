import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as CloseButton } from "../image/closeButton.svg";
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
