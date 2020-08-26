import styled from 'styled-components'
import Colors from 'Config/Colors'

export const StatisticsNotFoundPageStyle = styled.div`
    width:100%;
    height: 600px;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    font-size: 24px;
    line-height: 60px;
    
    .button-back{
        font-size:20px;
        background-color: ${Colors.contrast_1};
        color: ${Colors.primary};
        border: 0;
    }
`