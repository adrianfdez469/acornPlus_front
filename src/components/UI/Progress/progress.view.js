import React from 'react';

import {
    CircularProgress,
} from '@material-ui/core';

import Backdrop from '../backdrop/backdrop.view';

const inlineStyles = {
    position: 'absolute',
    top: '50%',
    left:'50%'
};

const Progress = props => {
    return (
    <>
        <Backdrop>
            <CircularProgress color='inherit' style={inlineStyles}/>
        </Backdrop>
    </>
    );
}


export default Progress;