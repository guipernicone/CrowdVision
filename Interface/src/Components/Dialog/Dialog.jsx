import React from 'react';
import DialogStyle from 'Components/Dialog/DialogStyle'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

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