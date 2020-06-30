import styled from 'styled-components'

export const DivisorStyle = styled.div `
    width: ${props => props.width ?? "100%"};
    border: none;
    height: 0.5px;
    background-color: #454545;
    align-self:center;
    justify-content: center;
    margin: ${props => props.margin ?? "20px"}
`