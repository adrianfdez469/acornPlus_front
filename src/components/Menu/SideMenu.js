import React from 'react';
import { withRouter } from 'react-router-dom';

import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    ListSubheader,
    
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import authActions from '../auth/authActions';
import SideMenuItem from './SideMenuItem';

const SideMenu = props => {

  console.log('RENDERING SIDE MENU');


    const {state, close, authState, dispatchAuth} = props;
    
    const logout = () => {
      close();
      dispatchAuth({type: authActions.LOGOUT_START});
      props.history.push('/admin');
    }

    const sideList = (
        <> 
          
          <ListSubheader component="div" style={{lineHeight: '32px'}}>
            {`Usuario: ${authState.username}`}
            <br/>
            {`Rol: ${authState.rolename}`}
          </ListSubheader>
          
          <Divider/>
          <Divider/>
          <List>
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
        </>
      );

    return (
        <Drawer open={state} onClose={close}>
            {sideList}
        </Drawer>
    );
};

export default React.memo(withRouter(SideMenu));