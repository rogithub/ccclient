// Reducers main module

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import proveedoresReducer from './proveedores';
import appReducer from './app';

export default combineReducers({
  proveedores: proveedoresReducer,
  form: formReducer,
  app: appReducer
});
