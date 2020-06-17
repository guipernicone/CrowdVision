import React, { Component } from 'react';
import 'Common/css/CrowdVision.css';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
class Login extends Component {



    handlePassword = (password) => {
        console.log(password.target.value);
    }
    handleSubmit= (submit) => {
        submit.preventDefault();
        submit.stopPropagation();
    }
    render() {
        return (
            <div className='cv-background'>
                <LoginBox>
                    <h1 className="title">Crowd Vison</h1>
                    {/* <h2>Bem - Vindo</h2> */}
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Digite seu email" className="inputField"/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" placeholder="Digita sua Senha" className="inputField" onChange={this.handlePassword}/>
                        </Form.Group>
                        <Form.Text className="text-muted">
                            Esqueceu sua Senha?
                        </Form.Text>
                        <Button variant="primary" type="submit" className="submit">
                            Submit
                        </Button>
                    </Form>
                </LoginBox>
            </div>
        );
    }
}

const LoginBox = styled.div`
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
`;
export default Login;