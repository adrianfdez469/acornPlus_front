import React from 'react';
import PropTypes from 'prop-types';
import {
    TableHead,
    TableRow
} from '@material-ui/core';

//import propTypesUtils from '../_propTypesUtils';
import TableColumn from './tableColumn';
import uiDataTypes from '../uiDataTypes';

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
    //columns: propTypesUtils.isArrayNotEmpty,
    columns: PropTypes.arrayOf(PropTypes.shape({
        mappedBy: PropTypes.string.isRequired,
        dataType: PropTypes.oneOf(Object.keys(uiDataTypes)).isRequired,
        sorteable: PropTypes.bool.isRequired,
        header: PropTypes.string.isRequired,
        filterable: PropTypes.bool.isRequired,
        props: PropTypes.object
    })).isRequired,
    filterHandler: PropTypes.func.isRequired,
    disableFilters: PropTypes.bool.isRequired,
    ordersHandler: PropTypes.func.isRequired
}
export default TableHeader;