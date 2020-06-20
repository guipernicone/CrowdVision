import React from 'react';
import { DetectionCardStyle } from 'Page/Detections/Style/DetectionCardStyle'
import { Button } from 'react-bootstrap';

/**
 * A componet to display a detection frame
 * 
 * @param {String} field1 
 * @param {String} field2 
 * @param {String} fied3 
 * @param {String} fied4 
 * @param {String} backgroundColor 
 * @param {Object} img 
 */
const DetectionCard = ({field1 , field2, field3, field4, buttonText, backgroundColor , buttonColor, img = null, onClick}) => {
 
    return (
        <DetectionCardStyle backgroundColor={backgroundColor} buttonColor={buttonColor} >
            <div className="frame">
                <img src={img}/>
            </div>
            <div className="cardInfo">
                <div>{field1}</div>
                <div>{field2}</div>
                <div>{field3}</div>
                <div>{field4}</div>
                <Button variant="primary" className="buttonCard" onClick={onClick}>{buttonText}</Button>
            </div>
        </DetectionCardStyle>
    );
};

export default DetectionCard;