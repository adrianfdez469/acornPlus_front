import React, {useEffect, useReducer } from 'react';
import openSocket from 'socket.io-client';

import Ubicacion from './Ubicacion/Ubicacion';

import classes from './Map.module.css';

const Mapa = (props) => {

    const reducer = (state, action) => {
        if(action.type === 'NOTIFICAR'){
            const ubicacionIdx = state.findIndex(ub => ub.id === action.id);
            const copiedUbicaciones = [...state];
            copiedUbicaciones[ubicacionIdx] = {...state[ubicacionIdx], notificar: !state[ubicacionIdx].notificar};
            return copiedUbicaciones;    
        }else{
            return state;
        }
    }

    const [ubicaciones, dispatch] = useReducer(reducer, [
        {
            id: 1,
            name: 'Mesa 1',
            posX: 100,
            posY: 100,
            capacidad: 4,
            ocupados: 3,
            monto: 215,
            orden: [],
            cliente: 'Smith',
            opened: new Date(),
            notificar: false
        },
        {
            id: 2,
            name: 'Mesa 2',
            posX: 100,
            posY: 500,
            capacidad: 4,
            ocupados: 0,
            monto: 0,
            orden: [],
            cliente: 'Jhon',
            opened: new Date(),
            notificar: false

        }
    ]);

    const server = 'http://127.0.0.1:8080';
    useEffect(()=> {
        const socket = openSocket(server);
        socket.on('mapa', data => {
            if(data.action === 'notificar'){
                dispatch({type: 'NOTIFICAR', id: data.id});
            }
        })
    }, [])

    

    return (
        <div className={classes.Map}>
            {ubicaciones.map(ubic => {
                return <Ubicacion key={ubic.id} data={ubic} />
            })}
        </div>
    );
}

export default Mapa;