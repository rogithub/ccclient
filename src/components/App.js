import React, { Component, Fragment } from 'react';
import Inicio from './inicio';
import Proveedores from './proveedores';
import EditProveedor from './proveedores/editProveedor';
import NewProveedor from './proveedores/newProveedor';
import { Header, Footer } from './layout';
import { BrowserRouter, Route } from "react-router-dom";

export default class extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Header />
          <Route path="/" exact component={Inicio} />
          <Route path="/proveedores" exact component={Proveedores} />
          <Route path="/proveedores/nuevo" exact component={NewProveedor} />
          <Route path="/proveedores/editar/:id" component={EditProveedor} />
          <Footer />
        </Fragment>
      </BrowserRouter>
    );
  }
}
