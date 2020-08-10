import React, { useState, memo } from 'react';
import DetectionCard from 'Page/Detections/DetectionCard';
import { HistoryViewStyle } from 'Page/History/Style/HistoryViewStyle';
import Divisor from 'Components/Divisor/Divisor'
import Dialog from 'Components/Dialog/Dialog'
import { Button } from 'react-bootstrap';
import SimpleMap from 'Components/GoogleMapsApi/SimpleMap'
import ExploreIcon from '@material-ui/icons/Explore';

/**
 * Build the body of the history page
 * 
 * @param {Array} detectionsContent  an array of object with history detections
 */

const HistoryView = ({detectionsContent}) => {  

    const [dialogStatus, setDialogStatus] = useState([]);

    const handlerDialog = (status, index) => {
        let newDialogStatus = dialogStatus.map((dialog, indexDialog) => {
            if (indexDialog === index) {
                return status;
            }
            return false
        })
        setDialogStatus(newDialogStatus);
    }

    const buildBody = () => {
        let body = []
        let card = []
    
        console.log(detectionsContent);
        body = detectionsContent.map((camera, index) => {
            let cameraJSON = camera.camera;
            let framesJSON = camera.frames.reverse();
            
            card = framesJSON.map((frame, index) =>{
                return <DetectionCard
                    key={"detection_card_" + index}
                    img={`data:image/jpeg;base64, ${frame.frame}`}
                    field1={`Confiabilidade: ${frame.detectionScore}`}
                    field2={`Data de Captura: ${frame.captureTime}`}
                    field3={`Data de detecção: ${frame.detectionTime}`}
                    field4={`Status da detecção: ${frame.detectionStatus ? 'Positiva' : 'Falsa'}`}
                    infoHeight={'110px'}
                />
            });
            
            dialogStatus.push(false);
    
            return (
                <HistoryViewStyle key={"detection_view_element_" + index}>
                    <div className="viewTitle">
                        {cameraJSON.name} | 
                        <Button className="buttonLocal" onClick={() => handlerDialog(true, index)}>
                            Localização <ExploreIcon className="exploreIcon"/>
                        </Button>
                        <Divisor width={"68%"} margin={"20px"}/>
                    </div> 
                    {dialogStatus[index] ? 
                        <Dialog 
                            closeDialog={() => {handlerDialog(false, index)}}
                            // dialogContent= {<SimpleMap zoom={15} coordinates={{ lat: cameraJSON.latitude, lng: cameraJSON.longitude}}/>}
                            dialogStyle={{top:"0%", transform:"translate(-50%, 0%)"}}
                        /> : null}
                    <div className="viewCard">{card}</div>
                </HistoryViewStyle>
            )
        });
    
        return body;
    }

    return buildBody()
   
};

export default memo(HistoryView);