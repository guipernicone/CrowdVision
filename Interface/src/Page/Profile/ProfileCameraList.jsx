import React, {useEffect, useState} from 'react';
import { ProfileCameraListStyle } from 'Page/Profile/Style/ProfileCameraListStyle'
import { Form, Button, Alert } from 'react-bootstrap';
import CookieService from 'Service/CookieService';
import { getUserListOrganizations, getUserOrganizationsList } from 'Service/UserService'
import { getAvailableCameras } from 'Service/CameraService'
import { updateOrganizationCameraList } from 'Service/OrganizationService'
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { CodeSharp } from '@material-ui/icons';

const ProfileCameraList = () => {

    const [organizations, setOrganizations] = useState([]);
    const [selectedOrganization, setSelectedOrganization] = useState([]);
    const [availableCameras, setAvailableCameras] = useState([]);

    useEffect(() => {
        getUserListOrganizations()
        .then( response => {
            console.log(response);
            if (response.status == 200) {
                setOrganizations(response.data);
            }
        })
        .catch( error => {
            console.log(error)
        }) 

    }, [])

    const buildOrganizationOptions = () => {
        let orgList = [<option key={"option_default"} value="" selected disabled hidden>Selecione uma organização</option>]
        organizations.map((org, index) =>{
            orgList.push(<option key={"option_" + index} value={org.id}>{org.name}</option>);
        }) 
        return orgList;

    }

    const buildActualCameraOptions = () => {
        if (selectedOrganization.organizationId != undefined)
        {
            let cameraCards = selectedOrganization.cameras.map( (camera, index) => {
                return (
                    <div key={"camera_card_" + index} className="camera-card">
                        <div className="camera-name">{camera.name}</div>
                        <div className="icon" onClick={() => callUpdateCameraList(selectedOrganization.organizationId, camera.id, true)}><DeleteIcon style={{color:"red"}}/></div>
                    </div>
                )
            })
            return (
                <div className="actual" >
                    <div className="section-title"> Câmeras de {selectedOrganization.organization} </div>
                    <div className="actual-cards">{cameraCards}</div>  
                </div>
            )
        } 
    }

    const buildAvailableCameraOptions = () => {
        if (selectedOrganization.organizationId != undefined && availableCameras.length > 0)
        {
            let cameraCards = availableCameras.map( (camera, index) => {
                return (
                    <div key={"camera_card_" + index} className="camera-card">
                        <div className="camera-name">{camera.name}</div>
                        <div className="icon" onClick={() => callUpdateCameraList(selectedOrganization.organizationId, camera.id, false)}><AddCircleIcon style={{color:"green"}}/></div>
                    </div>
                )
            })
            return (
                <div className="actual" >
                    <div className="section-title"> Câmeras disponíveis </div>
                    <div className="actual-cards">{cameraCards}</div>  
                </div>
            )
        }
    }
    
    const handleSelectOrganization = (orgId) => {
        getAvailableCameras(orgId)
        .then( response => {
            console.log(response);
            if (response.status == 200) {
                setAvailableCameras(response.data)
            }
            else{
                setAvailableCameras([])
            }
        })
        .catch( error => {
            console.log(error)
        }) 

        getUserOrganizationsList(orgId)
        .then( response => {
            console.log(response);
            if (response.status == 200) {
                setSelectedOrganization(response.data[0]);
            }
        })
        .catch( error => {
            console.log(error)
        }) 
    }

    const callUpdateCameraList = (org, camera, deleteBool) => {
        updateOrganizationCameraList(org, camera, deleteBool)
        .then( response => {
            console.log(response);
            if (response.status === 200)
            {
                handleSelectOrganization(org);
            }
        })
        .catch( error => {
            console.log(error)
        })
    }

    return (
        <ProfileCameraListStyle>
            <Form.Group controlId="formBasicPermission">
            <Form.Label className="orgnization-title">Organizações</Form.Label>
                <Form.Control as="select" onChange={(e) => handleSelectOrganization(e.target.value)}>
                    {buildOrganizationOptions()}
                </Form.Control>
            </Form.Group>
            <div className="info">
                {buildActualCameraOptions()}
                {buildAvailableCameraOptions()}
            </div>
        </ProfileCameraListStyle>
    );
};

export default ProfileCameraList;