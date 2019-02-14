import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MaterialesSelector from './materialesSelector';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import Save from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from "redux-form";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});


class AddMaterialExistente extends React.Component {

  handleCancel = () => {
    document.getElementById("add-material-existente-form").reset();
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };

  onSubmit = formValues => {
    alert(JSON.stringify(formValues));
  };

  render() {
    const { handleSubmit, classes } = this.props;

    return (
        <form className={classes.container} noValidate
        onSubmit={handleSubmit(this.onSubmit)}
        id="add-material-existente-form"
        autoComplete="off">
        <Field name="idMaterial" component={MaterialesSelector} />

          <TextField
            id="cantidad"
            label="Cantidad"
            className={classes.textField}
            margin="normal"
          />

          <TextField
            id="precioUnitario"
            label="Precio Unitario"
            className={classes.textField}
            margin="normal"
          />
          <div>
            <Button variant="contained" color="default" className={classes.button}
              onClick={ () => this.handleCancel() } >
              Cancelar
              <NavigateBefore className={classes.rightIcon}>send</NavigateBefore>
            </Button>
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
              Guardar
              <Save className={classes.rightIcon}>send</Save>
            </Button>
          </div>
        </form>
    );
  }
}

const validate = values => {
  const errors = {}
  if (!values.cantidad) {
    errors.cantidad = '* Requerido'
  }

  return errors
};

AddMaterialExistente = reduxForm({
  form: 'addMaterialExistente',
  validate,
  enableReinitialize: true
})(AddMaterialExistente);

AddMaterialExistente.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddMaterialExistente);
