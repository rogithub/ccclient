import api from '../apis/cc';

export const fetchLibroDiario = () =>  async (dispatch, getState) => {
    const response = await cc.get('/LibroDiario');
    dispatch("FETCH_LIBRO_DIARIO", { payload: response });
};
