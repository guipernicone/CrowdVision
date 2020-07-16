import React, {memo} from 'react';
import { TitleDivisorStyle } from 'Components/TitleDivisor/TitleDivisorStyle'
import Divisor from 'Components/Divisor/Divisor'

/**
 * A title with a centered divisor
 * 
 * @param {Object} title The element that will be the tittle
 * @param {String} width The width of the divisor 
 */
const TitleDivisor = ({title, width}) => {
    return (
        <TitleDivisorStyle>
            {title} 
            <Divisor width={width} margin={"20px"}/>
        </TitleDivisorStyle> 
    );
};

export default memo(TitleDivisor);