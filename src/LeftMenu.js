import React, { Component } from 'react';
import LeftMenuItem from './LeftMenuItem';

class LeftMenu extends Component {
  render() {
    return(
      <nav className="col-md-1 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <LeftMenuItem text="Libro Diario" url="/LibroDiario" icon="fas fa-pencil-alt" isSelected={true} />
            <LeftMenuItem text="Presupuestos" url="/Presupuestos" icon="far fa-file-alt" />
            <LeftMenuItem text="Productos" url="/Productos" icon="fas fa-shopping-cart" />
            <LeftMenuItem text="Clientes" url="/Clientes" icon="fas fa-users" />
            <LeftMenuItem text="Proveedores" url="/Proveedores" icon="fas fa-dolly" />
            <LeftMenuItem text="Inventario" url="/Inventario" icon="fas fa-clipboard-list" />
          </ul>
        </div>
      </nav>
    );
  }
}

export default LeftMenu;
