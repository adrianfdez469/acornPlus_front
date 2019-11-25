import React from 'react';

import GenericCRUD from '../../../components/helpers/genericCRUD';
import dataTypes from '../../../components/helpers/uiDataTypes';
import {FormElementsType} from '../../../components/helpers/formElements';
import validate, {validator} from '../../../components/helpers/validations/field.validations';

const NomMoneda = props => {

    const relativePath = '/nomencladores/nom_tipodescuento';
    const idioma = {
        concepto: 'El tipo de descuento',
        titulo: 'Tipo de descuento'
    }
    const columns = [
        {
            header:'Nombre',
            dataType: dataTypes.Text,
            mappedBy: 'nombre',
            filterable: true,
            sorteable: true,
            render: value => {
                return `(${value.descuento}%) - ${value.nombre}`
            },
            formElement: {
                type: FormElementsType.TEXT_FIELD,
                initialValue: '',
                customProps: {
                    autoFocus: true
                },
                validator: val => validate(val, 
                        validator.STRING.SIZE.minLenght(3),
                        validator.STRING.SIZE.maxLenght(100),
                        validator.REQUIERED
                    )
            }
        }, {
            header:'Descuento',
            dataType: dataTypes.Number,
            mappedBy: 'descuento',
            filterable: true,
            sorteable: true,
            render: value => {
                return `${value.descuento}%`
            },
            formElement: {
                type: FormElementsType.NUMBER_FIELD,
                initialValue: 0,
                validator: val => validate(val,                     
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

export default NomMoneda;