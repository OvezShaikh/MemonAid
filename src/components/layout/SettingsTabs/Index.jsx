import * as React from 'react';
import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Password from './Password';
import Account from './Accounts';



const InputStyle =
{
  padding: '20px', border: "1px solid #e2e2e2",
  // },
  "&:focus-within": {
    boxShadow: `0px 4px 10px 0px rgba(0, 0, 0, 0.15);`,
    borderColor: "black",
  },

}
const SelectStyle =
{
  padding: '0px', border: "none",
  "&:focus-within": {
    boxShadow: `none`,
    borderColor: "none",
  },

}


export default function LabTabs() {


  const [value, setValue] = React.useState('1');
 
  const [age, setAge] = useState('');


  const handletabChange = (event, newValue) => {
    setValue(newValue);
  };



 
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
          <TabList onChange={handletabChange} aria-label="lab API tabs example"   >
            <Tab label="Account" value="1" className='account-tab' />
            <Tab label="Passwords" value="2" className='password-tab' />
          </TabList>
        </Box>
        <TabPanel sx={{ pt: '4rem', color: "green" }} value="1">
           <Account/>
        </TabPanel>
        <TabPanel sx={{ pt: '4rem' }} value="2">
         <Password/>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
