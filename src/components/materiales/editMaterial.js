import React from 'react';
import { connect } from 'react-redux';
import { fetchOneMaterial, setAppTitle, updateMaterial } from '../../actions';
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

class EditMaterial extends React.Component {

  componentDidMount() {
    const { fetchOne, setAppTitle, match } = this.props;
    const id = match.params.id;
    fetchOne(id);
    setAppTitle(`Editar Material ${id}`);
  }
  componentWillUnmount() {
    this.props.setAppTitle(undefined);
  }

  onSubmit = formValues => {
    var promise = this.props.update(formValues);
    promise.then(() => this.props.history.push(`/materiales`));
  }

  render () {
    const p = this.props.initialValues;
    const { classes, handleSubmit, pristine, invalid, history, callbackInProcess } = this.props;
    if (p === null){
      return <div>Material no encontrado.</div>
    }

    return (
      <form onSubmit={handleSubmit(this.onSubmit)} noValidate autoComplete="off">
        <div className={classes.container}>
          <Field name="idMaterial" label="Folio" disabled={true}
                 className={classes.folio} component={Input} />
          <Field name="nombre" label="Nombre"
                 className={classes.textField} component={Input} />
          <Field name="color" label="Color"
                 className={classes.textField} component={Input} />
          <Field name="unidad" label="Unidad"
                 className={classes.textField} component={Input} />
          <Field name="marca" label="Marca"
                 className={classes.textField} component={Input} />
          <Field name="modelo" label="Modelo"
                 className={classes.textField} component={Input} />
          <Field name="comentarios" label="Comentarios"
                 className={classes.textField} component={Input}
                 rowsMax="4" multiline={true} />
        </div>
        <div>
          <Button variant="contained" color="default" className={classes.button}
                  onClick={ () => history.push(`/materiales`) }
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
  if (!values.nombre) {
    errors.nombre = '* Requerido'
  }

  if (!values.color) {
    errors.color = '* Requerido'
  }

  if (!values.unidad) {
    errors.unidad = '* Requerido'
  }  

  return errors
};

EditMaterial = withRouter(EditMaterial);

EditMaterial = reduxForm({
  form: 'editMaterial',
  validate,
  enableReinitialize: true
})(EditMaterial);

EditMaterial.propTypes = {
  classes: PropTypes.object.isRequired,
};

EditMaterial = withStyles(styles)(EditMaterial);

const mapStateToProps = (state) => {
  return {
    initialValues: state.materiales.selected,
    callbackInProcess: state.app.callbackInProcess
   };
};

EditMaterial = connect(mapStateToProps, {
  fetchOne: fetchOneMaterial,
  setAppTitle: setAppTitle,
  update: updateMaterial
})(EditMaterial)

export default EditMaterial;
