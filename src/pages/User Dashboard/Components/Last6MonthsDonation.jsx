import React, { PureComponent, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import { useGetAll } from "../../../Hooks";
import "./Last6MonthsDonation.css"


const renderQuarterTick = (tickProps) => {
  const { x, y, payload } = tickProps;
  const { value, offset } = payload;
  const date = new Date(value);
  const month = date.getMonth();
  const quarterNo = Math.floor(month / 3) + 1;
  const isMidMonth = month % 3 === 1;

  const isLast = month === 11;

  if (month % 3 === 0 || isLast) {
    const pathX = Math.floor(isLast ? x + offset : x - offset) + 0.5;

    return <path d={`M${pathX},${y - 4}v${-35}`}  />;
  }
  return null;
};

const chartStyle = {
  "recharts-cartesian-axis-tick-line": "none"
};
const LinearGradientBar = (props) => {
  const { fill, x, y, customWidth, height, fundRaised, goalAmount } = props;
  const barWidth = customWidth || 20;
  const cornerRadius = 10;
  const completionPercentage = (fundRaised / goalAmount) * 100;
  const colorStops = `0% ${Math.min(completionPercentage, 100)}%, 100%`;

  return (
    <g>
      <defs>
        <linearGradient id={`gradient-${x}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF9F0A" />
          <stop offset="62.9%" stopColor="#FF375F" />
        </linearGradient>
      </defs>
      <rect
        x={x}
        y={y}
        width={barWidth}
        height={height}
        rx={cornerRadius}
        ry={cornerRadius}
        fill={`url(#gradient-${x})`}
      />
    </g>
  );
};

export default function DonationInLastMonth() {

  const [dataObject, setDataObject] = useState([]);
  const [fundRaised, setFundRaised] = useState(50);
  const [goalAmount, setGoalAmount] = useState(100);


  useGetAll({
    key: `/user-dashboard/donation-data`,
    enabled: true,
   
    select: (data) => {
      return data.data.donation_data;
    },
    onSuccess: (data) => {
      setDataObject(data);
    },
  });

  const customTickFormatter = (value) => {
    const date = new Date(value);
    const formattedDate = date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
    });
    return formattedDate;
  };

  // const formatYAxisTick = (value) => `${value * 10}k`;



  return (
    <div className="font-semibold text-lg">My Donations in last 6 months
    <div className=" shadow-md p-3 rounded-[20px] border-l max-tablet:overflow-x-scroll">
      {/* <p className={"mb-3 text-lg font-semibold"}>My Donations in last 6 months </p> */}
      <ResponsiveContainer width="100%" height={340}>
        <BarChart
          width={500}
          height={300}
          data={dataObject}
          margin={{top: 20, right: 20, bottom: 20, left: -14}}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey='date' tickFormatter={customTickFormatter}
           interval={6} height={2}
           textAnchor="start" style={chartStyle} tickLine={false} axisLine={false}/>
          {/* <XAxis
            dataKey='total_amount'
            axisLine={false}
            tickLine={false}
            interval={0}
            tick={renderQuarterTick}
            height={1}
            scale="band"
            xAxisId="quarter"
          /> */}
          {/* domain={[0, 100]} */}
          <YAxis  style={chartStyle} tickLine={false} axisLine={false}  />
          <Tooltip />
          <Legend />
          <Bar
            className="w-5 pl-1"
            dataKey='donation_count'
            shape={(props) => (
              <LinearGradientBar
                fundRaised={fundRaised}
                goalAmount={goalAmount}
                customWidth={15}
                {...props}
              />
            )}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
    </div>
  );
}