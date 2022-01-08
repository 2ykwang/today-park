import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "./Header";
import Map from "./Map";
import ReactTooltip from "react-tooltip";
import { ReactComponent as BackIcon } from "../image/back.svg";
import { SidebarMenu } from "./SidebarMenu";
import { getParkDetail, getReviews } from "../actions/index";
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

  const { id } = useParams();

  console.log(detailData);

  // 마운트시, 공원 상세 정보 GET 요청, 리뷰 정보 GET요청
  useEffect(() => {
    async function getParkdetail() {
      const response = await getParkDetail(id);
      try {
        setDetailData(response);
      } catch (error) {
        console.log("공원 정보 get요청 실패");
      }
    }
    async function getreviews() {
      const response = await getReviews(id);
      try {
        setreviewList(response);
      } catch (error) {
        console.log("리뷰 정보 get 요청 실패");
      }
    }
    getParkdetail();
    getreviews();
  }, []);

  // GET 요청 후, 상세 페이지, 구글맵 UI
  useEffect(() => {
    setDetailList(<DetailList detailData={detailData} />);
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
  }, [detailData]);

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
