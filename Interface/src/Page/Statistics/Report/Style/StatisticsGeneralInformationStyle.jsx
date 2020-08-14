import styled from 'styled-components'

export const StatisticsGeneralInformationStyle = styled.div `
    padding-left:20px;
    padding-right:20px;
    width: 100%
    ;
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

    .legend{
        width: 100%;
        height: 50px;
        margin: 20px;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:18px;
    }

    .legend-item{
        display:flex;
        align-items: center;
        margin-left: 10px;
    }

    .legend-circle{
        width: 50px;
        height: 40px;
        shape-outside: circle();
        clip-path: circle();
    }

    .barChart{
        width:800px;
        height:500px;
        margin: auto;
        position: relative;
        margin-bottom:50px;
    }

    .area{
        width: 100%;
    }
    .area-map{
        background-color:red;
        width:1200px;
        height:800px;
        margin: auto;
        position: relative;
    }

`