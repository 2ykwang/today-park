import React from "react";
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  Bar,
  Tooltip,
  BarChart,
} from "recharts";

export function DefaultBarChart({ data, colors }) {
  return (
    <ResponsiveContainer width="90%" height="90%">
      <BarChart
        data={[
          { name: "치킨", value: "2233" },
          { name: "하루권장", value: "2500" },
        ]}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" fill="#82ca9d" />
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
          style={{ fontWeight: "bold", color: "#000" }}
        >{`${payload[0].value}kcal`}</p>
      </div>
    );
  }

  return null;
};
