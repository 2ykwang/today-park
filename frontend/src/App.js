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
import { axiosConfig } from "./actions/auth";
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
  axiosConfig();

  console.log(process.env.REACT_APP_GOOGLE_SECRET_KEY);

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