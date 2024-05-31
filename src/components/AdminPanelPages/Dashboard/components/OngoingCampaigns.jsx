import React, { useState } from "react";
import { Line } from "rc-progress";
import { LinearProgress } from "@mui/material";
import { useGetAll } from "../../../../Hooks";

const OngoingCampaigns = () => {
 

  const [dataObject, setDataObject] = useState([]);

  useGetAll({
    key: `/admin-dashboard/campaign?page=1&limit=15`,
    enabled: true,

    select: (data) => {

      return data.data.rows;
    },
    onSuccess: (data) => {
      setDataObject(data);
    },
  });

  return (
    <div className="p-7  rounded-lg shadow-md text-[#000000]">
      <div className="font-semibold text-lg">Ongoing Campaings:</div>

      <div className="overflow-y-scroll h-[310px] pr-[20px]">
        {dataObject?.map((item, index) => (
         
          <div>
            <div className="flex mt-[24px]">
              <div className="flex items-center mr-[25px]">
                <img
                  src={`${process.env.REACT_APP_API_URL}`+item.campaign_image}
                  className="rounded-lg w-[79px] h-[42px]"
                  alt="img01"
                />
              </div>
              <div className="w-full">
                <div className="flex justify-between">
                  <div key={index}>{item.title}</div>
                  <div>
                    {Math.round((item.fund_raised / item.goal_amount) * 100)}%
                    Completed
                  </div>
                </div>
                <div>
                  by {item?.user?.username}/{item?.end_date}
                </div>
                <div className="w-full mt-[11px]">
                  <div className="h-[13px]">
                    <LinearProgress
                      variant="determinate"
                      sx={{
                        height: "10px",
                        borderRadius: "16px",
                        background: `linear-gradient(to bottom,#ffe9d9,#FFd8e5)`,
                        "& .MuiLinearProgress-bar": {
                          background:
                            "linear-gradient(to right,#FF9F0A, #FF375F) !important  ",
                          borderRadius: "100px",
                        },
                      }}
                      value={(item.fund_raised / item.goal_amount) * 100}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OngoingCampaigns;