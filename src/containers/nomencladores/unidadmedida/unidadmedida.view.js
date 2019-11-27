import React from 'react';

import GenericCRUD from '../../../components/helpers/genericCRUD';
import dataTypes from '../../../components/helpers/uiDataTypes';
import {FormElementsType} from '../../../components/helpers/formElements';
import validate, {validator} from '../../../components/helpers/validations/field.validations';

const NomUnidadmedida = props => {
    const relativePath = '/nomencladores/nom_unidadmedida';
    const idioma = {
        concepto: 'La unidad de medida',
        titulo: 'Unidad de medida'
    }
    const columns = [
        {
            header:'Nombre',
            dataType: dataTypes.Text,
            mappedBy: 'nombre',
            filterable: true,
            sorteable: true,            
            formElement: {
                type: FormElementsType.TEXT_FIELD,
                initialValue: '',
                customProps: {
                    autoFocus: true
                },
                validator: val => validate(val, 
                        validator.STRING.SIZE.minLenght(2),
                        validator.STRING.SIZE.maxLenght(50),
                        validator.REQUIERED
                    )
            }
        }, {
            header:'Abreviatura',
            dataType: dataTypes.Text,
            mappedBy: 'abreviatura',
            filterable: true,
            sorteable: true,
            formElement: {
                type: FormElementsType.TEXT_FIELD,
                initialValue: '',
                validator: val => validate(val, 
                        validator.STRING.SIZE.minLenght(1),
                        validator.STRING.SIZE.maxLenght(7),
                        validator.REQUIERED
                    )
            }
        }
    ];

    return (
        <GenericCRUD
            relativePath={relativePath}
            tableColumns={columns}
            idioma={idioma}
            mainSearchForColumn='nombre'
        />
    );
}

export default NomUnidadmedida;