// /src/api/index.js
import axios from "axios";

export async function registerUser(username, email, password) {
  try {
    const data = { username: username, email: email, password: password };
    const response = await axios.post(`/user/register`, data);
    if (response.status === 201) {
      console.log("회원가입 성공");
    } else {
      // 로그인 실패
      window.location.replace("/");
    }
  } catch (error) {
    // window.location.replace("/");
  }
}

export async function getParks(guId, keyword, sort, page, size) {
  try {
    const response = await axios.get(
      `/parks/search?guId=${guId}&keyword=${keyword}&sort=${sort}&page=${page}&size=${size}`
    );
    if (response.status === 200) return response.data;
    // else if (response.status === 400) console.log("해당 검색 결과가 없습니다.");
    // else return "잘못된 요청입니다.";
    else window.location.replace("/");
  } catch (error) {}
}

export async function getParkDetail(parkId) {
  try {
    const response = await axios.get(`/parks/detail/${parkId}`);

    if (response.status === 200) return response.data;
    // else return "잘못된 요청입니다.";
    else window.location.replace("/");
  } catch (error) {}
}

export async function getNearbyParks(parkId) {
  try {
    const response = await axios.get(`/parks/${parkId}/nearby`);

    if (response.status === 200) return response.data;
    // else if (response.status === 404) console.log("해당 검색 결과가 없습니다.");
    // else return "잘못된 요청입니다.";
    else window.location.replace("/");
  } catch (error) {}
}

export async function getReviews(parkId) {
  try {
    const response = await axios.get(`/parks/${parkId}/reviews`);
    if (response.status === 200) return response.data;
    // else return "잘못된 요청입니다.";
    else window.location.replace("/");
  } catch (error) {
    window.location.replace("/");
  }
}

export async function postReviews(parkId, score, content) {
  try {
    const data = { park_id: parkId, score: score, content: content };
    const response = await axios.post(`/parks/${parkId}/reviews`, data);
    if (response.status === 201) return response.data;
    // else if (response.status === 404) return "존재하지 않는 공원 ID 입니다.";
    // else if (response.status === 401) return "권한이 없는 요청입니다.";
    // else return "잘못된 요청입니다.";
    else window.location.replace("/");
  } catch (error) {}
}

export async function updateReview(parkId, reviewId, score, content) {
  try {
    const data = { park_id: parkId, score: score, content: content };
    const response = await axios.put(
      `/parks/${parkId}/reviews/${reviewId}`,
      data
    );
    if (response.status === 200) return response.data;
    // else if (response.status === 401) return "권한이 없는 요청입니다.";
    // else return "잘못된 요청입니다.";
    else window.location.replace("/");
  } catch (error) {}
}

export async function deleteReview(parkId, reviewId) {
  try {
    const response = await axios.delete(`/parks/${parkId}/reviews/${reviewId}`);
    if (response.status === 200) return "성공적으로 삭제되었습니다.";
    // else if (response.status === 401) return "권한이 없는 요청입니다.";
    // else return "존재하지 않는 리뷰입니다.";
    else window.locatiosn.replace("/");
  } catch (error) {}
}

export async function onlyUserReview() {
  try {
    const response = await axios.get(`/parks/user-reviews`);
    if (response.status === 200) return response.data;
    // else if (response.status === 401) return "인증이 필요합니다.";
    else window.location.replace("/");
  } catch (error) {}
}

export async function getBookmarks() {
  try {
    const response = await axios.get(`/bookmarks`);
    if (response.status === 200) return response.data;
    // else if (response.status === 401) return "인증이 필요합니다.";
    else window.location.replace("/");
  } catch (error) {}
}

export async function postBookmark(parkId) {
  try {
    const data = { park_id: parkId };
    const response = await axios.post(`/bookmarks`, data);
    if (response.status === 200) return response.data;
    // else if (response.status === 406) return "이미 추가된 공원입니다.";
    // else if (response.status === 401) return "인증이 필요합니다.";
    // else return "잘못된 요청입니다.";
  } catch (error) {}
}

export async function deleteBookmark(bookmarkId) {
  try {
    const response = await axios.delete(`/bookmarks/${bookmarkId}`);
    if (response.status === 200) return "북마크 삭제 완료되었습니다.";
    // else if (response.status === 401) return "인증이 필요합니다.";
    // else return "존재하지 않는 북마크 ID 입니다.";
    else window.location.replace("/");
  } catch (error) {}
}

export async function uploadUserImage(image, filename) {
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("profile_image", image, filename);
    const response = await axios.post("/user/upload-image", formData, config);
    return response;
  } catch (error) {}
}
