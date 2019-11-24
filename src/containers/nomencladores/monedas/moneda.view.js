import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

import GenericCRUD from '../../../components/helpers/genericCRUD';
import dataTypes from '../../../components/helpers/uiDataTypes';
import {FormElementsType} from '../../../components/helpers/formElements';
import validate, {validator} from '../../../components/helpers/validations/field.validations';

const NomMoneda = props => {

    const relativePath = '/nomencladores/nom_moneda';
    const idioma = {
        concepto: 'La moneda',
        titulo: 'Monedas'
    }
    const columns = [
        {
            header:'Abreviatura',
            dataType: dataTypes.Text,
            mappedBy: 'abreviatura',
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
                        validator.STRING.SIZE.maxLenght(5),
                        validator.REQUIERED
                    )
            }
        }, {
            header:'Descripción',
            dataType: dataTypes.Text,
            mappedBy: 'descripcion',
            filterable: true,
            sorteable: false,
            formElement: {
                type: FormElementsType.TEXT_FIELD,
                initialValue: '',
                customProps: {
                    multiline: true,
                    rows: 2
                }
            }
        }, {
            header:'Tasa de cambio',
            dataType: dataTypes.Number,
            mappedBy: 'tasacambio',
            filterable: true,
            sorteable: true,
            formElement: {
                type: FormElementsType.NUMBER_FIELD,
                initialValue: 1,
                validator: val => validate(val, 
                    validator.NUMBER.greater(0),
                    validator.REQUIERED
                )
            }
        }, {
            header:'Principal',
            dataType: dataTypes.Boolean,
            mappedBy: 'principal',
            filterable: true,
            sorteable: false,
            props: {
                align: 'center',
            },
            render: value => {
                if(value.principal)
                    return <CheckCircleIcon color='action'/>
                else
                    return <NotInterestedIcon color='action'/>
            },
            formElement: {
                type: FormElementsType.SWITCH_FIELD,
                initialValue: true
            }
        }
    ];

    return (
        <GenericCRUD
            relativePath={relativePath}
            tableColumns={columns}
            idioma={idioma}
            mainSearchForColumn='abreviatura'
        />
    );

}

export default NomMoneda;