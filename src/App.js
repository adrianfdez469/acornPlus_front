import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import ExerciseApp from './exirsice/Main';

import PageNotFound from './components/404/404';


import AuthContextProvider from './components/auth/authContextProvider';
import CustomSnackbar from './components/UI/Snackbar/Snackbar';
import SnackbarProvider from './components/UI/Snackbar/SnackbarProvider';
import CustomAlert from './components/UI/Alerts/alert.view';
import AlertProvider from './components/UI/Alerts/context/alert.provider';

const AsyncVenta = React.lazy(() => import('./components/Venta/Venta'));
const AsyncAdministration = React.lazy(() => import('./containers/administration/administration'));


const App = props => {


  
  return (
    //<MuiThemeProvider theme={darkTheme}>
      <Switch>
        
        <Route path="/admin"  render={() => 
          <SnackbarProvider>
            <AuthContextProvider>
              <AlertProvider>
                <Suspense fallback='Cargando...' >
                  <AsyncAdministration />
                </Suspense>
                <CustomSnackbar />
                <CustomAlert />
              </AlertProvider>
            </AuthContextProvider>
          </SnackbarProvider>
        }/>
        

        <Route path="/exercise" exact component={ExerciseApp} />
        <Route path="/" exact render={() => <Suspense fallback='Cargando...' ><AsyncVenta /></Suspense>}/>
        <Route path="/404" component ={PageNotFound} exact />
        <Redirect to="/404" />
      </Switch>
    //</MuiThemeProvider>
  );
}

export default App;
