import React, { memo, useState, useEffect } from 'react';
import Navbar from "Page/Navbar/Navbar";
import { LOGIN_STATES } from "Common/Js/LoginStatusEnum";
import { validateLogin } from 'Service/LoginService';
import { getUserOrganizationsList } from 'Service/UserService';
import { Redirect } from "react-router-dom";
import CookieService from 'Service/CookieService';
import { CameraStyle } from 'Page/Camera/Style/CameraStyle'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Camera = ({...props}) => {
    const [loggedInStatus, setLoggedInStatus] = useState(LOGIN_STATES.WAITING);
    const [itemOpen, setItemOpen] = useState([]);
    const [cameraList, setCameraList] = useState([]);

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

        getUserOrganizationsList()
        .then((response) => {
            if (response.status === 200) {
                setCameraList(response.data);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    const organizationHandler = (organizationId) => {
        if (!(itemOpen.includes(organizationId))){
            let array = [...itemOpen];
            array.push(organizationId)
            setItemOpen(array);
        }
        else{
            let array = [...itemOpen];
            array.splice(array.indexOf(organizationId), 1)
            setItemOpen(array);
        }
    }

    const buildCameraList = () => {
        return cameraList.map((org, index) =>{
            return (
                <div key={"org_" + index}>
                    <div className="organization" onClick={() => organizationHandler(org.organizationId)}>
                        <div className="organization_name">{org.organization}</div>
                        <div className="organization_icon">
                            {(itemOpen.includes(org.organizationId)) ? <ExpandMoreIcon/> : <ExpandLessIcon/>}
                        </div>
                    </div>
                    <div 
                        className="organization_list"
                        style={{display: (itemOpen.includes(org.organizationId)) ? "" : "none"}}
                    >
                        {buildCameraItem(org.cameras)}
                    </div>
                </div>
            );
        });
    }

    const buildCameraItem = (cameras) => {
        return cameras.map((camera, index) =>{
            return (
                <div key={"camera_" + index} className="camera_item"> 
                    {camera.cameraName}
                </div>
            );
        });
    }
    return (
        <div className="cv-background">
            <Navbar/>
            {loggedInStatus === LOGIN_STATES.WAITING ? null 
                :
                loggedInStatus === LOGIN_STATES.LOGGEDIN ?
                <div className="cv-body">
                    <CameraStyle>
                        <div className="title">Câmeras</div>
                        <div className="camera-body">
                            <div className="camera-list">
                                {buildCameraList()}
                            </div>
                        </div>
                    </CameraStyle>
                </div>
                :
                <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
            }
        </div>
    );
};

export default memo(Camera);