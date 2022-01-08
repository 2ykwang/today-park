import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, Cell, XAxis, Line, ResponsiveContainer, LabelList, Tooltip, Legend, ComposedChart, YAxis } from 'recharts';
// import { scaleOrdinal } from 'd3-scale';
// import { schemeCategory20 } from 'd3-scale-chromatic';

// const colors = scaleOrdinal(schemeCategory20).range();
const colors = ['#EA96A3','#E19153','#B89C49','#98A246','#60AE47','#4AAE8A','#4BABA4','#4FABBC','#6DAEE2','#B6A8EB','#DF8FE7','#E890C6']

const data = [
  {name:'서울', rate_2019: 69.5, rate_2020: 71.8 },
  {name:'경기', rate_2019: 66.3, rate_2020: 67.6 },
  {name:'부산', rate_2019: 64.1, rate_2020: 68.2 },
  {name:'대구', rate_2019: 64.4, rate_2020: 67.9 },
  {name:'인천', rate_2019: 66, rate_2020: 68.6 },
  {name:'광주', rate_2019: 65, rate_2020: 64.5 },
  {name:'대전', rate_2019: 69.8, rate_2020: 69.6 },
  {name:'울산', rate_2019: 64.5, rate_2020: 68 },
];

// const data = [
//   {'2019년':}
// ];

export default class ChartDietRate extends PureComponent {
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
          <Bar dataKey="rate_2019" fill="orange" />
          <Bar dataKey="rate_2020" fill="green" />
          {/* <Line type="monotone" dataKey="rate_2019" stroke="orange" />
          <Line type="monotone" dataKey="rate_2020" stroke="green" /> */}
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}
