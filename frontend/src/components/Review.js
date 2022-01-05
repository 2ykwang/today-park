import React from "react";
import { ReactComponent as StarIcon } from "../image/star.svg";

export function Review({ item, idx }) {
  return (
    <div className="review" key={idx}>
      <h5>
        {item.username}
        <div className="rate">
          <StarIcon width="24" height="24" fill="#FFB800" className="star" />
          <p>{item.score}</p>
        </div>
      </h5>
      <p>{item.content}</p>
    </div>
  );
}
