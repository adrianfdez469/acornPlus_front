import React, { useState } from 'react';

import UsuarioView from './usuario.view';

const UsuarioController = () => {

    const [winAddState, setAddWinState] = useState(false);

    const closeAddWindow = () => {
        setAddWinState(false);
    }
    const openAddWinHandler = () => {
        setAddWinState(true);
    }
    
    return <UsuarioView 
        winAddState={winAddState}
        closeAddWindow={closeAddWindow}
        openAddWinHandler={openAddWinHandler}
    />

}
export default React.memo(UsuarioController);