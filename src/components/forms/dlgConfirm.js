import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { showConfirm } from '../../actions';
import { connect } from 'react-redux';

class DlgConfirm extends React.Component {

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
            <DialogContentText id="alert-dialog-description">
              {this.props.children}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel} color="primary">
              {cancelText}
            </Button>
            <Button onClick={this.handleConfirm} color="primary" autoFocus>
              {confirmText}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    open: state.dialogs.showConfirm || false;
   };
};

DlgConfirm = connect(mapStateToProps, {

})(DlgConfirm)

export default DlgConfirm;
