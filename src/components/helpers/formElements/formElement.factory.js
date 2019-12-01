import React from 'react';
import PropTypes from 'prop-types';

import formElementTypes from './formElemnts.type';

import CustomInputText from './CustomInputText';
import CustomInputNumber from './CustomInputNumber';
import CustomSwitch from './CustomSwitch';
import CustomSelectColor from './CustomSelectColor';
import CustomSingleSelect from './CusomSingleSelect';


const FormElemntFactory = props => {

    const {
        type,
    /*    fieldName,
        customProps,
        state,
        onChange*/
    } = props;

    /*const propsToElement = {
        fieldName,
        customProps,
        state,
        onChange
    };*/

    switch(type){
        /*case formElementTypes.TEXT_FIELD: return <CustomInputText {...propsToElement} />;
        case formElementTypes.NUMBER_FIELD: return <CustomInputNumber {...propsToElement} />;
        case formElementTypes.SWITCH_FIELD: return <CustomSwitch  {...propsToElement} />;
        case formElementTypes.COLOR_PICKER: return <CustomSelectColor  {...propsToElement} />;
        case formElementTypes.SINGLE_SELECT_FIELD: return <CustomSingleSelect {...propsToElement} />;*/
        case formElementTypes.TEXT_FIELD: return <CustomInputText {...props} />;
        case formElementTypes.NUMBER_FIELD: return <CustomInputNumber {...props} />;
        case formElementTypes.SWITCH_FIELD: return <CustomSwitch  {...props} />;
        case formElementTypes.COLOR_PICKER: return <CustomSelectColor  {...props} />;
        case formElementTypes.SINGLE_SELECT_FIELD: return <CustomSingleSelect {...props} />;
        default: return null;
    }
}

FormElemntFactory.propTypes = {
    type: PropTypes.oneOf(Object.keys(formElementTypes)).isRequired,
    fieldName: PropTypes.string.isRequired,
    customProps: PropTypes.object,
    state: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    url: PropTypes.string
}

export default FormElemntFactory