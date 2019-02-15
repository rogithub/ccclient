// Compras reducers
export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_TO_DELETE_COMPRAS':
      return Object.assign({}, state, {
        toDelete: action.row
      });
    case 'COMPRAS_ADD_ROW':
      return Object.assign({}, state, {
        rows: [...state.rows || [], action.row]
      });
    case 'COMPRAS_REMOVE_ROW':
      return Object.assign({}, state, {
        rows: state.rows.filter(it => it !== action.row),
        toDelete: undefined
      });    
    default:
      return state;
  }
};
