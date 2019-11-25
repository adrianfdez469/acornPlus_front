import React from 'react';
import PropTypes from 'prop-types';

import {
    Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem, Checkbox, Input, InputAdornment
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import GreaterThanIcon from '@material-ui/icons/ArrowForwardIos';
import LessThanIcon from '@material-ui/icons/ArrowBackIos';
import EqualIcon from '@material-ui/icons/DragHandle';

const TableNumberFilter = (props) => {

    const {filterIconRef, show, handleShow, 
        
        GTsearchCheck, GTonChangeCheck, GTsearchState, GTonChangeSearchField,
        LTsearchCheck, LTonChangeCheck, LTsearchState, LTonChangeSearchField,
        searchCheck, onChangeCheck, searchState, onChangeSearchField
        
        } = props;

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
                                checked={GTsearchCheck} 
                                onChange={GTonChangeCheck} 
                                disabled={GTsearchState === ''}
                            />
                            <Input
                                value={GTsearchState}
                                onChange={GTonChangeSearchField}
                                placeholder={`Mayor que`}
                                type='number'
                                startAdornment={
                                    <InputAdornment position="start">
                                        <GreaterThanIcon />
                                    </InputAdornment>
                                }
                                endAdornment={
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                }
                            />
                        </MenuItem>
                        <MenuItem>
                            <Checkbox 
                                color='primary' 
                                checked={LTsearchCheck} 
                                onChange={LTonChangeCheck} 
                                disabled={LTsearchState === ''}
                            />
                            <Input
                                value={LTsearchState}
                                onChange={LTonChangeSearchField}
                                placeholder={`Menor que`}
                                type='number'                                
                                startAdornment={
                                    <InputAdornment position="start">
                                        <LessThanIcon />
                                    </InputAdornment>
                                }
                                endAdornment={
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                }
                            />
                        </MenuItem>
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
                                placeholder={`Igual a`}
                                type='number'                                
                                startAdornment={
                                    <InputAdornment position="start">
                                        <EqualIcon />
                                    </InputAdornment>
                                }
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

TableNumberFilter.propTypes = {
    show: PropTypes.bool.isRequired
}

export default TableNumberFilter;