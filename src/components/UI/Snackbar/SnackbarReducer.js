import SnackbarActions from './SnackbarActions';
import initialState from './SnackbarInitialState';

const messageAutoHideDuraions = (message) => {
    const cantPalabras = message.split(' ').length;
    return 3000 + (cantPalabras * 150);
}

const SnackbarReducer = (state = initialState, actions) => {
    switch(actions.type){
        case SnackbarActions.SHOW: 
        return {
            ...state,
            show: true,
            message: actions.message,
            details: actions.details,
            variant: actions.variant,
            autoHideDuration: messageAutoHideDuraions(actions.message)
        };
        case SnackbarActions.HIDE: return {
            ...initialState,
            variant: state.variant
        };
        default: return state;
    }
}

export default SnackbarReducer;