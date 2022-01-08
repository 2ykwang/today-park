import React from "react";
import { Header } from "../components/Header";
import video from "../video/mainVideo.mp4";
import { BasicLink } from "../components/BasicLink";
import underScroll from "../image/scrollDown.png";
import cloud from "../image/main/cloud3.png";
import sun from "../image/main/sun.png";
import Tree from "../image/main/tree.png";
import Mountain from "../image/main/mountain.png";
import Pageimage from "../image/main/pageimage.png";
import { DefaultBarChart } from "../components/DefaultBarChart";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function Home() {
  return (
    <>
      <Header />
      <div className="mainContainer">
        <section className="firstPage">
          <div className="introTextWrapper">
            <div className="introText1">
              <p>포스트 코로나,</p>
              <p>당신의 일상에 건강을 되찾을 시간.</p>
            </div>
            <div className="introText2">
              <p>"오늘의 공원"이 도와드릴게요:)</p>
            </div>
            <BasicLink to="/search/1" className="findPark">
              공원 찾으러 가기 →
            </BasicLink>
          </div>
          <div className="video">
            <video muted autoPlay loop>
              <source src={video} type="video/mp4" />
            </video>
          </div>
          <div className="underScroll">
            <img src={underScroll} alt="underScroll" />
            <p>
              scroll <br />
              down
            </p>
          </div>
        </section>

        <section className="secondPage">
          <div className="reason">
            <div className="reason1">
              <div className="reason1Textwrapper">
                <div className="reason1Title">
                  <span className="subTitle">건강 ’빨간불’</span>
                  <p className="title">
                    혹시 나도 <span>건강 침체기?</span>
                  </p>
                </div>
                <div className="reason1Contents">
                  <p>
                    코로나 이후 우리가 자주 먹게된 배달 음식.
                    <br />
                    그런데 배달 음식 “한 끼”는 <br />
                    성인 "하루" 권장 섭취 칼로리(2500kcal)의 <br />
                    80%에 달한답니다.
                  </p>
                </div>
              </div>
              <div className="reason1-statisticswrapper">
                <div className="reason1Box">
                  <div className="reason1-statistics-back">
                    <div className="reason1Contents">
                      <p>
                        "배달앱, 전년비 카드 <br />
                        사용 건수 증가 업종 1위"
                      </p>
                      <div className="reason1Chart2">
                        <div className="reason1CardRank">
                          <p>1위 : 배달앱</p>
                          <p>2위 : 아울렛</p>
                          <p>3위 : 취미시설</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="reason1Box">
                  <div className="reason1-statistics-back">
                    <div className="reason1Contents">
                      <p>
                        "배달음식 1위 치킨, <br />
                        평균 2233 kcal↑
                      </p>
                      <div className="reason1Chart3">
                        <DefaultBarChart
                          data={[
                            { name: "치킨", value: "2233" },
                            { name: "하루권장", value: "2500" },
                          ]}
                          colors={COLORS}
                        ></DefaultBarChart>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="secondhalfPage">
          <div className="secondhalfPageContainer">
            <div className="pageimage">
              <img src={Pageimage} alt="background tree" />
            </div>
            <div class="textcontent">
              <p className="green bold mini">다시 ‘초록불’</p>
              <div className="titles">
                <p className="bold title">신발끈 단단히 묶고 </p>
                <span className="green bold title">오늘의 공원</span>
                <span className="bold subtitle">으로</span>
              </div>
              <p>공원별 운동기구 현황부터 리뷰 기능까지,</p>
              <p>나만의 최애 공원을 즐겨찾기에 담아보세요.</p>
            </div>
          </div>
        </section>

        <section className="thirdPage">
          <div className="intro">
            <div className="introBackgroundWrapper">
              <div className="introBackground1"></div>
            </div>
            <div className="intro-cloud-1">
              <img src={cloud} alt="cloud1" />
            </div>
            <div className="intro-cloud-2">
              <img src={cloud} alt="cloud2" />
            </div>
            <div className="intro-cloud-3">
              <img src={cloud} alt="cloud3" />
            </div>
            <div className="intro-sun">
              <img src={sun} alt="sun" />
            </div>
            <div className="thirdContentsWrapper">
              <div className="thirdTitle">
                <p>
                  성공적인 건강 라이프를 위한 첫걸음,
                  <br />
                  지금 바로 시작해 보세요!
                </p>
              </div>
              <div className="thirdButton">
                <BasicLink to="/search/1" className="findPark">
                  <p>산스장 찾으러 GO!</p>
                </BasicLink>
              </div>
            </div>

            <div className="bottomImages">
              <div className="mountain">
                <img src={Mountain} alt="background mountain" />
              </div>
              <div className="tree1">
                <img src={Tree} alt="background tree" />
              </div>
              <div className="tree2">
                <img src={Tree} alt="background tree" />
              </div>
              <div className="tree3">
                <img src={Tree} alt="background tree" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
