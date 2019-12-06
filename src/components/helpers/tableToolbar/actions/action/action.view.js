import React from 'react';
import PropTypes from 'prop-types';

import {withStyles, Fab} from '@material-ui/core';

import InfoTooltip from '../../../infoTooltip';

import styles from './action.styles';

const Action = props => {

    const {clickHandler, icon, description, classes, cmp} = props;

    return <>
        <InfoTooltip title={description}>
            <Fab
                color='primary'
                onClick={clickHandler}
                size='medium'
                className={classes.styles}
            >
                {icon}
            </Fab>
        </InfoTooltip>
        {cmp}
    </>
}

Action.propTypes = {
    clickHandler: PropTypes.func.isRequired,
    icon: PropTypes.element.isRequired,
    description: PropTypes.string.isRequired
}

export default withStyles(styles)(Action);