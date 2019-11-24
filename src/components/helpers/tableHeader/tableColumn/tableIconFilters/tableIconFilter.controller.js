import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import TableIconFilterView from './tableIconFilter.view';
import uiDataTypes from '../../../uiDataTypes';

const TableIconFilter = props => {

    //const {dataType} = props;
    const [showFilter, setShowFilter] = useState(false);
    const filterIconRef = useRef(null);
    const [filteringState, setFilteringState] = useState(false);

    useEffect(() => {
        if(props.disableFilter){
            setFilteringState(false);
        }
    }, [props.disableFilter])



    const setFilterInterceptor = value => {
        if(!value || value === ''){
            setFilteringState(false);    
        }else{
            setFilteringState(true);
        }
        return props.setFilter(value);
    }

    

    
    return <TableIconFilterView 
        {...props} 
        show={showFilter} 
        handleShow={setShowFilter} 
        filterIconRef={filterIconRef}
        setFilter={setFilterInterceptor}
        filteringState={filteringState}
    />;
}

TableIconFilter.propTypes = {
    dataType: PropTypes.oneOf(Object.keys(uiDataTypes)).isRequired
}

export default TableIconFilter;