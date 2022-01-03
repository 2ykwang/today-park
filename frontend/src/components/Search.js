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

const dummypark = [
  {
    id: 1,
    park_name: "봉천11배수지공원(놀이터부근)",
    gu_id: 135,
    full_address: "서울특별시 관악구 인헌동 산3-8",
    si_address: "서울특별시",
    gu_address: "관악구",
    dong_address: "인헌동",
    latitude: "374,691,872,300,000.00",
    longitude: "37.46918723",
    park_image: null,
    total_equipments: 3,
    equipments: [
      {
        equipment_name: "역기내리기",
        quantity: 1,
      },
      {
        equipment_name: "다리들어올리기",
        quantity: 2,
      },
    ],
    total_reviews: 2,
    avg_score: 3.5,
  },
  {
    id: 2,
    park_name: "봉천11배수지공원(놀이터부근)",
    gu_id: 135,
    full_address: "서울특별시 관악구 인헌동 산3-8",
    si_address: "서울특별시",
    gu_address: "관악구",
    dong_address: "인헌동",
    latitude: "374,691,872,300,000.00",
    longitude: "37.46918723",
    park_image: null,
    total_equipments: 3,
    equipments: [
      {
        equipment_name: "역기내리기",
        quantity: 1,
      },
      {
        equipment_name: "다리들어올리기",
        quantity: 2,
      },
    ],
    total_reviews: 2,
    avg_score: 3.5,
  },
  {
    id: 3,
    park_name: "봉천11배수지공원(놀이터부근)",
    gu_id: 135,
    full_address: "서울특별시 관악구 인헌동 산3-8",
    si_address: "서울특별시",
    gu_address: "관악구",
    dong_address: "인헌동",
    latitude: "374,691,872,300,000.00",
    longitude: "37.46918723",
    park_image: null,
    total_equipments: 3,
    equipments: [
      {
        equipment_name: "역기내리기",
        quantity: 1,
      },
      {
        equipment_name: "다리들어올리기",
        quantity: 2,
      },
    ],
    total_reviews: 2,
    avg_score: 3.5,
  },
  {
    id: 4,
    park_name: "봉천11배수지공원(놀이터부근)",
    gu_id: 135,
    full_address: "서울특별시 관악구 인헌동 산3-8",
    si_address: "서울특별시",
    gu_address: "관악구",
    dong_address: "인헌동",
    latitude: "374,691,872,300,000.00",
    longitude: "37.46918723",
    park_image: null,
    total_equipments: 3,
    equipments: [
      {
        equipment_name: "역기내리기",
        quantity: 1,
      },
      {
        equipment_name: "다리들어올리기",
        quantity: 2,
      },
    ],
    total_reviews: 2,
    avg_score: 3.5,
  },
];

function SidebarSearch() {
  const [content, setContent] = useState("");
  const [clicked, setClicked] = useState(true);

  const { id } = useParams();

  const parklist = [];
  dummypark.map((item) => {
    let park_id = item.id;
    parklist.push(
      <>
        <BasicLink to={"/search/" + park_id} className="park">
          <h3>
            {item.park_name}
            <div class="rate">
              <StarIcon className="star" width="24" height="24" />
              {item.avg_score}
            </div>
          </h3>
          <p>{item.full_address}</p>
          <p>
            운동기구: {item.total_equipments} / 리뷰: {item.total_reviews}
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
            <select name="sort">
              <option value="score_asc">평점 높은 순</option>
              <option value="score_desc">평점 낮은 순</option>
              <option value="review_more">리뷰 많은 순</option>
              <option value="review_less">리뷰 적은 순</option>
              <option value="dict_asc">가나다 순</option>
              <option value="dict_desc">가나다 역순</option>
            </select>
          </form>
          {/* <div className="selectContainer"></div> */}
          <div className="parklistContainer">{parklist}</div>
        </div>
        <Map setTooltipContent={setContent} />
        <ReactTooltip>{content}</ReactTooltip>
      </section>
    </>
  );
}

export default SidebarSearch;
