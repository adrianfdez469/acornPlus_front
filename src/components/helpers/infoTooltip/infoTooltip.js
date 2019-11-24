import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '@material-ui/core/Tooltip';

const InfoTooltip = props => {
    const { disabled, children, title } = props;

    return (
        disabled === true
            ? children
            : <Tooltip title={title} arrow>
                {children}
            </Tooltip>
    );
}

InfoTooltip.propTypes = {
    title: PropTypes.string.isRequired
};

export default InfoTooltip;