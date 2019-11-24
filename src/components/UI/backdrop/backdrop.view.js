import React from 'react';

const inlineStyle = {
    width: '100%',
    height: '100%',
    position: 'fixed',
    zIndex: '100',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0,0, 0, 0.5)'
};

const Backdrop = props => {
    return <div style={inlineStyle}>{props.children}</div>;
}

export default Backdrop;