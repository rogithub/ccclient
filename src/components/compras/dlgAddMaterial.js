import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { showDlgAddMaterial, addMaterial } from '../../actions';
import { connect } from 'react-redux';

class DlgAddMaterial extends React.Component {

  handleCancel = () => {
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
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Agregar Material</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ¿Está segura de que desea borrar éste proveedor?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.handleAdd} color="primary" autoFocus>
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
    open: state.compras.showAddMaterial,
   };
};

DlgAddMaterial = connect(mapStateToProps, {
  show: showDlgAddMaterial,
  addMaterial,
})(DlgAddMaterial)

export default DlgAddMaterial;
