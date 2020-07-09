import styled from 'styled-components'
import Colors from 'Config/Colors'

export const StatisticsMainFormStyle = styled.div `
    .title{
        padding-left:40px;
        padding-top:20px;
        font-size: 40px;
        margin-bottom: 25px;
    }

    .select-field{
        width: 100%;
        height: 600px;
        /* background-color:red; */
        display: flex;
        justify-content: space-around;
    }
    .camera-list-box{
        /* background-color:red; */
        background-color: ${Colors.tertiary};
        overflow: auto;
        width:40%;
        border-radius: 10px;
        border: 0.5px solid ${Colors.primary};
    }
    .camera-list-item{
        background-color: ${Colors.tertiary};
        padding: 15px;
        width:100%;
        border-bottom: 0.5px solid ${Colors.primary}; 
    }
    .select-list-box{
        background-color: ${Colors.tertiary};
        border-radius: 10px;
        border: 0.5px solid ${Colors.primary};
        width:40%;
        overflow: auto;
    }
    .select-all-buttom{
        background-color:  ${Colors.contrast_1};
        color: ${Colors.primary};
        height: 40px;
        border: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%)
    }

    .data-field{
        width: 100%;
        height: 100px;
        /* background-color:blue; */
    }

    .buttom-field{
        width: 100%;
        height: 100px;
        /* background-color:green; */
    }

    .subtitle{
        font-size: 20px; 
        margin: 10px;
    }

    .add-icon{
        float: right;
        cursor: pointer;
        width: 5%; 
        color: ${Colors.contrast_1};
    }

    .remove-icon{
        float: right;
        cursor: pointer;
        width: 5%; 
        color: ${Colors.contrast_1};
    }
`