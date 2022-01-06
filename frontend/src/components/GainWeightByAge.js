import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: '20대',
    percent: 48,
  },
  {
    name: '30대',
    percent: 53,
  },
  {
    name: '40대',
    percent: 50,
  },
  {
    name: '50대',
    percent: 36,
  },
];

export default class ChartGainWeightByAge extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/tiny-bar-chart-35meb';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={100} data={data}>
          <Tooltip content={<CustomTooltip />}/>
          <XAxis dataKey='name'/>
          <Bar dataKey="percent" fill="#47C690" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

const CustomTooltip = ({ active, payload}) => {
	if (active) {
		return (
			<div className='tooltip'>
        <p className='label' style={{fontWeight:'bold', color:'#07553B'}} >{`${payload[0].value}%`}</p>
        
      </div>
		);
	}

	return null;
};