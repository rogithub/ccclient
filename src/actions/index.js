import api from '../apis/cc';

async function runPromise(dispatch, type, promise) {
  dispatch({ type: "SET_APP_CALLBACK_IN_PROGRESS", isInProgress:true });
  const payload = await promise;
  dispatch({ type: "SET_APP_CALLBACK_IN_PROGRESS", isInProgress:false });
  dispatch({ type, payload });
}

export const fetchProveedores = () => async dispatch => {
  runPromise(dispatch,
    "FETCH_PROVEEDORES",
    api.get('/proveedores'));
};

export const fetchOneProveedor = id => async dispatch => {
  runPromise(dispatch,
    "FETCH_ONE_PROVEEDORES",
    api.get(`/proveedores/${id}`));
};

export const updateProveedor = data => async dispatch => {
  runPromise(dispatch,
    "UPDATE_ONE_PROVEEDOR",
    api.put(`/proveedores/${data.idProveedor}`, data));
};

export const setAppTitle = title => {
  return { type: "SET_APP_TITLE", title }
}
