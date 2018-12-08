import React, { Component, Fragment } from 'react';
import Inicio from './inicio';
import Proveedores from './proveedores';
import { Header, Footer } from './layout';
import { BrowserRouter, Route, Link } from "react-router-dom";

export default class extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Header />
          <Route path="/" exact component={Inicio} />
          <Route path="/proveedores/" component={Proveedores} />
          <Footer />
        </Fragment>
      </BrowserRouter>
    );
  }
}
