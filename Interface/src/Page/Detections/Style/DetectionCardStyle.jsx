import styled from 'styled-components'
import Colors from 'Config/Colors'

export const DetectionCardStyle = styled.div `
    margin: 10px;
    width: 300px;
    height: 450px;
    display: block;
    
    .frame{
        width: 300px;
        height: 300px;
        box-sizing: content-box;
        border-width: 1px;
        border-style: solid;
        border-color: ${props => props.backgroundColor ?? Colors.tertiary};
        border-bottom: 0;

    }
    .cardInfo {
        background-color: ${props => props.backgroundColor ?? Colors.tertiary};
        height: ${props => props.infoHeight ?? "150px"};
        width: 302px;
        padding: 5px;
        color: white;
        font-weight: 500;
    }

    .buttonCard{
        float: right;
        border: none;
        margin-top: 5px;
        color: ${Colors.primary}
    }

    .buttonCardLeft{
        float: left;
        background-color: ${props => props.buttonColor1 ?? Colors.contrast_1};
    }

    .buttonCardRight{
        float: right;
        background-color: ${props => props.buttonColor2 ?? Colors.contrast_1};
    }
`