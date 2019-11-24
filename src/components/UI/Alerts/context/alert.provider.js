import React, { useReducer } from 'react';

import AlertContext from './alert.context';
import AlertReducer from '../store/alert.reducer';
import initialState from './alert.initialstate';

const AlertProvider = props => {

    const [state, dispatch] = useReducer(AlertReducer,initialState);

    return <AlertContext.Provider value={[state, dispatch]}>
        {props.children}
    </AlertContext.Provider>;
}

export default AlertProvider;