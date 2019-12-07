import React from 'react';

import uiDataTypes from '../../../components/helpers/uiDataTypes';

import AddIcon from '@material-ui/icons/Add';

import GenericCRUD from '../../../components/helpers/genericCRUD'; 

import FormElementsType from '../../../components/helpers/formElements/formElemnts.type';
import validate, {validator} from '../../../components/helpers/validations/field.validations';

import AddUserAction from './actions/add';

const UsuarioView = props => {

    const {
        winAddState,
        closeAddWindow,
        openAddWinHandler
    } = props;

    const columns = [ {
        header: 'Usuario',
        dataType: uiDataTypes.Text,
        mappedBy: 'name',
        sorteable: true,
        filterable: true,
        formElement: {
            type: FormElementsType.TEXT_FIELD,
            initialValue: '',
            validator: value => validate(value,
                    validator.STRING.SIZE.maxLenght(25),
                    validator.STRING.SIZE.minLenght(3)
                )
        }
    }, {
        header: 'Rol',
        dataType: uiDataTypes.Text,
        mappedBy: 'rol.name',
        sorteable: true,
        filterable: true,
        formElement: {
            type: FormElementsType.SINGLE_SELECT_FIELD,
            customProps: {
                url: '/security/rol',
                reader: {
                    mapValue: 'id',
                    mapDisplayField: 'name'
                }
            },                
            initialValue: ''                
        }
    }];

    const relativePath = '/security/user'
    const idioma = {
        concepto: 'El usuario',
        titulo: 'Usuario'
    };

    
    
    const otherActions = [{
        clickHandler: openAddWinHandler,
        icon: <AddIcon />,
        description: 'Adicionar categoría',
        cmp: <AddUserAction 
            columns={columns}
            winAddState={winAddState}
            closeAddWindow={closeAddWindow}        
        />
    }];

    const rowActions = [{
        title: 'Asd',
        onClick: objRow => {alert('click en el icono')},
        icon: <div>X</div>
    }, {
        title: 'JDF',
        onClick: objRow => {alert('click en el icono')},
        icon: <div>Y</div>
    }];

    return (
        <GenericCRUD
            relativePath={relativePath}
            idioma={idioma}
            tableColumns={columns}
            mainSearchForColumn='nombre'
            defaultSaveActions={false}
            otherActions={otherActions}
            otherRowActions={rowActions}
        >

        </GenericCRUD>
    );

}

export default React.memo(UsuarioView);