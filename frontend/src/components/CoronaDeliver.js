import React, { PureComponent } from 'react';
import { Bar, XAxis, ResponsiveContainer, Legend, ComposedChart } from 'recharts';

// const colors = ['#EA96A3','#E19153','#B89C49','#98A246','#60AE47','#4AAE8A','#4BABA4','#4FABBC','#6DAEE2','#B6A8EB','#DF8FE7','#E890C6']

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
            {/* {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
              ))} */}

            {/* <Cell key={`cell-${0}`} fill={'#0088FE'} />
            <Cell key={`cell-${1}`} fill={'#00C49F'} />
            <Cell key={`cell-${2}`} fill={'#FFBB28'} />
            <Cell key={`cell-${3}`} fill={'#FF8042'} />
          <Cell key={`cell-${4}`} fill={"#d62728"} /> */}
          </Bar>
          <Bar type="monotone" dataKey="deliver" fill="orange" />
        </ComposedChart>
      </ResponsiveContainer> 
    );
  }
}
