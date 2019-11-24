import React from 'react';

import idioma from './404_lang';

const pageNotFound = props => {

    //const lang = props.lang;
    const lang = 'es';

    return (
        <div style={{margin: '20px', color: 'gray'}}>
            <h1>{idioma[lang].pageNF}</h1>
        </div>
    );
}

export default pageNotFound;