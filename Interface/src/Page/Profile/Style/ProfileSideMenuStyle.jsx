import styled from 'styled-components'
import Colors from 'Config/Colors';

export const ProfileSideMenuStyle = styled.div`
    
    .menu-option{
        background-color: ${Colors.secundary};
        text-align:center;
        line-height: 60px;
        width: 100%;
        height: 60px;
        border-color: ${Colors.tertiary};
        border-style: solid;
        border-width: 0.5px;
        font-weight: 600;
        cursor: pointer;
    }
`