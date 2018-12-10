import api from '../apis/cc';

export const fetchProveedores = () =>  async (dispatch) => {
    const response = await api.get('/proveedores/lista');
    dispatch({ type: "FETCH_PROVEEDORES", payload: response });
};
