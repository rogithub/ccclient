export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PROVEEDORES':
      return action.payload;
    default:
      return state;
  }
};
