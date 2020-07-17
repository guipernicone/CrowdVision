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
 * @param {String} buttonText1 the background color for the card
 * @param {String} buttonText2 the background color for the card
 * @param {Object} img the image url
 * @param {Function} onClick1 handler onclick event function para o primeiro botão
 * @param {Function} onClick2 handler onclick event function para o segundo botão
 * @param {String} infoHeight info div height
 */
const DetectionCard = (
        {
            field1, 
            field2, 
            field3, 
            field4, 
            buttonText1, 
            buttonText2, 
            backgroundColor , 
            buttonColor1, 
            buttonColor2, 
            img = null, 
            onClick1, 
            onClick2, 
            infoHeight
        }
    ) => {
 
    return (
        <DetectionCardStyle backgroundColor={backgroundColor} buttonColor1={buttonColor1} buttonColor2={buttonColor2} infoHeight={infoHeight}>
            <div className="frame">
                <img src={img} alt="Detected frame"/>
            </div>
            <div className="cardInfo">
                <div>{field1}</div>
                <div>{field2}</div>
                <div>{field3}</div>
                <div>{field4}</div>
                {buttonText1 ? <Button variant="primary" className="buttonCardLeft buttonCard" onClick={onClick1}>{buttonText1}</Button> : null}
                {buttonText2 ? <Button variant="primary" className="buttonCardRight buttonCard" onClick={onClick2}>{buttonText2}</Button>: null}
                
            </div>
        </DetectionCardStyle>
    );
};

export default DetectionCard;