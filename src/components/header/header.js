import React from 'react';

import {
    AppBar,
    Toolbar,
    IconButton,
    Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import NotificationIcon from '@material-ui/icons/Notifications'

const Header = ({openMenu}) => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton color='inherit' onClick={openMenu}>
                    <MenuIcon/>
                </IconButton>
                <Typography>App</Typography>
                <div style={{flexGrow: 1}}></div>
                <IconButton color='inherit'>
                    <NotificationIcon/>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default Header;