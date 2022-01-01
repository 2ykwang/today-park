import React, { useState } from "react";
import { Header } from "./Header";
import Map from "./Map";
import ReactTooltip from "react-tooltip";
import { ReactComponent as SearchIcon } from "../image/search.svg";
import { ReactComponent as StarIcon } from "../image/star.svg";
import { ReactComponent as BookmarkIconEmpty } from "../image/bookmark-empty.svg";
import { ReactComponent as BookmarkIcon } from "../image/bookmark-maked.svg";
import { SidebarMenu } from "./SidebarMenu";
import { BasicLink } from "./BasicLink";
import { useParams } from "react-router-dom";

export function SidebarBookmark() {
  const [content, setContent] = useState("");
  return (
    <>
      <Header />
      <section className="search">
        <SidebarMenu item={"bookmark"} />
        <div className="sidebar"></div>
        <Map setTooltipContent={setContent} />
        <ReactTooltip>{content}</ReactTooltip>
      </section>
    </>
  );
}

const dummyreview = [
  {
    parkName: "엘리스 공원",
    rate: "4.5",
    address: "서울시 관악구 토끼동 12-34 엘리스공원",
    item: "8",
    review: "20",
  },
  {
    parkName: "엘리스 공원",
    rate: "4.5",
    address: "서울시 관악구 토끼동 12-34 엘리스공원",
    item: "8",
    review: "20",
  },
  {
    parkName: "엘리스 공원",
    rate: "4.5",
    address: "서울시 관악구 토끼동 12-34 엘리스공원",
    item: "8",
    review: "20",
  },
  {
    parkName: "엘리스 공원",
    rate: "4.5",
    address: "서울시 관악구 토끼동 12-34 엘리스공원",
    item: "8",
    review: "20",
  },
];

function SidebarSearch() {
  const [content, setContent] = useState("");
  const [clicked, setClicked] = useState(true);
  const { id } = useParams();
  console.log(id);

  const reviewlist = [];
  dummyreview.map((item) => {
    reviewlist.push(
      <>
        <BasicLink to={"/search/" + id} className="review">
          <h3>
            {item.parkName}
            <div class="rate">
              <StarIcon className="star" width="24" height="24" />
              {item.rate}
            </div>
          </h3>
          <p>{item.address}</p>
          <p>
            운동기구:{item.item} 리뷰:{item.review}
          </p>
          {clicked ? (
            <BookmarkIconEmpty className="bookmark" width="24" height="24" />
          ) : (
            <BookmarkIcon className="bookmark" width="24" height="24" />
          )}
        </BasicLink>
      </>
    );
  });

  return (
    <>
      <Header />
      <section className="search">
        <SidebarMenu item={"search"} />
        <div className="sidebar">
          <form>
            <SearchIcon width="24" height="24" className="searchIcon" />
            <input type="text" />
          </form>
          <div className="selectContainer">
            <select name="filter">
              <option value="공원이름">공원이름</option>
              <option value="동이름">동이름</option>
            </select>
            <select name="sort">
              <option value="평점순">평점순</option>
              <option value="리뷰순">리뷰개수순</option>
              <option value="가나다순">가나다순</option>
            </select>
          </div>
          <div className="reviewContainer">{reviewlist}</div>
        </div>
        <Map setTooltipContent={setContent} />
        <ReactTooltip>{content}</ReactTooltip>
      </section>
    </>
  );
}

export default SidebarSearch;
