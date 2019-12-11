import React from 'react';
import PropTypes from 'prop-types';

import {
    Table,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    IconButton
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import MainFrame from '../../../components/helpers/mainFrame';
import CustomTableToolbar from '../../../components/helpers/tableToolbar';
import CustomTableHeader from '../../../components/helpers/tableHeader';
import CustomTablePagination from '../../../components/helpers/tablePagination';
import uiDataTypes from '../uiDataTypes';
import InfoTooltip from '../infoTooltip';

import GenericForm from './genericForm';


const GenericCRUD = props => {

    console.log('RENDERING GENERIC CREUD VIEW');
    

    const {
        titulo,
        columns,
        openWinHandler,
        otherActions = [],
        mainFilterHandler,
        clearMainFilter,
        columnFilterHandler,
        disableColumnFilters,
        columnOrdersHandler,
        rows,
        pagination,
        deleteRow,
        startEditing,
        changingPage,
        changingLimit,
        winState,
        closeWinHandler,
        handleSave,
        editing,
        defaultSaveActions = true,
        defaultDeleteAction = true,
        otherRowActions = []
    } = props;
    
    const cols = [...columns];

    if(defaultDeleteAction){
        cols[cols.length] = {
            header: '',
            dataType: uiDataTypes.Icon,
            mappedBy: '',
            sorteable: false,
            filterable: false
        };
    }
    
    if(defaultSaveActions) {
        cols[cols.length+1] = {
            header: '',
            dataType: uiDataTypes.Icon,
            mappedBy: '',
            sorteable: false,
            filterable: false
        };
    }

    const actions = defaultSaveActions ? [
        {
            clickHandler: openWinHandler,
            icon: <AddIcon />,
            description: `Adicionar ${titulo}`,
            
            cmp: <GenericForm 
                titulo={titulo}
                open={winState} 
                close={closeWinHandler} 
                onAccept={handleSave}
                edit={editing}
                fields={columns
                    .filter(c => c.mappedBy !== 'Index')
                    .map(c => {
                        return {
                            ...c.formElement,
                            fieldName: c.header,
                            dataType: c.dataType,
                            mappedBy: c.mappedBy
                        }
                    })}
            />
        }
    ] : [];
    if(otherActions.length > 0)
        actions.push(...otherActions);
    
    if(otherRowActions.length > 0){
        otherRowActions.forEach((element, index) => {
            cols[cols.length+index+1] = {
                header: '',
                dataType: uiDataTypes.Icon,
                mappedBy: '',
                sorteable: false,
                filterable: false
            };
        });        
    }

    const handleOnClickRowAction = (action, obj) => {
        if(action === 'edit')
            startEditing(obj)
        else if(action === 'delete') 
            deleteRow(obj);        
    };

    return (
        <MainFrame>
            <Paper>
                <div style={{
                    height: '500px',
                    overflow: 'auto',
                }}>
                <CustomTableToolbar 
                    title={titulo}
                    actionsList={actions}
                    searchAction={mainFilterHandler}
                    clearFilter={clearMainFilter}
                />                
                
                <Table size='small' stickyHeader>
                    <CustomTableHeader 
                        columns={cols} 
                        filterHandler={columnFilterHandler}
                        disableFilters={disableColumnFilters}
                        ordersHandler={columnOrdersHandler}
                    />

                    <TableBody>
                        {rows.data.map((obj, index) => {
                            return (
                                <TableRow key={obj.id} hover>
                                    {cols.map((col, colIndex) => {
                                        if(col.mappedBy === 'Index')
                                            return <TableCell 
                                                    key={`${obj.id} 
                                                    ${colIndex}`} 
                                                >
                                                    {pagination.start + index + 1}
                                                </TableCell>;
                                        else if(col.dataType !== uiDataTypes.Icon){
                                            return <TableCell 
                                                    key={`${obj.id} ${colIndex}`} 
                                                    align={col.dataType === uiDataTypes.Number ? 'right': 'left'}
                                                    {...col.props} 
                                                >
                                                    {col.render ? col.render(obj, col) : obj[col.mappedBy]}
                                            </TableCell>
                                        }else{
                                            return null;
                                        }
                                    })}
                                    {
                                        defaultDeleteAction &&  
                                        <TableCell padding='checkbox'>
                                            <InfoTooltip title='Eliminar'>
                                                <IconButton 
                                                    
                                                    style={{padding: '5px'}}
                                                    onClick={handleOnClickRowAction.bind(this, 'delete', obj)}
                                                >
                                                    <DeleteIcon color='primary'/>
                                                </IconButton>
                                            </InfoTooltip>
                                        </TableCell>
                                    }
                                    {
                                        defaultSaveActions &&                                 
                                        <TableCell padding='checkbox'>
                                            <InfoTooltip title='Modificar'>
                                                <IconButton
                                                    style={{padding: '5px'}}
                                                    onClick={handleOnClickRowAction.bind(this, 'edit', obj)}
                                                >
                                                    <EditIcon color='primary'/>
                                                </IconButton>
                                            </InfoTooltip>
                                        </TableCell>
                                    }
                                    {
                                        otherRowActions.map((act,index) => {
                                            return <TableCell padding='checkbox' key={index}>
                                            <InfoTooltip title={act.title}>
                                                <IconButton
                                                    style={{padding: '5px'}}
                                                    onClick={act.onClick.bind(this, obj)}
                                                >
                                                    {act.icon}
                                                </IconButton>
                                            </InfoTooltip>
                                        </TableCell>
 
                                        })
                                    }
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                </div>
                <CustomTablePagination 
                    length={rows.total}
                    page={pagination.page}
                    changePage={(btn, page) => changingPage(page)}
                    handleChangeRowsPerPage={cmp => changingLimit(cmp.target.value)}
                    rowsPerPage={pagination.limit}
                />
                
            </Paper>
        </MainFrame>
    );
}

GenericCRUD.propTypes = {
    otherActions: PropTypes.arrayOf(PropTypes.shape({
        clickHandler: PropTypes.func.isRequired,
        icon: PropTypes.element.isRequired,
        description: PropTypes.string.isRequired         
    })),
    defaultSaveActions: PropTypes.bool,
    defaultDeleteAction: PropTypes.bool,
    otherRowActions: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        icon: PropTypes.element.isRequired
    }))
}

export default React.memo(GenericCRUD);