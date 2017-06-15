import React from 'react';
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const MaterialUIDialog = function(props) {


   const actions = [
    <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={props.handleCancel}
    />,
    <FlatButton
      label="Submit"
      primary={true}
      keyboardFocused={true}
      onTouchTap={props.handleClose}
    />,
  ];


  return (
    <Dialog
      title={props.title}
      actions={actions}
      modal={false}
      open={props.isOpen}
      onRequestClose={props.handleClose}
    >
      Quantity: <input id="quantity"/><br/>
      Price per serving: ${props.price}<br/>
    </Dialog>
  )
}

export default MaterialUIDialog;
