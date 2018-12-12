import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import proveedoresReducer from './proveedores';

export default combineReducers({
  proveedores: proveedoresReducer,
  form: formReducer
});
