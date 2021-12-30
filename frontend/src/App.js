import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import UserStore from "./store/user";
import LoginInfoStore from "./store/loginInfo";
import { Route, Routes } from "react-router-dom";
import "./css/reset.css";
import "./css/app.css";
import "./css/header.css";
import "./css/signUp.css";
import "./css/mypage.css";
import Map from "./components/Map";
import { Home } from "./components/Home";
import { Mypage } from "./components/Mypage";
import { SignUp } from "./components/SignUp";

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
            <Route
              path="map"
              element={<Map setTooltipContent={setContent} />}
            />
          </Routes>
          <ReactTooltip>{content}</ReactTooltip>
        </LoginInfoStore>
      </UserStore>
    </>
  );
}

export default App;
