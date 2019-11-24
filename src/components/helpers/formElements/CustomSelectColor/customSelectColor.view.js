import React , {useState}from 'react';

import {   
    makeStyles,
    Button
} from '@material-ui/core';
import CustomColorPicker from '../../../UI/ColorPicker/CustomColorPicker';

const useStyles = makeStyles(theme => ({
    colorButton: {
        width: '9rem',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(0.5),
}
}));


const hexToRgb = hex =>
  hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))

const isDark = hexColor => {
    const [r,g,b] = hexToRgb(hexColor);
    if(r + g +b < 384)
        return true;
    else
        return false;
}

const CustomSelectColor = props => {

    const {
        customProps,

        handleBtnColorClick,
        anchorEl,
        colorOpen,
        color,
        handleColorClose,
        setColor
    } = props;

    const classes = useStyles();
    

    return (
        <>
            <Button 
                variant="contained" 
                onClick={handleBtnColorClick} 
                className={classes.colorButton} 
                style={{backgroundColor: color}}
                {...customProps}

            >
                <span style={{color: (isDark(color) ? '#FFF' : '#000')}}>Color</span>
            </Button>
            <CustomColorPicker 
                anchorEl={anchorEl}
                openPopover={colorOpen}
                colorState={color}
                handleClose={handleColorClose}
                setColorState={color => setColor(color)}
            />
        </>
    );
}

export default CustomSelectColor;