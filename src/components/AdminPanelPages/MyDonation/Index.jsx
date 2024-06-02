import React from 'react'
import ReactTable from '../../Table/index'
import { useState } from 'react';
import { GoDotFill } from "react-icons/go";
import { format } from "date-fns";




const Index = () => {
    const [selectedRowID, setSelectedRowID] = useState(null);
    const getStatusCellStyle = (status) => {
        // let { state } = useLocation(); let { id } = state
         if (status === 'Pending') {
            return {



                color: '#fa9820',
                background: '#f5fabe  ',
            };
        } else if (status === 'Approved') {
            return {
                background: '#ECFDF3  ',

                color: '#037847',
            };
        } else if (status === 'Rejected') {
            return {
                background: '#f5d0d0',
                color: '#f03c24',
            }
        } else {
            return {
                background: '#EBF0ED',
                color: '#717171'
            }
        }
        ;
    };

    function DateConvert (Mydate){
        const date = new Date(Mydate);
        return format(date ,'dd-MMM-yyyy');
      }

    const StatusCell = ({ value }) => (
        <div className=' flex justify-center gap-1  items-center w-[100px] h-[25px] rounded-3xl' style={getStatusCellStyle(value)}>
            <span className='' style={getStatusCellStyle(value)}><GoDotFill /></span>
            <span className='' style={getStatusCellStyle(value)}>{value}</span>
        </div>
    );
    const columns = React.useMemo(
        () => [
            {
                Header: "Id", // Row number header
                accessor: "id", // Accessor for row number
                Cell: ({ row }) => (
                    // Display row number using index provided by React Table
                    <div>{row.index + 1}</div>
                ),
                minWidth: 50,
                width: 50,
                search: false,
                sortable: false
            },
            {
                Header: "Full Name",
                accessor: "full_name",
                // minWidth: 150,
                // width: 200,
                nofilter: true,

            },
            {
                Header: "Campaign",
                accessor: "campaign",
                // minWidth: 200,
                // width: 280,

            },
            {
                Header: "Email",
                accessor: "email",
                // minWidth: 150,
                // width: 200,
                nofilter: true,

            },
            {
                Header: "Donation",
                accessor: "amount",
                // minWidth: 200,
                // width: 280,

            },
            {
                Header: "Payment Type",
                accessor: "payment_type",

                nofilter: true,

            },
            {
                Header: "Status",
                accessor: "status",
                minWidth: 150,
                width: 200,
        
              },
            {
                Header: "Date",
                accessor: "created_on",
                // minWidth: 200,
                // width: 280,
                Cell:({row})=>{
                    return (
                      <p>{DateConvert(row?.original?.created_on)}</p>
                    )
                    
                   }

            },
          

        ],

        []
    );

    return (
        <div>
            <ReactTable
                rows={[]}
                columns={columns}
                manualPagination
                title={"Donations"}
                url="/user-dashboard/my-donations"
                extraQuery={{ inactive: true }}
                selectedRowID={selectedRowID}
                checkboxSelection={true}
            />
        </div>
    )
}

export default Index
