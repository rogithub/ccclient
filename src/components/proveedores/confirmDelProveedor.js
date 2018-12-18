import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { delProveedor, confirmDelProveedor } from '../../actions';
import { connect } from 'react-redux';

class ConfirmDelProveedor extends React.Component {

  handleCancel = () => {
    this.props.confirmDel(undefined);
  };

  handleDelete = () => {
    var promise = this.props.delete(this.props.idToDelete);
    promise.then(() => this.props.confirmDel(undefined));
  };

  render() {
    const { open, idToDelete } = this.props;
    return (
      <div>
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Borrar Proveedor Folio: {idToDelete}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ¿Está segura de que desea borrar éste proveedor?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.handleDelete} color="primary" autoFocus>
              Borrar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    deleted: state.proveedores.deleted,
    idToDelete: state.proveedores.idToDelete,
    open: isNaN(state.proveedores.idToDelete) === false
   };
};

ConfirmDelProveedor = connect(mapStateToProps, {
  delete: delProveedor,
  confirmDel: confirmDelProveedor
})(ConfirmDelProveedor)

export default ConfirmDelProveedor;
