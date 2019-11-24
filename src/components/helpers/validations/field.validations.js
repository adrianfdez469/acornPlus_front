
export const validator = {
    REQUIERED: val =>  (val && val !== ''),
    STRING: {
        SIZE: {
            minLenght: n => val => val.length >= n,
            maxLenght: n => val => val.length <= n
        },
        
    },
    NUMBER: {
        greater: n => val => val > n,
        greaterOrIqual: n => val => val >= n,
        less: n => val => val < n,
        lessOrIqual: n => val => val <= n,
        between: (a, b) => val => a < val < b
    }
};



/**
 * @description Devuelve falso si la validacion falla
 * @param {Valor a validar} valueToValidate 
 * @param  {...validator} validators
 */

const validate = (valueToValidate, ...validators) => {
    
    return validators.reduce((acumulator, val) => {
        acumulator = acumulator ? 
            val(valueToValidate)
        : acumulator;
        return acumulator;
    }, true);
}

export default validate;