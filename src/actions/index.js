import api from '../apis/cc';

// APP Global Actions BEGIN
async function runPromise(dispatch, type, promise) {
  try {
    dispatch({ type: "SET_APP_CALLBACK_IN_PROGRESS", isInProgress:true });
    const payload = await promise;
    dispatch({ type: "SET_APP_CALLBACK_IN_PROGRESS", isInProgress:false });
    dispatch({ type, payload });
  } catch (error) {
    console.log(error);
    dispatch({ type: "SET_APP_CALLBACK_IN_PROGRESS", isInProgress:false });
  }
}

export const setAppTitle = title => {
  return { type: "SET_APP_TITLE", title }
}

export const setAppIVA = iva => {
  return { type: "SET_APP_IVA", iva }
}

export const setAppPagination = pagination => {
  return { type: "SET_APP_PAGINATION", pagination }
};
// APP Global Actions END


// Compras BEGIN
export const addCompraRow = row => {
  return { type: "COMPRAS_ADD_ROW", row }
};
export const delCompraRow = row => {
  return { type: "COMPRAS_REMOVE_ROW", row }
};
export const setRowToDeleteCompra = row => {
  return { type: "SET_TO_DELETE_COMPRAS", row }
}
export const resetCompra = () => {
  return { type: "RESET_COMPRAS" }
}
export const saveCompra = data => async dispatch => {
  runPromise(dispatch,
    "SAVE_ONE_COMPRA",
    api.post(`/compras`, data));
};

// Compras END

// Proveedores Actions BEGIN
export const setRowToDeleteProveedor = row => {
  return { type: "SET_TO_DELETE_PROVEEDOR", row }
}

export const setSelectedProveedor = proveedor => {
  return { type: "SET_SELECTED_PROVEEDOR", proveedor }
}

export const fetchProveedores = (offset, pageSize, name) => async dispatch => {
  runPromise(dispatch,
    "FETCH_PROVEEDORES",
    api.get(`/proveedores?offset=${offset}&pageSize=${pageSize}&name=${encodeURIComponent(name)}`));
};

export const fetchOneProveedor = id => async dispatch => {
  runPromise(dispatch,
    "FETCH_ONE_PROVEEDORES",
    api.get(`/proveedores/${id}`));
};

export const updateProveedor = data => async dispatch => {
  runPromise(dispatch,
    "UPDATE_ONE_PROVEEDORES",
    api.put(`/proveedores/${data.idProveedor}`, data));
};

export const saveProveedor = data => async dispatch => {
  runPromise(dispatch,
    "SAVE_ONE_PROVEEDORES",
    api.post(`/proveedores`, data));
};

export const openConfirmDelProveedor = id => {
  return { type: "OPEN_CONFIRM_DEL_PROVEEDOR", id }
};

export const delProveedor = id => async dispatch => {
  runPromise(dispatch,
    "DELETE_ONE_PROVEEDORES",
    api.delete(`/proveedores/${id}`));
};

export const removeProveedorRow = row => {
  return { type: "REMOVE_PROVEEDOR_ROW", row }
};
// Proveedores Actions END


// Materiales Actions BEGIN
export const setSelectedMaterial = material => {
  return { type: "SET_SELECTED_MATERIAL", material }
}

export const setRowToDeleteMaterial = row => {
  return { type: "SET_TO_DELETE_MATERIAL", row }
}

export const fetchMateriales = (offset, pageSize, name) => async dispatch => {
  runPromise(dispatch,
    "FETCH_MATERIALES",
    api.get(`/materiales?offset=${offset}&pageSize=${pageSize}&name=${encodeURIComponent(name)}`));
};

export const fetchOneMaterial = id => async dispatch => {
  runPromise(dispatch,
    "FETCH_ONE_MATERIALES",
    api.get(`/materiales/${id}`));
};

export const updateMaterial = data => async dispatch => {
  runPromise(dispatch,
    "UPDATE_ONE_MATERIALES",
    api.put(`/materiales/${data.idMaterial}`, data));
};

export const saveMaterial = data => async dispatch => {
  runPromise(dispatch,
    "SAVE_ONE_MATERIALES",
    api.post(`/materiales`, data));
};

export const openConfirmDelMaterial = id => {
  return { type: "OPEN_CONFIRM_DEL_MATERIAL", id }
};

export const closeConfirmDelMaterial = count => {
  return { type: "CLOSE_CONFIRM_DEL_MATERIAL", count }
};

export const delMaterial = id => async dispatch => {
  runPromise(dispatch,
    "DELETE_ONE_MATERIALES",
    api.delete(`/materiales/${id}`));
};

export const removeMaterialRow = row => {
  return { type: "REMOVE_MATERIAL_ROW", row }
};
// Materiales Actions END
