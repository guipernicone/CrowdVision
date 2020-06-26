import styled from 'styled-components'

const DialogStyle = styled.div `
    position:absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    
    .contentDialog{
        position:relative;
        width: ${props => props.width ?? '800px'};
        height: ${props => props.height ?? '800px'};
        /* border: 5px blue solid;
        border-radius: 20px; */
        background-color:red;
    }

    .closeDialog{
        color: white;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(50%, -50%);
    }
`;

export default DialogStyle;