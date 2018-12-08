import { combineReducers } from 'redux';
import proveedoresReducer from './proveedoresReducer';

export default combineReducers({
  libroDiario: proveedoresReducer
});
