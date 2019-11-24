import React from 'react';
import PropTypes from 'prop-types';
import {
    TableHead,
    TableRow
} from '@material-ui/core';

import propTypesUtils from '../_propTypesUtils';
import TableColumn from './tableColumn';

const TableHeader = props => {
    
    const { columns, filterHandler, disableFilters, ordersHandler} = props;

    return (
        <TableHead>
            <TableRow>
                {columns.map((col, index) => {
                    return (
                        <TableColumn 
                            columnData={col} 
                            key={index} 
                            setFilterHandler={(value) => filterHandler(col.mappedBy, value)}
                            disableFilter={disableFilters}
                            ordersHandler={ordersHandler}
                        />
                    );
                })}
            </TableRow>
        </TableHead>
    );
}

TableHeader.propTypes = {
    columns: propTypesUtils.isArrayNotEmpty,
    filterHandler: PropTypes.func.isRequired,
    disableFilters: PropTypes.bool.isRequired,
    ordersHandler: PropTypes.func.isRequired
}
export default TableHeader;