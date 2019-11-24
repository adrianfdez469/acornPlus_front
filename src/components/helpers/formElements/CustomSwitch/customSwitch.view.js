import React from 'react';

import {FormControlLabel, Switch} from '@material-ui/core';

const CustomSwitch = props => {

    const {
        customProps,
        fieldName,
        onChange,
        state
    } = props;

    return <FormControlLabel
                control={
                    <Switch
                        checked={state.value}
                        onChange={() => onChange(!state.value)}
                        value={true}
                        color="primary"
                        {...customProps}
                    />
                }
                label={fieldName}
            />
}

export default CustomSwitch;