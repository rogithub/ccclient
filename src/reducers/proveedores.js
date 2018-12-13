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
    default:
      return state;
  }
};
