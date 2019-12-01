import React from 'react';

import GenericCRUD from '../../../components/helpers/genericCRUD';
import uiDataTypes from '../../../components/helpers/uiDataTypes';
import { FormElementsType } from '../../../components/helpers/formElements';
import validate, {validator} from '../../../components/helpers/validations/field.validations';

const UsuarioView = props => {

    const idioma = {
        concepto: 'El usuario',
        titulo: 'Usuario'
    }


    /*
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
        render
    
    */

    const columns = [
        {
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
        },
        {
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
                        mapId: 'id',
                        mapDisplayField: 'name'
                    }
                },                
                initialValue: ''                
            }
        }
    ];

    return <GenericCRUD 
        idioma={idioma}
        relativePath='/security/user'
        mainSearchForColumn='name'
        tableColumns={columns}
    />

}

export default UsuarioView;