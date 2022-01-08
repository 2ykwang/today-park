import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Prolog from "./pages/Prolog";
import Search from "./pages/Search";
import TeamIntro from "./pages/TeamIntro";
import SignUp from "./pages/SignUp";
import Mypage from "./pages/Mypage";
import { SidebarBookmark } from "./components/SidebarBookmark";
import { SidebarSearchDetail } from "./components/SidebarSearchDetail";
import { axiosConfig, checkUserTokenAndRefresh } from "./actions/auth";
import "./css/reset.css";
import "./css/app.css";
import "./css/header.css";
import "./css/loginModal.css";
import "./css/signUp.css";
import "./css/mypage.css";
import "./css/search.css";
import "./css/SidebarSearchDetail.css";
import "./css/SidebarBookmark.css";
import "./css/teamIntro.css";
import "./css/home.css";
import "./css/prolog.css";

function App() {
  //axios 전역 설정
  axiosConfig();

  // Access Token 체크하고 만료되었다면 갱신해준다
  const useSSL = process.env.REACT_APP_USE_SSL;
  checkUserTokenAndRefresh(useSSL);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="prolog" element={<Prolog />} />
        <Route path="search" element={<Search />} />
        <Route path="search/:id" element={<SidebarSearchDetail />} />
        <Route path="search/bookmark" element={<SidebarBookmark />} />
        <Route path="teamIntro" element={<TeamIntro />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="mypage" element={<Mypage />} />
      </Routes>
    </>
  );
}

export default App;
