import React from 'react';
import {
    Tooltip,
    IconButton
} from '@material-ui/core';

import FilterListIcon from '@material-ui/icons/FilterList';
import SearchPopperFactory from './tableFiltersFactory';




const TableIconFilter = props => {

    const {filterIconRef, handleShow, setFilter, disableFilter, filteringState} = props;

    return (
        <>
            <Tooltip title='Filtro avanzado'>
                <IconButton 
                    size='small'
                    onClick={() => handleShow(true)}
                    ref={filterIconRef}
                    color={filteringState ? 'secondary' : 'inherit'}
                >
                    <FilterListIcon />
                </IconButton>
            </Tooltip>
            <SearchPopperFactory 
                {...props} 
                setFilter={setFilter} 
                disableFilter={disableFilter}
            />
        </>
    );
}

export default TableIconFilter;