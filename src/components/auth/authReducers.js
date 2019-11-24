import authActions from './authActions';


const loginEndSuccesfuly = ({username, rolename, token, expDate}) => {
    localStorage.setItem('token', token);
    localStorage.setItem('expDate', expDate);
    return {
        username: username,
        rolename: rolename,
        token: token,
        actions: null,
    };
}

const loginSuccess = (prevState, {username, rolename, token, actions}) => {
    
    return {
        username: username,
        rolename: rolename,
        token: token,
        actions: actions
    };
}

const logoutStart = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expDate');
    return initialState;
    
}

const logoutSuccess = () => {
    return initialState;
}

const initialState = {
    username: null,
    rolename: null,
    token: null,
    actions: null
};
const authReducer = (state = initialState, action) => {
    switch(action.type){
        case authActions.LOGIN_END_SUCCESFULY: return loginEndSuccesfuly(action.payload);
        case authActions.LOGIN_SUCCES: return loginSuccess(state, action.payload);
        
        case authActions.LOGOUT_START: return logoutStart();
        case authActions.LOGOUT_SUCCES: return logoutSuccess();
        
        default: return state;
    }
}

export default authReducer;