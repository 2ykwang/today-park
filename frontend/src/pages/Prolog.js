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
                            생활의 변화 중&nbsp;
                            <span style={{fontWeight:'bold'}}>'배달음식 주문 빈도 증가'(22.0%)'</span> 가
                          </p>
                          <p className="text2" style={{lineHeight:'1.5em', marginTop:'0.5em'}}>1위로 뽑힌 만큼 사람들의 식습관에 가장 큰 변화가 일어났습니다.</p>
                          <p className="quotation" style={{textAlign:'left'}}>(한국건강증진개발원)</p>
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
                      <div className='eachContent2'>
                        <div className="gainWeight-content">
                          <div className="gainWeight" style={{width:'200px', height:'200px'}}>
                            <GainWeight />
                          </div>
                          <div className='gainWeight-text'>
                            <p className='text3'>그렇다면 코로나 확산, 배달 주문 증가에 따른 사람들의 건강은 어떻게 변했을까요?</p>
                            <p className='text4'style={{textAlign:'right'}}>
                              코로나 시기 동안 성인 남녀 중 3kg 이상 체중이 늘었다고 답한 비율이 무려&nbsp;
                              <span style={{fontWeight:'bold'}}>46%</span>
                            </p>
                            <p className="quotation" style={{textAlign:'right'}}>(대한비만학회)</p>
                            <p className='text4' style={{textAlign:'right'}}>
                              체중이 증가한 이유로는 응답률 71.7%에 달하는 <span style={{fontWeight:'bold'}}>'배달 음식 섭취'</span>가 1등으로 뽑혔습니다.
                            </p>
                            <p className="quotation" style={{textAlign:'right'}}>(잡코리아와 알바몬)</p>
                          </div>

                        </div>
                        <div className='dietRate-content'>
                          <div className='dietRate-text'>
                            <p className='text4'style={{textAlign:'left'}}>
                              코로나 시국에 찐 살을 빼기 위해 현재 <span style={{fontWeight:'bold'}}>다이어트</span>를 하고 있거나 <br /> 
                              계획하고 있다는 응답 비율은 <span style={{fontWeight:'bold'}}>93.4%</span>나 되며
                            </p>
                            <p className="quotation" style={{textAlign:'left'}}>(잡코리아와 알바몬)</p>
                            <p className='text4' style={{textAlign:'left'}}>
                              2019년, 2020년 <span style={{fontWeight:'bold'}}>체중조절 시도율</span> 결과에서는<br />
                              2019년도 비해 대부분의 시도에서 2020년도에 <span style={{fontWeight:'bold'}}>증가</span>하였습니다.
                            </p>
                            <p className="quotation" style={{textAlign:'left'}}>(건강보험공단)</p>
                          </div>
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
                          <p className='text1'>사람들은 “운동/건강”에 관심을 얼마나 가지고 있을까요?</p>
                      <div className='eachContent3'>
                        <div className='keyword-text'>
                          <p className='text2'>
                            2020년 건강/운동 키워드 검색 건수와<br />
                            코로나 확진자 수를 비교해보면 
                          </p>
                          <p className='text2'>
                            코로나 확진자 수가 증가세 일때 마다 <br />
                            건강/운동 키워드의 검색 건수가 증가하였습니다.
                          </p>
                          <p className='text2' style={{fontWeight:'bold'}}>
                            코로나가 증가 추세에 따라  ‘건강’ 및 ‘운동’ 에 대한 <br />
                            관심이 높아짐을 알 수 있습니다.
                          </p>
                        </div>
                        <div className="chartKeyword" style={{width:'550px', height:'450px'}}>
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
                      <div className='eachContent4'>
                        <p className='text1'>
                          <span style={{fontWeight:'bold', color:'#47c690'}}>오늘의 공원</span>
                          은 왜 20대, 30대 선택했을까요?
                        </p>
                        <p className='text4'>
                          “오늘의 공원”은 코로나 시기 동안&nbsp;
                          <span style={{fontWeight:'bold'}}>“배달 서비스”</span>를 이용하여&nbsp;
                          <span style={{fontWeight:'bold'}}>“확찐자”</span>가 된 사람들을 위해서 서비스를 제공합니다.</p>
                        <p className='text4'>코로나19 이전 대비&nbsp;
                          <span style={{fontWeight:'bold'}}>체중 증가</span>를 가장 많이 겪은 연령대는 30대이며, 근소한 차이로 40대와 20대가 위치합니다.
                        </p>
                        <p className='quotation'>(대한비만학회)</p>
                        <p className='text4' style={{fontWeight:'bold'}}>
                          배달 서비스를 가장 많이 이용하고 코로나 시기 동안 체중 증가를 가장 많이 겪은 20대, 30대를 기준으로 서비스를 제공하기로 했습니다.
                        </p>
                        <div className='gwanak-charts'>
                          <div className="chartGainWeightByAge" style={{width:'300px', height:'200px', marginBottom:'30px'}}>
                            <ChartGainWeightByAge />
                          </div>
                          <div className="chartDeliverPercentByAge" style={{width:'300px', height:'300px', marginBottom:'30px'}}>
                            <ChartDeliverPercentByAge />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="section">
                    <div className='content'>
                      <div className='title-content'>
                        <p className='title'>'관악구'인 이유?</p>
                      </div>
                      <p className="text1">우리의 공원은 왜 관악구를 첫번째 서비스 지역구로 선택했을까요?</p>
                      <div className='eachContent5'>
                        <div className="chart2030" style={{width:'400px', height:'300px'}}>
                          <Chart2030 />
                        </div>
                        <div className='chart2030-text'>
                          <p className='text2'>
                            서울시 연령대별 인구 조사를 바탕으로<br />
                            구별 20대, 30대 비율을 분석한 결과<br />
                            <span style={{fontWeight:'bold'}}>관악구, 광진구, 영등포구</span> 순으로 높은 것을 확인했습니다.
                          </p>
                          <p className='text2'>
                            특히 <span style={{fontWeight:'bold'}}>관악구</span>는 40%로 광진구(34%), 영등포구(33%)에 비해서 <br />
                            <span style={{fontWeight:'bold'}}>압도적</span>인 수치를 보였습니다.
                          </p>
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
