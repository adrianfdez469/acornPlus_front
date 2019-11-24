import React, {useReducer} from 'react';

import authReducer from './authReducers';
import AuthContext from './authContext';

const authInitialState = {
    username: null,
    token: null,
    actions: null,
};

const AuthContextProvider = props => {
    const [state, dispatch] = useReducer(authReducer, authInitialState);
    return (
        <AuthContext.Provider value={[state, dispatch]}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;