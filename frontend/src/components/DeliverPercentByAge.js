import React, { PureComponent, useEffect, useState } from 'react';
import { PieChart, Pie, Label, Sector, Cell, ResponsiveContainer, Tooltip, Legend, LabelList } from 'recharts';

const data = [
  { name: '20대', value: 32 },
  { name: '30대', value: 28 },
  { name: '40대', value: 22  },
  { name: '50대', value: 10 },
  { name: '기타', value: 10 }
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#d62728"];

const Tip = ({ setShowTooltip, ...rest }) => {
  const [payload, setPayload] = useState(rest.payload);

  // When the payload has data (area hovered in the chart), add it to the state
  // so we can use it to show and hide the tooltip at our expense
  useEffect(() => {
    rest.payload.length && setPayload(rest.payload);
  }, [rest.payload]);

  return payload.length ? (
    <div
      // Tooltip hides when leaving the tooltip itself
      onMouseLeave={() => setShowTooltip(false)}
      // Prevent Rechart events while the mouse is over the tooltip
      onMouseMove={e => e.stopPropagation()}
      style={{
        fontWeight: 'bold',
        background: "white",
        padding: "0.3em",
        borderRadius: "4px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
      }}
    >
      {`${payload[0].value}%`}
    </div>
  ) : null;
};

function ChartDeliverPercentByAge() {
  const [showTooltip, setShowTooltip] = useState(false);

  return ( 
    <PieChart width={500} height={300} onMouseLeave={() => setShowTooltip(false)}>
      {/* <text x={125} y={100} textAnchor="middle" dominantBaseline="middle" >
        배달앱
      </text>
      <text x={125} y={120} textAnchor="middle" dominantBaseline="middle" >
        이용률
      </text> */}
      <Pie
        onMouseEnter={() => setShowTooltip(true)}
        data={data}
        cx={120}
        cy={100}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
        label = {(data)=>data.name}
      >
        <Label value="배달앱 이용률" offset={10} position="center" />
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      {showTooltip && (
        <Tooltip
          // Anymation is a bit weird when the tooltip shows up after hidding
          isAnimationActive={false}
          // Send props down to get the payload
          content={<Tip setShowTooltip={setShowTooltip} />}
          // We need this to manage visibility ourselves
          wrapperStyle={{ visibility: "visible", pointerEvents: "auto" }}
        />
      )}
      {/* <Tooltip content={<CustomTooltip />} wrapperStyle={{ visibility: "visible", pointerEvents: "auto" }} /> */}
    </PieChart>
  );
}

export default ChartDeliverPercentByAge;