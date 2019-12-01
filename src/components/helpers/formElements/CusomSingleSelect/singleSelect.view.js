import React from 'react';

import {FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';


const SingleSelect = props => {

    const { options } = props;

    const selectOptions = options.map(opt => {
        return <MenuItem key={opt.key} value={opt.key}>{opt.display}</MenuItem>
    })

    return (
        <FormControl variant="outlined" fullWidth>
        <InputLabel >
          {props.fieldName}
        </InputLabel>
        <Select
          //labelId="demo-simple-select-outlined-label"
          //id="demo-simple-select-outlined"
          //value={age}
          //onChange={handleChange}
          labelWidth={props.fieldName.length*9}
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