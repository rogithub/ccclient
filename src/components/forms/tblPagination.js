import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';

class TblPagination extends React.Component {

  labelDisplayedRows = ({ from, to, count }) => {
    return `Filas ${from}-${to} de ${count}`
  }

  render () {
    const { totalRows, pageSize, page, handleChangePage, handleChangePageSize } = this.props;

    return (
      <div>
        <TablePagination
          labelRowsPerPage="Filas por página"
          labelDisplayedRows={this.labelDisplayedRows}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={totalRows}
          rowsPerPage={pageSize}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Página Anterior',
          }}
          nextIconButtonProps={{
            'aria-label': 'Página Siguiente',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangePageSize}
        />
      </div>
    );
  }
}

export default TblPagination;
