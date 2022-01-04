// /src/api/index.js
import axios from "axios";

// const apiClient = axios.create({
//       baseURL: process.env.REACT_APP_BASE_URL;    // 환경변수로 지정한 BASE_URL을 사용
// });

// // interceptor처리도 작성한다.

// //export apiClient;
// const { get, post, put, delete: destroy } = apiClient;
// export { get, post, put, destroy };

const baseUrl = `${process.env.REACT_APP_BASE_URL}/api`;

function makeHeaders() {
  const accessToken = localStorage.getItem("access_token");
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return config;
}
export async function getParks(guId, keyword) {
  const config = makeHeaders();

  const response = await axios.get(
    `${baseUrl}/parks/search/?guId=${guId}&keyword=${keyword}`,
    config
  );

  return response.data;
}
export async function getUserInfo() {
  const config = makeHeaders();

  const response = await axios.get(`${baseUrl}/user/`, config);

  return response.data;
}
export async function userLogin(email, password) {
  const config = makeHeaders();
  const data = { email: email, password: password };
  const response = await axios.post(`${baseUrl}/login/`, data, config);
  if (response.status === 200) {
    // 성공
    // 쿠키에 refresh token 이랑 access token 을 저장해준다.
    const accessToken = response.data["access"];
    const refreshToken = response.data["refresh"];

    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    console.log(accessToken, refreshToken);
  } else {
    // 로그인 실패
  }
}
