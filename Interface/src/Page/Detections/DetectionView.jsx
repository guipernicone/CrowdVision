import React, { Component } from 'react';
import DetectionCard from 'Page/Detections/DetectionCard';
import { DetectionViewStyle } from 'Page/Detections/Style/DetectionViewStyle';
import Divisor from 'Components/Divisor/Divisor'
import Dialog from 'Components/Dialog/Dialog'
import { Button } from 'react-bootstrap';
import GoogleMapsApi from 'Components/GoogleMapsApi/GoogleMapsApi'
import ExploreIcon from '@material-ui/icons/Explore';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import {sendStatus} from 'Service/DetectionService'

/**
 * Build the body of the detection page
 * 
 * @param {Array} content  an array of object with detection crd properties
 */

class DetectionView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogStatus: []
        }
    }

    sendDetectionStatus = (id, historyId, status) => {
        sendStatus(id, historyId, status)
        .then((response) => {
            console.log(response.status)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    handlerDialog = (status, index) => {
        let newDialogStatus = this.state.dialogStatus.map((dialog, indexDialog) => {
            if (indexDialog == index) {
                return status;
            }
            return false
        })
        this.setState({dialogStatus : newDialogStatus});
    }

    render() {
        let body = []
        let card = []
    
        body = this.props.content.map((camera, index) => {
            let cameraJSON = camera.camera;
            let framesJSON = camera.frames;
    
            card = framesJSON.map((frame, index) =>{
                return <DetectionCard 
                    img={`data:image/jpeg;base64, ${frame.frame}`}
                    field1={`Confiabilidade: ${frame.detectionScore}`}
                    field2={'Data de Captura: 20-06-2020 10:00:00'}
                    field3={'Data de detecção: 20-06-2020 10:01:00'}
                    buttonText1={<DoneIcon/>}
                    onClick1={() => this.sendDetectionStatus(frame.id, frame.historyId, true)}
                    buttonText2={<CloseIcon/>}
                    onClick2={() => this.sendDetectionStatus(frame.id, frame.historyId, false)}
                    buttonColor1={"#00ff00"}
                    buttonColor2={"#ff0000"}
                    infoHeight={'125px'}
                />
            });
            
            this.state.dialogStatus.push(false);

            return (
                <DetectionViewStyle>
                    <div className="viewTitle">
                        {cameraJSON.id} | 
                        <Button className="buttonLocal" onClick={() => this.handlerDialog(true, index)}>
                            Localização <ExploreIcon className="exploreIcon"/>
                        </Button>
                        <Divisor width={"68%"} margin={"20px"}/>
                    </div> 
                    {this.state.dialogStatus[index] ? 
                        <Dialog 
                            closeDialog={() => {this.handlerDialog(false, index)}}
                            // dialogContent= {<GoogleMapsApi zoom={15} coordinates={{ lat: cameraJSON.latitude, lng: cameraJSON.longitude}}/>}
                            dialogStyle={{top:"0%", transform:"translate(-50%, 0%)"}}
                        /> : null}
                    <div className="viewCard">{card}</div>
                </DetectionViewStyle>
            )
        });
    
        return body;
    }
};

export default DetectionView;