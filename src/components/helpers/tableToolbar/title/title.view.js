import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

const Title = (props) => {
    const { text } = props;
    return <Typography
        variant='h4' 
        color='textSecondary'
    >
        {text}
    </Typography>
}

Title.propTypes = {
    text: PropTypes.string.isRequired
}

export default Title;