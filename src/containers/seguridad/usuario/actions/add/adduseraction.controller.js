import React, { useContext } from 'react';
import axios from '../../../../../axios';

import AuthContext from '../../../../../components/auth/authContext';
import useMessage from '../../../../../components/UI/Snackbar/useMessage';
import useErrors from '../../../../../components/helpers/handleServerResponses/useHandleResp';

import AddUserActionView from './adduseraction.view';


const AddUserAction = props => {

    const { columns,
        winAddState,
        closeAddWindow
    } = props;

    const [authContext] = useContext(AuthContext);
    const showMessage = useMessage();
    const showError = useErrors();

    const Save = (obj) => {
        
        const newObj = {};        
        newObj.name = obj.name
        newObj.rolId = obj['rol.name'];
        newObj.password = obj.password;
        

        axios.post('/security/user/add', newObj,{
            headers: {
                Authorization: 'Bearer ' + authContext.token
            } 
        })
        .then(resp => {
            if(resp.status===201){
                showMessage('success', 'El usuario ha sido adicionado.');
                //setReload(state => !state);
            }else{
                showMessage('error', 'Ha ocurrido un error.');
            }
        })
        .catch(err => {
            console.log(err.response);                
            if(err.response)
                showError(err.response.status, 'El usuario', err.response.data.message);
            else
                showMessage('error', 'Ocurrió un error interno');
        })


    }

    return <AddUserActionView 
            columns={columns}
            winState={winAddState}
            closeWinHandler={closeAddWindow}
            handleSave={Save}
        />;

}
export default React.memo(AddUserAction);