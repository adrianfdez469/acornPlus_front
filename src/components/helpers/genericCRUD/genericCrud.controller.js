import React, {useState, useEffect, useContext, useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';

import axios from '../../../axios';

import uiDataTypes from '../uiDataTypes';

import AuthContext from '../../../components/auth/authContext';
import useMessage from '../../../components/UI/Snackbar/useMessage';
import useErrors from '../../../components/helpers/handleServerResponses/useHandleResp';
import useAlerts from '../../../components/UI/Alerts/useAlert';

import GenericCRUDView from './genericCrud.view';
import {FormElementsType} from '../formElements'

/**
 * 
 * @param {relativePath, tableColumns, idioma, mainSearchForColumn} props 
 * @param tableColumns { 
 *      header: string,
 *      dataType: uiDataTypes.any,
 *       mappedBy: string,
 *       sorteable: bool,
 *       filterable: bool,
 *       props: {
 *           align: ['left', 'center', 'rigth'][any]
 *       },
 *       formElement: {
 *           type: FormElementsType,
 *           initialValue: [
 *               PropTypes.string,
 *               PropTypes.number,
 *               PropTypes.bool
 *           ][any],
 *           customProps: object,
 *           validator: func
 *       },
 *       render: func
 *  }
 * 
 */

const GenericCRUD = props => {
    
    console.log('RENDERING GENERIC CRUD CONTROLLER');
    
    const {
        relativePath,
        tableColumns,
        idioma,
        mainSearchForColumn
    } = props;
    
    const [authContext] =  useContext(AuthContext);    
    
    const showMessage = useCallback(useMessage(),[]);
    const showError = useCallback(useErrors(),[]);
    const showAlert = useCallback(useAlerts(),[]);
    
    const [winState, setWinState] = useState(false);
    const [rows, setRows] = useState({data: [],total: 0});
    const [pagination, setPagination] = useState({start: 0, limit: 10, page: 0});

    /*const columns = [
        {
            header: 'Nro',
            dataType: uiDataTypes.Text,
            mappedBy: 'Index',
            sorteable: false,
            filterable: false
        }
    ];
    columns.push(...tableColumns);*/
    const columns = useMemo(() => {
        return [ {
            header: 'Nro',
            dataType: uiDataTypes.Text,
            mappedBy: 'Index',
            sorteable: false,
            filterable: false
        }, ...tableColumns];
    }, [tableColumns]);
    
    const [filters, setFilters] = useState({});
    const [orders, setOrders] = useState([]);
    
    const [reload, setReload] = useState(false);
    const [clearMainFilter, setClearMainFilter] = useState(false);
    const [disableColumnFilters, setDisableColumnsFilters] = useState(false);
    const [editing, setEditing] = useState(null);

    
    useEffect(() => {      
        console.log('CARGANDO TABLA');
                       
            axios.post(`${relativePath}/get`, {
                pagination: pagination,
                filters: filters,
                orders: orders
            },{
                headers: {
                    Authorization: 'Bearer ' + authContext.token
                }
            })
            .then(resp => {
                if(resp.status === 200){
                    setRows({
                        data: resp.data.rows,
                        total: resp.data.count
                    });
                }else{
                    showMessage('error', 'Ha ocurrido un error');
                }                
            })
            .catch(err => {
                console.log(err);
                if(err.response)
                    showError(err.response.status, idioma.concepto, err.response.data.message);
                else
                    showMessage('error', 'Ocurrió un error interno');                
            });
    }, [pagination, filters, reload, orders, showMessage, showError, relativePath, 
        authContext.token, idioma.concepto]);

    const openWinHandler = useCallback(() => setWinState(true), []);
    const closeWinHandler = useCallback(() => {
        setWinState(false);
        setEditing(null);
    }, []);
    const changingLimit = useCallback(number => {
        setPagination(old => {
            return {
                ...old,
                limit: number,
                page: 0,
                start: 0
            };
        })
    }, []);
    const changingPage = useCallback(page => {
        setPagination(old => {
            return {
                ...old,
                page: page,
                start: page * old.limit
            }
        });        
    },[]);

    const handleSave = useCallback(data => {
        if(editing === null){
            axios.post(`${relativePath}/add`, data,{
                headers: {
                    Authorization: 'Bearer ' + authContext.token                    
                } 
            })
            .then(resp => {
                if(resp.status===201){
                    showMessage('success', `${idioma.concepto} ha sido adicionada.`);
                    setReload(state => !state);
                }else{
                    showMessage('error', 'Ha ocurrido un error.');
                }
            })
            .catch(err => {
                console.log(err.response);                
                if(err.response)
                    showError(err.response.status, `${idioma.concepto}`, err.response.data.message);
                else
                    showMessage('error', 'Ocurrió un error interno');
            })
        }else{
            axios.post(`${relativePath}/update`, data, {
                headers: {
                    Authorization: 'Bearer ' + authContext.token
                }
            })
            .then(resp => {
                if(resp.status===200){
                    showMessage('success', `${idioma.concepto} ha sido modificada.`);
                    setReload(state => !state);
                }else{
                    showMessage('error', 'Ha ocurrido un error.');
                }
            })
            .catch(err => {
                console.log(err);
                if(err.response)
                    showError(err.response.status, `${idioma.concepto}`, err.response.data.message);
                else
                    showMessage('error', 'Ocurrió un error interno');
            });
        }
    }, [editing, 
        authContext.token,         
        idioma.concepto, relativePath, showError, showMessage]);
    
    const mainFilterHandler = useCallback(text => {
        setDisableColumnsFilters(true);
        setClearMainFilter(false);

        setFilters(old => {
            return {
                [mainSearchForColumn]: text
            };
        })
    }, [mainSearchForColumn]);

    const columnFilterHandler = useCallback((column, value) => {
        setClearMainFilter(true);
        setDisableColumnsFilters(false);
        setFilters(old => {
            return {
                ...old,
                [column]: value
            };
        })
    },[]);

    const columnOrdersHandler = useCallback((column, order) => {        
        setOrders(oldOrdersArray => {
            const newOrderArray = [{column: column, order: order}].concat(...oldOrdersArray.filter(c => c.column !== column));
            return newOrderArray
        });
    },[]);

    const deleteRow = useCallback(obj => {
        const eliminar = () => {
            axios.post(`${relativePath}/delete`, {
                id: obj.id
            },
            {
                headers: {
                    Authorization: 'Bearer ' + authContext.token                    
                }
            })
            .then(resp => {
                if(resp.status === 200){
                    showMessage('success', `${idioma.titulo} eliminada.`);
                    setReload(state => !state);
    
                }else{
                    showMessage('error', 'Ha ourrido un error.')
                }
            })
            .catch(err => {
                console.log(err);
                if(err.response)
                    showError(err.response.status, idioma.concepto, err.response.data.message);
                else
                    showMessage('error', 'Ocurrió un error interno');
            });
        }

        showAlert(`¿Está seguro que desea eliminar ${idioma.concepto.toLowerCase()}?`,'', eliminar);
        
    }, [authContext.token, idioma, relativePath, showAlert, showError, showMessage]);
    
    
    const startEditing = useCallback(obj => {        
        setEditing(obj);
        setWinState(true);
    },[]);

    return (
        <GenericCRUDView 
            {...props}
            titulo={idioma.titulo}
            columns={columns}
            openWinHandler={openWinHandler}
            mainFilterHandler={mainFilterHandler}
            clearMainFilter={clearMainFilter}
            columnFilterHandler={columnFilterHandler}
            disableColumnFilters={disableColumnFilters}
            columnOrdersHandler={columnOrdersHandler}
            rows={rows}
            pagination={pagination}
            deleteRow={deleteRow}
            startEditing={startEditing}
            changingPage={changingPage}
            changingLimit={changingLimit}
            winState={winState}
            closeWinHandler={closeWinHandler}
            handleSave={handleSave}
            editing={editing}
        />
    );

}

GenericCRUD.propTypes = {
    relativePath: PropTypes.string.isRequired,
    tableColumns: PropTypes.arrayOf(PropTypes.shape({
        header: PropTypes.string.isRequired,
        dataType: PropTypes.oneOf(Object.keys(uiDataTypes)).isRequired,
        mappedBy: PropTypes.string.isRequired,
        sorteable: PropTypes.bool.isRequired,
        filterable: PropTypes.bool.isRequired,
        props: PropTypes.shape({
            align: PropTypes.oneOf(['left', 'center', 'rigth'])
        }),
        formElement: PropTypes.shape({
            type: PropTypes.oneOf(Object.keys(FormElementsType)).isRequired,
            initialValue: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
                PropTypes.bool
            ]),
            customProps: PropTypes.object,
            validator: PropTypes.func          
        }),
        render: PropTypes.func
    })).isRequired,
    idioma: PropTypes.shape({
        concepto: PropTypes.string.isRequired,
        titulo: PropTypes.string.isRequired, 
    }).isRequired,
    mainSearchForColumn: PropTypes.string.isRequired    
}

export default React.memo(GenericCRUD);