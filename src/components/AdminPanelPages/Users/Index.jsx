import React from "react";
import ReactTable from "../../Table/index";
import { useState } from "react";
import IndeterminateCheckbox from "../../Table/IndeterminateCheckbox";
import { AddUser } from "../../admin-console/AddUser";
import SecondaryButton from "../../inputs/secondaryButton";
import { Link } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { DeleteBox } from "../../layout/dialogBox/delete";
import { format } from 'date-fns'

const User = () => {
  const [selectedRowID, setSelectedRowID] = useState(null);

  const getStatusCellStyle = (user_type) => {
    if (user_type === "NGO") {
      return {
        color: "#fa9820",
        background: "#f5fabe  ",
      };
    } else if (user_type === "Individual") {
      return {
        background: "#ECFDF3  ",

        color: "#037847",
      };
    } else {
      return {
        display: "none",
      };
    }
  };
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

  function DateConvert (Mydate){
    const date = new Date(Mydate);
    return format(date ,'dd-MMM-yyyy');
  }
  const columns = React.useMemo(() => [
    {
      Header: "Id", // Row number header
      accessor: "index", // Accessor for row number
      Cell: ({ row }) => <div>{row.index + 1}</div>,
      minWidth: 50,
      width: 50,
      search: false,
    },
    {
      Header: "Date",
      accessor: "created_on",
      minWidth: 100,
      width: 100,
      Cell:({row})=>{
        return(
          <p>{DateConvert(row?.original?.created_on)}</p>
        )
      }
    },
    {
      Header: "User",
      accessor: "username",
      minWidth: 100,
      width: 100,
    },
    {
      Header: "Email",
      accessor: "email",
      minWidth: 100,
      width: 100,
    },
    {
      Header: "Mobile",
      accessor: "mobile_number",
      minWidth: 100,
      width: 100,
    },
    {
      Header: "Country",
      accessor: "country",
      minWidth: 100,
      width: 100,
    },
    {
      Header: "Registered As",
      accessor: "user_type",
      minWidth: 100,
      width: 100,
      Cell: StatusCell,
    },

    {
      Header: "Actions",
      accessor: "actions",
      nofilter: true,
      minWidth: 100,
      width: 100,
      Cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center gap-3 max-desktop:pl-0 max-tablet:pl-0 max-tablet:gap-0 !max-desktop:gap-0">
            <Link to="Edit" state={{ id: row?.id }}>
              <SecondaryButton sx={{ height: "30px" }}>Edit</SecondaryButton>
            </Link>
            <DeleteBox
              url={`/admin-dashboard/users`}
              data={row?.original?.id}
              title={"User"}
              // onClick={() => setSelectedRowID(row?.original?.id)}
              // onSuccess={() => setSelectedRowID(null)}
              // onClose={() => setSelectedRowID(null)}

              refetchUrl={"/admin-dashboard/users"}
            ></DeleteBox>
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
        title={"User"}
        checkboxComponent={IndeterminateCheckbox}
        url={`/admin-dashboard/users`}
        addButton={<AddUser />}
        selectedRowID={selectedRowID}
      />
    </div>
  );
};

export default User;
