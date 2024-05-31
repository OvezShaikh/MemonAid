import React, { useState } from 'react';
import { useGetAll } from '../../../Hooks';
import { LinearProgress } from "@mui/material";

const RecentCampaigns = () => {

  const [dataObject, setDataObject] = useState([]);

  useGetAll({
    key: `/user-dashboard/campaign?page=1&limit=12`,
    enabled: true,

    select: (data) => {
      return data.data.rows;
    },
    onSuccess: (data) => {
      setDataObject(data);
    },
  });



  return (
    <div>
    <div className="font-semibold text-lg">Recent Campaings:</div>
    <div className="p-7 border border-[#DBDBDE] rounded-[20px] text-[#000000]">
      

      <div className="overflow-y-scroll h-[310px] pr-[20px]">
        {dataObject?.map((item, index) => (
          // Rendering each item in the array as a <div> element
          <div>
            <div className="flex mb-[24px]">
              <div className="flex items-center mr-[25px]">
                <img
                  src={`${process.env.REACT_APP_API_URL}` + item.campaign_image}
                  className="rounded-lg w-[79px] h-[42px]"
                  alt="img01"
                />
              </div>
              <div className="w-full">
                <div className="flex justify-between">
                  <div key={index}>{item.title}</div>

                </div>
                <div>
                  by {item.user.username}/{item.end_date}
                </div>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default RecentCampaigns;