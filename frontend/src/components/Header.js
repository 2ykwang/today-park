import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLoginData } from "../store/loginSlice";
import Logo from "../image/logo.png";
import { BasicLink, LoginModal } from "../pages/LoginModal";

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
            회원 가입
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
  const loginStore = useSelector((state) => state.login);
  function handleLogout() {
    dispatch(getLoginData({ email: "", password: "" }));
  }
  return (
    <>
      <div className="menuContainer">
        <nav className="user">
          <BasicLink to="/mypage" className="userMenu">
            {loginStore.username}님
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
  const loginStore = useSelector((state) => state.login);
  return (
    <>
      <header className="mainHeader">
        <div className="logo">
          <BasicLink to="/">
            <img src={Logo} alt="오늘의 공원 로고" width="110" />
          </BasicLink>
        </div>

        <div className="menuContainer">
          <nav className="mainMenu">
            <BasicLink to="/prolog" className="menu">
              프롤로그
            </BasicLink>
            <BasicLink to="/search" className="menu">
              공원 찾아보기
            </BasicLink>
            <BasicLink to="/teamIntro" className="menu">
              팀 소개
            </BasicLink>
          </nav>
        </div>
        {/* 로그인 성공하면  */}
        {loginStore.email !== "" &&
        loginStore.password !== "" &&
        loginStore.username !== "" ? (
          <LogoutHeader />
        ) : (
          <LoginHeader />
        )}
      </header>
    </>
  );
}
