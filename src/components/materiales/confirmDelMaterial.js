import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { delMaterial, closeConfirmDelMaterial } from '../../actions';
import { connect } from 'react-redux';

class ConfirmDelMaterial extends React.Component {

  handleCancel = () => {
    this.props.close(0);
  };

  handleDelete = () => {
    var promise = this.props.delete(this.props.idToDelete);
    promise.then((count) => this.props.close(count));
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
          <DialogTitle id="alert-dialog-title">Borrar Material Folio: {idToDelete}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ¿Está segura de que desea borrar éste material?
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
    deleted: state.materiales.deleted,
    idToDelete: state.materiales.idToDelete,
    open: isNaN(state.materiales.idToDelete) === false
   };
};

ConfirmDelMaterial = connect(mapStateToProps, {
  delete: delMaterial,
  close: closeConfirmDelMaterial
})(ConfirmDelMaterial)

export default ConfirmDelMaterial;
