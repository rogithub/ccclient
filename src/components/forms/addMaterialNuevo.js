import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextFieldComponent from './textFieldComponent';
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

  handleCancel = () => {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };

  onSubmit = formValues => {
    if (this.props.onSave) {
      this.props.onSave({
        cantidad: formValues.cantidad,
        precio: formValues.cantidad,
        material: {
          idMaterial:0,
          activo:true,
          nombre: formValues.nombre,
          color: formValues.color,
          unidad: formValues.unidad,
          marca: formValues.marca,
          modelo: formValues.modelo,
          comentarios: formValues.comentarios,
        }
      });
    }
  };

  render() {
    const { handleSubmit, classes } = this.props;

    return (
        <form className={classes.container} noValidate
        onSubmit={handleSubmit(this.onSubmit)}
        autoComplete="off">

          <Field name="nombre" componentProps={{
            label: "Nombre",
            className: classes.textField
          }} component={TextFieldComponent} />

          <Field name="color" componentProps={{
            label: "Color",
            className: classes.textField
          }} component={TextFieldComponent} />

          <Field name="unidad" componentProps={{
            label: "Unidad",
            className: classes.textField
          }} component={TextFieldComponent} />

          <Field name="marca" componentProps={{
            label: "Marca",
            className: classes.textField
          }} component={TextFieldComponent} />

          <Field name="modelo" componentProps={{
            label: "Modelo",
            className: classes.textField
          }} component={TextFieldComponent} />

          <Field name="comentarios" componentProps={{
            label: "Comentarios",
            className: classes.textField
          }} component={TextFieldComponent} />

          <Field name="cantidad" componentProps={{
            label: "Cantidad",
            className: classes.textField
          }} component={TextFieldComponent} />
          <Field name="precio" componentProps={{
            label: "Precio",
            className: classes.textField
          }} component={TextFieldComponent} />

          <div>
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
              Guardar
              <Save className={classes.rightIcon}>send</Save>
            </Button>
            <Button variant="contained" color="default" className={classes.button}
              onClick={ () => this.handleCancel() } >
              Cancelar
              <NavigateBefore className={classes.rightIcon}>send</NavigateBefore>
            </Button>
          </div>
        </form>
    );
  }
}

const validate = values => {
  const errors = {}
  if (!values.nombre) {
    errors.nombre = '* Requerido'
  }

  if (!values.color) {
    errors.color = '* Requerido'
  }

  if (!values.unidad) {
    errors.unidad = '* Requerido'
  }

  if (!values.cantidad) {
    errors.cantidad = '* Requerido';
  }

  if (isNaN(values.cantidad)) {
    errors.cantidad = '* Numérico';
  }

  if (!values.precio) {
    errors.precio = '* Requerido';
  }

  if (isNaN(values.precio)) {
    errors.precio = '* Numérico';
  }

  return errors;
};

const mapStateToProps = (state) => {
  return {

  };
}

AddMaterialNuevo = connect(mapStateToProps, {

}) (AddMaterialNuevo);

AddMaterialNuevo = reduxForm({
  form: 'frmAddMaterialNuevo',
  validate,
  enableReinitialize: true
})(AddMaterialNuevo);

AddMaterialNuevo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddMaterialNuevo);
