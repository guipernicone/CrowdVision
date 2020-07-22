import styled from 'styled-components'

export const StatisticsReportStyle = styled.div `
    padding:40px;
    .title{
        font-size: 40px;
    }

    
    .content{
        padding-left:20px;
    }
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

    .barChart{
        /* background-color:orange; */
        width:800px;
        height:500px;
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