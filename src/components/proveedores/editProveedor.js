import React from 'react';
import { connect } from 'react-redux';
import { fetchOneProveedor } from '../../actions';
import Input from '../forms/input';
import { withRouter } from "react-router";
import { Field, reduxForm } from "redux-form";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Route } from 'react-router-dom'
import NavigateBefore from '@material-ui/icons/NavigateBefore';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  folio: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 100,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  button: {
    margin: theme.spacing.unit,
    height: 40,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class EditProveedor extends React.Component {

  componentDidMount() {
    this.props.fetchOne(this.props.match.params.id);
  }

  onSubmit (formValues) {
    alert(JSON.stringify(formValues));
  }

  render () {
    const p = this.props.initialValues;
    const { classes, handleSubmit } = this.props;
    if (p === null){
      return <div>Proveedor no encontrado.</div>
    }

    return (
      <form onSubmit={handleSubmit(this.onSubmit)} noValidate autoComplete="off">
        <div className={classes.container}>
          <Field name="idProveedor" label="Folio" disabled={true} component={Input} className={classes.folio} />
          <Field name="empresa" label="Empresa" component={Input} className={classes.textField} />
          <Field name="contacto" label="Contacto" component={Input} className={classes.textField} />
          <Field name="domicilio" label="Domicilio" component={Input} className={classes.textField}
          rowsMax="4"
          multiline={true} />
          <Field name="telefono" label="Teléfono" component={Input} className={classes.textField} />
          <Field name="email" label="Email" component={Input} className={classes.textField} />
          <Field name="comentarios" label="Comentarios" component={Input} className={classes.textField}
          rowsMax="4"
          multiline={true} />
        </div>
        <div>
          <Button type="submit" variant="contained" color="default" className={classes.button}>
            Guardar
          </Button>
          <Route render={({ history}) => (
             <Button variant="contained" color="primary" className={classes.button}
               onClick={() => history.push(`/proveedores`) } >
               Regresar
              <NavigateBefore className={classes.rightIcon}>send</NavigateBefore>
             </Button>
          )} />
        </div>
      </form>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    initialValues: state.proveedores.selected
   };
}

EditProveedor = withRouter(EditProveedor);

EditProveedor = reduxForm({
  form: 'editProveedor',
  enableReinitialize: true
})(EditProveedor);

EditProveedor = connect(mapStateToProps, {
  fetchOne: fetchOneProveedor
})(EditProveedor)

EditProveedor.propTypes = {
  classes: PropTypes.object.isRequired,
};

EditProveedor = withStyles(styles)(EditProveedor);

export default EditProveedor;
