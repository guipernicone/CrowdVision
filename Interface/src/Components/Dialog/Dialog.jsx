import React from 'react';
import DialogStyle from 'Components/Dialog/DialogStyle'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

/**
 *  A dialog component fully costumized
 * 
 * @param {function} closeDialog A function to handler the close button.
 * @param {Object} dialogContent The content tha will be displayed.
 * @param {Object} dialogStyle A object to costumized the dialog component.
 */
const Dialog = ({closeDialog, dialogContent, dialogStyle}) => {

    return (
        <DialogStyle style={dialogStyle}>
            <div className="contentDialog">
                <HighlightOffIcon className="closeIcon" onClick={closeDialog}/>
                {dialogContent}
            </div>
        </DialogStyle>
    );
};

export default Dialog;