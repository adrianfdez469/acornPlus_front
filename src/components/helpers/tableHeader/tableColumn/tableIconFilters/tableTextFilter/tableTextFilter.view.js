import React from 'react';
import PropTypes from 'prop-types';

import {
    Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem, Checkbox, Input, InputAdornment
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const TableTextFilter = (props) => {

    const {columnData, filterIconRef, show, handleShow, searchCheck, onChangeCheck, searchState, onChangeSearchField } = props;

    return (
        <Popper 
            open={show}
            anchorEl={filterIconRef.current}
            role={undefined} 
            transition 
            disablePortal
            onMouseLeave={() => handleShow(false)}
            
        >
            {
                ({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                <Paper>
                    <ClickAwayListener onClickAway={() => handleShow(false)}>
                    <MenuList>
                        <MenuItem >
                            <Checkbox 
                                color='primary' 
                                checked={searchCheck} 
                                onChange={onChangeCheck} 
                                disabled={searchState === ''}
                            />
                            <Input
                                autoFocus
                                value={searchState}
                                onChange={onChangeSearchField}
                                placeholder={`Buscar por ${columnData.header}`}
                                endAdornment={
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                }
                            />
                        </MenuItem>                            
                    </MenuList>
                    </ClickAwayListener>
                </Paper>
                </Grow>
            )}
        </Popper>
    );
}

TableTextFilter.propTypes = {
    show: PropTypes.bool.isRequired
}

export default TableTextFilter;