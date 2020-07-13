import React from 'react';
import styled from 'styled-components'
import Colors from 'Config/Colors'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

export const StatisticsDateInputStyle = styled.div `
    padding-left:40px;
    padding-top:20px;
    margin-bottom: 25px;

    .date-input{
        width:310px;
        font-size: 20px;
    }
    .time-input{
        width:100px;
        font-size: 20px;
        margin-right:20px;
    }

    .select-date{
        display: flex;
    }

    .input-fields{
        padding-left:20px;
        padding-top:20px;
    }
`