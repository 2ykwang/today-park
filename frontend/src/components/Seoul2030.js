import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, Cell, XAxis, ResponsiveContainer, LabelList } from 'recharts';

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

const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
          Z`;

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

TriangleBar.propTypes = {
  fill: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

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
          <XAxis dataKey="name" />
          <Bar dataKey="value" nameKey='percent' fill="#8884d8" >
            <LabelList 
              dataKey="percent" 
              position="top" 
              style={{ fill: "#07553B", fontWeight:'bold' }} 
            />
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