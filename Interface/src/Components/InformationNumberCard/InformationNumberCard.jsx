import React, {memo} from 'react';
import { InformationNumberCardStyle} from 'Components/InformationNumberCard/InformationNumberCardStyle'

const InformationNumberCard = ({number, label, primaryColor, secundaryColor, textColor}) => {
    return (
        <InformationNumberCardStyle primaryColor={primaryColor} secundaruColor={secundaryColor} textColor={textColor}>
            <div className="number-card">
                <div className="number">{number}</div>
            </div>
            <div className="label">
                {label}
            </div>
        </InformationNumberCardStyle>
    );
};

export default memo(InformationNumberCard);