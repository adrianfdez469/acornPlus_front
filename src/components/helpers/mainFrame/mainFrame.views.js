import React from 'react';
import Container from '@material-ui/core/Container';


const style = {
    maxHeight: 'calc(100% - 100px)',
    width: '100%'
}

const MainFrame = props => {
    
    return (
        <Container style={style} {...props}>
            {props.children}
        </Container>
    );
}

export default MainFrame;