import React, {useReducer, useMemo, useCallback} from 'react';

import authReducer from './authReducers';
import AuthContext from './authContext';

const authInitialState = {
    username: null,
    token: null,
    actions: null,
};

const AuthContextProvider = props => {
    const [state, dispatch] = useReducer(authReducer, authInitialState);

    const estado = useMemo(() => {
        return state;
    });

    const setState = useCallback(dispatch, []);

    return (
        <AuthContext.Provider value={[estado, setState]}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;