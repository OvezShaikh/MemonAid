import React, { useEffect, useRef } from "react";
import ReactTable from "../../Table/index";
import { useState } from "react";
import IndeterminateCheckbox from "../../Table/IndeterminateCheckbox";
import SecondaryButton from "../../inputs/secondaryButton";
import { GoDotFill } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import images from "../../../constants/images";
import { format } from "date-fns";
import { useDownloadExcel } from "react-export-table-to-excel";
import PrimaryButton from "../../inputs/PrimaryButton";
import { TiExportOutline } from "react-icons/ti";

const Campaign = () => {
  let userData = localStorage.getItem("user_info");
  let Data = JSON.parse(userData);
  let id = Data?.id;
  let tableRef = useRef(null);
  const [selectedRowID, setSelectedRowID] = useState(null);
  const getStatusCellStyle = (status) => {
    if (status === "Pending") {
      return {
        color: "#fa9820",
        background: "#f5fabe  ",
      };
    } else if (status === "Active") {
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

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "CampaignTable",
    sheet: "Campaigns",
  });

  function DateConvert(Mydate) {
    const date = new Date(Mydate);
    return format(date, "dd-MMM-yyyy");
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
      Header: "Id",
      accessor: "id",
      Cell: ({ row }) => <div>{row.index + 1}</div>,
      minWidth: 50,
      width: 50,
      search: false,
    },

    {
      Header: "Title",
      accessor: "title",
      minWidth: 100,
      width: 100,
      Cell: ({ row }) => {
        return (
          <div className="flex  ">
            <div className="w-[80px] truncate">{row?.original?.title}</div>
            <a href={`/campaign-details/${row.id}`} target="_blank">
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
      Header: "User",
      accessor: "user.username",
      minWidth: 100,
      width: 100,
    },
    {
      Header: "Email",
      accessor: "user.email",
      minWidth: 100,
      width: 100,
    },
    {
      Header: "Mobile",
      accessor: "user.mobile_number",
      minWidth: 100,
      width: 100,
    },
    {
      Header: "Goal",
      accessor: "goal_amount",
      minWidth: 100,
      width: 100,
    },
    {
      Header: "Status",
      accessor: "status",
      minWidth: 100,
      width: 100,
      Cell: StatusCell,
    },
    {
      Header: "Deadline",
      accessor: "end_date",
      minWidth: 100,
      width: 100,
      Cell: ({ row }) => {
        return <p>{DateConvert(row?.original?.end_date)}</p>;
      },
    },
    {
      Header: "Actions",
      accessor: "actions",
      minWidth: 100,
      width: 100,

      Cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2 justify-center pl-6 max-desktop:pl-0 max-tablet:pl-0">
            <Link to="Edit" state={{ id: row?.id }}>
              <SecondaryButton sx={{ height: "30px" }}>Edit</SecondaryButton>
            </Link>
          </div>
        );
      },
    },
  ]);

  return (
    <div>
      <ReactTable
        ref={tableRef}
        rows={[]}
        columns={columns}
        showFilter
        manualPagination
        title={"Campaign"}
        checkboxComponent={IndeterminateCheckbox}
        downloadExcel
        url={`/admin-dashboard/campaign`}
        addButton={
          <PrimaryButton onClick={onDownload}>
            {" "}
            <TiExportOutline
              color="white"
              size={20}
              className="me-1 max-tablet:hidden"
            />
            Export Excel{" "}
          </PrimaryButton>
        }
        extraQuery={{ inactive: true }}
        selectedRowID={selectedRowID}
      />
    </div>
  );
};

export default Campaign;
