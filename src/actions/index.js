import api from '../apis/cc';

export const fetchProveedores = () => async dispatch => {
    const response = await api.get('/proveedores');
    dispatch({ type: "FETCH_PROVEEDORES", payload: response });
};

export const fetchOneProveedor = id => async dispatch => {
    const response = await api.get(`/proveedores/${id}`);
    dispatch({ type: "FETCH_ONE_PROVEEDORES", payload: response });
};

export const updateProveedor = data => async dispatch => {
    const response = await api.put(`/proveedores/${data.idProveedor}`, data);
    dispatch({ type: "UPDATE_ONE_PROVEEDOR", payload: response });
};

export const setAppTitle = title => {
  return { type: "SET_APP_TITLE", title }
}

export const setAppCallbackInProgress = isInProgress => {
  return { type: "SET_APP_CALLBACK_IN_PROGRESS", isInProgress }
}

//You can intercept requests or responses before they are handled by then or catch.
// Add a request interceptor
api.interceptors.request.use(function (config) {
    // Do something before request is sent
    setAppCallbackInProgress(true);
    return config;
  }, function (error) {
    // Do something with request error
    setAppCallbackInProgress(false);
    return Promise.reject(error);
  });

// Add a response interceptor
api.interceptors.response.use(function (response) {
    // Do something with response data
    setAppCallbackInProgress(false);
    return response;
  }, function (error) {
    // Do something with response error
    setAppCallbackInProgress(false);
    return Promise.reject(error);
  });
