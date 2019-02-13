import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MaterialesSelector from '../forms/materialesSelector';
import { showDlgAddMaterial, addMaterial } from '../../actions';
import { connect } from 'react-redux';

class DlgAddMaterial extends React.Component {

  handleClose = () => {
    this.props.show(false);
  };

  handleAdd = () => {
    this.props.addMaterial({id: 2});
    this.props.show(false);
  };

  render() {
    const { open } = this.props;
    return (
      <div>
      <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Agregar Material</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send
            updates occasionally.
          </DialogContentText>
          <MaterialesSelector />
          <TextField
            autoFocus
            margin="dense"
            id="concepto"
            label="Concepto"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={this.handleAdd} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    open: state.compras.showAddMaterial || false,
   };
};

DlgAddMaterial = connect(mapStateToProps, {
  show: showDlgAddMaterial,
  addMaterial,
})(DlgAddMaterial)

export default DlgAddMaterial;
