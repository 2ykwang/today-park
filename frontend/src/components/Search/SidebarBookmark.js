import React, { useState, useEffect } from "react";
import { Header } from "../Header";
import Map from "./Map";
import ReactTooltip from "react-tooltip";
import { SidebarMenu } from "./SidebarMenu";
import { ReactComponent as StarIcon } from "../../image/star.svg";
import { ReactComponent as FlagIcon } from "../../image/flag.svg";
import { BasicLink } from "../BasicLink";
import { getBookmarks } from "../../actions/index";

export function SidebarBookmark() {
  const [content, setContent] = useState("");
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    async function getBookmarklist() {
      const response = await getBookmarks();
      setBookmarks(response);
    }
    getBookmarklist();
  }, []);

  let bookmarkList =
    bookmarks &&
    bookmarks.map((item, idx) => {
      let park_id = item.parks.id;
      return (
        <div key={idx} className="park">
          <BasicLink to={"/search/detail/" + park_id} className="parklink">
            <h3>
              {item.parks.park_name}
              <div className="rate">
                <StarIcon className="star" width="24" height="24" />
                {item.parks.avg_score}
              </div>
            </h3>
            <p>{item.parks.full_address}</p>
            <p>
              운동기구: {item.parks.total_equipments} / 리뷰:{" "}
              {item.parks.total_reviews}
            </p>
          </BasicLink>
          {/* {clicked ? (
            <BookmarkIcon
              className="bookmark"
              width="24"
              height="24"
              onClick={clickBookmark}
            />
          ) : (
            <BookmarkIconEmpty
              className="bookmark"
              width="24"
              height="24"
              onClick={clickBookmark}
            />
          )} */}
        </div>
      );
    });

  return (
    <>
      <Header />
      <section className="search">
        <SidebarMenu item={"bookmark"} />
        <div className="sidebar">
          <div className="bookmarkContainer">
            <h2>
              즐겨찾는 공원
              <FlagIcon
                width="28"
                height="28"
                fill="#3a3a3a"
                className="flagIcon"
              />
            </h2>
            <div>{bookmarkList}</div>
          </div>
        </div>
        <Map
          setTooltipContent={setContent}
          parks={bookmarks.map((item) => {
            return item.parks;
          })}
        />
        <ReactTooltip>{content}</ReactTooltip>
      </section>
    </>
  );
}
