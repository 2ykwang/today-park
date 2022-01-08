import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, Cell, XAxis, Line, ResponsiveContainer, LabelList, Tooltip, Legend, ComposedChart } from 'recharts';
// import { scaleOrdinal } from 'd3-scale';
// import { schemeCategory20 } from 'd3-scale-chromatic';

// const colors = scaleOrdinal(schemeCategory20).range();
const colors = ['#EA96A3','#E19153','#B89C49','#98A246','#60AE47','#4AAE8A','#4BABA4','#4FABBC','#6DAEE2','#B6A8EB','#DF8FE7','#E890C6']

const data = [
  {
    name: '1월', health: 183, exercise: 146, corona: 58
  },
  {
    name: '2월', health: 200, exercise: 248, corona: 126
  },
  {
    name: '3월', health: 316, exercise: 219, corona: 177
  },
  {
    name: '4월', health: 269, exercise: 225, corona: 156
  },
  {
    name: '5월', health: 338, exercise: 308, corona: 162
  },
  {
    name: '6월', health: 237, exercise: 234, corona: 183
  },
  {
    name: '7월', health: 211, exercise: 185, corona: 169
  },
  {
    name: '8월', health: 277, exercise: 216, corona: 231
  },
  {
    name: '9월', health: 218, exercise: 176, corona: 217
  },
  {
    name: '10월', health: 225, exercise: 186, corona: 197
  },
  {
    name: '11월', health: 318, exercise: 194, corona: 238
  },
  {
    name: '12월', health: 224, exercise: 149, corona: 276
  },
];

export default class ChartKeyword extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/bar-chart-with-customized-shape-dusth';
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
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
          <Tooltip />
          <Legend />
          <Bar dataKey="corona" nameKey='percent' fill="#8884d8" >
            {/* <LabelList 
              dataKey="corona" 
              position="top" 
              style={{ fill: "black", fontWeight:'bold' }} 
            /> */}
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
            {/* <Cell key={`cell-${0}`} fill={'#0088FE'} />
            <Cell key={`cell-${1}`} fill={'#00C49F'} />
            <Cell key={`cell-${2}`} fill={'#FFBB28'} />
            <Cell key={`cell-${3}`} fill={'#FF8042'} />
            <Cell key={`cell-${4}`} fill={"#d62728"} /> */}
          </Bar>
          {/* <Line type="monotone" dataKey="exercise" stroke="orange" /> */}
          <Line type="monotone" dataKey="health" stroke="green" />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}
