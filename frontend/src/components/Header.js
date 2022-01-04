import React, { useContext, useState, useEffect } from "react";
import { LoginInfoContext } from "../store/loginInfo";
import Logo from "../image/logo.png";
import { BasicLink, LoginModal } from "./LoginModal";

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
          getId={getId}
          getPassword={getPassword}
          showModal={showModal}
        />
      )}
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
      <div class="menuContainer">
        <nav className="user">
          <BasicLink to="/mypage" className="userMenu">
            {context["nickname"]}님
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
  const context = useContext(LoginInfoContext);
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
            <BasicLink to="/intro" className="menu">
              프롤로그
            </BasicLink>
            <BasicLink to="/search" className="menu">
              공원 찾아보기
            </BasicLink>
            <BasicLink to="#" className="menu">
              팀 소개
            </BasicLink>
          </nav>
        </div>
        {/* 로그인 성공하면  */}
        {context["id"] !== "" && context["password"] !== "" ? (
          <LogoutHeader />
        ) : (
          <LoginHeader />
        )}
      </header>
    </>
  );
}
