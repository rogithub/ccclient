import React, { Component } from 'react';

class LeftMenu extends Component {
  render() {
    return(
      <nav className="col-md-1 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link active" href="/LibroDiario">
                <i className="fas fa-pencil-alt"></i>
                &nbsp;Libro Diario <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Presupuestos">
                <i className="far fa-file-alt"></i>
                &nbsp;Presupuestos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Productos">
                <i className="fas fa-shopping-cart"></i>
                &nbsp;Productos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Clientes">
                <i className="fas fa-users"></i>
                &nbsp;Clientes
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Proveedores">
                <i className="fas fa-dolly"></i>
                &nbsp;Proveedores
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Inventario">
                <i className="fas fa-clipboard-list"></i>
                &nbsp;Inventario
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

class LibroDiario extends Component {
  render() {
    return (
      <div className="App table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Header</th>
              <th>Header</th>
              <th>Header</th>
              <th>Header</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1,001</td>
              <td>Lorem</td>
              <td>ipsum</td>
              <td>dolor</td>
              <td>sit</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="row">
        <LeftMenu />
        <main role="main" className="col-md-10 ml-sm-auto col-lg-11 px-4">
          <h2>Libro Diario</h2>
          <LibroDiario />
        </main>
      </div>
    );
  }
}

export default App;
