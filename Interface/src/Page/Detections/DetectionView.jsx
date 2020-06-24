import React from 'react';
import DetectionCard from 'Page/Detections/DetectionCard'

const DetectionView = ({content}) => {

    function buildCard() {
        let body = []
        let card = []
        content.map((camera) => {
            let cameraJSON = camera.camera;
            let framesJSON = camera.frames;
            card = framesJSON.map((frame, index) =>{
                if (index < 2) {
                    return <DetectionCard 
                        img={`data:image/jpeg;base64, ${frame.frame}`}
                        field1={`Score: ${frame.detectionScore}`}
                        field2={'Capture Date: 20-06-2020 10:00:00'}
                        field3={'Detection Date: 20-06-2020 10:01:00'}
                        buttonText={'Detecção Incorreta'}
                        onClick={() => {console.log("Clico")}}
                        infoHeight={'125px'}
                    />
                 }
            });
            body.push(
                <div>
                    <div>{cameraJSON.id} | ver localização</div>  
                    <div>{card}</div>
                </div>
                
            );
        });

        return body;
    }

    return (buildCard());
};

export default DetectionView;