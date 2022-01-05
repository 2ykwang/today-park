import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import Map from "./Map";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import { ReactComponent as SearchIcon } from "../image/search.svg";
import { ReactComponent as StarIcon } from "../image/star.svg";
import { ReactComponent as BookmarkIconEmpty } from "../image/bookmark-empty.svg";
import { ReactComponent as BookmarkIcon } from "../image/bookmark-maked.svg";
import { SidebarMenu } from "./SidebarMenu";
import { BasicLink } from "./BasicLink";
import { useParams } from "react-router-dom";
import { getParks } from "../api/index";

function SidebarSearch() {
  const [content, setContent] = useState("");
  const [parks, setParks] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function getParkData() {
      const response = await getParks("", "", "", 1, 2);
      if (response) {
        setParks(response.results);
        console.log(response);
      } else {
        setParks([]);
      }
    }
    getParkData();
  }, []);

  // parks 라는 상태변수를 만들어서
  // api call 해서 응답받은 data 를 parks 에 넣어준다. 그 후 map 함수로 뿌려준다.
  //api
  const parklist = parks.map((item, idx) => {
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
  });

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
            <div>{parks && parklist}</div>
          </div>
        </div>
        <Map setTooltipContent={setContent} />
        <ReactTooltip>{content}</ReactTooltip>
      </section>
    </>
  );
}

export default SidebarSearch;
