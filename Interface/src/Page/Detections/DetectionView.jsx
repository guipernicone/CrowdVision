import React from 'react';
import DetectionCard from 'Page/Detections/DetectionCard';
import { DetectionViewStyle } from 'Page/Detections/Style/DetectionViewStyle';
import Divisor from 'Components/Divisor/Divisor'

/**
 * Build the body of the detection page
 * 
 * @param {Array} content  an array of object with detection crd properties
 */
const DetectionView = ({content}) => {

    let body = []
    let card = []

    body = content.map((camera) => {
        let cameraJSON = camera.camera;
        let framesJSON = camera.frames;

        card = framesJSON.map((frame, index) =>{
            // if (index < 7) {
                return <DetectionCard 
                    img={`data:image/jpeg;base64, ${frame.frame}`}
                    field1={`Score: ${frame.detectionScore}`}
                    field2={'Capture Date: 20-06-2020 10:00:00'}
                    field3={'Detection Date: 20-06-2020 10:01:00'}
                    buttonText={'Detecção Incorreta'}
                    onClick={() => {console.log("Clico")}}
                    infoHeight={'125px'}
                />
            //  }
        });

        return (
            <DetectionViewStyle>
                <div className="viewTitle">
                    {cameraJSON.id} | ver localização
                    <Divisor width={"68%"} margin={"20px"}/>
                </div>  
                <div className="viewCard">{card}</div>
            </DetectionViewStyle>
        )
    });

    return body;
};

export default DetectionView;