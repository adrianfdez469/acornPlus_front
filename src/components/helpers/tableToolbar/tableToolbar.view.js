import React from 'react';
import PropTypes from 'prop-types';
import propTypesUtils from '../_propTypesUtils';
import { withStyles, Toolbar } from '@material-ui/core';

import Title from './title';
import SearchInput from './search';
import Actions from './actions';

import styles from './tableToolbar.styles';

const TableToolbar = props => {
    const {classes, actionsList, title, searchAction, clearFilter} = props;

    return (
        <Toolbar className={classes.toolbar}>
            <Title 
                text={title}
            />
            <div className={classes.separator}></div>
            <SearchInput 
                searchAction={searchAction}
                clearFilter={clearFilter}
            />
            <Actions actionsList={actionsList}/>
        </Toolbar>
    );
}

TableToolbar.propTypes = {
    title: PropTypes.string.isRequired,
    searchAction: PropTypes.func.isRequired,
    actionsList: PropTypes.array.isRequired,
}

export default withStyles(styles)(TableToolbar);