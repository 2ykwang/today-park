import React, { useState, useEffect } from "react";
import { ReactComponent as StarIcon } from "../../image/star.svg";
import { postReviews, updateReview } from "../../actions/index";

export function CreateReview({ parkId, reviewId, type, score, content }) {
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [rating, setRating] = useState(0);
  const [reviewContent, setreviewContent] = useState("");

  // console.log(parkId,reviewId,type,)

  // 클릭시 별점 등록
  function handleStarClick(e, idx) {
    e.preventDefault();
    let clickStates = [...clicked];
    for (let i = 1; i < 6; i++) {
      if (i <= idx) clickStates[i] = true;
      else clickStates[i] = false;
    }
    setClicked(clickStates);
    setRating(idx);
  }

  // 수정 클릭시 원래 있던 리뷰 내용 보이게 하는 로직
  useEffect(() => {
    setreviewContent(content);
    let clickStates = [...clicked];
    for (let i = 1; i < 6; i++) {
      if (i <= score) clickStates[i] = true;
      else clickStates[i] = false;
    }
    setClicked(clickStates);
  }, []);

  // 리뷰 POST 요청
  async function handleCreateReview() {
    console.log(parkId, rating, reviewContent);
    let response = await postReviews(parkId, rating, reviewContent);
    window.location.replace(`/search/${parkId}`);
  }

  // 리뷰 PUT 요청
  async function handleUpdateReview() {
    let response = await updateReview(parkId, reviewId, rating, reviewContent);
  }

  return (
    <>
      <form className="createReview">
        <div className="rating">
          <StarIcon
            className={"star " + (clicked[1] ? "clicked" : null)}
            onClick={(e) => handleStarClick(e, 1)}
            width="24"
            height="24"
          />
          <StarIcon
            className={"star " + (clicked[2] ? "clicked" : null)}
            onClick={(e) => handleStarClick(e, 2)}
            width="24"
            height="24"
          />
          <StarIcon
            className={"star " + (clicked[3] ? "clicked" : null)}
            onClick={(e) => handleStarClick(e, 3)}
            width="24"
            height="24"
          />
          <StarIcon
            className={"star " + (clicked[4] ? "clicked" : null)}
            onClick={(e) => handleStarClick(e, 4)}
            width="24"
            height="24"
          />
          <StarIcon
            className={"star " + (clicked[5] ? "clicked" : null)}
            onClick={(e) => handleStarClick(e, 5)}
            width="24"
            height="24"
          />
        </div>
        <textarea
          placeholder="내용을 입력해주세요."
          value={reviewContent}
          onChange={(e) => {
            setreviewContent(e.target.value);
          }}
        />
        <br />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            if (type === "POST") {
              handleCreateReview();
            } else if (type === "PUT") {
              handleUpdateReview();
              window.location.replace("/mypage");
            }
          }}
        >
          등록하기
        </button>
      </form>
    </>
  );
}
