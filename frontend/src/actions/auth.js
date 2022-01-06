import axios from "axios";
import Cookies from "js-cookie";

// 쿠키가 존재할 경우 헤더에 넣어준다.
function _setAccessToken() {
  const accessToken = Cookies.get("accessToken");
  if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
}

// axios 전역 설정
export function axiosConfig() {
  const baseURL = `${process.env.REACT_APP_BASE_URL}/api`;
  axios.defaults.baseURL = baseURL;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  _setAccessToken();
}

// SSL 사용시 REACT_APP_SECURE -> true
// 로그인
export async function userLogin(email, password, secure = false) {
  const data = { email: email, password: password };
  try {
    const response = await axios.post("/user/login", data);

    // 쿠키에 refresh token, access token 을 저장해준다.
    Cookies.set("accessToken", response.data["access"], {
      expires: 1,
      secure: secure,
    });
    Cookies.set("refreshToken", response.data["refresh"], {
      expires: 1,
      secure: secure,
    });
    _setAccessToken();
    return response;
  } catch (error) {
    return error.response;
  }
}

// 가입
export async function registerUser(username, email, password) {
  try {
    const data = { username: username, email: email, password: password };
    const response = await axios.post(`/user/register`, data);

    return response;
  } catch (error) {
    return error.response;
  }
}

// 유저 정보를 불러옵니다.
export async function getUserInfo() {
  const response = await axios.get(`/user`);
  return response;
}

// 사용 가능한 닉네임, 이메일인지 체크합니다.
export async function checkAvailableUserFields(data) {
  try {
    const response = await axios.post(`/user/check`, data);

    return response;
  } catch (error) {
    return error.response;
  }
}

// not implemented yet
export async function userTokenVerify() {}

// not implemented yet
export async function userTokenRefresh() {}
