import React, { useState } from "react";
import images from "../../../../constants/images";
import { useGetAll } from "../../../../Hooks";

const DashboardActivities = () => {
  const [dataObject, setDataObject] = useState([]);

  useGetAll({
    key: `/admin-dashboard/dashboard-api`,
    enabled: true,

    select: (data) => {
      return data.data.data;
    },
    onSuccess: (data) => {
      setDataObject(data);
    },
  });

  return (
    <div className="p-7">
      <div className="grid grid-cols-2 grid-rows-2 gap-y-2 gap-x-1 items-center max-desktop:grid-cols-2">
        <div className="px-[16px] py-[14px] shadow-md w-[50%] h-[150.56px] rounded-2xl">
          <p className="font-medium">Total Donations</p>
          <h3 className="font-bold text-3xl mt-3">
            {dataObject.no_of_donation}
          </h3>
        </div>
        <div className="px-[16px] py-[14px] shadow-md w-[50%] h-[150.56px] rounded-2xl">
          <p className="font-medium">Total Funds(lacs)</p>
          <h3 className="font-bold text-3xl mt-3">
            {(dataObject.fund_raised / 100000).toFixed(2)}
          </h3>
        </div>
        <div className="px-[16px] py-[14px] shadow-md w-[50%] h-[150.56px] rounded-2xl">
          <p className="font-medium">Total Campaigns</p>
          <h3 className="font-bold text-3xl mt-3">
            {dataObject.total_campaign}
          </h3>
        </div>

        <div className="px-[16px] py-[14px] shadow-md w-[50%] h-[150.56px] rounded-2xl">
          <p className="font-medium">Total Users</p>
          <h3 className="font-bold text-3xl mt-3">{dataObject.user}</h3>
        </div>
      </div>
    </div>
  );
};

export default DashboardActivities;