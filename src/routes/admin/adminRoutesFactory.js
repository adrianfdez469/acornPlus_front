import React, { Suspense } from 'react';



const AsyncNomUsuario = React.lazy(() => import('../../containers/seguridad/usuario'));
const AsyncNomCategoria = React.lazy(() => import('../../containers/nomencladores/categorias/categoria.view'));
const AsyncNomMoneda = React.lazy(() => import('../../containers/nomencladores/monedas/moneda.view'));
const AsyncNomAlmacen = React.lazy(() => import('../../containers/nomencladores/almacenes/almacenes.view'));
const AsyncNomTipodescuento = React.lazy(() => import('../../containers/nomencladores/tipodescuento/tipodescuento.view'));
const AsyncNomUnidadmedida = React.lazy(() => import('../../containers/nomencladores/unidadmedida/unidadmedida.view'));
const AsyncNomProveedor = React.lazy(() => import('../../containers/nomencladores/proveedor/proveedor.view'));

const _NOM_USUARIO_ = {
    path: '/admin/security/usuario',
    getCmp: () => {
        return <AsyncNomUsuario />
    }
}

const _NOM_CATEGORIA_ = {
    path: '/admin/nom/categoria',
    getCmp: () => {
        return <AsyncNomCategoria />
    }
}

const _NOM_MONEDA_ = {
    path: '/admin/nom/moneda',
    getCmp: () => {
        return <AsyncNomMoneda />
    }
};

const _NOM_ALMACEN_ = {
    path: '/admin/nom/almacen',
    getCmp: () => {
        return <AsyncNomAlmacen />
    }
}

const _NOM_TIPO_DESCUENTO_ = {
    path: '/admin/nom/tipodescuento',
    getCmp: () => {
        return <AsyncNomTipodescuento />
    }
}

const _NOM_UNIDAD_MEDIDA_ = {
    path: '/admin/nom/unidadmedida',
    getCmp: () => {
        return <AsyncNomUnidadmedida />
    }
}

const _NOM_PROVEEDOR_ = {
    path: '/admin/nom/proveedor',
    getCmp: () => {
        return <AsyncNomProveedor />
    }
}


export default (nameid)=> {
    switch(nameid){
        //case 'seg': return {};
            case 'nom_usuario': return _NOM_USUARIO_;
        
        //case 'nom': return _NOM_;
            case 'nom_categoria': return _NOM_CATEGORIA_;
            case 'nom_moneda': return _NOM_MONEDA_;
            case 'nom_almacen': return _NOM_ALMACEN_;
            case 'nom_tipodescuento': return _NOM_TIPO_DESCUENTO_;
            case 'nom_unidadmedida': return _NOM_UNIDAD_MEDIDA_;
            case 'nom_proveedor': return _NOM_PROVEEDOR_;
        
        //case 'conf': return '/admin/conf';
        
        default: return {
            path: '/admin',
            getCmp: () => <></>
        };
    }
}
