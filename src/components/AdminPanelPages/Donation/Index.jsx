import React from 'react'
import ReactTable from '../../Table/index'
import { useState } from 'react';
import PrimaryButton from '../../inputs/PrimaryButton';
import { Link } from 'react-router-dom';
import { GoDotFill } from "react-icons/go";
import images from '../../../constants/images';
import { format } from "date-fns";


const Index = () => {
  const [selectedRowID, setSelectedRowID] = useState(null);
  const getStatusCellStyle = (status) => {
  
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
        Header: "Id", 
        accessor: "index",
        Cell: ({ row }) => (
         
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
        Cell: ({ row }) => {
          return (
            <div className='flex  '>
              <div className="w-[80px] truncate">
                {row?.original?.campaign}
              </div>
              <a href={`/campaign-details/${row.id}`} target="_blank">
                <img className='ml-2' src={images.CausesDetails} alt="CausesDetails"  />
              </a>
            </div>
          );
        },

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
        // minWidth: 150,
        // width: 200,
        nofilter: true,

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
      {
        Header: "Donation Type",
        accessor: 'donation_type'
      },
      {
        Header: "Status",
        accessor: "status",
        // minWidth: 200,
        // width: 280,
        nofilter: true,
        Cell: StatusCell,

      },
      {
        Header: 'Actions',
        accessor: 'actions',
        sortable: false,
        nofilter: true,
        minWidth: 100,
        width: 100,
        search: false,
        Cell: ({ row }) => {
          return (
            <div className='flex items-center justify-center pl-6 gap-3 max-desktop:pl-0 max-tablet:pl-0 max-tablet:gap-0 !max-desktop:gap-0'>
              <Link to="View" state={{ id: row?.id }}>
                <PrimaryButton sx={{
                height: '30px', width: '60px', background: '#219D80', color: 'white', "&  .MuiButton-root:hover": {
                  background: "yellow"
                }
              }} text={'View'}>View</PrimaryButton>
              </Link>
              {/* <SecondaryButton sx={{ height: '30px' }}>Edit Bank and KYC</SecondaryButton> */}
            </div >
          )
        }
      }

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
        url="/admin-dashboard/donors?page=1&limit=10"
        extraQuery={{ inactive: true }}
        // addButton={<LocationConfigurationDialog />}
        // addButton={<Button>HElloooooo</Button>}
        selectedRowID={selectedRowID}
        checkboxSelection={true}
      />
    </div>
  )
}

export default Index
