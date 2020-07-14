import styled from 'styled-components'
import Colors from 'Config/Colors'

export const StatisticsGeneralInformationStyle = styled.div `
    padding-left:20px;

    .statistics{
        margin: auto;
        position: relative; 
        width:100%;
        height:250px;
    }
    .card-information{
        display: flex;
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0%);
    }

    .pieChart{
        width:300px;
        text-align:center;
        font-size:24px;
        margin: auto;
    }

    .clusterMap{
        background-color:purple;
        width:1200px;
        height:800px;
        margin: auto;
        position: relative;
        margin-bottom:50px;
    }

    .areaMap{
        background-color:red;
        width:1200px;
        height:800px;
        margin: auto;
        position: relative;
    }

`