import React, { Component, Fragment } from 'react';
import Inicio from './inicio';
import { connect } from 'react-redux';
import Proveedores from './proveedores';
import EditProveedor from './proveedores/editProveedor';
import NewProveedor from './proveedores/newProveedor';
import Materiales from './materiales';
import EditMaterial from './materiales/editMaterial';
import NewMaterial from './materiales/newMaterial';
import { Header, Footer } from './layout';
import { BrowserRouter, Route } from "react-router-dom";
import Compras from './compras';
import { setAppIVA } from "../actions";

class App extends Component {
  componentDidMount = () => {
    this.props.setAppIVA(16);
  };

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Header />
          <Route path="/" exact component={Inicio} />
          <Route path="/proveedores" exact component={Proveedores} />
          <Route path="/proveedores/nuevo" exact component={NewProveedor} />
          <Route path="/proveedores/editar/:id" component={EditProveedor} />

          <Route path="/materiales" exact component={Materiales} />
          <Route path="/materiales/nuevo" exact component={NewMaterial} />
          <Route path="/materiales/editar/:id" component={EditMaterial} />

          <Route path="/compras" exact component={Compras} />
          <Footer />
        </Fragment>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {    
  };
}

App = connect(mapStateToProps, {
  setAppIVA,
}) (App);

export default App;
