import React from 'react';
import { connect } from 'react-redux';
import { fetchOneProveedor } from '../../actions';
import Input from '../forms/input';
import { withRouter } from "react-router";
import { Field, reduxForm } from "redux-form";

class EditProveedor extends React.Component {

  componentDidMount() {
    const id = parseInt(this.props.match.params.id);
    this.props.fetchOneProveedor(id);
  }

  onSubmit (formValues) {
    alert(JSON.stringify(formValues));
  }

  render () {
    const p = this.props.proveedor;
    if (p === null){
      return <div>Proveedor no encontrado.</div>
    }

    console.log(p);

    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="id" component={Input} label="Id" />
      </form>
    );
  }
};

const mapStateToProps = (state) => {
  return { proveedor: state.proveedores.selected };
}

EditProveedor = withRouter(EditProveedor);

EditProveedor = reduxForm({
    form: 'editProveedor'
})(EditProveedor);

EditProveedor = connect(mapStateToProps, {
  fetchOneProveedor
})(EditProveedor)

export default EditProveedor;
