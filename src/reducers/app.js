// Global App Reducers

export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_APP_TITLE':
      return Object.assign({}, state, {
        title: action.title
      });
    case 'SET_APP_CALLBACK_IN_PROGRESS':
      return Object.assign({}, state, {
        callbackInProcess: action.isInProgress
      });
    case 'SET_APP_PAGINATION':
      return Object.assign({}, state, {
        pagination: action.pagination
      });
    default:
      return state;
  }
};
