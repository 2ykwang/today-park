import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import Map from "../components/Map";
import ReactTooltip from "react-tooltip";
import { ReactComponent as SearchIcon } from "../image/search.svg";
import { SidebarMenu } from "../components/SidebarMenu";
import { getParks } from "../actions/index";
import { ParkList } from "../components/ParkList";

function Search() {
  const [content, setContent] = useState("");
  const [parksResponse, setparksResponse] = useState({});
  const [parks, setParks] = useState([]);
  const [parklist, setParklist] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sort, setSort] = useState("");
  const [pagination, setPagination] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [handlePageination, setHandlePagination] = useState([0, 5]);

  // 마운트시, 공원 정보 GET 요청 1페이지에 있는 공원 리스트 가져오기
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
    parks &&
      setParklist(
        parks.map((item, idx) => {
          let park_id = item.id;
          return (
            <ParkList key={park_id} item={item} idx={idx} park_id={park_id} />
          );
        })
      );
  }, [parks]);

  // 공원 검색시, 검색한 공원 데이터만 요청
  async function handleSearchSubmit(searchValue, sort, e) {
    e.preventDefault();
    const response = await getParks("", searchValue, sort, 1, 5);
    setparksResponse(response);
    setParks(response.results);
  }

  //페이지네이션 생성, 클릭시 해당 페이지 이동
  useEffect(() => {
    let paginations = [];
    for (let i = 1; i <= Math.ceil(parksResponse.count / 5); i++) {
      paginations.push(
        <button
          onClick={async (e) => {
            e.preventDefault();
            const page = Number(e.target.innerText);
            const response = await getParks("", "", "", page, 5);
            setParks(response.results);
            setCurrentPage(page);
          }}
        >
          {i}
        </button>
      );
    }
    setPagination(paginations);
  }, [parksResponse]);

  console.log(pagination.length);

  return (
    <>
      <Header />
      <section className="search">
        <SidebarMenu item={"search"} />
        <div className="sidebar">
          <div className="searchContainer">
            <form onSubmit={(e) => handleSearchSubmit(searchValue, sort, e)}>
              <SearchIcon width="24" height="24" className="searchIcon" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
              <select
                name="sort"
                onChange={(e) => {
                  setSort(e.target.value);
                }}
              >
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
              <div className="pagination">
                <button
                  onClick={() => {
                    setHandlePagination((current) => {
                      let newArr = [...current];
                      newArr[0] -= 5;
                      newArr[1] -= 5;
                      return newArr;
                    });
                  }}
                >
                  이전
                </button>
                {pagination.slice(handlePageination[0], handlePageination[1])}
                <button
                  onClick={() => {
                    if (currentPage >= pagination.length - 4) return;
                    else
                      setHandlePagination((current) => {
                        let newArr = [...current];
                        newArr[0] += 5;
                        newArr[1] += 5;
                        return newArr;
                      });
                  }}
                >
                  다음
                </button>
              </div>
            </div>
          </div>
        </div>
        <Map setTooltipContent={setContent} />
        <ReactTooltip>{content}</ReactTooltip>
      </section>
    </>
  );
}

export default Search;
