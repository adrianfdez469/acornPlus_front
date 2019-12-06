import React from 'react';
import PropTypes from 'prop-types';
import {
    TableCell,
    TableSortLabel
} from '@material-ui/core';

import uiDataTypes from '../../uiDataTypes';
import TableIconFilter from './tableIconFilters';

const TableColumn = props => {

    const { columnData, setFilterHandler, disableFilter, sortOrderState, changeOrder, activeState } = props;

    return (
        <TableCell 
            align={columnData.dataType === uiDataTypes.Number ? 'right' : 'left'}
            {...columnData.props}
        >
            
            {
                columnData.sorteable 
                ?   <TableSortLabel 
                        active={activeState} 
                        direction={sortOrderState || 'desc'}
                        onClick={changeOrder}
                    >
                        {columnData.header}
                    </TableSortLabel> 
                :   columnData.header
            }
            {columnData.filterable ? <TableIconFilter 
                                        {...props}  
                                        dataType={columnData.dataType} 
                                        setFilter={setFilterHandler}
                                        disableFilter={disableFilter}
                                    /> 
                                    : null}
        </TableCell>
    );

}

TableColumn.propTypes = {
    columnData: PropTypes.shape({
        dataType: PropTypes.oneOf(Object.keys(uiDataTypes)).isRequired,
        sorteable: PropTypes.bool.isRequired,
        header: PropTypes.string.isRequired,
        filterable: PropTypes.bool.isRequired,
        mappedBy: PropTypes.string.isRequired,
        props: PropTypes.object
    }).isRequired,

};

export default TableColumn;