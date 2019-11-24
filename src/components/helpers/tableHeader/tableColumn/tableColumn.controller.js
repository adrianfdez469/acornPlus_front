import React, { useState } from 'react';
import TableColumnView from './tableColumn.view';

const TableColumn = props => {

    const { ordersHandler, columnData } = props;
    const [sortOrderState, setSortOrderState] = useState('asc');
    const [activeState, setActiveState] = useState(false)

    const changeSortOrder = () => {
        setSortOrderState(oldState => {
            if(oldState === 'desc')
                return 'asc';
            else 
                return 'desc';
        });

        ordersHandler(columnData.mappedBy, sortOrderState);
        setActiveState(true);
    }

    return (
        <TableColumnView 
            sortOrderState={sortOrderState}
            changeOrder={changeSortOrder}
            activeState={activeState}
            {...props}
        />
    );
}

export default TableColumn;