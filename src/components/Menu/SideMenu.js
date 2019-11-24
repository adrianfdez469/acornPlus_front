import React, {useContext} from 'react';
import { withRouter } from 'react-router-dom';

import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    makeStyles,
    ListSubheader,
    
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import authContext from '../auth/authContext';
import authActions from '../auth/authActions';
import SideMenuItem from './SideMenuItem';

const useStyles = makeStyles(theme => ({
  list: {
    width: 250
  },
  menuHeader: {
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    //display: 'flex';
    position: 'relative',
    alignItems: 'center'
    //justifyContent: 'flex-end',
  },
  colorHeader: {
    backgroundColor: theme.palette.primary.light
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const SideMenu = props => {

    const {state, close} = props;
    const [authState, dispatch] = useContext(authContext);
    
    const logout = () => {
      close();
      dispatch({type: authActions.LOGOUT_START});
      props.history.push('/admin');
    }

    const classes = useStyles();
    const sideList = (
        <div
          className={classes.list}
          //onClick={close}
        > 
          
          <ListSubheader component="div" style={{lineHeight: '32px'}}>
            {`Usuario: ${authState.username}`}
            <br/>
            {`Rol: ${authState.rolename}`}
          </ListSubheader>
          
          <Divider/>
          <Divider/>
          <List 
            className={classes.root}
          >
            {authState.actions
              .filter(act => !act.parentid)
              .map(act => {
              return <SideMenuItem action={act} key={act.id} actions={authState.actions} close={close}/>
            })}
          </List>
          <Divider />
          <Divider />
          <List>
              <ListItem button onClick={logout}>
                <ListItemIcon>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary='Salir' />
              </ListItem>
          </List>
        </div>
      );

    return (
        <Drawer open={state} onClose={close}>
            {sideList}
        </Drawer>
    );
}

export default withRouter(SideMenu);