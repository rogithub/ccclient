import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class DlgConfirmText extends React.Component {

  render() {
    const { open, title, handleCancel, handleConfirm, confirmText, cancelText } = this.props;
    return (
      <div>
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            {this.props.children}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="primary">
              {cancelText || "Cancelar"}
            </Button>
            <Button onClick={handleConfirm} color="primary" autoFocus>
              {confirmText || "Aceptar"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DlgConfirmText;
