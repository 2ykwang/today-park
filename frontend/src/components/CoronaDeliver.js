import React, { PureComponent } from 'react';
import { Bar, XAxis, ResponsiveContainer, Legend, ComposedChart } from 'recharts';

const data = [
  {name:'2020년', corona:514, deliver:2198020*0.0004},
  {name:'2021년', corona:809, deliver:2358863*0.0004},
];

export default class ChartDeliverIncrease extends PureComponent {
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
          <XAxis dataKey="name" />
          <Legend />
          <Bar dataKey="corona" fill="#47C690" >
          </Bar>
          <Bar type="monotone" dataKey="deliver" fill="orange" />
        </ComposedChart>
      </ResponsiveContainer> 
    );
  }
}
