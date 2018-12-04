export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_LIBRO_DIARIO':
      return action.payload;
    default:
      return state;
  }
};
