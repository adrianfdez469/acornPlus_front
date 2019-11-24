import React from 'react';

import TextField from '@material-ui/core/TextField';

const CustomInputNumber = props => {
    const {
        customProps,
        fieldName,
        state,
        onChange
    } = props;

    return (
        <TextField 
            type='number'
            margin="dense"
            label={fieldName}
            fullWidth
            variant='outlined'
            value={state.value}
            onChange={(event) => onChange(event.target.value)}
            error={!state.valid}
    
            {...customProps}
        />
    );
}

export default CustomInputNumber;