import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, Cell, XAxis, Label, ResponsiveContainer, LabelList, Tooltip } from 'recharts';

const data = [
  {
    name: '관악구',
    percent: '40%',
    value: 0.3984318305
    
  },
  {
    name: '광진구',
    percent: '34%',
    value: 0.3421265268
  },
  {
    name: '영등포구',
    percent: '34%',
    value: 0.3397074113
  },
  {
    name: '마포구',
    percent: '33%',
    value: 0.3387489912
  },
  {
    name: '동작구',
    percent: '32%',
    value: 0.3265552997
  }
];

export default class Chart2030 extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/bar-chart-with-customized-shape-dusth';
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={5000}
          height={3000}
          data={data}
          margin={{
            top: 40,
            right: 50,
            left: 30,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" >
            <Label value="관악구 구별 20,30대 비율" offset={240} position='top'></Label>
          </XAxis>
          <Tooltip 
            content={<CustomTooltip />}
          />
          <Bar dataKey="value" nameKey='percent' fill="#8884d8" >
            {/* <LabelList 
              dataKey="percent" 
              position="top" 
              style={{ fill: "#07553B", fontWeight:'bold' }} 
            /> */}
            <Cell key={`cell-${0}`} fill={'#B89C49'} />
            <Cell key={`cell-${1}`} fill={'#4AAE8A'} />
            <Cell key={`cell-${2}`} fill={'#4FABBC'} />
            <Cell key={`cell-${3}`} fill={'#B6A8EB'} />
            <Cell key={`cell-${4}`} fill={"#E890C6"} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

const CustomTooltip = ({ active, payload}) => {
	if (active) {
    console.log(payload)
		return (
			<div className='tooltip'>
        <p className='label' style={{fontWeight:'bold', color:'rgba(50,50,50,0.8)'}} >
          {`${payload[0].payload.name}: ${payload[0].payload.percent}`}
        </p>
      </div>
		);
	}

	return null;
};