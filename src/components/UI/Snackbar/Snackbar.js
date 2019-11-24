import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
    Snackbar,
    IconButton,
    makeStyles,
    SnackbarContent,
    Typography
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import { amber, green } from '@material-ui/core/colors';


import snackbarActions from './SnackbarActions';
import snackbarContext from './SnackbarContext';



const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };
  
  const useStyles1 = makeStyles(theme => ({
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    info: {
      backgroundColor: theme.palette.primary.main,
    },
    warning: {
      backgroundColor: amber[700],
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
    message: {
      display: 'flex',
      alignItems: 'left',
    },
    details: {
      marginLeft: '2rem'
    }
  }));
  
  function MySnackbarContentWrapper(props) {
    const classes = useStyles1();
    const { className, message, details, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];
  
    return (
        <SnackbarContent
            className={`${classes[variant]} ${className}`}
            aria-describedby="client-snackbar"
            message={
                <>
                  <span id="client-snackbar" className={classes.message}>
                    <Icon className={`${classes.icon} ${classes.iconVariant}`} />
                    <Typography variant='body1'>{message}</Typography>
                  </span>
                  <Typography variant='body2'>{details}</Typography>
                  </>
            }
            action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                    <CloseIcon className={classes.icon} />
                </IconButton>
            ]}
            
            {...other}
        />
    );
  }
  
  MySnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
  };

const CustomSnackbar = props => {
    const [state, dispatch] = useContext(snackbarContext);
    const handleClose = () => {        
        return dispatch({
            type: snackbarActions.HIDE
        });
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={state.show}
            autoHideDuration={state.autoHideDuration}
            onClose={handleClose}
        >
            <MySnackbarContentWrapper
                onClose={handleClose}
                variant={state.variant}
                message={state.message}
                details={state.details}
            />
        </Snackbar>
    );
}

export default CustomSnackbar;