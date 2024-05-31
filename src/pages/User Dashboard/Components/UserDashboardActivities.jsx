import React, { useState } from "react";
import { useGetAll } from "../../../Hooks";

const UserDashboardActivities = () => {
  const [dataObject, setDataObject] = useState([]);

  useGetAll({
    key: `/user-dashboard/dashboard-api`,
    enabled: true,

    select: (data) => {
      return data.data.data;
    },
    onSuccess: (data) => {
      setDataObject(data);
    },
  });

  return (
    <div className="grid grid-cols-2 gap-x-[20px] gap-y-[32px] max-desktop:grid-cols-1">
      <div className="max-w-[240px] w-full border border-[#DBDBDE] rounded-[20px] py-[22px] px-[11px]">
        <h4 className="font-[satoshi] font-bold text-[16px]">Campaigns</h4>
        <h6 className="font-[satoshi] font-medium text-[40px]">
          {dataObject.total_campaign}
        </h6>
      </div>
      <div className="max-w-[240px] w-full border border-[#DBDBDE] rounded-[20px] py-[22px] px-[11px]">
        <h4 className="font-[satoshi] font-bold text-[16px]">Donations</h4>
        <h6 className="font-[satoshi] font-medium text-[40px]">
          {dataObject.no_of_donation}
        </h6>
      </div>
      <div className="max-w-[240px] w-full border border-[#DBDBDE] rounded-[20px] py-[22px] px-[11px]">
        <h4 className="font-[satoshi] font-bold text-[16px]">Funds Raised</h4>
        <h6 className="font-[satoshi] font-medium text-[40px]">{dataObject.amount_received}</h6>
      </div>
      <div className="max-w-[240px] w-full border border-[#DBDBDE] rounded-[20px] py-[22px] px-[11px]">
        <h4 className="font-[satoshi] font-bold text-[16px]">Withdrawn</h4>
        <h6 className="font-[satoshi] font-medium text-[40px]">{dataObject.withdrawals}</h6>
      </div>
    </div>
  );
};

export default UserDashboardActivities;