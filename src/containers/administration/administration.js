import React, { useState, useEffect, useContext, useCallback } from 'react';

import axios from '../../axios';
import Login from '../../components/auth/Login';

import AuthContext from '../../components/auth/authContext';
import authActions from '../../components/auth/authActions';

import Header from '../../components/header/header';
import SideMenu from '../../components/Menu/SideMenu';
import AdminRoutes from '../../routes/admin/adminRoutes';

import Progress from '../../components/UI/Progress/progress.view';
import useMessage from '../../components/UI/Snackbar/useMessage';
import useError from '../../components/helpers/handleServerResponses/useHandleResp';

const Admin = props => {
    console.log('RENDER ADMINISTRATION.JS');
    
    const [menuOpen, setMenuOpen] = useState(false);
    const [authState, dispatch] = useContext(AuthContext);
    const dispatchAuth = useCallback(dispatch,[]);

    const [loading, setLoading] = useState(true);
    const showMessage = useCallback (useMessage(),[]);
    const handleError = useCallback (useError(),[]);

    useEffect( () => {
        console.log('CARGANDO ACCIONES');
        
        setLoading(true);

        const token = localStorage.getItem('token');
        const expDateStorage = localStorage.getItem('expDate');

        if(token && expDateStorage){
            const currentDate = new Date();
            const expDate = new Date(expDateStorage);
        
            if(expDate.getTime() > currentDate.getTime()){

                //Pedir las acciones permitidas del usuario
                axios.get('/security/auth/actions', {
                    headers: {
                            Authorization: 'Bearer ' + token
                    }
                })
                    .then(resp => {
                        if(resp.status === 200){
                            dispatchAuth({
                                type: authActions.LOGIN_SUCCES, 
                                payload: {
                                    username: resp.data.user.username,
                                    rolename: resp.data.rol.name,
                                    token: token,
                                    actions: resp.data.actions
                                }
                            });
                            setLoading(false);
                        }else{
                            showMessage('error', 'Ha ocurrido un error');
                            dispatchAuth({
                                type: authActions.LOGIN_SUCCES, 
                                payload: {
                                    username: '',
                                    rolename: '',
                                    token: token,
                                    actions: []
                                }
                            });
                            setLoading(false);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        if(err.response)
                            handleError(err.response.status, 'La configuracion del usuario', err.response.data.message);
                        else
                            showMessage('error', 'Ha ocurrido un error interno');
                        setLoading(false);
                    });
            }else{
                showMessage('error', 'Ha caducado su tiempo en el sistema.')
                setLoading(false);
                dispatchAuth({type: authActions.LOGOUT_SUCCES});    
            }
        }else{
            showMessage('error', 'Necesita introducir sus credencales.')
            setLoading(false);
            dispatchAuth({type: authActions.LOGOUT_SUCCES});
        }
    }, [ dispatchAuth, handleError, showMessage]);
    

    
    const elements = (authState && authState.actions) ? 
    <>
        <Header openMenu={setMenuOpen.bind(this, true)} />
        <SideMenu state={menuOpen} close={setMenuOpen.bind(this, false)}/>
        <AdminRoutes actions={authState.actions} />
    </> : <Login />
        
    const view = (loading) ? <Progress /> : elements ;

    return (
        <React.StrictMode>
                {view}
        </React.StrictMode>
    );

}

export default React.memo(Admin);