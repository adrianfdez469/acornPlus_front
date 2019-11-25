import React from 'react';
import Draggable from 'react-draggable';

import axios from '../../../../axios';

import classes from './Ubicacion.module.css';

const Ubicacion = ({data, notificar}) => {


    const x = data.posX || 0;
    const y = data.posY || 0;
    
    const styles = [classes.Ubicacion];
    const style = {
        top: `${x}px`,
        left: `${y}px`
    };
    if(data.notificar){
        styles.push(classes.notificarUbicacion);
    }


    const pillClasses = [classes.Pill];
    if(data.ocupados === 0)
        pillClasses.push(classes.Disponible);
    else if(data.ocupados - data.capacidad > 0)
        pillClasses.push(classes.SobreOcupado);
    else if(data.ocupados - data.capacidad < 0)
        pillClasses.push(classes.Ocupado);
    if(data.notificar)
        pillClasses.push(classes.notificarPIll);

    

    const notificarAlServer = () => {
        axios.post('/notificacion', {
            id: data.id
        })
        .then(resp => console.log(resp))
        .catch(err => console.log(err));
    }


    return (
        <Draggable >
            <div 
                className={styles.join(' ')} 
                style={style}
                onClick={notificarAlServer}
            >
                {data.name}
                <span 
                    className={pillClasses.join(' ')}
                >
                    <strong>{data.ocupados}</strong>/<strong>{data.capacidad}</strong>
                </span>
            </div>
        </Draggable>
    )
}

export default Ubicacion;