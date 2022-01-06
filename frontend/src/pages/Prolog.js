import { React, useState } from "react";
import { Header } from "../components/Header";
import ReactFullpage from "@fullpage/react-fullpage";

import { ReactComponent as GainWeight } from '../components/Group 70.svg';
import Chart2030 from '../components/Seoul2030.js'
import KeywordChart from '../components/CoronaWorkoutKeyword'
import ChartDeliverPercentByAge from '../components/DeliverPercentByAge';
import ChartGainWeightByAge from '../components/GainWeightByAge';

const anchors = [
  "코로나와배달",
  "배달과건강",
  "건강과운동",
  "'관악구'인-이유?",
];

const Prolog = () => {
  const [currentClick, setCurrentClick] = useState("list-1");

  function clickHandler(page, e) {
    let prev = document.getElementById(`${currentClick}`);
    prev.style.fontWeight = "normal";
    let cur = document.getElementById(e.target.id);
    cur.style.fontWeight = "bold";
    window.fullpage_api.moveTo(page);
    setCurrentClick(e.target.id);
  }
  return (
    <>
      <Header />
      <div id="prolog">
        <div className="greenBar"></div>
        <div className="leftIndexBar">
          <ul>
            <li
              id="list-1"
              onClick={(e) => {
                clickHandler(1, e);
              }}
            >
              코로나와 배달
            </li>
            <li
              id="list-2"
              onClick={(e) => {
                clickHandler(2, e);
              }}
            >
              배달과 건강
            </li>
            <li
              id="list-3"
              onClick={(e) => {
                clickHandler(3, e);
              }}
            >
              건강과 운동
            </li>
            <li
              id="list-4"
              onClick={(e) => {
                clickHandler(4, e);
              }}
            >
              '관악구'인 이유?
            </li>
          </ul>
        </div>
        <ReactFullpage
          anchors={anchors}
          navigation
          navigationTooltips={anchors}
          sectionsColor={["white", "white", "white", "white"]}
          onLeave={(origin, destination, direction) => {
            console.log("onLeave event", { origin, destination, direction });
          }}
          render={({ state, fullpageApi }) => {
            console.log("render prop change", state, fullpageApi); // eslint-disable-line no-console
            return (
              <>
                <div className="contents">
                  <div className="section">
                    <p> 코로나와 배달</p>
                  </div>
                  <div className="section">
                    <p>배달과 건강</p>
                    <div style={{width:'300px', height:'300px'}}>
                      <GainWeight />
                    </div>
                  </div>
                  <div className="section">
                    <p>건강과 운동</p>
                    <div style={{width:'600px', height:'300px'}}>
                      <KeywordChart />
                    </div>
                  </div>
                  <div className="section">
                    <p>'관악구'인 이유?</p>
                    <div style={{width:'300px', height:'200px'}}>
                      <ChartGainWeightByAge />
                    </div>
                    <div style={{width:'300px', height:'300px'}}>
                      <ChartDeliverPercentByAge />
                    </div>
                  </div>
                  <div className="section">
                    <p>'관악구'인 이유?</p>
                    <div style={{width:'300px', height:'300px'}}>
                      <Chart2030 />
                    </div>
                  </div>
                </div>
              </>
            );
          }}
        />
      </div>
    </>
  );
};

export default Prolog;
