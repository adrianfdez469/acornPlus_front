import React from 'react';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import { TwitterPicker } from 'react-color';

const newColors = ['#EEE', '#e0e0e0', '#f06292', '#9575cd', '#64b5f6', '#4dd0e1', '#81c784', '#dce775', '#ffd54f', '#ff8a65', '#9e9e9e', '#e91e63', '#673ab7', '#2196f3', '#00bcd4', '#4caf50', '#cddc39', '#ffc107', '#ff5722', '#212121', '#880e4f', '#311b92', '#0d47a1', '#006064', '#1b5e20', '#827717', '#ff6f00', '#bf360c'];

const CustomColorPicker = props => {

    const {openPopover, anchorEl, handleClose, colorState, setColorState, closeOnPick = true} = props;

    const pickingColor = color => {
        setColorState(color.hex);
        if(closeOnPick)
            handleClose();
    }


    return (
        <Popover            
            open={openPopover}
            anchorEl={anchorEl}
            onClose={handleClose}
            transitionDuration={300}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <TwitterPicker 
                color={colorState}
                onChangeComplete={pickingColor}
                colors={newColors}
            />
        </Popover>
    );

}

CustomColorPicker.propTypes = {
    openPopover: PropTypes.bool.isRequired,
    anchorEl: PropTypes.object,
    handleClose: PropTypes.func.isRequired,
    colorState: PropTypes.string.isRequired,
    setColorState: PropTypes.func.isRequired,
    closeOnPick: PropTypes.bool
}

export default CustomColorPicker;