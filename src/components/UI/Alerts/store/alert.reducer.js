import alertActions from './alert.actions';

import initialState from '../context/alert.initialstate';

const showAlert = payload => {
    return payload;
}

const closeAlert = () => {
    return initialState;
}

const alertReducer = (state, action) => {
    switch(action.type){
        case alertActions.SHOW_ALERT: 
            return showAlert(action.payload);
        case alertActions.CANCEL_ALERT:
            return closeAlert();
        default: return state;
    }
}

export default alertReducer;