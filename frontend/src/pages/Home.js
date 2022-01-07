import React from "react";
import styled from "styled-components";
// import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import video from "../video/mainVideo.mp4";
import { BasicLink } from "../components/BasicLink";
import underScroll from "../image/scrollDown.png";
import cloud from "../image/cloud3.png";
import sun from "../image/sun.png";
import backgroundMountain from "../image/backgroundMountain.png";
import { DefualtPieChart } from "../components/DefualtPieChart";
import { DefualtBarChart } from "../components/DefualtBarChart";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 176;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.4;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const style = {
  top: "-3vh",
  left: "0",
  lineHeight: "1rem",
  fontSize: "0.9rem",
};

function Home() {
  return (
    <>
      <Header />
      <section className="home">
        <div className="video">
          <video width="100%" height="100%" muted autoPlay loop>
            <source src={video} type="video/mp4" />
          </video>
          <BasicLink to="/search" className="findPark">
            공원 찾으러 가기 →
          </BasicLink>
        </div>
        <div className="under-scroll">
          <BasicLink to="#">
            <img src={underScroll} alt="underScroll" />
          </BasicLink>
        </div>
      </section>

      <div className="intro">
        <div className="intro-background-wrapper">
          <div className="intro-background-1"></div>
          <div className="intro-background-2"></div>
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
        <div className="intro-textwrapper">
          <div className="intro-text-1">
            <p>포스트 코로나,</p>
            <p>당신의 일상에 건강을 되찾을 시간.</p>
          </div>
          <div className="intro-text-2">
            <p>"오늘의 공원"이 도와드릴게요:)</p>
          </div>
        </div>
      </div>

      <div className="reason">
        <div className="reason1">
          <div className="reason1-background">
            <img src={backgroundMountain} alt="backgroundMountain" />
          </div>

          <div className="reason1-textwrapper">
            <div className="reason1-text1">
              <p>
                혹시 나도 <span>건강 침체기?</span>
              </p>
            </div>
            <div className="reason1-text2">
              <p>
                <span>"확찐자"</span> 많이 들어보셨죠?
              </p>
              <p>
                배달 음식 수요 증가로 인하여 체중이 증가한 사람이 늘어났습니다.
              </p>
              <p>
                그 이유는 대부분의 배달음식이 칼로리가 <span>"높기"</span>
                때문이죠.
              </p>
            </div>
          </div>

          <div className="reason1-statisticswrapper">
            <div className="reason1-statistics">
              <div className="reason1-statistics-back"></div>
              <div className="reason1-statistics-contents">
                <p>"성인 46%, 코로나 이후, 체중 증가해"</p>
                <div className="reason1-chart1">
                  <DefualtPieChart
                    data={[
                      { name: "체중이 증가했다", value: 46 },
                      { name: "체중이 증가하지 않았다", value: 54 },
                    ]}
                    colors={COLORS}
                  ></DefualtPieChart>
                </div>
                <p>(대한비만협회)</p>
              </div>
            </div>
            <div className="reason1-statistics">
              <div className="reason1-statistics-back"></div>
              <div className="reason1-statistics-contents">
                <p>"배달앱, 전년비 카드 사용 건수 증가 업종 1위"</p>
                <div className="reason1-chart2">
                  <div className="reason1-card-rank">
                    <p>1위 : 배달앱</p>
                    <p>2위 : 아울렛</p>
                    <p>3위 : 취미시설</p>
                    <p>·</p>
                    <p>·</p>
                  </div>
                </div>
                <p>(삼성카드)</p>
              </div>
            </div>
            <div className="reason1-statistics">
              <div className="reason1-statistics-back"></div>
              <div className="reason1-statistics-contents">
                <p>"배달음식 1위 치킨, 평균 2233 kcal↑</p>
                <div className="reason1-chart3">
                  <DefualtBarChart
                    data={[
                      { name: "치킨", value: "2233" },
                      { name: "하루권장", value: "2500" },
                    ]}
                    colors={COLORS}
                  ></DefualtBarChart>
                </div>
                <p>(중앙경제)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
