import React from 'react';
import styled from 'styled-components';

import { Header } from './Header';
import { ReactComponent as GainWeight } from './Group 70.svg';
import KeywordChart from './CoronaWorkoutKeyword'
import Chart2030 from './Seoul2030';
import ChartDeliverPercentByAge from './DeliverPercentByAge';
import ChartGainWeightByAge from './GainWeightByAge';

export function Stats() {
  return (
    <div>
      <Header />
      <h1>통계 페이지</h1>
      <CoronaDelivr></CoronaDelivr>
      <CoronaHealth></CoronaHealth>
      <CoronaWorkout></CoronaWorkout>
      <DeliverAge></DeliverAge>
      <SeoulAge></SeoulAge>
    </div>
  )
}

function CoronaDelivr() {
  return (
    <div>
      <h2>코로나와 배달</h2>
      <div id="charts"></div>
      
    </div>
  )
}

function CoronaHealth() {
  return (
    <div>
      <h2>코로나와 건강</h2>
      <GainWeight />

    </div>
  )
}

function CoronaWorkout() {
  return (
    <div>
      <h2>코로나와 건강/운동 키워드</h2>
      <WorkoutChart>
        <KeywordChart />
      </WorkoutChart>
    </div>
  )
}

const WorkoutChart = styled.div`
  width: 600px;
  height: 300px;
  margin-bottom: 100px;
`

function DeliverAge() {
  return (
    <div>
      <h2>연령대별 체중 증가</h2>
      <GainWeightChart>
        <ChartGainWeightByAge />
      </GainWeightChart>
      <h2>연령대별 배달 주문 비율</h2>
      <DeliverPercentChart>
        <ChartDeliverPercentByAge />
      </ DeliverPercentChart>
    </div>
  )
}

const GainWeightChart = styled.div`
  width: 300px;
  height: 300px;
  margin-bottom: 100px;
`

const DeliverPercentChart = styled.div`
  width: 300px;
  height: 300px;
  margin-bottom: 100px;
`

function SeoulAge() {
  return (
    <div>
      <h2>서울시 구별 20,30대 비율</h2>
      <Seoul2030Chart>
        <Chart2030 />
      </Seoul2030Chart>
    </div>
  )
}

const Seoul2030Chart = styled.div`
  width: 400px;
  height: 300px;
`