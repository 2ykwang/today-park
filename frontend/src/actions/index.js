// /src/api/index.js
import axios from "axios";

export async function registerUser(username, email, password) {
  // const config = makeHeaders();
  try {
    const data = { username: username, email: email, password: password };
    const response = await axios.post(`/user/register`, data);
    if (response.status === 201) {
      console.log("회원가입 성공");
    } else {
      // 로그인 실패
    }
  } catch (error) {}
}

export async function getParks(guId, keyword, sort, page, size) {
  try {
    const response = await axios.get(
      `/parks/search?guId=${guId}&keyword=${keyword}&sort=${sort}&page=${page}&size=${size}`
    );
    if (response.status === 200) return response.data;
    else if (response.status === 400) console.log("해당 검색 결과가 없습니다.");
    else return "잘못된 요청입니다.";
  } catch (error) {}
}

export async function getParkDetail(parkId) {
  try {
    const response = await axios.get(`/parks/detail/${parkId}`);

    return response.data;
  } catch (error) {}
}

export async function getReviews(parkId) {
  const response = await axios.get(`/parks/${parkId}/reviews`);
  return response.data;
}

export async function postReviews(parkId, score, content) {
  try {
    const data = { park_id: parkId, score: score, content: content };
    const response = await axios.post(`/parks/${parkId}/reviews`, data);
    return response.data;
  } catch (error) {}
}

export async function updateReview(parkId, reviewId, score, content) {
  try {
    const data = { park_id: parkId, score: score, content: content };
    const response = await axios.put(
      `/parks/${parkId}/reviews/${reviewId}`,
      data
    );
    return response.data;
  } catch (error) {}
}

export async function deleteReview(parkId, reviewId) {
  try {
    await axios.delete(`/parks/${parkId}/reviews/${reviewId}`);
  } catch (error) {}
}

export async function onlyUserReview() {
  try {
    const response = await axios.get(`/parks/user-reviews`);
    return response.data;
  } catch (error) {}
}

export async function getBookmarks() {
  try {
    const response = await axios.get(`/bookmarks`);
    return response.data;
  } catch (error) {}
}

export async function postBookmark(parkId) {
  try {
    const data = { park_id: parkId };
    const response = await axios.post(`/bookmarks`, data);
    return response.data;
  } catch (error) {}
}

export async function deleteBookmark(bookmarkId) {
  try {
    await axios.delete(`/bookmarks/${bookmarkId}`);
  } catch (error) {}
}
