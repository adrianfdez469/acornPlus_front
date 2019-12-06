import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';

import SingleSelectView from './singleSelect.view';

import AuthContext from '../../../auth/authContext';
import axios from '../../../../axios';
import validate from '../../validations/field.validations';

const SingleSelect = props => {

    const {state, onChange} = props;
    const { url, reader} = props.customProps;
    const {mapValue, mapDisplayField} = reader;

    const [authState] = useContext(AuthContext);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        axios.post(`${url}/get`, {
            filters: {},
            orders: [{column: mapDisplayField, order: "asc"}],
            pagination: {start: 0, limit: 5}
        }, {
        headers: {
                Authorization: 'Bearer ' + authState.token
            }
        })
        .then(resp => {
            if(resp.status === 200){                
                const respOptions = resp.data.rows.map(opt => {
                    return {
                        key: opt[mapValue],
                        display: opt[mapDisplayField]
                    }
                });
                setOptions(respOptions);
            }else{
                alert('error');
            }
        })
        .catch(err => {
            alert('error');
        });        
    }, [authState.token, mapDisplayField, mapValue, url]);

    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return <SingleSelectView 
        options={options}
        handleChange={handleChange}
        value={state}
        {...props}
    />;

}

SingleSelect.propTypes = {
    customProps: PropTypes.shape({
        url: PropTypes.string.isRequired
    }).isRequired
}

export default React.memo(SingleSelect);