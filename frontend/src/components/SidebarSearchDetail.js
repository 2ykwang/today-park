import React, { useState, Component } from "react";
import { Link } from "react-router-dom";
import { Header } from "./Header";
import Map from "./Map";
import ReactTooltip from "react-tooltip";
import { ReactComponent as BackIcon } from "../image/back.svg";
import { ReactComponent as StarIcon } from "../image/star.svg";
import { ReactComponent as BookmarkIconEmpty } from "../image/bookmark-empty.svg";
import { ReactComponent as BookmarkIcon } from "../image/bookmark-maked.svg";
import { SidebarMenu } from "./SidebarMenu";
import { BasicLink } from "./BasicLink";
import { GOOGLE_KEY } from "../gitignore/googleKey";
import GoogleMapReact from "google-map-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IconContext } from "react-icons";

const MyMarker = (props) => {
  return (
    <IconContext.Provider value={{ color: "red", size: "3em" }}>
      <div>
        <FaMapMarkerAlt />
      </div>
    </IconContext.Provider>
  );
};

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100%", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <MyMarker
            lat={this.props.lat}
            lng={this.props.lng}
            string={this.props.name}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;

const dummyparkdetail = [
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

const dummyreview = [
  {
    id: 1,
    score: 3.5,
    content: "너무 좋은거 같아여~! 자주 이용할게요~!",
    user_id: "test@test.com",
    park_id: "봉천11배수지공원(놀이터부근)",
    username: "토끼랑",
    created_at: "",
    modified_at: "",
    is_deleted: "",
  },
  {
    id: 2,
    score: 4.5,
    content:
      "여기 산스장은 운동기구가 참 많네요! 자주 이용하고 있어요~ 추천해요~!",
    user_id: "test2@test.com",
    park_id: "봉천11배수지공원(놀이터부근)",
    username: "거북이",
    created_at: "",
    modified_at: "",
    is_deleted: "",
  },
];

export function SidebarSearchDetail() {
  const [content, setContent] = useState("");
  const detailList = [];
  const reviewList = [];

  dummyparkdetail.forEach((item) => {
    detailList.push(
      <>
        <div className="park">
          <div className="title">
            <h3>
              {item.park_name}
              <div className="rate">
                <StarIcon className="star" width="24" height="24" />
                {item.avg_score}
              </div>
            </h3>
            <BookmarkIconEmpty className="bookmark" width="24" height="24" />
            <p>{item.full_address}</p>
          </div>
          <div className="equipments">
            <h4>운동기구 종류</h4>
            <ul>
              {item.equipments.map((item, idx) => {
                return (
                  <li key={idx}>
                    {item.equipment_name}({item.quantity})
                  </li>
                );
              })}
            </ul>
          </div>
          <h4 className="totalReviews">리뷰({item.total_reviews})</h4>
        </div>
      </>
    );
  });

  dummyreview.forEach((item) => {
    reviewList.push(
      <div className="review">
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
  });

  return (
    <>
      <Header />
      <section className="search">
        <SidebarMenu item={"search"} />
        <div className="sidebar">
          <Link to="/search">
            <BackIcon width="24" height="24" className="backIcon" />
          </Link>
          <div className="mapAPI">
            <SimpleMap
              center={{ lat: 37.46934341547775, lng: 126.97010784 }}
              zoom={15}
            />
          </div>
          <div className="parkDetailContainer">
            <div className="parkDetail">{detailList}</div>
            <form className="createReview">
              <textarea placeholder="내용을 입력해주세요." />
              <br />
              <button type="submit">등록하기</button>
            </form>
            <div className="reviews">{reviewList}</div>
          </div>
        </div>
        <Map setTooltipContent={setContent} />
        <ReactTooltip>{content}</ReactTooltip>
      </section>
    </>
  );
}
