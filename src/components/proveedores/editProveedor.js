import React from 'react';
import { connect } from 'react-redux';
import { fetchOneProveedor } from '../../actions';
import { withRouter } from "react-router";

class EditProveedor extends React.Component {

  componentDidMount() {
    const id = parseInt(this.props.match.params.id);
    this.props.fetchOneProveedor(id);
  }

  render () {
    const proveedor = this.props.proveedor || [];

    return (
      <div>
        id={JSON.stringify(proveedor)}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return { proveedor: state.proveedores.selected };
}


export default connect(mapStateToProps, { fetchOneProveedor }) ( withRouter(EditProveedor ));
