import React from 'react';

import PropTypes from 'prop-types';
import {
    TablePagination
} from '@material-ui/core';

const CustomTablePagination = props => {

    const {length, rowsPerPage=10, page=0, changePage, handleChangeRowsPerPage} = props;

    return (
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={length}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage='Elementos por página'
            labelDisplayedRows={({from, to, count}) => 
                    `${from}-${to === -1 ? count : to} de ${count}`
            }
            backIconButtonProps={{
                'aria-label': 'previous page',
            }}
            nextIconButtonProps={{
                'aria-label': 'next page',
            }}
            onChangePage={changePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    );
}

CustomTablePagination.propType = {
    length: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number,
    page: PropTypes.number,
    changePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired
};

export default CustomTablePagination;