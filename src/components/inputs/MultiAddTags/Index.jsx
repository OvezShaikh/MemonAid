import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { useField } from 'formik';
import DeleteIcon from '@mui/icons-material/Delete';


const CustomChipsInput = ({ name, placeholder, label, ...otherProps }) => {
    const [field, , helpers] = useField(name);
    const [inputValue, setInputValue] = useState('');
    const chips = field.value || [];

    const handleDelete = (chipToDelete) => {
        const updatedChips = chips.filter((chip) => chip.key !== chipToDelete.key);
        helpers.setValue(updatedChips);
    };
    

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            const newChip = { key: Date.now(), label: inputValue.trim() };
            const updatedChips = [...chips, newChip];
            helpers.setValue(updatedChips);
            setInputValue('');
        }
    };

    return (
        <div>
            <TextField
                label={label}
                placeholder={placeholder}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                fullWidth
                variant="outlined"
                margin="normal"
                InputProps={{
                    startAdornment: chips.map((chip , index) => (
                        <React.Fragment key={index}>
                            <Chip
                                label={chip.label} 
                                variant='filled'
                                color='info'
                                onDelete={()=>handleDelete(chip)}
                                deleteIcon={<DeleteIcon/>}
                                style={{ marginRight: '4px', marginBottom: '4px' }}
                            />
                        </React.Fragment>
                    )),
                }}
                {...otherProps}
            />
        </div>
    );
};

export default CustomChipsInput;
