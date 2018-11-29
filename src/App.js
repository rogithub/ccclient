import React, { Component } from 'react';
import LeftMenu from './LeftMenu';
import LibroDiario from './LibroDiario';

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
