import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import GenericFormView from './genericForm.view';

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
    const [validForm, setValidForm] = useState(false);

    useEffect(() => {
        setFormState(initialFormState);
    }, [open]);

    useEffect(() => {
        let valid = true;
        let atLeastOneInputDirty = false;
        fields.forEach(f => {
            if(f.validator){
                let campoValido = true;
                if(valid){
                    campoValido = f.validator(formState[f.mappedBy].value);
                }
                valid = valid && campoValido;
            }
            if(formState[f.mappedBy].dirty){
                atLeastOneInputDirty = true;
            }
        });
        
        setValidForm(valid && atLeastOneInputDirty);
    }, [formState]);

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
            validForm={validForm}
        />
    );


}

GenericForm.propTypes = {
    edit: PropTypes.object,
    onSave: PropTypes.func.isRequired
}

export default GenericForm;