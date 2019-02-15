// Proveedores reducers

export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_TO_DELETE_PROVEEDOR':
      return Object.assign({}, state, {
        toDelete: action.row
      });
    case 'SET_SELECTED_PROVEEDOR':
      return Object.assign({}, state, {
        selected: action.proveedor
      });
    case 'FETCH_PROVEEDORES':
      return Object.assign({}, state, {
        rows: action.payload.data.rows,
        totalRows: action.payload.data.totalRows
      });
    case 'REMOVE_PROVEEDOR_ROW':
      return Object.assign({}, state, {
        rows: state.rows.filter(it => it !== action.row),
        toDelete: undefined
      });
    case 'FETCH_ONE_PROVEEDORES':
      return Object.assign({}, state, {
        selected: action.payload.data
      });
    case 'DELETE_ONE_PROVEEDORES':
      return Object.assign({}, state, {
        deletedCount: action.payload.data
      });
    default:
      return state;
  }
};
