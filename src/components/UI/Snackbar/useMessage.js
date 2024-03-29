import { useContext, useCallback } from 'react';
import SnackbarContext from './SnackbarContext';
import SnackbarActions from './SnackbarActions';


const useMessage = () => {
    const showMessage = useContext(SnackbarContext)[1];

    return useCallback((variant, message, details) => {
        showMessage({
            type: SnackbarActions.SHOW, 
            message: message,
            details: details,
            variant: variant
        });
    }, [])
}
export default useMessage;