import React from "react";
import ReactTable from "../../Table/index";
import { useState } from "react";
import IndeterminateCheckbox from "../../Table/IndeterminateCheckbox";
import images from "../../../constants/images";
import { GoDotFill } from "react-icons/go";
import { format } from "date-fns";


const Withdrawals = () => {
  const [selectedRowID, setSelectedRowID] = useState(null);
  const [get, setGet] = useState("");

  const getStatusCellStyle = (status) => {
    if (status === "Pending") {
      return {
        color: "#fa9820",
        background: "#f5fabe  ",
      };
    } else if (status === "Paid") {
      return {
        background: "#ECFDF3  ",
        color: "#037847",
      };
    } else if (status === "Rejected") {
      return {
        background: "#f5d0d0",
        color: "#f03c24",
      };
    } else {
      return {
        background: "#EBF0ED",
        color: "#717171",
      };
    }
  };

  function DateConvert (Mydate){
    const date = new Date(Mydate);
    return format(date ,'dd-MMM-yyyy');
  }

  const StatusCell = ({ value }) => (
    <div
      className=" flex justify-center gap-1  items-center w-[100px] h-[25px] rounded-3xl"
      style={getStatusCellStyle(value)}
    >
      <span className="" style={getStatusCellStyle(value)}>
        <GoDotFill />
      </span>
      <span className="" style={getStatusCellStyle(value)}>
        {value}
      </span>
    </div>
  );

  const columns = React.useMemo(() => [
    {
      Header: "Id", // Row number header
      accessor: "id", // Accessor for row number
      Cell: ({ row }) => <div>{row.index + 1}</div>,
      minWidth: 50,
      width: 50,
      search: false,
    },
    {
      Header: "Campaign",
      accessor: "campaign.title",
      minWidth: 100,
      width: 100,
      Cell: ({ row }) => {
        return (
          <div className="flex  ">
            <div className="w-[80px] truncate">{row?.original?.campaign?.title}</div>
            <a href={`/campaign-details/${row?.original?.campaign.id}`} target="_blank">
              <img
                className="ml-2"
                src={images.CausesDetails}
                alt="CausesDetails"
              />
            </a>
          </div>
        );
      },
    },
    {
      Header: "Amount",
      accessor: "campaign.goal_amount",
      minWidth: 100,
      width: 100,
    },

    {
      Header: "Method",
      accessor: "campaign.user.email",
      minWidth: 100,
      width: 100,
    },
    {
      Header: "Status",
      accessor: "withdrawal_status",
      minWidth: 100,
      width: 100,
      Cell: StatusCell,
    },
    {
      Header: "Payment Details",
      accessor: "transfer_details",
      minWidth: 100,
      width: 250,
    },
    {
      Header: "Date",
      accessor: "updated_on",
      minWidth: 100,
      width: 100,
      Cell:({row})=>{
        return (
          <p>{DateConvert(row?.original?.updated_on)}</p>
        )
        
       }
    },
   
    {
      Header: "Actions",
      accessor: "actions",
      sortable: false,
      nofilter: true,
      minWidth: 100,
      width: 100,
      Cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center pl-6 gap-3 max-desktop:pl-0 max-tablet:pl-0 max-tablet:gap-0 !max-desktop:gap-0">
              {"-" + row?.values?.withdrawal_status + "-" }
          </div>
        );
      },
    },
  ]);
  return (
    <div>
      <ReactTable
        rows={[]}
        columns={columns}
        showFilter
        manualPagination
        title={"withdrawals"}
        checkboxComponent={IndeterminateCheckbox}
        url={`/user-dashboard/make-withdrawal`}
        extraQuery={{ inactive: true }}
        selectedRowID={selectedRowID}
      />
    </div>
  );
};

export default Withdrawals;
