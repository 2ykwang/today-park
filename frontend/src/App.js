import React, { useState } from "react";
import UserStore from "./store/user";
import LoginInfoStore from "./store/loginInfo";
import { Route, Routes } from "react-router-dom";
import "./css/reset.css";
import "./css/app.css";
import "./css/header.css";
import "./css/signUp.css";
import "./css/mypage.css";
import "./css/search.css";
import Mapchart from "./components/Mapchart";
import SidebarSearch, { SidebarBookmark } from "./components/Search";
import { Home } from "./components/Home";
import { Mypage } from "./components/Mypage";
import { SignUp } from "./components/SignUp";
import { SidebarSearchDetail } from "./components/SidebarSearchDetail";
import ReactTooltip from "react-tooltip";

function App() {
  const [content, setContent] = useState("");
  return (
    <>
      <UserStore>
        <LoginInfoStore>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="signUp" element={<SignUp />} />
            <Route path="mypage" element={<Mypage />} />
            <Route path="search" element={<SidebarSearch />} />
            <Route path="search/:id" element={<SidebarSearchDetail />} />
            <Route path="search/bookmark" element={<SidebarBookmark />} />
            <Route
              path="intro"
              element={<Mapchart setTooltipContent={setContent} />}
            />
          </Routes>
          <ReactTooltip>{content}</ReactTooltip>
        </LoginInfoStore>
      </UserStore>
    </>
  );
}

export default App;
