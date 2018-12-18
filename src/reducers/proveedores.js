// Proveedores reducers

export default (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_PROVEEDORES':
      return Object.assign({}, state, {
        all: action.payload.data
      });
    case 'FETCH_ONE_PROVEEDORES':
      return Object.assign({}, state, {
        selected: action.payload.data
      });
    case 'DELETE_ONE_PROVEEDORES':
      return Object.assign({}, state, {
        deleted: action.payload.data
      });
    case 'OPEN_CONFIRM_DEL_PROVEEDOR':
      return Object.assign({}, state, {
        idToDelete: action.id
      });
    case 'CLOSE_CONFIRM_DEL_PROVEEDOR':
      if (action.count === 0) {
        return Object.assign({}, state, {
          idToDelete: undefined,
        });
      } else {
        return Object.assign({}, state, {
          idToDelete: undefined,
          all: state.all.filter(it => it.idProveedor !== state.idToDelete)
        });
      }

    default:
      return state;
  }
};
