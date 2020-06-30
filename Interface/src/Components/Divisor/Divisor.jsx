import React from 'react';
import { DivisorStyle } from 'Components/Divisor/DivisorStyle'

/**
 * A hr element to use like a divisor, can be customizable.
 * 
 * @param {String} width the hr element width
 * @param {String} margin the hr element margin
 * 
 * @return hr element
 */
const Divisor = ({width, margin}) => {
    return (
        <DivisorStyle width={width} margin={margin}> <hr/> </DivisorStyle>
    );
};

export default Divisor;