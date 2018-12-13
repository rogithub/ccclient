import React from 'react';
import { connect } from 'react-redux';
import { fetchOneProveedor } from '../../actions';
import Input from '../forms/input';
import { withRouter } from "react-router";
import { Field, reduxForm } from "redux-form";

class EditProveedor extends React.Component {

  componentDidMount() {
    this.props.fetchOne(this.props.match.params.id);
  }

  onSubmit (formValues) {
    alert(JSON.stringify(formValues));
  }

  render () {
    const p = this.props.initialValues;
    if (p === null){
      return <div>Proveedor no encontrado.</div>
    }
    
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="idProveedor" label="Id" component={Input} type="text" />
        <Field name="empresa" label="Empresa" component={Input} type="text" />
        <Field name="contacto" label="Contacto" component={Input} type="text" />
        <Field name="domicilio" label="Domicilio" component={Input} type="text" />
        <Field name="telefono" label="Teléfono" component={Input} type="text" />
        <Field name="email" label="Email" component={Input} type="text" />
        <Field name="comentarios" label="Comentarios" component={Input} type="text" />
        <button type="submit">Guardar</button>
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

export default EditProveedor;
