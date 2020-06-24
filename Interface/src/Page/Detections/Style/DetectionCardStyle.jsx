import styled from 'styled-components'

export const DetectionCardStyle = styled.div `
    margin: 100px;
    width: 300px;
    height: 450px;
    display: block;
    
    .frame{
        width: 300px;
        height: 300px;
        box-sizing: content-box;
        border-width: 1px;
        border-style: solid;
        border-color: ${props => props.backgroundColor ?? '#454545'};
        border-bottom: 0;

    }
    .cardInfo {
        background-color: ${props => props.backgroundColor ?? '#454545'};
        height: ${props => props.infoHeight ?? "150px"};
        width: 302px;
        padding: 5px;
        color: white;
        font-weight: 500;
    }

    .buttonCard{
        float: right;
        background-color: ${props => props.buttonColor ?? '#bb86fc'};
        border: none;
        margin-top: 5px;
    }
`