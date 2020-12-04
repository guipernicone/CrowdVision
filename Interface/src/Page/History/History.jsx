import React, { memo, useState, useEffect } from 'react';
import Navbar from "Page/Navbar/Navbar";
import { LOGIN_STATES } from "Common/Js/LoginStatusEnum";
import { validateLogin } from 'Service/LoginService';
import { getHistoryDetections } from 'Service/DetectionService';
import { Redirect } from "react-router-dom";
import CookieService from 'Service/CookieService'
import  HistoryView from 'Page/History/HistoryView'
import { HistoryStyle } from 'Page/History/Style/HistoryStyle'

/**
 * The history detection page
 */
const History = ({...props}) => {
    const [loggedInStatus, setLoggedInStatus] = useState(LOGIN_STATES.WAITING);
    const [detectionsContent, setDetectionsContent] = useState([]);

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
                    <HistoryStyle>
                        <div className="title">Histórico de Detecções</div>
                        <div className="cards">
                            <HistoryView key="detection_view"/> 
                        </div>
                        
                    </HistoryStyle>
                </div>
                :
                <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
            }
        </div>
    );
}

export default memo(History);