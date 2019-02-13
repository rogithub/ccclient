// Dialogs reducers

export default (state = {}, action) => {

  switch (action.type) {
    case 'DIALOGS_SHOW_CONFIRM':
      return Object.assign({}, state, {
        showConfirm: action.show
      });
    default:
      return state;
  }
};
