// Materiales reducers

export default (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_MATERIALES':
      return Object.assign({}, state, {
        rows: action.payload.data.rows,
        totalRows: action.payload.data.totalRows
      });
    case 'FETCH_ONE_MATERIALES':
      return Object.assign({}, state, {
        selected: action.payload.data
      });
    case 'DELETE_ONE_MATERIALES':
      return Object.assign({}, state, {
        deleted: action.payload.data
      });
    case 'OPEN_CONFIRM_DEL_MATERIAL':
      return Object.assign({}, state, {
        idToDelete: action.id
      });
    case 'CLOSE_CONFIRM_DEL_MATERIAL':
      if (action.count === 0) {
        return Object.assign({}, state, {
          idToDelete: undefined,
        });
      } else {
        return Object.assign({}, state, {
          idToDelete: undefined,
          rows: state.rows.filter(it => it.idProducto !== state.idToDelete)
        });
      }

    default:
      return state;
  }
};
