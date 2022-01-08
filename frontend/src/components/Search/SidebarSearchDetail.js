import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "../Header";
import Map from "./Map";
import ReactTooltip from "react-tooltip";
import { ReactComponent as BackIcon } from "../../image/back.svg";
import { SidebarMenu } from "./SidebarMenu";
import { getParkDetail, getReviews, getNearbyParks } from "../../actions/index";
import { DetailList } from "./DetailList";
import { SimpleMap } from "./GoolgleMap";
import { Review } from "./Review";
import { CreateReview } from "./CreateReview";

export function SidebarSearchDetail() {
  const [content, setContent] = useState("");
  const [detailData, setDetailData] = useState("");
  const [detailList, setDetailList] = useState("");
  const [simplemap, setSimplemap] = useState("");
  const [reviewList, setreviewList] = useState("");
  const [nearbyParks, setNearByParks] = useState([]);

  const { id } = useParams();

  // 마운트시, 공원 상세 정보 GET 요청, 리뷰 정보 GET요청
  useEffect(() => {
    async function getParkdetail() {
      const response = await getParkDetail(id);
      try {
        setDetailData(response);
      } catch (error) {
        console.log("공원 정보 GET요청 실패");
      }
    }
    async function getreviews() {
      const response = await getReviews(id);
      try {
        setreviewList(response);
      } catch (error) {
        console.log("리뷰 정보 GET요청 실패");
      }
    }
    async function getnearbyParks() {
      const response = await getNearbyParks(id);
      try {
        setNearByParks(response);
      } catch (error) {
        console.log("인근 공원 GET요청 실패");
      }
    }
    getParkdetail();
    getreviews();
    getnearbyParks();
  }, []);

  // GET 요청 후, 상세 페이지, 구글맵 UI
  useEffect(() => {
    setDetailList(
      <DetailList detailData={detailData} nearbyParks={nearbyParks} />
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
  }, [detailData, nearbyParks]);

  return (
    <>
      <Header />
      <section className="search">
        <SidebarMenu item={"search"} />
        <div className="sidebar">
          <Link to="/search/1">
            <BackIcon width="24" height="24" className="backIcon" />
          </Link>
          <div className="mapAPI">{detailData && simplemap}</div>
          <div className="parkDetailContainer">
            <div className="parkDetail">{detailData && detailList}</div>
            <div className="totalReviews">
              <h4>리뷰({detailData && detailData.total_reviews})</h4>
              <CreateReview parkId={id} type={"POST"} />
            </div>
            <div className="reviews">
              {reviewList &&
                reviewList.map((item, idx) => {
                  return <Review key={idx} item={item} idx={idx} />;
                })}
            </div>
          </div>
        </div>
        <Map setTooltipContent={setContent} parks={[detailData]} />
        <ReactTooltip>{content}</ReactTooltip>
      </section>
    </>
  );
}
