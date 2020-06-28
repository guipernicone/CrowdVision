import styled from 'styled-components'
import Colors from 'Config/Colors'

const DialogStyle = styled.div `
    position:absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    
    .contentDialog {
        position:relative;
        width: ${props => props.width ?? '800px'};
        height: ${props => props.height ?? '800px'};
        background-color: ${Colors.primary}
    }

    .closeIcon {
        color: ${Colors.contrast_1}; 
        width: 35px; 
        height: 35px;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(50%, -50%);
        z-index: 100;
    }
`;

export default DialogStyle;