import styled from 'styled-components'
import Colors from 'Config/Colors'

export const ProfileStyle = styled.div `
    height: calc(100vh - 85px);

    .title{
        padding-left:40px;
        padding-top:20px;
        font-size: 40px;
        margin-bottom: 25px;
    }
    .profile-body{
        width: 100%;
        display: flex;
        height: 100%;
    }
    .side-menu{
        width: 350px;
        height: 100%;
    }
    .profile-content{
        background-color: ${Colors.tertiary};
        width: 100%;
        position: relative; 
        padding: 40px;
        padding-right: 40px;
    }
`;