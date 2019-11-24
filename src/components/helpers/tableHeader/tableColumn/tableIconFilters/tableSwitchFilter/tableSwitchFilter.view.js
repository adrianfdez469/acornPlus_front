import React from 'react';
import PropTypes from 'prop-types';

import {
    Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem, Checkbox, FormControlLabel, Switch
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const TableSwitchFilter = props => {

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
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={searchState}
                                        onChange={() =>onChangeSearchField(!searchState)}
                                        value={true}
                                        color="primary"
                                    />
                                }
                                label={columnData.header}
                            />
                            <SearchIcon />
                        </MenuItem>                            
                    </MenuList>
                    </ClickAwayListener>
                </Paper>
                </Grow>
            )}
        </Popper>
    );

}

TableSwitchFilter.propTypes = {
    show: PropTypes.bool.isRequired
}

export default TableSwitchFilter;