import React, { useState, useContext } from 'react';

import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    makeStyles,
    Zoom,
    Menu, 
    MenuItem,
    Switch,
    FormControlLabel
} from '@material-ui/core';
import {
    Menu as MenuIcon, Notifications
} from '@material-ui/icons';

import { selectedTheme } from './store/contexts';

const useStyle = makeStyles(theme => ({
    spacing: {
        flexGrow: 1
    }
}));

const Header = (props) => {

    const classes = useStyle();
    const [anchorEl, setAnchorEl] = useState(null);
    
    const [themeName, changeThemeName] = useContext(selectedTheme);

    const onHandleSwitch = () => {
        changeThemeName((oldTheme) => {
            if(oldTheme === 'dark'){
                return 'light';
            }else{
                return 'dark';
            }
        })
    }

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleCloseMenu = () => {
        setAnchorEl(null);
    }

    return (
        <Zoom in timeout={300}>
        <AppBar position="sticky">
            <Toolbar>
                
                <IconButton color='inherit' onClick={handleMenuClick}>
                    <MenuIcon />
                </IconButton>
                <Menu open={anchorEl ? true : false} anchorEl={anchorEl} onClose={handleCloseMenu}>
                    <MenuItem>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={themeName === 'dark'}
                                label='Theme dark'
                                variant='menu'
                                onChange={onHandleSwitch}
                                value={themeName}
                                
                                
                            />
                        }
                        label={`Theme ${themeName}`}
                    />
                    </MenuItem>
                </Menu>                      
                <Typography>
                    Exercise App
                </Typography>
                <div className={classes.spacing} ></div>                
                <IconButton color='inherit'>
                    <Notifications />
                </IconButton>
            </Toolbar>
        </AppBar>
        </Zoom>
    );
}

export default Header;