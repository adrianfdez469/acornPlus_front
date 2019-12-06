import React from 'react';

import {FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';


const SingleSelect = props => {

    const { options, fieldName, handleChange, value } = props;
console.log(options);

    const selectOptions = options.map(opt => {
        return <MenuItem 
          key={opt.key} 
          value={opt.key}
        >
          {opt.display}
        </MenuItem>
    })

    return (
        <FormControl variant="outlined" fullWidth>
        <InputLabel >
          {fieldName}
        </InputLabel>
        <Select
          //labelId="demo-simple-select-outlined-label"
          //id="demo-simple-select-outlined"
          //value={value}
          onChange={handleChange}
          labelWidth={fieldName.length*9}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {selectOptions}
        </Select>
      </FormControl>

    );

}
export default SingleSelect;