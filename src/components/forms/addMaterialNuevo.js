import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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


class AddMaterialNuevo extends React.Component {
  getComposedName = (material) => {
    return `${material.nombre || ""} ${material.color || ""} ${material.marca || ""} ${material.modelo || ""}`
  }

  handleCancel = () => {
    document.getElementById("add-material-existente-form").reset();
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };

  onSubmit = formValues => {
    const m = this.props.material;
    if (this.props.onSave) {
      this.props.onSave({
        ...formValues,
        nombre: this.getComposedName(m),
        idMaterial: m.idMaterial,
        unidad: m.unidad
      });
    }
    document.getElementById("add-material-existente-form").reset();
  };
  
  renderField = (field) => {
    const { classes } = this.props;
    const error = field.meta.touched && field.meta.invalid;
    return (
      <TextField
        {...field.input}
        error={error}
        label={field.label}
        className={classes.textField}
        margin="normal"
      />
    );
  };

  render() {
    const { handleSubmit, classes } = this.props;

    return (
        <form className={classes.container} noValidate
        onSubmit={handleSubmit(this.onSubmit)}
        id="add-material-existente-form"
        autoComplete="off">

        <Field name="cantidad" label="Cantidad" component={this.renderCantidad} />
        <Field name="precio" label="Precio" component={this.renderPrecio} />

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
  if (values.idMaterial <= 0) {
    errors.idMaterial = '* Requerido'
  }

  if (isNaN(values.cantidad)) {
    errors.cantidad = '* Numérico'
  }

  if (values.cantidad <= 0) {
    errors.cantidad = '* Requerido'
  }

  if (isNaN(values.precio)) {
    errors.precio = '* Numérico'
  }

  if (values.precio <= 0) {
    errors.precio = '* Requerido'
  }

  return errors
};

AddMaterialNuevo = reduxForm({
  form: 'addMaterialExistente',
  validate,
  enableReinitialize: true
})(AddMaterialExistente);

AddMaterialNuevo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddMaterialNuevo);