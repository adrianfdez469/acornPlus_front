import React, {Suspense} from 'react';
import { Route } from 'react-router-dom';
import routesFactory from './adminRoutesFactory';


const inlineStyles = {
    separator: {
        marginTop: 20,
        marginBottom: 10
    }
};

const AdminRoutes = props => {

    const {actions} = props;

    const routes = actions.map(act => {
        return (
            <div style={inlineStyles.separator} key={act.id}>
                <Suspense fallback='Cargando...'>
                    <Route 
                        path={routesFactory(act.nameid).path} 
                        render={() => routesFactory(act.nameid).getCmp()} 
                    />
                </Suspense>                
            </div>
        );
    });
    return routes;
}

export default React.memo(AdminRoutes);