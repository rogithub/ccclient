import React from 'react';
import { connect } from 'react-redux';
import { fetchOneProveedor } from '../../actions';


class EditOneProveedor extends React.Component {

  componentDidMount() {
    this.props.fetchOneProveedor(45);
  }

  render () {
    const proveedor = this.props.proveedor || [];

    return (
      <div>
        {JSON.stringify(proveedor.proveedorId)}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return { proveedor: state.proveedores.selected };
}


export default connect(mapStateToProps, { fetchOneProveedor }) (EditOneProveedor);
