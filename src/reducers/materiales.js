// Materiales reducers

export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_SELECTED_MATERIAL':
      return Object.assign({}, state, {
        selected: action.material
      });
    case 'FETCH_MATERIALES':
      return Object.assign({}, state, {
        rows: action.payload.data.rows,
        totalRows: action.payload.data.totalRows
      });
    case 'REMOVE_MATERIAL_ROW':
      return Object.assign({}, state, {
        rows: state.rows.filter(it => it !== action.row)
      });
    case 'FETCH_ONE_MATERIALES':
      return Object.assign({}, state, {
        selected: action.payload.data
      });
    case 'DELETE_ONE_MATERIALES':
      return Object.assign({}, state, {
        deletedCount: action.payload.data
      });
    default:
      return state;
  }
};
