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

export const setAppTitle = title => { return { type: "SET_APP_TITLE", title } }
