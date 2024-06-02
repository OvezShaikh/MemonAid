import React from 'react';
import ReactTable from '../../Table/index';
import { useState } from 'react';
import IndeterminateCheckbox from '../../Table/IndeterminateCheckbox';
import SecondaryButton from '../../inputs/secondaryButton';
import { GoDotFill } from "react-icons/go";
import { Link } from 'react-router-dom';
import images from '../../../constants/images';
import { format } from "date-fns";


const Campaign = () => {
  const [selectedRowID, setSelectedRowID] = useState(null);

  const getStatusCellStyle = (status) => {
    if (status === 'Pending') {
      return {

        color: '#fa9820',
        background: '#f5fabe  ',
      };
    } else if (status === 'Active') {
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


  const StatusCell = ({ value }) => (
    <div className=' flex justify-center gap-1  items-center w-[100px] h-[25px] rounded-3xl' style={getStatusCellStyle(value)}>
      <span className='' style={getStatusCellStyle(value)}><GoDotFill /></span>
      <span className='' style={getStatusCellStyle(value)}>{value}</span>
    </div>
  );

  function DateConvert (Mydate){
    const date = new Date(Mydate);
    return format(date ,'dd-MMM-yyyy');
  }

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
        search: false
      },

      {
        Header: "Title",
        accessor: "campaign.title",
        minWidth: 100,
        width: 100,
        Cell: ({ row }) => {
          return (
            <div className="flex  ">
              <div className="w-[80px] truncate">{row?.original?.campaign?.title}</div>
              <a href={`/campaign-details/${row?.original?.campaign.id}`} target='_blank'>
                <img
                  className="ml-2"
                  src={images.CausesDetails}
                  alt="CausesDetails"
                />
              </a>
            </div>
          );
        }


      },
      {
        Header: "User",
        accessor: "campaign.user.username",
        minWidth: 100,
        width: 100,

      },
      {
        Header: "Email",
        accessor: "campaign.user.email",
        minWidth: 100,
        width: 100,

      },
      {
        Header: "Mobile",
        accessor: "campaign.user.mobile_number",
        minWidth: 100,
        width: 100,

      },
      {
        Header: "Goal",
        accessor: "campaign.goal_amount",
        minWidth: 100,
        width: 100,

      },
      {
        Header: "Status",
        accessor: "campaign.status",
        minWidth: 100,
        width: 100,
        Cell: StatusCell,
      },
      {
        Header: "Deadline",
        accessor: "campaign.end_date",
        minWidth: 100,
        width: 100,
        Cell:({row})=>{
          return (
            <p>{DateConvert(row?.original?.campaign?.end_date)}</p>
          )
          
         }
      },
      {
        Header: 'Actions',
        accessor: 'actions',

        nofilter: true,
        minWidth: 100,
        width: 100,
        Cell: ({ row }) => {
          return (
            <div className='flex items-center justify-center pl-6 max-desktop:pl-0 max-tablet:pl-0'>
              <Link to="View" state={{ id: row?.id }} ><SecondaryButton sx={{ height: '30px' }} >Edit</SecondaryButton></Link>
              
            </div >
          )
        }
      }
    ],

  );
  return (

    <div>
      <ReactTable
        rows={[]}
        columns={columns}
        showFilter
        manualPagination
        title={"Cause"}
        checkboxComponent={IndeterminateCheckbox}
        url={`/admin-dashboard/cause-edit`}
        extraQuery={{ inactive: true }}
        selectedRowID={selectedRowID}
      />
    </div>
  )
}

export default Campaign;
