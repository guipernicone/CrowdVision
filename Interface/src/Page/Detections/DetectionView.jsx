import React, {useState} from 'react';
import DetectionCard from 'Page/Detections/DetectionCard';
import { DetectionViewStyle } from 'Page/Detections/Style/DetectionViewStyle';
import Divisor from 'Components/Divisor/Divisor'
import Dialog from 'Components/Dialog/Dialog'
import { Button } from 'react-bootstrap';
import SimpleMap from 'Components/GoogleMapsApi/SimpleMap'
import ExploreIcon from '@material-ui/icons/Explore';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import {sendStatus} from 'Service/DetectionService'

/**
 * Build the body of the detection page
 * 
 * @param {Array} content  an array of object with detection card properties
 */
const DetectionView = ({content}) => {
    
    const [dialogStatus, setDialogStatus] = useState("");

    const sendDetectionStatus = (id, historyId, status) => {
        sendStatus(id, historyId, status)
        .then((response) => {
            console.log(response.status)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const buildBody = () => {
        let body = []
        let card = []

        body = content.map((camera, index) => {
            let cameraJSON = camera.camera;
            let framesJSON = camera.frames.reverse();
            
            card = framesJSON.map((frame, index) =>{
                return <DetectionCard
                    key={"detection_card_" + index}
                    img={`data:image/jpeg;base64, ${frame.frame}`}
                    field1={`Confiabilidade: ${frame.detectionScore}`}
                    field2={`Data de Captura: ${frame.captureTime}`}
                    field3={`Data de detecção: ${frame.detectionTime}`}
                    buttonText1={<DoneIcon/>}
                    onClick1={() => sendDetectionStatus(frame.id, frame.historyId, true)}
                    buttonText2={<CloseIcon/>}
                    onClick2={() => sendDetectionStatus(frame.id, frame.historyId, false)}
                    buttonColor1={"#00ff00"}
                    buttonColor2={"#ff0000"}
                    infoHeight={'125px'}
                />
            });

            return (
                <DetectionViewStyle key={"detection_view_element_" + index}>
                    <div className="viewTitle">
                        {cameraJSON.name} | 
                        <Button className="buttonLocal" onClick={() => dialogStatus == "" ? setDialogStatus(cameraJSON.id) : null}>
                            Localização <ExploreIcon className="exploreIcon"/>
                        </Button>
                        <Divisor width={"78%"} margin={"20px"}/>
                    </div> 
                    {dialogStatus == cameraJSON.id ?
                        <Dialog 
                            closeDialog={() => setDialogStatus("")}
                            // dialogContent= {<SimpleMap zoom={15} coordinates={{ lat: cameraJSON.latitude, lng: cameraJSON.longitude}}/>}
                        /> : null}
                    <div className="viewCard">{card}</div>
                </DetectionViewStyle>
            )
        });
    
        return body;
    }

    return buildBody()
};

export default DetectionView;