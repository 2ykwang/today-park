import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLoginData } from "../store/loginSlice";
import Logo from "../image/logo.png";
import { BasicLink, LoginModal } from "../pages/LoginModal";
import Cookies from "js-cookie";
import { userLogout } from "../actions/auth";
import { throttle } from "lodash";

function LoginHeader() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redux
  const dispatch = useDispatch();
  const loginStore = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(getLoginData({ email: email, username: "", password: password }));
  }, [email, password, dispatch, loginStore]);

  function handleLogin() {
    setShowModal(true);
  }
  function handleClose() {
    setShowModal(false);
  }
  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <>
      <div className="menuContainer">
        <nav className="user">
          <BasicLink to="#" className="userMenu" onClick={handleLogin}>
            로그인
          </BasicLink>
          <BasicLink to="/signUp" className="userMenu">
            회원가입
          </BasicLink>
        </nav>
      </div>
      {showModal && (
        <LoginModal
          handleClose={handleClose}
          handleEmail={handleEmail}
          handlePassword={handlePassword}
          showModal={showModal}
        />
      )}
    </>
  );
}

function LogoutHeader() {
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(getLoginData({ email: "", password: "" }));
    // 쿠키 삭제
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    window.location.replace("/");

    // api call
    userLogout();
  }
  return (
    <>
      <div className="menuContainer">
        <nav className="user">
          <BasicLink to="/mypage" className="userMenu">
            {Cookies.get("username")}님
          </BasicLink>
          <button type="button" className="userMenu" onClick={handleLogout}>
            로그아웃
          </button>
        </nav>
      </div>
    </>
  );
}

export function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", throttle(updateScroll, 300));
    return () => {
      window.removeEventListener("scroll", throttle(updateScroll, 300));
    };
  }, []);
  return (
    <>
      <header className={scrollPosition < 80 ? "mainHeader" : "ver2"}>
        <div className="logo">
          <BasicLink to="/">
            <img src={Logo} alt="오늘의 공원 로고" height="60" />
          </BasicLink>
        </div>

        <div className="menuContainer">
          <nav className="mainMenu">
            <BasicLink to="/prolog" className="menu">
              프롤로그
            </BasicLink>
            <BasicLink to="/search/1" className="menu">
              공원 찾아보기
            </BasicLink>
            <BasicLink to="/teamIntro" className="menu">
              팀 소개
            </BasicLink>
          </nav>
        </div>
        {/* 로그인 성공하면  */}
        {Cookies.get("username") ? <LogoutHeader /> : <LoginHeader />}
      </header>
    </>
  );
}
