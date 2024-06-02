import React, { useEffect } from "react";
import ReactTable from "../../Table/index";
import { useState } from "react";
import IndeterminateCheckbox from "../../Table/IndeterminateCheckbox";
import { useQueryClient } from "react-query";
import SecondaryButton from "../../inputs/secondaryButton";
import { GoDotFill } from "react-icons/go";
import { DeleteBox } from "../../layout/dialogBox/delete";
import { toast } from "react-toastify";
import serverAPI from "../../../config/serverAPI";
import images from "../../../constants/images";
import { format } from "date-fns";
import PrimaryButton from "../../inputs/PrimaryButton";

const Reported_Causes = () => {
  const [selectedRowID, setSelectedRowID] = useState(null);
  const [ID, setID] = useState(null);
  const [success, setSuccess] = useState(false);
  const queryClient = useQueryClient();

  const handleReject = async (id) => {
    try {
      await serverAPI.put(`/admin-dashboard/reported-campaign/${id}`);
      toast.success("Campaign Rejected Successfully!", {
        position: "top-right",
      });
      queryClient.invalidateQueries("/admin-dashboard/reported-campaign");
    } catch (error) {
      console.error("Error rejecting campaign:", error);
      toast.error("Failed to reject campaign. Please try again later.", {
        position: "top-right",
      });
    }
  };

  function DateConvert(Mydate) {
    const date = new Date(Mydate);
    return format(date, "dd-MMM-yyyy");
  }

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

  const StatusCell = ({ value }) => (
    <div
      className=" flex justify-center gap-1  items-center w-[100px] h-[25px] rounded-3xl "
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
      accessor: "index",
      Cell: ({ row }) => <div>{row.index + 1}</div>,
      minWidth: 50,
      width: 50,
      search: false,
    },
    {
      Header: "Name",
      accessor: "campaign.title",
      minWidth: 100,
      width: 100,
      Cell: ({ row }) => {
        return (
          <div className="flex  ">
            <div className="w-[80px] truncate">
              {row?.original?.campaign?.title}
            </div>
            <a href={`/campaign-details/${row?.original?.campaign?.id}`} target="_blank">
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
      Header: "Raising For",
      accessor: "campaign.rasing_for",

      minWidth: 100,
      width: 100,
    },
    {
      Header: "Description",
      accessor: "message",

      minWidth: 100,
      width: 100,
    },
    {
      Header: "Status",
      accessor: "approval_status",
      minWidth: 100,
      width: 100,
      Cell: StatusCell,
    },
    {
      Header: "Date",
      accessor: "updated_on",
      minWidth: 100,
      width: 100,

      Cell: ({ row }) => {
        return <p>{DateConvert(row?.original?.updated_on)}</p>;
      },
    },
    {
      Header: "Actions",
      accessor: "actions",

      nofilter: true,
      minWidth: 100,
      width: 250,
      Cell: ({ row }) => {
        return (
          <>
            <div className="flex gap-2 justify-center items-center p-3">
              <div className=" flex gap-2">
                <DeleteBox
                  url={`/admin-dashboard/reported-campaign`}
                  data={row?.original?.id}
                  title={"Reported Campaign"}
                  // onClick={() => setSelectedRowID(row?.original?.id)}
                  // onSuccess={() => setSelectedRowID(null)}
                  // onClose={() => setSelectedRowID(null)}
                  refetchUrl={"/admin-dashboard/reported-campaign"}
                >
                  <p>Are You Sure To Remove This Campaign!</p>
                  <p className="text-red-500">This Action Cannot Be Undone !</p>
                </DeleteBox>

                <PrimaryButton
                  onClick={() => {
                    handleReject(row?.id);
                  }}
                >
                  Reject Campaign
                </PrimaryButton>
              </div>
            </div>
          </>
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
        title={"Reported-Cause"}
        checkboxComponent={IndeterminateCheckbox}
        url={`/admin-dashboard/reported-campaign`}
        extraQuery={{ inactive: true }}
        selectedRowID={selectedRowID}
      />
    </div>
  );
};

export default Reported_Causes;
