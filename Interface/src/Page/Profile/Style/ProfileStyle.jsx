import styled from 'styled-components'
import Colors from 'Config/Colors'

export const ProfileStyle = styled.div `
    .title{
        padding-left:40px;
        padding-top:20px;
        font-size: 40px;
        margin-bottom: 25px;
    }
    .profile-body{
        /* background-color: green; */
        width: 100%;
        display: flex;
    }
    .side-menu{
        /* background-color: purple; */
        /* background-color: ${Colors.tertiary}; */
        width: 250px;
        height: 500px;
    }
    .profile-content{
        /* background-color: ${Colors.tertiary}; */
        width: 100%;
        position: relative;
        padding: 40px;
        margin-right: 40px;
    }
`;