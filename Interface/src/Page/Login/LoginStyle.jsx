import styled from 'styled-components';

export const LoginBox = styled.div`
text-align:center;
color: white;
background-color: #1e1e1e;
width:400px;
height:500px;
position:absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);

.title {
    margin-top: 30px;
    margin-bottom: 70px;
}
.inputField {
    width:300px;
    margin: 0 auto;
    background-color: transparent;
    color: white;
    outline: none;
    outline-style: none;
    outline-width: 0;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: solid #121212 1px;
    padding: 3px 10px;
    box-shadow:none !important;
}
.submit {
    background-color: #bb86fc;
    color: black;
    font-weight:500;
    border: none;
    margin-top:10px;
}
.alertForm {
    width:300px;
    margin: 0 auto;
    margin-bottom: 10px;
}
`;
