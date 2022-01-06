import React from "react";
import { Header } from "../components/Header";
import SeoulMap from "../json/seoul.json";
import ReactFullpage from "@fullpage/react-fullpage";

const geoUrl = SeoulMap;
const anchors = ["코로나와 배달", "배달과 건강", "건강과 운동"];

const Prolog = ({ setTooltipContent }) => {
  function moveToPage(page) {
    window.fullpage_api.moveTo(page);
  }
  return (
    <>
      <Header />
      <div id="prolog">
        <div className="greenBar"></div>
        <div className="leftIndexBar">
          <ul>
            <li>
              <a
                href="#"
                onClick={() => {
                  moveToPage(1);
                }}
              >
                코로나와 배달
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => {
                  moveToPage(2);
                }}
              >
                배달과 건강
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => {
                  moveToPage(3);
                }}
              >
                건강과 운동
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => {
                  moveToPage(4);
                }}
              >
                '관악구'인 이유?
              </a>
            </li>
          </ul>
        </div>
        <ReactFullpage
          anchors={anchors}
          navigation
          navigationTooltips={anchors}
          sectionsColor={["red", "white", "white", "white"]}
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
                    <p>베달과 건강</p>
                  </div>
                  <div className="section">
                    <p>건강과 운동</p>
                  </div>
                  <div className="section">
                    <p>'관악구'인 이유?</p>
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
