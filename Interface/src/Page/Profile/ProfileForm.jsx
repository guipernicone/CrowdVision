import React, { memo, useState, useEffect } from 'react';
import CookieService from 'Service/CookieService';
import { ProfileFormStyle } from 'Page/Profile/Style/ProfileFormStyle';
import { Form, Button, Alert } from 'react-bootstrap';
import { getUserOrganizations, saveUser } from 'Service/UserService';

/**
 * The User register form
 */
const ProfileForm = () => {

    const [organizations, setOrganizations] = useState([{id:'', name:'-----'}]);
    const [errorAlert, setErroAlert] = useState("none");
    const [successAlert, setSuccessAlert] = useState("none");

    useEffect(() => {
        const user = (new CookieService()).get('login').user;
        console.log(user);
        getUserOrganizations(user.id)
        .then((response) => {
            console.log(response)
            if (response.status === 200) {
                setOrganizations(response.data);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    },[])

    const buildOrganizationOptions = () => {
        return organizations.map((org, index) =>{
            return <Form.Check type={"checkbox"} key={"option_permission_" + index} id={"checkbox_" + index} label={org.name} value={org.id}/>
        }) 
    }
    
    const getCheckboxFormResponse = (elements) => {
        let response = [];
        organizations.map((org, index) =>{
            if ( elements["checkbox_" + index].checked){
                response.push(elements["checkbox_" + index].value)
            }
        });
        return response;
    }

    const handleSubmit = (submit) => {
        submit.preventDefault();
        submit.stopPropagation();
        let elements = submit.target.elements;

        let userJson = {
            name: elements.formBasicName.value,
            "surname": elements.formBasicSurname.value,
            "email": elements.formBasicEmail.value,
            "password": elements.formBasicPassword.value,
            "permission": elements.formBasicPermission.value,
            "organizationIds": getCheckboxFormResponse(elements),
            "requestUserId": (new CookieService()).get('login').user.id
        }

        saveUser(userJson)
        .then((response) => {
            console.log(response)
            if (response.status === 200) {
                if (errorAlert === "" ) {
                    setErroAlert("none");
                }

                setSuccessAlert("");
            }
            else{
                if (successAlert === "") {
                    setSuccessAlert("none");
                }
                setErroAlert("");
            }
        })
        .catch((error) => {
            console.log(error);
            if (successAlert === "") {
                setSuccessAlert("none");
            }
            setErroAlert("");
        })
    }

    return (
        <ProfileFormStyle>
            <Alert variant={'danger'} style={{display:errorAlert}}>Não foi possível cadastrar o usuário</Alert>
            <Alert variant={'success'} style={{display:successAlert}}>Usuário cadastrado com sucesso</Alert>
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
                    <option value={100}>User</option>
                    <option value={200}>Manager</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group id="formBasicOrganization">
                <Form.Label>Organização</Form.Label>
                    {buildOrganizationOptions()}
                </Form.Group>

                <Button type="submit" className="submit">Cadastrar</Button>
            </Form>
        </ProfileFormStyle>
    );
}

export default memo(ProfileForm);