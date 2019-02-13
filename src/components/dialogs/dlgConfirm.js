import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { showConfirm } from '../../actions';
import { connect } from 'react-redux';

class DlgConfirmText extends React.Component {

  handleCancel = () => {
    const { handleCancel } = this.props;
    if (handleCancel) {
      handleCancel();
    }
    this.props.show(false);
  };

  handleConfirm = () => {
    const { handleConfirm } = this.props;
    if (handleConfirm) {
      handleConfirm();
    }
    this.props.show(false);
  };

  render() {
    const { open, title, confirmText, cancelText } = this.props;
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
            <Button onClick={this.handleCancel} color="primary">
              {cancelText || "Cancelar"}
            </Button>
            <Button onClick={this.handleConfirm} color="primary" autoFocus>
              {confirmText || "Aceptar"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    open: state.dialogs.showConfirm || false
   };
};

DlgConfirmText = connect(mapStateToProps, {
  show: showConfirm
})(DlgConfirmText)

export default DlgConfirmText;
