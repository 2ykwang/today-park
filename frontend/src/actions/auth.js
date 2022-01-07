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

    const expire = 1 / 24;
    // 쿠키에 refresh token, access token 을 저장해준다.
    Cookies.set("accessToken", response.data["access"], {
      expires: expire,
      secure: secure,
    });
    Cookies.set("refreshToken", response.data["refresh"], {
      expires: 7,
      secure: secure,
    });
    _setAccessToken();
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function userLogout() {
  const data = { refresh: Cookies.get("refreshToken") };

  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  Cookies.remove("username");
  Cookies.remove("email");
  try {
    const response = await axios.post("/user/logout", data);

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
    const response = await axios.post("/user/register", data);

    return response;
  } catch (error) {
    return error.response;
  }
}

// 유저 정보를 불러옵니다.
export async function getUserInfo() {
  const response = await axios.get("/user");
  return response;
}

// 사용 가능한 닉네임, 이메일인지 체크합니다.
export async function checkAvailableUserFields(data) {
  try {
    const response = await axios.post("/user/check", data);

    return response;
  } catch (error) {
    return error.response;
  }
}

export async function editUserInfo(data) {
  try {
    // editable fields
    // username
    // email
    // -> {"username":"value"}, {"email","value"}
    const response = await axios.put("/user", data);
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function editUserPassword(data) {
  try {
    // editable fields
    // username
    // email
    // -> {"username":"value"}, {"email","value"}
    const response = await axios.put("/user/password", data);
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function userTokenVerify(accessToken) {
  try {
    const response = await axios.post("/user/token/verify", {
      token: accessToken,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function userTokenRefresh(refreshToken, secure = false) {
  try {
    const response = await axios.post("/user/token/refresh", {
      refresh: refreshToken,
    });

    const expire = 1 / 24;

    Cookies.set("accessToken", response.data["access"], {
      expires: expire,
      secure: secure,
    });
    _setAccessToken();
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function checkUserTokenAndRefresh(secure = false) {
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");

  // 로그인 된 상태라면
  if (refreshToken) {
    // 토큰이 유효한지 검증한다.
    let response = await userTokenVerify(accessToken);

    // access token이 토큰이 만료 되었다면
    if (response.status >= 300) {
      //refresh 를 시도한다.
      response = await userTokenRefresh(refreshToken, secure);

      // refresh 가 안된다면
      if (response.status >= 300) {
        // refresh 토큰도 만료된 것
        // 로그아웃 처리
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        Cookies.remove("username");
        Cookies.remove("email");
        return false;
      }
    }
    return true;
  }
  return true;
}
export async function uploadUserImage() {}
