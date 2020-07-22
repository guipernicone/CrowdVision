import React, { memo, useState, useEffect } from 'react';
import Navbar from "Page/Navbar/Navbar";
import { LOGIN_STATES } from "Common/Js/LoginStatusEnum";
import { validateLogin } from 'Service/LoginService';
import { Redirect } from "react-router-dom";
import CookieService from 'Service/CookieService';
import { ProfileStyle } from 'Page/Profile/Style/ProfileStyle';
import ProfileForm from 'Page/Profile/ProfileForm';

/**
 * The Profile detection page
 */
const Profile = ({...props}) => {
    const [loggedInStatus, setLoggedInStatus] = useState(LOGIN_STATES.WAITING);
    const User = (new CookieService()).get('login').user;

    useEffect(() => {
        validateLogin()
        .then((response) => {
            console.log(response);
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

    return (
        <div className="cv-background">
            <Navbar/>
            {loggedInStatus === LOGIN_STATES.WAITING ? null 
                :
                loggedInStatus === LOGIN_STATES.LOGGEDIN ?
                <div className="cv-body">
                    <ProfileStyle>
                        <div className="title">Perfil</div>
                        <div className="profile-body">
                            <div className="side-menu"></div>
                            <div className="profile-content">
                            {
                                User.permission !== 'USER'  ?  <ProfileForm/> : null
                            }
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