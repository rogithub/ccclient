

export const formatCurrency = (number) => `$ ${number.toFixed(2)}`

export const getSubtotal = (rows, reducer) => {
  if (!rows) return 0;
  return rows.reduce( reducer, 0 );
};

export const getSubtotalMasIVA = (rows, iva, subtotalReducer) => {
  return getSubtotal(rows, subtotalReducer)*(iva/100);
};

export const getTotal = (rows, iva, subtotalReducer) => {
  return getSubtotal(rows, subtotalReducer)*(1 + (iva/100));
}

export const getSubtotalCurr = (rows, reducer) => {
  return formatCurrency(getSubtotal(rows, reducer));
};

export const getSubtotalMasIVACurr = (rows, iva, subtotalReducer) => {
  return formatCurrency(getSubtotalMasIVA(rows, iva, subtotalReducer));
};

export const getTotalCurr = (rows, iva, subtotalReducer) => {
  return formatCurrency(getTotal(rows, iva, subtotalReducer));
}
