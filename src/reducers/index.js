import { combineReducers } from 'redux';
import libroDiarioReducer from './libroDiarioReducer';

export default combineReducers({
  libroDiario: libroDiario
});
