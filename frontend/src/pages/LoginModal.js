import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as CloseButton } from "../image/closebutton.svg";
import { userLogin, getUserInfo } from "../actions/auth";
import Logo from "../image/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { getLoginData } from "../store/loginSlice";
import Cookies from "js-cookie";

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

export function LoginModal({
  handleClose,
  handleEmail,
  handlePassword,
  showModal,
}) {
  const loginStore = useSelector((state) => state.login);
  const dispatch = useDispatch();

  return (
    <>
      <div className="ModalContainer">
        <Background>
          <ModalContainer>
            <h2>
              <img src={Logo} alt="logo" width="200" />
            </h2>
            <CloseButton className="closeBtn" onClick={handleClose} />
            <form>
              <input
                type="text"
                placeholder="이메일"
                id="loginId"
                onInput={handleEmail}
              />
              <br />
              <input
                type="password"
                placeholder="비밀번호"
                id="loginPw"
                onChange={handlePassword}
              />
              <br />
              <button
                type="submit"
                onClick={async (e) => {
                  const useSSL = process.env.REACT_APP_USE_SSL;
                  e.preventDefault();
                  let response = await userLogin(
                    loginStore.email,
                    loginStore.password,
                    useSSL
                  );
                  response = await getUserInfo();
                  console.log(response.data);
                  const username = response.data.username;
                  dispatch(
                    await getLoginData({
                      email: loginStore.email,
                      username: username,
                      password: loginStore.password,
                    })
                  );
                  Cookies.set("username", username);
                }}
              >
                로그인
              </button>
              <br />
              <LoginLink to="/signUp" className="signup">
                회원가입
              </LoginLink>
            </form>
          </ModalContainer>
        </Background>
      </div>
    </>
  );
}
