import React, { useState } from "react";
import { ReactComponent as StarIcon } from "../image/star.svg";
import { ReactComponent as BookmarkIcon } from "../image/bookmark-maked.svg";
import { ReactComponent as BookmarkIconEmpty } from "../image/bookmark-empty.svg";
import { postBookmark, deleteBookmark } from "../actions/index";

export function DetailList({ detailData, equitments }) {
  const [click, setClick] = useState(false);

  async function addbookmark() {
    const response = await postBookmark(detailData.id);
    setClick(true);
    console.log(response);
  }
  async function deletebookmark() {
    await deleteBookmark();
    setClick(false);
  }
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
          {click ? (
            <BookmarkIcon
              className="bookmark"
              width="24"
              height="24"
              onClick={deletebookmark}
            />
          ) : (
            <BookmarkIconEmpty
              className="bookmark"
              width="24"
              height="24"
              onClick={addbookmark}
            />
          )}
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
        <div className="nearbyParks">
          <h4>인근 공원</h4>
          <ul>
            <li>- 토끼 공원</li>
            <li>- 거북이 공원</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
