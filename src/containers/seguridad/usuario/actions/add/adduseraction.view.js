import React from 'react';

import GenericForm from '../../../../../components/helpers/genericCRUD/genericForm';
import uiDataTypes from '../../../../../components/helpers/uiDataTypes';
import FormElementsType from '../../../../../components/helpers/formElements/formElemnts.type';
import validate, {validator} from '../../../../../components/helpers/validations/field.validations';

const AddUserAction = props => {

    const {
        winState,
        closeWinHandler,
        handleSave,
        columns
    } = props;

    
   
    const fields = columns.concat(
        {
            header: 'Password',
            dataType: uiDataTypes.Text,
            mappedBy: 'password',
            formElement: {
                type: FormElementsType.TEXT_FIELD,
                initialValue: '',
                validator: value => validate(value,
                    validator.STRING.SIZE.maxLenght(25),
                    validator.STRING.SIZE.minLenght(8)
                ),
                customProps: {
                    type: 'password'
                }
            }
        }
    );        

    return <GenericForm 
            titulo='Adicionar usuario'
            open={winState} 
            close={closeWinHandler} 
            onAccept={handleSave}
            edit={false}
            fields={fields 
                .map(c => {
                    return {
                        ...c.formElement,
                        fieldName: c.header,
                        dataType: c.dataType,
                        mappedBy: c.mappedBy
                    }
                })}
        />;
}
export default React.memo(AddUserAction);