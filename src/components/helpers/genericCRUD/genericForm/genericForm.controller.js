import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import GenericFormView from './genericForm.view';
import AlertContext from '../../../UI/Alerts/context/alert.context';

const GenericForm = props => {

    const {
        open,
        close,
        onSave,
        fields,
        edit,
        titulo
    } = props;

    const initialFormState = fields
        .reduce((acumulator, field) => {
            acumulator[field.mappedBy] = {
                value: edit ? edit[field.mappedBy] : field.initialValue,
                valid: true,
                dirty: false
            };
            return acumulator;
        }, {}); 

    const [formState, setFormState] = useState(initialFormState);

    useEffect(() => {
        setFormState(initialFormState);
    }, [open]);

    const onChangeFormState = (mappedKey, value) => {
        setFormState(oldState => {
            const validatorFunc = fields.find(f => f.mappedBy === mappedKey).validator;
            return {
                ...oldState,
                [mappedKey]: {
                    value: value,
                    valid: validatorFunc ? validatorFunc(value) : true,
                    dirty: true
                }
            }
        });
    }

    const handleSave = () => {
        const objToSave = fields.reduce((acumulator, field) => {
            acumulator[field.mappedBy] = formState[field.mappedBy].value;
            return acumulator;
        }, {});

        if(edit){
            objToSave.id = edit.id;
        }

        alert('TODO: Falta correr las validaciones de todos los componentes antes de salvar');
        alert('Tambien se puede desabilitar el boton guardar mientras el folmulario sea invalido o no tenga cambios realizados');

        onSave(objToSave);
        close();
    }

    return (
        <GenericFormView 
            open={open}
            close={close}
            handleSave={handleSave}
            fields={fields}
            editing={edit ? true: false}
            formState={formState}
            onChange={onChangeFormState}
            titulo={titulo}
        />
    );


}

GenericForm.propTypes = {
    edit: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nombre: PropTypes.string.isRequired,
        descripcion: PropTypes.string,
        orden: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired
    }),
    onSave: PropTypes.func.isRequired
}

export default GenericForm;