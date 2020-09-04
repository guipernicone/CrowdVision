import styled from 'styled-components'
import Colors from 'Config/Colors'

export const ProfileUserListStyle = styled.div`

    .title-list{
        font-weight:700;
        font-size:24px;
        padding-bottom: 40px
    }
    .user-item{
        display: flex;
        width: 100%;
        padding:20px;
        background-color: ${Colors.secundary};
        margin-bottom:20px;
    }

    .user-name{
        width:95%
    }

    .delete-icon{
        cursor:pointer;
    }
`