import styled from 'styled-components'
import Colors from 'Config/Colors'

export const InformationNumberCardStyle = styled.div `
    background-color: ${props=> props.primaryColor ?? Colors.tertiary};
    width:150px;
    height:180px;
    position:relative;
    border-radius:15px;
    margin: 20px;

    .number-card{
        display: inline-block;
        border-radius:15px;
        margin-left: 25px;
        margin-right: 25px;
        margin-top:15px;
        margin-bottom: 15px;
        background-color: ${props=> props.primaryColor ?? Colors.secundary};
        width:100px;
        height:75px;
        position:relative;
    }

    .number{
        position:absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 24px;
    }

    .label{
        text-align:center;
    }
`