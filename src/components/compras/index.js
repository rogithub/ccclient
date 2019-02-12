import React from 'react';
import ProveedoresSelector from '../forms/proveedoresSelector';
import MaterialesSelector from '../forms/materialesSelector';

class Compras extends React.Component {

  render() {
    return (
      <div>
        <ProveedoresSelector />
        <MaterialesSelector />
      </div>
    );
  }
}

export default Compras;
