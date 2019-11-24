import React from 'react';
import PropTypes from 'prop-types';

import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import InfoTooltip from '../../infoTooltip';

const Search = (props) => {
    const {inputValue, changeInputValue, searchAction} = props;

    const onClearSearch = () => {
        changeInputValue('');
        searchAction();
    }

    return (
        <TextField
            value={inputValue}
            onChange={(event) => changeInputValue(event.target.value)}
            placeholder='Búsqueda rápida'
            variant='outlined'
            margin='dense'
            InputProps={
                {
                endAdornment: (
                    <InputAdornment position="start">
                        
                        <InfoTooltip title='Buscar' disabled={inputValue === ''}>
                            <IconButton disabled={inputValue === ''} size='small' edge='end' onClick={() => searchAction(inputValue)}>
                                <SearchIcon/>
                            </IconButton>
                        </InfoTooltip>
                        
                        <InfoTooltip title='Limpiar' disabled={inputValue === ''}>
                            <IconButton disabled={inputValue === ''} size='small' edge='end' onClick={onClearSearch}>
                                <ClearIcon/>
                            </IconButton>
                        </InfoTooltip>
                    </InputAdornment>
                )
            }}
        />
    );
}

Search.propTypes = {
    searchAction: PropTypes.func.isRequired,
    changeInputValue: PropTypes.func.isRequired
}

export default Search;