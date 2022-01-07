import React, { useState, useEffect } from "react";
import { ReactComponent as StarIcon } from "../image/star.svg";
import { ReactComponent as BookmarkIcon } from "../image/bookmark-maked.svg";
import { ReactComponent as BookmarkIconEmpty } from "../image/bookmark-empty.svg";
import { postBookmark, deleteBookmark, getBookmarks } from "../actions/index";

export function DetailList({ detailData }) {
  const [click, setClick] = useState(false);
  const [bookmarkId, setBookmarkId] = useState("");

  const equipmentsList =
    detailData &&
    detailData.equipments.map((item, idx) => {
      return (
        <li key={idx}>
          - {item.equipment_name}({item.quantity})
        </li>
      );
    });

  useEffect(() => {
    async function getbookmarks() {
      const response = await getBookmarks();
      detailData &&
        response.forEach((item) => {
          if (item.parks.id === detailData.id) {
            setClick(true);
            setBookmarkId(item.id);
          }
        });
    }
    getbookmarks();
  }, [detailData, click]);

  async function addbookmark() {
    const response = await postBookmark(detailData.id);
    setClick(true);
    console.log(response);
  }
  async function deletebookmark() {
    await deleteBookmark(bookmarkId);
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
          <ul>{equipmentsList}</ul>
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
