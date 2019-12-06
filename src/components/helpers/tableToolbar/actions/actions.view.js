import React from 'react';
import PropTypes from 'prop-types';

import Action from './action';

const Actions = props => {
    const { actionsList } = props;

    return (
        actionsList.map((act, idx) => {
            return (<Action 
                key={idx} 
                clickHandler={act.clickHandler}
                icon={act.icon}
                description={act.description}
                cmp={act.cmp}
                {...props}
            />)
        })
    );

}

Actions.propTypes = {
    actionsList: PropTypes.array.isRequired
}

export default Actions;