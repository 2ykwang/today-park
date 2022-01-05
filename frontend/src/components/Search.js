import React, { useState, useEffect } from "react";
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
import { getParks } from "../api/index";

function ParkList({ item, idx, park_id }) {
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
      {true ? (
        <BookmarkIconEmpty
          className={`bookmark id-${idx + 1}`}
          width="24"
          height="24"
          checked={true}
        />
      ) : (
        <BookmarkIcon
          className={`bookmark id-${idx + 1}`}
          width="24"
          height="24"
          checked={false}
        />
      )}
    </div>
  );
}

function SidebarSearch() {
  const [content, setContent] = useState("");
  const [parksResponse, setparksResponse] = useState({});
  const [parks, setParks] = useState([]);
  const [parklist, setParklist] = useState([]);
  const { id } = useParams();

  // 마운트시, 공원 정보를 가져오고 1페이지에 있는 공원 리스트 가져오기
  useEffect(() => {
    async function getParkData() {
      const response = await getParks("", "", "", 1, 5);
      if (response) {
        setparksResponse(response);
        setParks(response.results);
      } else {
        setparksResponse([]);
      }
    }
    getParkData();
  }, []);

  // 공원 리스트로 보여주는 컴포넌트 생성
  useEffect(() => {
    setParklist(
      parks.map((item, idx) => {
        let park_id = item.id;
        return <ParkList item={item} idx={idx} park_id={park_id} />;
      })
    );
  }, [parks]);

  //페이지네이션 생성, 클릭시 해당 페이지 이동
  const pagination = [];
  for (let i = 1; i <= Math.ceil(parksResponse.count / 5); i++) {
    pagination.push(
      <button
        onClick={async (e) => {
          e.preventDefault();
          const page = e.target.innerText;
          const response = await getParks("", "", "", Number(page), 5);
          setParks(response.results);
        }}
      >
        {i}
      </button>
    );
  }

  return (
    <>
      <Header />
      <section className="search">
        <SidebarMenu item={"search"} />
        <div className="sidebar">
          <div className="searchContainer">
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
            <div className="parkContainer">
              {parksResponse && parklist}
              <div className="pagination">{pagination}</div>
            </div>
          </div>
        </div>
        <Map setTooltipContent={setContent} />
        <ReactTooltip>{content}</ReactTooltip>
      </section>
    </>
  );
}

export default SidebarSearch;
