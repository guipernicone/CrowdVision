import React, { Component } from 'react';
import 'Common/css/CrowdVision.css';
import styled from 'styled-components';
import { Form, Button, Alert } from 'react-bootstrap';
import { login } from 'Service/HttpRequest'
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMSG : "none"
        }
    }

    handleSubmit= (submit) => {
        submit.preventDefault();
        submit.stopPropagation();

        let password = submit.target.elements.formBasicPassword.value;
        let email = submit.target.elements.formBasicEmail.value;

        if (password === '' || email === '') {
            return this.setState({errorMSG : ""});
        }

        login(email, password)
        .then((response) => {
            if (response == 200) {
                if (this.state.errorMSG === "") {
                    this.setState({errorMSG : "none"});
                }
                console.log("Validado");
            }
            else if (this.state.errorMSG !== "") {
                this.setState({errorMSG : ""});
            }
        })
        .catch((error) => {
            console.log("error")
        }) 
    }

    render() {
        return (
            <div className='cv-background'>
                <LoginBox>
                    <h1 className="title">Crowd Vison</h1>
                    <Alert variant={'danger'} className="alertForm" style={{display:this.state.errorMSG}}>Email ou Senha Invalida</Alert>
                    <Form onSubmit={(e) => this.handleSubmit(e)}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Digite seu email" className="inputField"/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" placeholder="Digita sua Senha" className="inputField"/>
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
    .alertForm {
        width:300px;
        margin: 0 auto;
        margin-bottom: 10px;
    }
`;
export default Login;