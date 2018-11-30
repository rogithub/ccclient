import React, { Component, Fragment } from 'react';
import LibroDiario from './LibroDiario';
import { Header, Footer } from './layout';

export default class extends Component {
  render() {
    return (
      <Fragment>
        <Header />

        <LibroDiario />

        <Footer />
      </Fragment>
    );
  }
}
