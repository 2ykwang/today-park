import React from "react";
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Bar,
  Tooltip,
  BarChart,
} from "recharts";

export function DefaultBarChart({ data, colors }) {
  return (
    <ResponsiveContainer width="100%" height="90%">
      <BarChart
        data={[
          { name: "치킨", value: "2233" },
          { name: "1일권장칼로리", value: "2500" },
        ]}
        margin={{
          top: 20,
          // right: 30,
          // left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" stroke="#000" tick={{ fontSize: "1vw" }} />
        <YAxis stroke="#000" tick={{ fontSize: "1.2vw" }} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
        <Bar dataKey="value" fill="#82ca9c">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

const CustomTooltip = ({ active, payload }) => {
  if (active) {
    return (
      <div className="tooltip">
        <p
          className="label"
          style={{ fontWeight: "bold", color: "000" }}
        >{`${payload[0].value}kcal`}</p>
      </div>
    );
  }

  return null;
};
