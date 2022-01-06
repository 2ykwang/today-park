import React from "react";
import { ReactComponent as StarIcon } from "../image/star.svg";
import { ReactComponent as BookmarkIconEmpty } from "../image/bookmark-empty.svg";

export function DetailList({ detailData, equitments }) {
  return (
    <div>
      <div className="park">
        <div className="title">
          <h3>
            {detailData.park_name}
            <div className="rate">
              <StarIcon className="star" width="24" height="24" />
              {detailData.avg_score}
            </div>
          </h3>
          <BookmarkIconEmpty className="bookmark" width="24" height="24" />
          <p>{detailData.full_address}</p>
        </div>
        <div className="equipments">
          <h4>운동기구 종류</h4>
          <ul>
            {equitments.map((item, idx) => {
              return (
                <li key={idx}>
                  - {item.equipment_name}({item.quantity})
                </li>
              );
            })}
          </ul>
        </div>
        <h4 className="totalReviews">리뷰({detailData.total_reviews})</h4>
      </div>
    </div>
  );
}
