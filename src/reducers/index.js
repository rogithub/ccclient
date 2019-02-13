// Reducers main module

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import proveedoresReducer from './proveedores';
import materialesReducer from './materiales';
import comprasReducer from './compras';
import dialogsReducer from './dialogs';
import appReducer from './app';

export default combineReducers({
  proveedores: proveedoresReducer,
  materiales: materialesReducer,
  compras: comprasReducer,
  dialogs: dialogsReducer,
  form: formReducer,
  app: appReducer
});
