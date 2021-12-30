import React, {useContext, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { LoginInfoContext } from "../store/loginInfo";
import styled from 'styled-components';
import { ReactComponent as CloseButton } from '../image/closeButton.svg';

const BasicLink = styled(Link)`
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
  background-color: rgba(0,0,0,0.50);
  z-index: 0;
`;
const ModalContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-width: 480px;
  height: 540px;
  background-color: #fff
`;

function LoginHeader(){
  const context = useContext(LoginInfoContext)
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  // useEffect(() => {
  //   context['id'] = id;
  //   context['password'] = password;
  //   console.log(context['id'],context['password'])
  // }, [id, password])

  function handleLogin(){
    setShowModal(true);
  }
  function handleClose(){
    setShowModal(false);
  }
  function getId(e){
    console.log(e.target.value);
    setId(e.target.value);
  }
  function getPassword(e){
    setPassword(e.target.value);
  }

  function LoginModal(){
      return (<>
      <div className="ModalContainer">
        <Background>
            <ModalContainer>
                <h2>산스장</h2>
                <CloseButton className="closeBtn" onClick={handleClose} />
                <form>
                  <input type='text' placeholder="아이디" onChange={getId} /><br/>
                  <input type='password' placeholder="비밀번호" value={password} onChange={getPassword} /><br/>
                  <button type='submit' >로그인</button><br/>
                  <LoginLink to='#'>아이디 찾기</LoginLink>
                  <LoginLink to='#'>비밀번호 찾기</LoginLink>
                  <LoginLink to='/signUp'>회원가입</LoginLink>
                </form>
            </ModalContainer>
          </Background>
      </div>
      </>)
  }
  

  return (<>
    <header className="mainHeader">
      <div className="logo">
        <BasicLink to='/'>산스장</BasicLink>
      </div>
      <div className="menuContainer">
        <nav className="mainMenu">
          <BasicLink to='#' className="menu">프롤로그</BasicLink>
          <BasicLink to='/map' className="menu">산스장 찾아보기</BasicLink>
          <BasicLink to='#' className="menu">팀 소개</BasicLink>
        </nav>
        <nav className="user">
          <BasicLink to='#' className="userMenu" onClick={handleLogin}>로그인</BasicLink>
          <BasicLink to='/signUp' className="userMenu">회원 가입</BasicLink>
        </nav>
      </div>
    </header>
    {showModal ? <LoginModal  showModal={showModal}/> : undefined}
      </>);
}

function LogoutHeader(){
  const context = useContext(LoginInfoContext)
  function handleLogout(){
    context['id'] = '';
    context['password'] = '';
  }

  return (<>
    <header className="mainHeader">
      <div className="logo">
        <BasicLink to='/'>산스장</BasicLink>
      </div>
      <div className="menuContainer">
        <nav className="mainMenu">
          <BasicLink to='#' className="menu">프롤로그</BasicLink>
          <BasicLink to='/map' className="menu">산스장 찾아보기</BasicLink>
          <BasicLink to='#' className="menu">팀 소개</BasicLink>
        </nav>
        <nav className="user">
          <BasicLink to='/mypage' className="userMenu">{context['nickname']}님</BasicLink>
          <button type='button' className="userMenu" onClick={handleLogout}>로그아웃</button>
        </nav>
      </div>
    </header>
      </>);
}


export function Header() {
  const context = useContext(LoginInfoContext)
  return (<>
  {/* {context['id'] !== '' && context['password'] !== '' ? <LogoutHeader /> : <LoginHeader />} */}
  <LoginHeader />
  {/* <LogoutHeader /> */}
  </>);
}
