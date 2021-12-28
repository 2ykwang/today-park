import React, { useContext, useState, useEffect } from 'react';
import { Header } from './Header';
import { UserContext } from "../store/user";

export function SignUp() {
  const [id, setId] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [pwCheck, setPwCheck] = useState('')
  const [pwCheckMessage, setPwCheckMessage] = useState('')

  const context = useContext(UserContext);

  const getId = (e) => {
    setId(e.target.value);
  }
  const getNickname = (e) => {
    setNickname(e.target.value);
  }
  const getPassword = (e) => {
    setPassword(e.target.value);
  }
  const checkPassword = (e) => {
    setPwCheck(e.target.value);
  }
  useEffect(() => {
    context['id'] = id;
    context['nickname'] = nickname;
    console.log(context['id'],context['nickname'])
  }, [id, nickname])

  useEffect(() => {
    if(pwCheck !== '' && password === pwCheck){
      setPwCheckMessage('비밀번호가 일치합니다.')
    }else if (password !== pwCheck){
      setPwCheckMessage('비밀번호가 일치하지 않습니다.')
    }
  }, [pwCheck, password])

  return (<>
  <Header />
  <h1>회원가입</h1>
  <form>
    <div>
      <p>아이디</p>
      <input type='text' placeholder='이메일을 입력해주세요' value={id} onChange={getId}/>
      <button>중복 확인</button>
    </div>
    <div>
      <p>닉네임</p>
      <input type="text" placeholder="닉네임을 정해주세요" value={nickname} onChange={getNickname}/>
    </div>
    <div>
      <p>비밀번호</p>
      <input type='password' placeholder="영어 대/소문자, 숫자, 특수문자 중 3종류 조합 8글자 이상" value={password} onChange={getPassword}/>
    </div>
    <div>
      <p>비밀번호 확인</p>
      <input type='password' value={pwCheck} onChange={checkPassword}/>
      <p style={{fontSize: '12px'}}>{pwCheckMessage}</p>
    </div>
    <div>
      <button type='submit' >가입하기</button>
    </div>
  </form>
  </>)
}
