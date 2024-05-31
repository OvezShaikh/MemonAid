import React, { PureComponent, useState, useEffect } from "react";
import { useGetAll } from "../../../../Hooks";

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
import "./DonationInMonths.css";


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

export default function DonationInMonths() {

  const [dataObject, setDataObject] = useState([]);
  const [fundRaised, setFundRaised] = useState(50000);
  const [goalAmount, setGoalAmount] = useState(100000);
  const [xAxisTickInterval, setXAxisTickInterval] = useState(2);
  const customTickFormatter = (value) => {
    const date = new Date(value);
    const formattedDate = date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
    });
    return formattedDate;
  };


  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 767) {
        setXAxisTickInterval(3);
      
      } else {
        setXAxisTickInterval(2);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  useGetAll({
    key: `/admin-dashboard/donation-graph`,
    enabled: true,
   
    select: (data) => {
      return data.data.donation_data;
   },
    onSuccess: (data) => {
      setDataObject(data);
    },
  });

  return (
    <div className="rounded-md shadow-md p-2  max-tablet:overflow-x-scroll ">
      <p className={"mb-3 text-lg font-semibold"}>Donation In Months(lacs): </p>
      <ResponsiveContainer className="max-tablet:w-[800px] max-mobile" height={300}>
        <BarChart
        
          height={200}
          data={dataObject}
          margin={{top: 20, right: 20, bottom: 20, left: 0}}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis className="max-tablet:w-[800px] max-tablet:overflow-scroll max-mobile" fontSize={14} dataKey='date' axisLine={false} tickLine={false} tickFormatter={customTickFormatter} interval={xAxisTickInterval} textAnchor="start"  />
          <YAxis padding={{right:20}} />
          <Tooltip />
          <Legend />
          <Bar
            className="w-5"
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
  );
}