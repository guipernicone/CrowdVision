import React, { memo, useState, useEffect } from 'react';
import Navbar from "Page/Navbar/Navbar";
import { LOGIN_STATES } from "Common/Js/LoginStatusEnum";
import { validateLogin } from 'Service/LoginService';
import { Redirect } from "react-router-dom";
import CookieService from 'Service/CookieService';
import { ProfileStyle } from 'Page/Profile/Style/ProfileStyle';
import ProfileForm from 'Page/Profile/ProfileForm';
import ProfileSideMenu from 'Page/Profile/ProfileSideMenu';
import ProfileInformation from 'Page/Profile/ProfileInformation';
import ProfileUserList from 'Page/Profile/ProfileUserList'

/**
 * The Profile detection page
 */
const Profile = ({...props}) => {
    const [loggedInStatus, setLoggedInStatus] = useState(LOGIN_STATES.WAITING);
    const [menuOption, setMenuOption] = useState("Informações do Usuário");

    const optionsList = [
        "Informações do Usuário",
        "Cadastro de Usuário",
        "Lista de Usuários"
    ]

    const User = (new CookieService()).get('login').user;

    useEffect(() => {
        validateLogin()
        .then((response) => {
            if (response.status === 200) {
                return setLoggedInStatus(LOGIN_STATES.LOGGEDIN);
            }
            return setLoggedInStatus(LOGIN_STATES.NOTLOGGEDIN);
        })
        .catch((error) => {
            console.log(error);
            return setLoggedInStatus(LOGIN_STATES.NOTLOGGEDIN);
        })

    }, []);

    const buildProfileContent = () => {
        switch(menuOption){
            case 'Informações do Usuário':
                return <ProfileInformation/>;
            case 'Cadastro de Usuário':
                if (User.permission !== 'USER') {
                    return <ProfileForm/>
                }
                else{
                    return null
                }
            case 'Lista de Usuários':
                if (User.permission !== 'USER') {
                    return <ProfileUserList/>
                }
                else{
                    return null
                }
            default:{
                return null;
            }
        }
    }

    return (
        <div className="cv-background">
            <Navbar/>
            {loggedInStatus === LOGIN_STATES.WAITING ? null 
                :
                loggedInStatus === LOGIN_STATES.LOGGEDIN ?
                <div className="cv-body">
                    <ProfileStyle>
                        <div className="profile-body">
                            <div className="side-menu">
                                <div className="title">Perfil</div>
                                <ProfileSideMenu options={optionsList} optionHandler={setMenuOption} selectedOption={menuOption}/>
                            </div>
                            <div className="profile-content">
                                {buildProfileContent()}
                            </div>
                        </div>
                    </ProfileStyle>
                </div>
                :
                <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
            }
        </div>
    );
}

export default memo(Profile);