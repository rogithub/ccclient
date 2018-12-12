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
        <Field name="idProveedor" type="text" component={Input} label="Id" />
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
