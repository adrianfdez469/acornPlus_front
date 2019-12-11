import React, {useState, useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Collapse, makeStyles,
    List
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import BuildIcon from '@material-ui/icons/Build';
import SecurityIcon from '@material-ui/icons/Security';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import routesFactory from '../../routes/admin/adminRoutesFactory';

const IconFactory = props => {
    const { actionType } = props;
    switch(actionType){
        case 'conf': return <SettingsIcon />;
        case 'seg': return <SecurityIcon/>;
        case 'nom': return <BuildIcon />;
        default: return null;
    }
}


const useStyles = makeStyles(theme => ({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));


const SideMenuItem = props => {

    console.log('RENDERING SIDE MENU ITEM');
    

    const { action, actions, close } = props;
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const accionesHijas = actions.filter(act => act.parentid === action.id);
    const hasChild = accionesHijas.length > 0;
    const handleVisibility = useCallback(() => {
        setOpen(state => !state);
    }, []);

    const subMenu = useMemo(() => {
        return actions
            .filter(act => act.parentid === action.id)
            .map(act => {
                return (
                    <Link to={routesFactory(act.nameid).path} style={{textDecoration: 'none'}} key={act.id} >
                        <ListItem button className={classes.nested} onClick={close}>
                            <ListItemIcon ><span></span></ListItemIcon>
                            <ListItemText>
                                <Typography color='textPrimary'>
                                    {act.name}
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </Link>
                );
            })
    },[actions, action.id, close, classes.nested]);

    return (
        <>
            <ListItem button onClick={handleVisibility}>
                    <ListItemIcon>
                        <IconFactory actionType={action.nameid} />
                    </ListItemIcon>
                    <ListItemText>
                        <Typography color='textPrimary'>
                            {action.name}
                        </Typography>
                    </ListItemText>
                    {hasChild ? open ? <ExpandLessIcon /> : <ExpandMoreIcon/> :  null}
            </ListItem>
            {hasChild ?
            <Collapse in={open} timeout='auto' /*unmountOnExit*/>            
                <List>
                    {subMenu}
                </List> 
            </Collapse>
            : null }
        </>
    );
}

SideMenuItem.propTypes = {
    action: PropTypes.object.isRequired
};

export default React.memo(SideMenuItem);