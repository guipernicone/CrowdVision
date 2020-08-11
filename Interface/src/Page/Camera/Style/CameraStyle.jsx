import styled from 'styled-components'
import Colors from 'Config/Colors'

export const CameraStyle = styled.div`
    padding: 20px;
    padding-left: 40px;
    padding-right: 40px;

    .title{
        font-size: 40px;
    }
    .camera-body{
        margin-top:20px;
        background-color: ${Colors.primary};
        width: 100%;
        height: 100vh;
    }
    
    .camera-list{
        width: 100%;
        height: 100%;
    }

    .organization{
        display:flex;
        background-color: ${Colors.secundary};
        border-width:1px;
        border-color: ${Colors.tertiary};
        border-style: solid;
        width: 100%;
        height: 70px;
        padding-left:20px;
        align-items:center;
    }

    .organization_name{
       font-size:20px;
       width:95%;
    }

    .camera_item{
        display:flex;
        border-width: 0.5px;
        background-color: ${Colors.tertiary};
        border-color: ${Colors.secundary};
        border-style: solid;
        width: 100%;
        height: 50px;
        padding-left:40px;
        align-items:center;
    }
`