// Global App Reducers

export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_APP_TITLE':
      return Object.assign({}, state, {
        title: action.title
      });
    default:
      return state;
  }
};
