import React from 'react';
import {
    IconButton
} from '@material-ui/core';

import FilterListIcon from '@material-ui/icons/FilterList';
import SearchPopperFactory from './tableFiltersFactory';
import InfoTooltip from '../../../infoTooltip';




const TableIconFilter = props => {

    const {filterIconRef, handleShow, setFilter, disableFilter, filteringState} = props;

    return (
        <>
            <InfoTooltip title='Filtro avanzado'>
                <IconButton 
                    size='small'
                    onClick={() => handleShow(true)}
                    ref={filterIconRef}
                    color={filteringState ? 'secondary' : 'inherit'}
                >
                    <FilterListIcon />
                </IconButton>
            </InfoTooltip>
            <SearchPopperFactory 
                {...props} 
                setFilter={setFilter} 
                disableFilter={disableFilter}
            />
        </>
    );
}

export default TableIconFilter;