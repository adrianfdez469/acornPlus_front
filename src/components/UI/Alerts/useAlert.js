import { useContext } from 'react';

import AlertContext from './context/alert.context';
import Actiontypes from './store/alert.actions';

const useAlert = () => {

    const dispatch = useContext(AlertContext)[1];

    const close = () => {
        dispatch({
            type: Actiontypes.CANCEL_ALERT
        });
    }

    return (title, message, callback) => {

        const interceptCallBack = callback => {
            close();
            callback();
        }

        return dispatch({
            type: Actiontypes.SHOW_ALERT,
            payload: {
                open: true,
                title: title,
                message: message,
                agreeAction: () => interceptCallBack(callback),
                desagreeAction: close
            }
        });
    }
}

export default useAlert;