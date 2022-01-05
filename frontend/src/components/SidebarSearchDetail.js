import React, { useState, Component, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
import { getParkDetail } from "../api/index";

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
      lat: 37.55105648528907,
      lng: 126.98820917938465,
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
          <MyMarker lat={this.props.lat} lng={this.props.lng} />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;

export function SidebarSearchDetail() {
  const [content, setContent] = useState("");
  const [detailData, setDetailData] = useState("");
  const [detailList, setDetailList] = useState("");
  const [equitments, setEquitments] = useState([]);
  const [simplemap, setSimplemap] = useState("");

  const { id } = useParams();
  const reviewList = [];

  useEffect(() => {
    async function getParkdetail() {
      const response = await getParkDetail(id);
      if (response) {
        setDetailData(response);
        setEquitments(response.equipments);
        console.log(response);
      } else {
        setDetailData("");
      }
    }
    getParkdetail();
  }, []);

  useEffect(() => {
    setDetailList(
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
    detailData &&
      setSimplemap(
        <SimpleMap
          center={{
            lat: Number(detailData.latitude),
            lng: Number(detailData.longitude),
          }}
          zoom={15}
        />
      );
  }, [detailData, equitments]);

  dummyreview.forEach((item, idx) => {
    reviewList.push(
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
          <div className="mapAPI">{detailData && simplemap}</div>
          <div className="parkDetailContainer">
            <div className="parkDetail">{detailData && detailList}</div>
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
