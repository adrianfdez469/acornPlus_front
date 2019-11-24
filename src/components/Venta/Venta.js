import React from 'react';

import Mapa from './Mapa/Mapa';

import classes from './Venta.module.css';

const Venta = (props) => {
    return (
    <div className={classes.Venta}>
        <div className={classes.PanelIzq}>Dtos ventas</div>
        
        <div className={classes.PanelDer}>
            <div className={classes.Arriba}><Mapa /></div>
            
            <div className={classes.Abajo}></div>
        </div>
        
        
        
    </div>);
}

export default Venta;