import React, { useState } from 'react';

import CustomSelectColorView from './customSelectColor.view';
const CustomSelectColor = props => {

    const {
        customProps,
        state,
        onChange
    } = props;

    const [anchorEl, setAnchorEl] = useState(null);
    const handleBtnColorClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleColorClose = () => {
        setAnchorEl(null);
    };
    const colorOpen = Boolean(anchorEl);

    return <CustomSelectColorView 
        customProps={customProps}
        handleBtnColorClick={handleBtnColorClick}
        anchorEl={anchorEl}
        colorOpen={colorOpen}
        color={state.value}
        handleColorClose={handleColorClose}
        setColor={onChange}
    />;

}

export default CustomSelectColor;