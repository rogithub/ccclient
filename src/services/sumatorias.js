

export const formatCurrency = (number) => `$ ${number.toFixed(2)}`

export const getSubtotal = (rows, reducer) => {
  if (!rows) return 0;
  return rows.reduce( reducer, 0 );
};

export const getSubtotalMasIVA = (rows, iva, subtotalReducer) => {
  return this.getSubtotal(rows, subtotalReducer)*(iva/100);
};

export const getTotal = (rows, iva, subtotalReducer) => {
  return this.getSubtotal(rows, subtotalReducer)*(1 + (iva/100));
}

export const isValidIVA = (iva) => {
  return !iva || isNaN(iva);
};
