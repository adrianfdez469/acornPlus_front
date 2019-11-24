import React, { useState, useEffect } from 'react';
import SearchView from './search.view';

const SearchContainer = (props) => {

    const [inputValue, setInputValue] = useState('');
    const changeInputValue = value => {
        setInputValue(value);
    }

    useEffect(() => {
        if(props.clearFilter === true){
            changeInputValue('');
        }
        
    }, [props.clearFilter])

    return <SearchView 
        inputValue={inputValue}
        changeInputValue={changeInputValue}
        {...props}
    />;
}



export default SearchContainer;