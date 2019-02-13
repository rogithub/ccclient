// Compras reducers

export default (state = {}, action) => {
  state.rows = state.rows || [];

  switch (action.type) {
    case 'COMPRAS_ADD_MATERIAL':
      return Object.assign({}, state, {
        rows: [...state.rows, action.material]
      });
    case 'COMPRAS_ADD_SERVICIO':
      return Object.assign({}, state.compra, {
        rows: [...state.rows, action.servicio]
      });
    case 'COMPRAS_REMOVE_ITEM':
      return Object.assign({}, state, {
        rows: state.rows.filter(it => it !== action.item)
      });
    default:
      return state;
  }
};
