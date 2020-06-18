import React, { Component } from 'react';
import 'Common/css/CrowdVision.css';
import { Form, Button, Alert } from 'react-bootstrap';
import { login } from 'Service/LoginService'
import CookieManager from 'Service/CookieService';
import {Redirect} from 'react-router-dom';
import {LoginBox} from 'Page/Login/LoginStyle'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMSG : "none",
            redirect : false
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
            if (response.status === 200) {
                if (this.state.errorMSG === "") {
                    this.setState({errorMSG : "none"});
                }
                console.log(response.data)

                let date = new Date();
 
                date.setTime(date.getTime() + (60* 60 * 1000));
                let object = {path: '/', expires: date}

                const cm =  new CookieManager();
                cm.set("login", JSON.stringify(response.data), object);

                this.setState({redirect: true});
            }
            else if (this.state.errorMSG !== "") {
                this.setState({errorMSG : ""});
            }
        })
        .catch((error) => {
            console.log(error)
        }) 
    }


    render() {
        return (
            <div className='cv-background'>
                {this.state.redirect ? <Redirect to='/' /> :
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
                            Entrar
                        </Button>
                    </Form>
                </LoginBox>
                }
            </div>
        );
    }
}

export default Login;