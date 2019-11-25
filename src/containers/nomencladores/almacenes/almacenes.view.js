import React from 'react';

import GenericCRUD from '../../../components/helpers/genericCRUD';
import uiDataTypes from '../../../components/helpers/uiDataTypes';
import {FormElementsType} from '../../../components/helpers/formElements';
import validate, {validator} from '../../../components/helpers/validations/field.validations';


const NomAlmacenes = props => {

    const relativePath = '/nomencladores/nom_almacen';
    const columns = [
        {
            header: 'Nombre',
            dataType: uiDataTypes.Text,
            mappedBy: 'nombre',
            sorteable: true,
            filterable: true,
            formElement: {
                type: FormElementsType.TEXT_FIELD,
                initialValue: '',
                customProps: {
                    autoFocus: true
                },
                validator: val => validate(val, 
                        validator.STRING.SIZE.minLenght(3),
                        validator.STRING.SIZE.maxLenght(50),
                        validator.REQUIERED
                    )
            }
        },{
            header: 'Descripción',
            dataType: uiDataTypes.Text,
            mappedBy: 'descripcion',
            sorteable: false,
            filterable: true,
            formElement: {
                type: FormElementsType.TEXT_FIELD,
                initialValue: '',
                validator: val => validate(val, 
                    validator.STRING.SIZE.maxLenght(255)
                    ),
                customProps: {
                    multiline: true,
                    rows:2
                }
            }
        }
    ];

    const idioma = {
        titulo: 'Almacén',
        concepto: 'El almacén'
    }

    return (
        <GenericCRUD 
            relativePath={relativePath}
            tableColumns={columns}
            idioma={idioma}
            mainSearchForColumn='nombre'
        />
    );

}

export default NomAlmacenes;