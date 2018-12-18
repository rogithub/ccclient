// Reducers main module

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import proveedoresReducer from './proveedores';
import materialesReducer from './materiales';
import appReducer from './app';

export default combineReducers({
  proveedores: proveedoresReducer,
  materiales: materialesReducer,
  form: formReducer,
  app: appReducer
});
