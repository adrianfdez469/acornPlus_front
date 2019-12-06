import React from 'react';
import {
    makeStyles
} from '@material-ui/core';

import uiDataTypes from '../../../components/helpers/uiDataTypes';
import GenericCRUD from '../../../components/helpers/genericCRUD';

import {FormElementsType} from '../../../components/helpers/formElements';
import validate, {validator} from '../../../components/helpers/validations/field.validations';

const useStyles = makeStyles(theme => ({
    color: {
        width: '30px',
        height: '30px', 
        borderRadius: '50%'
    }
}));

const NomCategoria = props => {

    const classes = useStyles();

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
                        validator.STRING.SIZE.minLenght(2),
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
                customProps: {
                    multiline: true,
                    rows:2
                },
                validator: val => validate(val, 
                        validator.STRING.SIZE.maxLenght(255)
                    )
            }
        },{
            header: 'Orden',
            dataType: uiDataTypes.Number,
            mappedBy: 'orden',
            sorteable: true,
            filterable: true,
            formElement: {
                type: FormElementsType.NUMBER_FIELD,
                initialValue: 1,
                validator: val => validate(val, 
                        validator.NUMBER.greater(0)
                    )
            }
        },{
            header: 'Color',
            dataType: uiDataTypes.Other,
            mappedBy: 'color',
            sorteable: false,
            filterable: false,
            formElement: {
                type: FormElementsType.COLOR_PICKER,
                initialValue: '#000'
            },
            render: (obj,col) => {
                return <div> 
                    <div className={classes.color} style={{backgroundColor: `${obj[col.mappedBy]}`}}/>
                </div>
            }
        }
    ];
    const relativePath = '/nomencladores/nom_categoria'
    const idioma = {
        concepto: 'La categoría',
        titulo: 'Categoría'
    };

    return (
        <GenericCRUD
            relativePath={relativePath}
            idioma={idioma}
            tableColumns={columns}
            mainSearchForColumn='nombre'
        >

        </GenericCRUD>
    );

}

export default React.memo(NomCategoria);