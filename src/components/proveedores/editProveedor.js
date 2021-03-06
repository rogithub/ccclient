import React from 'react';
import { connect } from 'react-redux';
import { fetchOneProveedor, setAppTitle, updateProveedor } from '../../actions';
import Input from '../forms/input';
import { withRouter } from "react-router";
import { Field, reduxForm } from "redux-form";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import Save from '@material-ui/icons/Save';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  folio: {
    margin: theme.spacing.unit,
    width: 100,
    marginTop: 19,
  },
  textField: {
    margin: theme.spacing.unit,
    width: 200,
    marginTop: 19,
  },
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class EditProveedor extends React.Component {

  componentDidMount() {
    const { fetchOne, setAppTitle, match } = this.props;
    const id = match.params.id;
    fetchOne(id);
    setAppTitle(`Editar Proveedor ${id}`);
  }
  componentWillUnmount() {
    this.props.setAppTitle(undefined);
  }

  onSubmit = formValues => {
    var promise = this.props.update(formValues);
    promise.then(() => this.props.history.push(`/proveedores`));
  }

  render () {
    const p = this.props.initialValues;
    const { classes, handleSubmit, pristine, invalid, history, callbackInProcess } = this.props;
    if (p === null){
      return <div>Proveedor no encontrado.</div>
    }

    return (
      <form onSubmit={handleSubmit(this.onSubmit)} noValidate autoComplete="off">
        <div className={classes.container}>
          <Field name="idProveedor" label="Folio" disabled={true}
                 className={classes.folio} component={Input} />
          <Field name="empresa" label="Empresa"
                 className={classes.textField} component={Input} />
          <Field name="contacto" label="Contacto"
                 className={classes.textField} component={Input} />
          <Field name="domicilio" label="Domicilio"
                 className={classes.textField} component={Input}
                 rowsMax="4" multiline={true} />
          <Field name="telefono" label="Teléfono"
                 className={classes.textField} component={Input} />
          <Field name="email" label="Email"
                 className={classes.textField} component={Input} />
          <Field name="comentarios" label="Comentarios"
                 className={classes.textField} component={Input}
                 rowsMax="4" multiline={true} />
        </div>
        <div>
          <Button variant="contained" color="default" className={classes.button}
                  onClick={ () => history.push(`/proveedores`) }
                  disabled={callbackInProcess} >
            Cancelar
            <NavigateBefore className={classes.rightIcon}>send</NavigateBefore>
          </Button>
          <Button type="submit"
                  disabled={pristine || invalid || callbackInProcess}
                  variant="contained" color="primary"
                  className={classes.button}>
            Guardar
            <Save className={classes.rightIcon}>send</Save>
          </Button>
        </div>
      </form>
    );
  }
};

const validate = values => {
  const errors = {}
  if (!values.empresa) {
    errors.empresa = '* Requerido'
  }

  if (!values.contacto) {
    errors.contacto = '* Requerido'
  }

  if (!values.telefono) {
    errors.telefono = '* Requerido'
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Email no valido.'
  }

  return errors
};

EditProveedor = withRouter(EditProveedor);

EditProveedor = reduxForm({
  form: 'editProveedor',
  validate,
  enableReinitialize: true
})(EditProveedor);

EditProveedor.propTypes = {
  classes: PropTypes.object.isRequired,
};

EditProveedor = withStyles(styles)(EditProveedor);

const mapStateToProps = (state) => {
  return {
    initialValues: state.proveedores.selected,
    callbackInProcess: state.app.callbackInProcess
   };
};

EditProveedor = connect(mapStateToProps, {
  fetchOne: fetchOneProveedor,
  setAppTitle: setAppTitle,
  update: updateProveedor
})(EditProveedor)

export default EditProveedor;
