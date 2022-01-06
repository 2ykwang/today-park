// /src/api/index.js
import axios from "axios";

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

export async function getUserInfo() {
  const config = makeHeaders();
  const response = await axios.get(`${baseUrl}/user`, config);

  return response.data;
}

export async function userLogin(email, password) {
  const config = makeHeaders();
  const data = { email: email, password: password };
  const response = await axios.post(`${baseUrl}/user/login`, data, config);
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

export async function registerUser(username, email, password) {
  // const config = makeHeaders();
  try {
    const data = { username: username, email: email, password: password };
    const response = await axios.post(`${baseUrl}/user/register`, data);
    if (response.status === 201) {
      console.log("회원가입 성공");
    } else {
      // 로그인 실패
    }
  } catch (error) {}
}

export async function getParks(guId, keyword, sort, page, size) {
  try {
    const config = makeHeaders();
    const response = await axios.get(
      `${baseUrl}/parks/search?guId=${guId}&keyword=${keyword}&sort=${sort}&page=${page}&size=${size}`,
      config
    );
    return response.data;
  } catch (error) {}
}

export async function getParkDetail(parkId) {
  try {
    const config = makeHeaders();
    const response = await axios.get(
      `${baseUrl}/parks/detail/${parkId}`,
      config
    );

    return response.data;
  } catch (error) {}
}

export async function getReviews(parkId) {
  const config = makeHeaders();
  const response = await axios.get(
    `${baseUrl}/parks/${parkId}/reviews`,
    config
  );
  return response.data;
}

export async function postReviews(parkId, score, content) {
  try {
    const config = makeHeaders();
    const data = { score: score, content: content };
    const response = await axios.post(
      `${baseUrl}/parks/${parkId}/reviews`,
      data,
      config
    );
    return response.data;
  } catch (error) {}
}
