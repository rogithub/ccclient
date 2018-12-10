import { combineReducers } from 'redux';
import proveedoresReducer from './proveedores';

export default combineReducers({
  proveedores: proveedoresReducer
});
