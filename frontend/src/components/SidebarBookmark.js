import React, { useState } from "react";
import { Header } from "./Header";
import Map from "./Map";
import ReactTooltip from "react-tooltip";
import { SidebarMenu } from "./SidebarMenu";
import { ReactComponent as StarIcon } from "../image/star.svg";
import { ReactComponent as BookmarkIconEmpty } from "../image/bookmark-empty.svg";
import { ReactComponent as BookmarkIcon } from "../image/bookmark-maked.svg";
import { ReactComponent as FlagIcon } from "../image/flag.svg";
import { BasicLink } from "./BasicLink";

const dummybookmark = [
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

export function SidebarBookmark() {
  const [content, setContent] = useState("");
  const [clicked, setClicked] = useState(true);

  function clickBookmark() {
    if (clicked) setClicked(false);
    else setClicked(true);
  }

  const bookmarkList = dummybookmark.map((item, idx) => {
    let park_id = item.id;
    return (
      <div key={idx} className="park">
        <BasicLink to={"/search/" + park_id} className="parklink">
          <h3>
            {item.park_name}
            <div className="rate">
              <StarIcon className="star" width="24" height="24" />
              {item.avg_score}
            </div>
          </h3>
          <p>{item.full_address}</p>
          <p>
            운동기구: {item.total_equipments} / 리뷰: {item.total_reviews}
          </p>
        </BasicLink>
        {clicked ? (
          <BookmarkIconEmpty
            className="bookmark"
            width="24"
            height="24"
            onClick={clickBookmark}
          />
        ) : (
          <BookmarkIcon
            className="bookmark"
            width="24"
            height="24"
            onClick={clickBookmark}
          />
        )}
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
        <Map setTooltipContent={setContent} />
        <ReactTooltip>{content}</ReactTooltip>
      </section>
    </>
  );
}
