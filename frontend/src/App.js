import React from 'react';
import UserStore from "./store/user";
import LoginInfoStore from './store/loginInfo'
import { Route, Routes } from 'react-router-dom';
import './css/header.css'
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Map } from './components/Map';
import { Mypage } from './components/Mypage';
import { SignUp } from './components/SignUp';


function App() {
  return (
    <>
    <UserStore>
      <LoginInfoStore>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="mypage" element={<Mypage />} />
          <Route path="map" element={<Map />} />
        </Routes>
      </LoginInfoStore>
    </UserStore>
    </>
  );
}

export default App;
