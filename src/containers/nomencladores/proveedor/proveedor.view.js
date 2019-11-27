import React from 'react';

import {
    Typography,
    Link
} from '@material-ui/core';

import GenericCRUD from '../../../components/helpers/genericCRUD';
import dataTypes from '../../../components/helpers/uiDataTypes';
import {FormElementsType} from '../../../components/helpers/formElements';
import validate, {validator} from '../../../components/helpers/validations/field.validations';

const NomProveedor = props => {
    const relativePath = '/nomencladores/nom_proveedor';
    const idioma = {
        concepto: 'El proveedor',
        titulo: 'Proveedor'
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
                        validator.STRING.SIZE.minLenght(3),
                        validator.STRING.SIZE.maxLenght(50),
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
                    rows:2
                },                
                validator: val => validate(val, 
                        validator.STRING.SIZE.maxLenght(255)
                    )
            }
        }, {
            header: 'Teléfono',
            dataType: dataTypes.Text,
            mappedBy: 'telefono',
            filterable: true,
            sorteable: false,
            formElement: {
                type: FormElementsType.TEXT_FIELD,
                initialValue: '',
                validator: val => validate(val, 
                        validator.STRING.SIZE.maxLenght(255)
                    )
            }
        }, {
            header: 'Correo',
            dataType: dataTypes.Text,
            mappedBy: 'correo',
            filterable: true,
            sorteable: true,
            formElement: {
                type: FormElementsType.TEXT_FIELD,                
                initialValue: '',
                validator: val => validate(val, 
                        validator.STRING.SIZE.maxLenght(50)
                    )
            }
        }, {
            header: 'Sitio web',
            dataType: dataTypes.Text,
            mappedBy: 'sitioweb',
            filterable: true,
            sorteable: true,
            formElement: {
                type: FormElementsType.TEXT_FIELD,
                initialValue: '',
                validator: val => validate(val, 
                        validator.STRING.SIZE.maxLenght(255)
                    )
            },
            render: (obj) => {
                const openTab = (event, url) => {

                    event.preventDefault();
                    window.open(url, '_blanck');
                    window.focus();
                }

                //const preventDefault = event => event.preventDefault();
                return <Typography >
                    <Link href={obj.sitioweb} onClick={(event) => openTab(event, obj.sitioweb)}
                    >
                        {obj.sitioweb}
                    </Link>
                </Typography>


                /*return <a 
                    //href={obj.sitioweb}
                    onClick={() => openTab(obj.sitioweb)}
                >
                    {obj.sitioweb} 
                </a>*/
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

export default NomProveedor;