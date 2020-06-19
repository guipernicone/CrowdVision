import React from 'react';
import styled from 'styled-components'

export const NavbarStyle = styled.div`
    position:relative;
    /* padding-bottom: 15px;
    padding-top:15px; */
    background-color: #1e1e1e;
    color:#bb86fc;
    font-weight: 900;
    /* margin: 0 auto; */
    /* display: inline-block; */
    /* width: 100%; */
    /* text-align: center;  */
    /* justify-content: space-around; */
    /* display: flex; */
    width:100%;
    height:60px;
    line-height: 60px;
    

    .navButton:hover {
        background-color: #bb86fc;
        color: #1e1e1e;

    }
    .navButton{
        /* position:absolute; */
        padding-left: 15px;
        padding-right: 15px;
        margin-left:10px;
        margin-right:10px;
    }

    .navBarGroup1 {
        /* left: 5px; */
        /* position:absolute; */
        /* justify-content: space-around; */
        float: left;
        display: flex
        /* height:100%; */
        /* height: 30px; */
        /* width:30% */
    }
    .navBarGroup2 {
        float:right;
        right:0;
        /* justify-content: space-around; */
        display: flex;
        /* width: 10% */
    }
`;
