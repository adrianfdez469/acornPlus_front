import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TableTextFilterView from './tableTextFilter.view' ;

const TableTextFilter = props => {

    const { setFilter, disableFilter} = props;
    
    const [searchCheck, setSearchCheck] = useState(false);
    const [searchState, setSearchState] = useState('');
    const [delayTimer, setDelayTimer] = useState(null); 
     
    useEffect(() => {
        if(disableFilter === true){
            setSearchCheck(false);
        }
    }, [disableFilter]);

    const onChangeSearchField = (event) => {
        setSearchState(event.target.value);
        
        
        clearTimeout(delayTimer);
        setDelayTimer(setTimeout((value) => {
            if(value === '')
                setFilter();
            else
                setFilter(value);
        },1000, event.target.value));
        
        
        if(event.target.value !== ''){
            setSearchCheck(true);
        }else{
            setSearchCheck(false);
        }        
    }

    const onChangeCheck = (event) => {
        setSearchCheck(state => !state);
        if(event.target.checked){
            setFilter(searchState);
        }else{
            setFilter();
        }
    }

    return <TableTextFilterView 
        {...props}
        searchCheck={searchCheck}
        onChangeSearchField={onChangeSearchField}
        onChangeCheck={onChangeCheck}
        searchState={searchState}
    />;

}

TableTextFilter.propTypes = {
    setFilter: PropTypes.func.isRequired
}

export default TableTextFilter;