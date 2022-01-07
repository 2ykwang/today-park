import { React, useState } from "react";
import { Header } from "../components/Header";
import ReactFullpage from "@fullpage/react-fullpage";

import { ReactComponent as GainWeight } from '../components/Group 70.svg';
import Chart2030 from '../components/Seoul2030.js'
import ChartKeyword from '../components/CoronaWorkoutKeyword'
import ChartDeliverPercentByAge from '../components/DeliverPercentByAge';
import ChartGainWeightByAge from '../components/GainWeightByAge';
import ChartDeliverIncrease from "../components/CoronaDeliver";
import ChartDietRate from "../components/DietAttempt";

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
                    <div className='content'>
                      <div className='title-content'>
                        <p className='title'>
                          <span className='title-highlight'>코로나</span>와&nbsp;
                          <span className='title-highlight'>배달</span>의 상관 관계
                        </p>
                      </div>
                      <div className='eachContent1'>
                        <div className='text-content1'>
                          <p className="text1">코로나가 발생한 이후, 세상에는 많은 변화가 생겼습니다.</p>
                          <p className="text2">오프라인에서 사람을 만나는 것이 어려워졌으며<br />
                            마스크 없이는 밖에 나갈 수 없고 <br />
                            음식점에서 식사조차 마음 편히 할 수 없습니다.<br />
                          </p>
                          <p className="text2">
                            그렇기에 배달은 우리와 떨어질수 없는 각별한 사이가 됐죠.<br/>
                            생활의 변화 중 '배달음식 주문 빈도 증가'(22.0%)' 가
                          </p>
                          <p className="text2" style={{lineHeight:'1.3em', marginTop:'0'}}>1위로 뽑힌 만큼 사람들의 식습관에 가장 큰 변화가 일어났습니다.</p>
                          <p className="quotation">(한국건강증진개발원)</p>
                        </div>
                        <div className="chartDeliver" >
                          <ChartDeliverIncrease />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="section">
                    <div className='content'>
                      <div className='title-content'>
                        <p className='title'>
                          <span className='title-highlight'>배달</span>과&nbsp;
                          <span className='title-highlight'>건강</span>의 상관관계
                        </p>
                      </div>
                      <div className='eachContent'>
                        <div className="gainWeight-content">
                          <div className="gainWeight" style={{width:'300px', height:'300px'}}>
                            <GainWeight />
                          </div>
                        </div>
                        <div className='dietRate-contnet'>
                          <div className='dietRate' style={{width:'400px', height:'250px'}}>
                            <ChartDietRate />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="section">
                    <div className='content'>
                      <div className='title-content'>
                        <p className='title'>
                          <span className='title-highlight'>코로나</span>와&nbsp;
                          <span className='title-highlight'>건강/운동</span> 상관관계
                        </p>
                      </div>
                      <div className='eachContent'>
                        <div className="chartKeyword" style={{width:'600px', height:'300px'}}>
                          <ChartKeyword />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="section">
                    <div className='content'>
                      <div className='title-content'>
                        <p className='title'>
                          왜&nbsp;
                          <span className='title-highlight'>관악구</span>의 
                          <span className='title-highlight'>2030</span>을 선택했나
                        </p>
                      </div>
                      <div className='eachContent'>
                        <div className="chartGainWeightByAge" style={{width:'300px', height:'200px', marginBottom:'30px'}}>
                          <ChartGainWeightByAge />
                        </div>
                        <div className="chartDeliverPercentByAge" style={{width:'300px', height:'300px', marginBottom:'30px'}}>
                          <ChartDeliverPercentByAge />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="section">
                    <div className='content'>
                      <div className='title-content'>
                        <p className='title'>'관악구'인 이유?</p>
                      </div>
                      <div className='eachContent'>
                        <div className="chart2030" style={{width:'400px', height:'300px'}}>
                          <Chart2030 />
                        </div>
                      </div>
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
