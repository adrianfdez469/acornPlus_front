import React from 'react';
import PropTypes from 'prop-types';

import {   
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    DialogActions
} from '@material-ui/core';

//import validate, {validator} from '../../../../components/helpers/validations/field.validations';

import FormElement from '../../formElements/';

const GenericForm = props => {

    const {
        open,
        close,
        handleSave,
        fields,
        editing,
        formState,
        onChange,
        titulo,
        validForm
    } = props;

    

    


    return (
        <Dialog open={open} onClose={close} maxWidth='xs'>
            <DialogTitle>{editing ? 'Editar' : 'Adicionar'} {titulo}</DialogTitle>
            <DialogContent>
                {
                    fields.map(field => {
                        return <FormElement 
                            key={field.mappedBy}
                            type={field.type}                            
                            customProps={field.customProps}                            
                            fieldName={field.fieldName}
                            
                            state={formState[field.mappedBy]}
                            onChange={(value) => onChange(field.mappedBy, value)}
                        />
                    })
                }
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={handleSave} 
                    color="primary" 
                    variant='contained'
                    disabled={!validForm}
                >
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );

}

GenericForm.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    
    fields: PropTypes.arrayOf(PropTypes.shape({
        mappedBy: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        customProps: PropTypes.object,
        fieldName: PropTypes.string.isRequired
    }).isRequired).isRequired,

    formState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    validForm: PropTypes.bool.isRequired

}

export default GenericForm;