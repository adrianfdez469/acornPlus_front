import React, { useState, useContext } from 'react';

import {
    AppBar,
    Tabs,
    Tab,
    Zoom,
    withWidth
} from '@material-ui/core';

import { musclesContext } from './store/contexts';

const Footer = ({width, changeTab, selectedMuscle}) => {

    const muscles = useContext(musclesContext);
    const getMuscleIndex = () => muscles.findIndex(m => m === selectedMuscle);
    const [activeTab, setActiveTab] = useState(getMuscleIndex());
    const isSmallDevice = /xs|sm/.test(width);
     
    const onSelectTabHandler = (index, muscleName) => {
        
        setActiveTab(index);
        changeTab(muscleName);
    }

    return (
        <Zoom in timeout={300}>
            <AppBar position='static'>
                <Tabs
                    value={activeTab}
                    variant={ isSmallDevice ? 'scrollable' : 'fullWidth' }
                    scrollButtons="auto"
                >
                    {muscles.map((musc,index) => (
                        <Tab 
                            label={musc} 
                            key={musc}
                            onClick={() => onSelectTabHandler(index, musc)}                        
                        />
                    ))}
                </Tabs>
            </AppBar>
        </Zoom>
    );
}

export default React.memo(withWidth()(Footer));