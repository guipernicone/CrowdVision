import React, { useState, useEffect, memo } from 'react';
import DetectionCard from 'Page/Detections/DetectionCard';
import { HistoryViewStyle } from 'Page/History/Style/HistoryViewStyle';
import { getUserCameras } from 'Service/UserService';
import { getHistoryDetections } from 'Service/DetectionService';
import Divisor from 'Components/Divisor/Divisor'
import Dialog from 'Components/Dialog/Dialog'
import { Button } from 'react-bootstrap';
import SimpleMap from 'Components/GoogleMapsApi/SimpleMap'
import ExploreIcon from '@material-ui/icons/Explore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CookieService from 'Service/CookieService'
import ClipLoader from "react-spinners/ClipLoader";

/**
 * Build the body of the history page
 * 
 * @param {Array} detectionsContent  an array of object with history detections
 */

const HistoryView = () => {  

    const [dialogStatus, setDialogStatus] = useState([]);
    const [cameraList, setCameraList] = useState([]);
    const [detections, setDetections] = useState([]);
    const [cameraDropDown, setCameraDropDown] = useState('');

    useEffect(() => {
        getUserCameras()
        .then(response => {
            console.log(response)
            if (response.status === 200)
            {
                setCameraList(response.data)
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    const handlerCameraDropDown = (cameraId) => {
        setDetections([]); 
        if (cameraId == cameraDropDown) {
            setCameraDropDown(""); 
        }
        else{
            let cs = new CookieService();
            let login = cs.get('login');
            getHistoryDetections(login.user.id, cameraId)
            .then(response => {
                console.log(response)
                if (response.status === 200)
                {
                    setDetections(response.data)
                }
            })
            .catch((error) => {
                console.log(error);
            })
            setCameraDropDown(cameraId); 
        }
    }

    const buildCards = () =>{
        if (detections.length > 0)
        {
            return detections[0].frames.map((frame, index) =>{
                return (
                    <DetectionCard
                        key={"detection_card_" + index}
                        img={`data:image/jpeg;base64, ${frame.frame}`}
                        field1={`Confiabilidade: ${frame.detectionScore}`}
                        field2={`Data de Captura: ${frame.captureTime}`}
                        field3={`Data de detecção: ${frame.detectionTime}`}
                        field4={`Status da detecção: ${frame.detectionStatus ? 'Positiva' : 'Falsa'}`}
                        infoHeight={'110px'}
                    />
                )
            });
        }
    }
    const buildBody = () => {
        let body = []

        body = cameraList.map((camera, index) => {

            return (
                <HistoryViewStyle key={"detection_view_element_" + index}>
                    <div className="viewTitle">
                        {camera.name} |
                        <Button className="buttonLocal" onClick={() => dialogStatus == "" ? setDialogStatus(camera.id) : null}>
                            Localização <ExploreIcon className="exploreIcon"/>
                        </Button>
                        <div className="dropdown-camera" onClick={() => handlerCameraDropDown(camera.id)}>
                            <Divisor width={"100%"} margin={"20px"}/>
                            {cameraDropDown == camera.id ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                        </div>
                    </div> 
                    {dialogStatus == camera.id ? 
                        <Dialog 
                            closeDialog={() => setDialogStatus("")}
                            // dialogContent= {<SimpleMap zoom={15} coordinates={{ lat: camera.latitude, lng: camera.longitude}}/>}
                        /> : null}
                    <div className="viewCard" style={{display : cameraDropDown == camera.id ? '' : 'none'}}>
                        {buildCards()}
                        <div className="loading-card">
                            <ClipLoader
                                size={150}
                                color={"#bb86fc"}
                                loading={(detections.length == 0 ? true : false)}
                            />
                        </div>
                    </div>
                    
                </HistoryViewStyle>
            )
        })
        return body;
    }

    return buildBody()
   
};

export default memo(HistoryView);