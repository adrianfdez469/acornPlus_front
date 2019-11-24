import React from 'react';
import PropTypes from 'prop-types';

import uiDataTypes from '../../../uiDataTypes';
import TableTextFilter from './tableTextFilter'; 
import TableNumberFilter from './tableNumberFilter';
import TableSwitchFilter from './tableSwitchFilter';

const PoperSearchFactory = props => {
    const {dataType} = props;
    switch(dataType){
        case uiDataTypes.Text: return <TableTextFilter {...props}/>;
        case uiDataTypes.Number: return <TableNumberFilter {...props}/>;
        case uiDataTypes.Boolean: return <TableSwitchFilter {...props}/>;
        default: return null;
    }
}

PoperSearchFactory.propTypes = {
    dataType: PropTypes.oneOf(Object.keys(uiDataTypes))
}

export default PoperSearchFactory;