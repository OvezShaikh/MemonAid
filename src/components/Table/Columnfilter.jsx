import React from 'react'
import { TextField } from '@mui/material';

const Columnfilter = ({ column }) => {

    const { filterValue, setFilter, canFilter } = column

    return canFilter ? (
        <span>

            <TextField
                sx={{
                    "& .MuiInputBase-root .MuiInputBase-input ": {
                        height: '0px',
                        // margin: '5px',
                        padding: '14px !important',
                        background: 'white',
                        width: "100px",
                        borderRadius: '4px',
                        // flex: '75 0 auto',

                        border: '1px solid pink'
                    },
                }}
                className='!max-tablet:p-1'
                value={filterValue || ''}
                onChange={(e) => setFilter(e.target.value)}
            />
        </span>
    ) : null;
}

export default Columnfilter
