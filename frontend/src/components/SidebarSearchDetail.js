import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "./Header";
import Map from "./Map";
import ReactTooltip from "react-tooltip";
import { ReactComponent as StarIcon } from "../image/star.svg";
import { ReactComponent as BackIcon } from "../image/back.svg";
import { ReactComponent as BookmarkIcon } from "../image/bookmark-maked.svg";
import { SidebarMenu } from "./SidebarMenu";
import { getParkDetail, getReviews, postReviews } from "../actions/index";
import { DetailList } from "./DetailList";
import { SimpleMap } from "./GoolgleMap";
import { Review } from "./Review";

export function SidebarSearchDetail() {
  const [content, setContent] = useState("");
  const [detailData, setDetailData] = useState("");
  const [detailList, setDetailList] = useState("");
  const [equitments, setEquitments] = useState([]);
  const [simplemap, setSimplemap] = useState("");
  const [reviewList, setreviewList] = useState("");
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [rating, setRating] = useState(0);
  const [reviewContent, setreviewContent] = useState("");

  const { id } = useParams();

  // 마운트시, 공원 상세 정보 GET 요청, 리뷰 정보 GET요청
  useEffect(() => {
    async function getParkdetail() {
      const response = await getParkDetail(id);
      try {
        setDetailData(response);
        setEquitments(response.equipments);
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
    setDetailList(
      <DetailList detailData={detailData} equitments={equitments} />
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

  // 클릭시 별점 등록
  function handleStarClick(e, idx) {
    e.preventDefault();
    let clickStates = [...clicked];
    for (let i = 1; i < 6; i++) {
      if (i <= idx) clickStates[i] = true;
      else clickStates[i] = false;
    }
    setClicked(clickStates);
    setRating(idx);
  }

  async function handleCreateReview(e) {
    e.preventDefault();
    let response = await postReviews(id, rating, reviewContent);
    console.log(response);
  }

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
              <form className="createReview">
                <div className="rating">
                  <StarIcon
                    className={"star " + (clicked[1] ? "clicked" : null)}
                    onClick={(e) => handleStarClick(e, 1)}
                    width="24"
                    height="24"
                  />
                  <StarIcon
                    className={"star " + (clicked[2] ? "clicked" : null)}
                    onClick={(e) => handleStarClick(e, 2)}
                    width="24"
                    height="24"
                  />
                  <StarIcon
                    className={"star " + (clicked[3] ? "clicked" : null)}
                    onClick={(e) => handleStarClick(e, 3)}
                    width="24"
                    height="24"
                  />
                  <StarIcon
                    className={"star " + (clicked[4] ? "clicked" : null)}
                    onClick={(e) => handleStarClick(e, 4)}
                    width="24"
                    height="24"
                  />
                  <StarIcon
                    className={"star " + (clicked[5] ? "clicked" : null)}
                    onClick={(e) => handleStarClick(e, 5)}
                    width="24"
                    height="24"
                  />
                </div>
                <textarea
                  placeholder="내용을 입력해주세요."
                  value={reviewContent}
                  onChange={(e) => {
                    setreviewContent(e.target.value);
                  }}
                />
                <br />
                <button type="submit" onClick={handleCreateReview}>
                  등록하기
                </button>
              </form>
            </div>
            <div className="reviews">
              {reviewList &&
                reviewList.map((item, idx) => {
                  return <Review key={idx} item={item} idx={idx} />;
                })}
            </div>
          </div>
        </div>
        <Map setTooltipContent={setContent} />
        <ReactTooltip>{content}</ReactTooltip>
      </section>
    </>
  );
}
