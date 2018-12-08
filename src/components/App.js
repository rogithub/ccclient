import React, { Component, Fragment } from 'react';


import Inicio from './inicio';
import { Header, Footer } from './layout';

export default class extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Inicio />
        <Footer />
      </Fragment>
    );
  }
}
