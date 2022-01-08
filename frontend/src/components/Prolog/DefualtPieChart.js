import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

export function DefaultPieChart({ data, colors }) {
  const RADIAN = Math.PI / 176;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.4;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const style = {
    top: "-3vh",
    left: "0",
    lineHeight: "1rem",
    fontSize: "0.9rem",
  };

  return (
    <ResponsiveContainer width="90%" height="90%">
      <PieChart width="90%" height="90%">
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius="100%"
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend
          iconSize={10}
          width="60%"
          layout="vertical"
          verticalAlign="middle"
          wrapperStyle={style}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
