import api from '../apis/cc';

export const fetchProveedores = () =>  async (dispatch, getState) => {
    const response = await cc.get('/proveedores/lista');
    dispatch("FETCH_PROVEEDORES", { payload: response });
};
