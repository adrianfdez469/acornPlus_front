export default {
    
    isArrayNotEmpty: (props, propName, componetName) => {
        if(!Array.isArray(props[propName])){
                return new Error(`Invalid "${propName}" property suplied to component ${componetName}.
                The property must be an array`);
        }
        if(props[propName].length === 0){
            return new Error(`Invalid  "${propName}" property suplied to component ${componetName}.
            The length of the array property must be grater than cero. `);
        }
    }
};