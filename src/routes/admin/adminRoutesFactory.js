import React, { useCallback } from 'react';

const AsyncNomUsuario = React.lazy(() => import('../../containers/seguridad/usuario'));
const AsyncNomRol = React.lazy(() => import('../../containers/seguridad/roles/rol.view'));
const AsyncNomCategoria = React.lazy(() => import('../../containers/nomencladores/categorias/categoria.view'));
const AsyncNomMoneda = React.lazy(() => import('../../containers/nomencladores/monedas/moneda.view'));
const AsyncNomAlmacen = React.lazy(() => import('../../containers/nomencladores/almacenes/almacenes.view'));
const AsyncNomTipodescuento = React.lazy(() => import('../../containers/nomencladores/tipodescuento/tipodescuento.view'));
const AsyncNomUnidadmedida = React.lazy(() => import('../../containers/nomencladores/unidadmedida/unidadmedida.view'));
const AsyncNomProveedor = React.lazy(() => import('../../containers/nomencladores/proveedor/proveedor.view'));
const AsyncNomCliente = React.lazy(() => import('../../containers/nomencladores/cliente/cliente.view'));

const _NOM_USUARIO_ = {
    path: '/admin/security/usuario',
    getCmp: () => <AsyncNomUsuario />
}

const _NOM_ROL_ = {
    path: '/admin/security/rol',
    getCmp: () => <AsyncNomRol />
}

const _NOM_CATEGORIA_ = {
    path: '/admin/nom/categoria',
    getCmp: () => <AsyncNomCategoria />
}

const _NOM_MONEDA_ = {
    path: '/admin/nom/moneda',
    getCmp: () => <AsyncNomMoneda />
};

const _NOM_ALMACEN_ = {
    path: '/admin/nom/almacen',
    getCmp: () => <AsyncNomAlmacen />
}

const _NOM_TIPO_DESCUENTO_ = {
    path: '/admin/nom/tipodescuento',
    getCmp: () => <AsyncNomTipodescuento />
}

const _NOM_UNIDAD_MEDIDA_ = {
    path: '/admin/nom/unidadmedida',
    getCmp: () => <AsyncNomUnidadmedida />
}

const _NOM_PROVEEDOR_ = {
    path: '/admin/nom/proveedor',
    getCmp: () => <AsyncNomProveedor />
}

const _NOM_CLIENTE_ = {
    path: '/admin/nom/cliente',
    getCmp: () => {
        return <AsyncNomCliente />
    }
}


export default (nameid)=> {
    console.log('REDERING ADMINROUTE FACTORY');
    
    switch(nameid){
        //case 'seg': return {};
            case 'nom_usuario': return _NOM_USUARIO_;
            case 'nom_rol': return _NOM_ROL_;
        
        //case 'nom': return _NOM_;
            case 'nom_categoria': return _NOM_CATEGORIA_;
            case 'nom_moneda': return _NOM_MONEDA_;
            case 'nom_almacen': return _NOM_ALMACEN_;
            case 'nom_tipodescuento': return _NOM_TIPO_DESCUENTO_;
            case 'nom_unidadmedida': return _NOM_UNIDAD_MEDIDA_;
            case 'nom_proveedor': return _NOM_PROVEEDOR_;
            case 'nom_cliente': return _NOM_CLIENTE_;
        
        //case 'conf': return '/admin/conf';
        
        default: return {
            path: '/admin',
            getCmp: () => <></>
        };
    }
};
