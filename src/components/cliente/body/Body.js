import React, { useState } from 'react';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';


const BodyApp = (props) => {

    const [activeTab, setActivTab] = useState(0);

    const onTabChangeHandler = (tabIdx) => {
        setActivTab(tabIdx);
    }

    return (
        <>
            <Grid container spacing={4}>
                <Grid item sm>
                    <Paper >Panel Left</Paper>
                </Grid>
                <Grid item sm>
                    <Paper>Panel Right</Paper>
                </Grid>
                
                
            </Grid>
            <Paper>
                <Tabs
                    value={activeTab}
                    indicatorColor='primary'
                    textColor='primary'
                    centered
                >
                    <Tab label="Item One" onClick={() => onTabChangeHandler(0)}/>
                    <Tab label="Item Two" onClick={() => onTabChangeHandler(1)}/>
                    <Tab label="Item Three" onClick={() => onTabChangeHandler(2)}/>
                </Tabs>
            </Paper>
        </>
    );
}

export default BodyApp;