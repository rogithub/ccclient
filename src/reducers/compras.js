// Compras reducers
export default (state = {}, action) => {
  switch (action.type) {
    case 'COMPRAS_ADD_ROW':
      return Object.assign({}, state, {
        rows: [...state.rows || [], action.row]
      });
    case 'COMPRAS_REMOVE_ROW':
      return Object.assign({}, state, {
        rows: state.rows.filter(it => it !== action.row)
      });
    case 'COMPRAS_SELECT_ROW':
      return Object.assign({}, state, {
        selected: action.row
      });
    default:
      return state;
  }
};
