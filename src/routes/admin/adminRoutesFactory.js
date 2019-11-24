import React, { Suspense } from 'react';


//import Nomencladores from '../../containers/nomencladores/ListadoNomencladores';
const AsyncNomCategoria = React.lazy(() => import('../../containers/nomencladores/categorias/categoria.view'));
const AsyncNomMoneda = React.lazy(() => import('../../containers/nomencladores/monedas/moneda.view'));
const AsyncNomAlmacen = React.lazy(() => import('../../containers/nomencladores/almacenes/almacenes.view'));
/*const _NOM_ = {
    path: '/admin/nom',
    getCmp: () => {
        return <Nomencladores />
    }
}*/
const _NOM_CATEGORIA_ = {
    path: '/admin/nom/categoria',
    getCmp: () => {
        return  <Suspense fallback="Cargando...">
                    <AsyncNomCategoria />
                </Suspense>
    }
}
const _NOM_MONEDA_ = {
    path: '/admin/nom/moneda',
    getCmp: () => {
        return  <Suspense fallback="Cargando...">
                    <AsyncNomMoneda />
                </Suspense>
    }
};

const _NOM_ALMACEN_ = {
    path: '/admin/nom/almacen',
    getCmp: () => {
        return  <Suspense fallback="Cargando...">                    
                    <AsyncNomAlmacen />
                </Suspense>
    }
}


export default (nameid)=> {
    switch(nameid){
        //case 'seg': return {};
        
        //case 'nom': return _NOM_;
            case 'nom_categoria': return _NOM_CATEGORIA_;
            case 'nom_moneda': return _NOM_MONEDA_;
            case 'nom_almacen': return _NOM_ALMACEN_;
        
        //case 'conf': return '/admin/conf';
        
        default: return {
            path: '/admin',
            getCmp: () => <></>
        };
    }
}
