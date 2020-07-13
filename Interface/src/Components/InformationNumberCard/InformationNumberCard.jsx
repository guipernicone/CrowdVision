import React, {memo} from 'react';
import { InformationNumberCardStyle} from 'Components/InformationNumberCard/InformationNumberCardStyle'

const InformationNumberCard = ({number, label, primaryColor, secundaruColor, textColor}) => {
    return (
        <InformationNumberCardStyle>
            <div className="number-card">
                <div className="number">900</div>
            </div>
            <div className="label">
                Label para DetecçõesCARDG RANDE
            </div>
        </InformationNumberCardStyle>
    );
};

export default memo(InformationNumberCard);