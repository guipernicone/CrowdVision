import styled from 'styled-components';
import Colors from 'Config/Colors'

export const ProfileInformationStyle = styled.div`
    width: 100%;
    background-color: ${Colors.secundary};
    border-radius: 20px;
    padding: 20px;

    .item-profile{
        margin-bottom: 20px
    }
    
    .label{
        font-size: 20px;
        font-weight : 700;
    }

    .info{
        padding-left: 20px;
        font-size: 18px;
    }
`