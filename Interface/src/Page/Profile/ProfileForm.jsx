import React, { memo, useState, useEffect } from 'react';
import CookieService from 'Service/CookieService';
import { ProfileFormStyle } from 'Page/Profile/Style/ProfileFormStyle';
import { Form, Button, Alert } from 'react-bootstrap';

/**
 * The history detection page
 */
const ProfileForm = ({...props}) => {
    const [loggedInStatus, setLoggedInStatus] = useState();
    
    useEffect(() => {
        let cs = new CookieService();
        let user = cs.get('login').user;
        console.log(user)
    }, []);

    const handleSubmit = (submit) => {
        console.log("form");
        console.log(submit.target.elements.formBasicPermission.value);
        submit.preventDefault();
        submit.stopPropagation();
    }

    return (
        <ProfileFormStyle>
            <Form onSubmit={(e) => handleSubmit(e)}>

                <Form.Group controlId="formBasicName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" placeholder="Digite seu primeiro nome" className="inputField"/>
                </Form.Group>

                <Form.Group controlId="formBasicSurname">
                    <Form.Label>Sobrenome</Form.Label>
                    <Form.Control type="text" placeholder="Digite seu sobrenome" className="inputField"/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Digite seu email" className="inputField"/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" placeholder="Digita sua Senha" className="inputField"/>
                </Form.Group>

                <Form.Group controlId="formBasicPermission">
                <Form.Label>Permissão</Form.Label>
                    <Form.Control as="select">
                    <option value={300}>User</option>
                    <option value={200}>Manager</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicOrganization">
                <Form.Label>Organização</Form.Label>
                    <Form.Control as="select">
                    </Form.Control>
                </Form.Group>

                <Button type="submit" className="submit">Cadastrar</Button>
            </Form>
        </ProfileFormStyle>
    );
}

export default memo(ProfileForm);