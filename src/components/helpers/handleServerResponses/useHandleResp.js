import { useContext} from 'react';
import useMessage from '../../UI/Snackbar/useMessage';
import authActions from '../../auth/authActions';
import AuthContext from '../../auth/authContext';

const errorsResp = {
    401: {
        mensaje: () => 'Usuario no autenticado.',
        detalles: details => details,
        action: () => {

        }
    },
    403: {
        mensaje: () => 'Usuario no autorizado.',
        detalles: details => details,
        action: () => {}
    },
    404: {
        mensaje: concepto => `${concepto} no se encuentra`,
        detalles: details => details,
        action: () => {}
    },
    422: {
        mensaje: () => 'Datos de entrada no válidos',
        detalles: details => details,
        action: () => {}
    },
    500: {
        mensaje: () => 'Ocurrió un error interno',
        detalles:  details => details,
        action: () => {}
    }
}

const useHandleResp = () => {
    
    const mostrarMensaje = useMessage();
    const dispatch = useContext(AuthContext)[1];
    
    return (status, concepto = 'Elemento', details) => {
        const resp = errorsResp[status];
        if(resp){
            const mensaje = resp.mensaje(concepto || 'Elemento');
            const detalles = resp.detalles(details);
            if(status === 401){
                dispatch({type: authActions.LOGOUT_START});
            }
            mostrarMensaje('error', mensaje, detalles);
        }
    }
}

export default useHandleResp;