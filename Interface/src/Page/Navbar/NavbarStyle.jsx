import React from 'react';
import styled from 'styled-components'

export const NavbarStyle = styled.div`
    position:relative;
    background-color: #1e1e1e;
    color:#bb86fc;
    font-weight: 700;
    width:100%;
    height:60px;
    line-height: 60px;
    

    .navButton:hover {
        background-color: #bb86fc;
        color: #1e1e1e;

    }
    .navButton{
        padding-left: 30px;
        padding-right: 30px;
    }

    .navBarGroup1 {
        float: left;
        display: flex
    }
    .navBarGroup2 {
        float:right;
        right:0;
        display: flex;
    }
    a {
        color: #bb86fc;
    }
`;
