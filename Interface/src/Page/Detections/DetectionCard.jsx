import React from 'react';
import { DetectionCardStyle } from 'Page/Detections/Style/DetectionCardStyle'
import { Button } from 'react-bootstrap';

/**
 * A componet to display a detection frame
 * 
 * @param {String} field1 field of content
 * @param {String} field2 field of content
 * @param {String} fied3 field of content
 * @param {String} fied4 field of content
 * @param {String} backgroundColor the background color for the card
 * @param {Object} img the image url
 * @param {Function} onClick handler onclick event function
 * @param {String} infoHeight info div height
 */
const DetectionCard = ({field1 , field2, field3, field4, buttonText, backgroundColor , buttonColor, img = null, onClick, infoHeight}) => {
 
    return (
        <DetectionCardStyle backgroundColor={backgroundColor} buttonColor={buttonColor} infoHeight={infoHeight}>
            <div className="frame">
                <img src={img} alt="Detected frame"/>
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