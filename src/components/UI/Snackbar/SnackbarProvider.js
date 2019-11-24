import React, {useReducer} from 'react';
import SnackbarContext from './SnackbarContext';
import reducer from './SnackbarReducer';
import initialState from './SnackbarInitialState';


const SnackbarContextProvider = props => {
    
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <SnackbarContext.Provider value={[state, dispatch]}>
            {props.children}
        </SnackbarContext.Provider>
    );
}


export default SnackbarContextProvider;