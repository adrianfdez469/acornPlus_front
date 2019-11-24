import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TableSwitchFilterView from './tableSwitchFilter.view';

const TableSwitchFilter = props => {

    const { setFilter, disableFilter} = props;
    
    const [searchCheck, setSearchCheck] = useState(false);
    const [searchState, setSearchState] = useState(null);
     
    useEffect(() => {
        if(disableFilter === true){
            setSearchCheck(false);
        }
    }, [disableFilter]);

    const onChangeSearchField = (value) => {
        setSearchState(value);
        setFilter(value);
        setSearchCheck(true);
    }

    const onChangeCheck = (event) => {
        setSearchCheck(state => !state);
        if(event.target.checked){
            setFilter(searchState);
        }else{
            setFilter();
        }
    }

    return <TableSwitchFilterView 
        {...props}
        searchCheck={searchCheck}
        onChangeSearchField={onChangeSearchField}
        onChangeCheck={onChangeCheck}
        searchState={searchState}
    />;

}

TableSwitchFilter.propTypes = {
    setFilter: PropTypes.func.isRequired
}

export default TableSwitchFilter;