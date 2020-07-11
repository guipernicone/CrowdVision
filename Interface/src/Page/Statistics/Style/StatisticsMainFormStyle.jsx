import React from 'react';
import styled from 'styled-components'
import Colors from 'Config/Colors'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

export const StatisticsMainFormStyle = styled.div `
    .title{
        padding-left:40px;
        padding-top:20px;
        font-size: 40px;
        margin-bottom: 25px;
    }

    .data-field{
        width: 100%;
        height: 100px;
        /* background-color:blue; */
    }

    .buttom-field{
        width: 100%;
        height: 100px;
        /* float:right; */
    }

    .buttonSearch{
        float:right;
        margin-right:40px;
        font-size:20px;
        background-color: ${Colors.contrast_1};
        color: ${Colors.primary};
        border: 0;
    }
`