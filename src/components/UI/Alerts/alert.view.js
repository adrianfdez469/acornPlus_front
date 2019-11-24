import React, { useContext } from 'react';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@material-ui/core';

import AlertContext from './context/alert.context';

const CustomAlert = props => {

    //const [open, agreeAction, desagreeAction, title = null, message] = props;
    const [state] = useContext(AlertContext);

    return (
        <Dialog
            open={state.open}
        >
            {state.title !== null && state.title !== '' ? 
                <DialogTitle>
                    {state.title}
                </DialogTitle>
                : null
            }
            {state.message !== null && state.message !== '' ? 
                <DialogContent>
                    <DialogContentText>
                        {state.message}
                    </DialogContentText>
                </DialogContent>
                : null
            }
            
            <DialogActions>
                <Button 
                    onClick={state.desagreeAction}
                >
                    NO
                </Button>
                <Button
                    onClick={state.agreeAction}
                >
                    SI
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CustomAlert;