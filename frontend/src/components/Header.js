import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { LoginInfoContext } from "../store/loginInfo";

function LoginHeader(){
  return (<>
    <header>
      <div className="logo">
        <Link to='/'>산스장</Link>
      </div>
      <nav className="mainMenu">
        <Link to='#' className="menu">프롤로그</Link>
        <Link to='/map' className="menu">산스장 찾아보기</Link>
        <Link to='#' className="menu">팀 소개</Link>
      </nav>
      <nav className="user">
        <Link to='/login' className="userMenu">로그인</Link>
        <Link to='/signUp' className="userMenu">회원 가입</Link>
      </nav>
    </header>
      </>);
}

function LogoutHeader(){
  const context = useContext(LoginInfoContext)
  function handleLogout(){
    context['id'] = '';
    context['nickname'] = '';
  }

  return (<>
    <header>
      <div className="logo">
        <Link to='/'>산스장</Link>
      </div>
      <nav className="mainMenu">
        <Link to='#' className="menu">프롤로그</Link>
        <Link to='/map' className="menu">산스장 찾아보기</Link>
        <Link to='#' className="menu">팀 소개</Link>
      </nav>
      <nav className="user">
        <Link to='/mypage' className="mypage">{context['nickname']}님</Link>
        <button type='button' className="logout" onClick={handleLogout}>로그아웃</button>
      </nav>
    </header>
      </>);
}


export function Header() {
  const context = useContext(LoginInfoContext)
  return (<>
  {context['id'] !== '' && context['nickname'] !== '' ? <LogoutHeader /> : <LoginHeader />}
  </>);
}
