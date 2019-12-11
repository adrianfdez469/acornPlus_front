import React, { useState, useRef, useContext } from 'react'; 
import axios from '../../axios';

import { 
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Grid,
    Button,
    DialogActions
} from '@material-ui/core';

import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKey from '@material-ui/icons/VpnKey';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import authActions from './authActions';
import AuthContext from './authContext';
import useMessage from '../UI/Snackbar/useMessage';
import useError from '../helpers/handleServerResponses/useHandleResp';

const Login = props => {

    console.log('RENDERING LOGIN');
    

    const dispatch = useContext(AuthContext)[1];
    const [visibility, setVisibility] = useState(false);
    const userInputRef = useRef();
    const userPassRef = useRef();
    
    const [isUserInvalid, setUserInvalid] = useState(false);
    const [isPassInvalid, setPassInvalid] = useState(false);

    const showMessage = useMessage();
    const handleError = useError();

    const onChangeVisibilityPass = () => {
        setVisibility(oldVisibility => {
            return !oldVisibility;
        })
    }

    const loginAction = () => {
        
        const username = userInputRef.current.value;
        const userpassword = userPassRef.current.value;

        let stop = false;
        if(username === ''){
            setUserInvalid(true);
            stop = true;
        }
        if(userpassword === ''){
            setPassInvalid(true);
            stop = true;
        }
        if(stop) return;
            


        axios.post('/security/auth/login', {
                userName: username,
                password: userpassword
            })
            .then(resp => {
                if(resp.status=== 200){
                    const user = resp.data.user;
                    const fecha = new Date();
                    const expDate = new Date(fecha.getTime() + (user.tokenExpiresIn * 1000));
                    
                    dispatch(
                        {
                            type: authActions.LOGIN_END_SUCCESFULY, 
                            payload: {
                                username: user.usernme,
                                rolename: '',
                                token: user.token,
                                expDate: expDate
                            }
                    });
                }else{
                    showMessage('error', 'Ha ocurrido un error');
                }
            })
            .catch(err => {
                
                if(err.response){
                    handleError(err.response.status, null, err.response.data.message);
                }else{
                    showMessage('error', 'Ha ocurrido un error');
                    dispatch({type: authActions.LOGOUT_SUCCES});
                }
            });
    } 

    const keyPressInPasswordInput = event => {
        if(event.key === 'Enter'){
            loginAction();
        }
    }

    return (
            <Dialog open>
                <DialogTitle>LOGIN</DialogTitle>
                <DialogContent>
                
                    <Grid container spacing={1} alignItems='flex-end'>
                        <Grid item>
                            <AccountCircle />
                        </Grid>
                        <Grid item>
                            <TextField 
                                label='Usuario' 
                                inputRef={userInputRef} 
                                error={isUserInvalid} 
                                autoFocus 
                                required 
                            />
                        </Grid>
                    </Grid>
                    
                    <Grid container spacing={1} alignItems='flex-end'>
                        <Grid item>
                            <VpnKey />
                        </Grid>
                        <Grid item>
                            <TextField 
                                label='Contraseña' 
                                type={visibility ? 'text' : 'password'} 
                                inputRef={userPassRef} 
                                error={isPassInvalid} 
                                required
                                onKeyPress={keyPressInPasswordInput}
                            />
                        </Grid>
                        <Grid item>
                            {visibility ? <Visibility onClick={onChangeVisibilityPass}/> : <VisibilityOff onClick={onChangeVisibilityPass}/> }
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>                    
                    <Button variant='text' color="primary" onClick={loginAction}>
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
    );
}

export default Login;