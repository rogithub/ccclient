import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import PersonAdd from '@material-ui/icons/PersonAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ConfirmDelProveedor from '../dialogs/dlgConfirm';
import TablePagination from '../forms/tblPagination';
import DialogContentText from '@material-ui/core/DialogContentText';
import { setAppPagination, fetchProveedores, setAppTitle, showConfirm,
  delProveedor, setSelectedProveedor, removeProveedorRow } from '../../actions';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  button: {
    margin: theme.spacing.unit,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class TblProveedores extends React.Component {

  constructor(props) {
    super(props);
    this.classes = this.props;
  }

  componentDidMount = () => {
    this.props.setAppTitle("Proveedores");
    const page = 0; const pageSize = 5;
    this.props.setAppPagination({ page, pageSize });
    this.props.fetchProveedores(page, pageSize, "");
  }
  componentWillUnmount = () => {
    this.props.setAppTitle(undefined);
  }

  handleChangePage = (event, page) => {
    const { pageSize } = this.props.pagination;
    this.props.setAppPagination({ page, pageSize});
    this.props.fetchProveedores((page * pageSize), pageSize, "");
  };

  handleChangePageSize = event => {
    const { page } = this.props.pagination;
    const pageSize = event.target.value;
    this.props.setAppPagination({ pageSize, page});
    this.props.fetchProveedores((page * pageSize), pageSize, "");
  };

  handleSelectRow = row => {
    this.props.setSelectedProveedor(row);
    this.props.showConfirm(true);
  }

  handleDeleteRow = () => {
    const row = this.props.selected;    
    this.props.delProveedor(row.idProveedor);
    this.props.removeProveedorRow(row);
  }

  render () {
    const { classes, history, rows, totalRows } = this.props;
    const { page, pageSize } = this.props.pagination || { page: 0, pageSize: 5};

    return (
      <Paper className={classes.root}>
        <ConfirmDelProveedor
          handleConfirm={this.handleDeleteRow}
          title="¿Desea borrar?"
          confirmText="Borrar">
          <DialogContentText id="alert-dialog-description">
            { this.props.selected ?
              <b>{"[Folio: " + this.props.selected.idProveedor + "] " + this.props.selected.empresa}</b> :
              null
            }
          </DialogContentText>
        </ConfirmDelProveedor>

        <Button variant="contained" color="primary" className={classes.button}
          onClick={() => history.push(`/proveedores/nuevo`) } >
          Nuevo
          <PersonAdd className={classes.rightIcon}>send</PersonAdd>
        </Button>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell numeric>Folio</TableCell>
              <TableCell>Empresa</TableCell>
              <TableCell>Contacto</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Domicilio y Comentarios</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {rows.map(row => {
            return (
              <TableRow hover key={row.idProveedor}>
                <TableCell numeric>{row.idProveedor}</TableCell>
                <TableCell>{row.empresa}</TableCell>
                <TableCell>{row.contacto}</TableCell>
                <TableCell>{row.telefono}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <p>
                  {row.domicilio}
                  </p>
                  <p>
                  {row.comentarios}
                  </p>
                </TableCell>
                <TableCell>
                  <IconButton aria-label="Edit" className={classes.margin}
                  onClick={() => history.push(`/proveedores/editar/${row.idProveedor}`) }>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton aria-label="Delete" className={classes.margin}
                  onClick={() => this.handleSelectRow(row) } >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
          </TableBody>
        </Table>
        <TablePagination
          totalRows={totalRows}
          pageSize={pageSize}
          page={page}
          handleChangePage={this.handleChangePage}
          handleChangePageSize={this.handleChangePageSize}
        />
      </Paper>
    );
  }
};

TblProveedores.propTypes = {
  classes: PropTypes.object.isRequired,
};

TblProveedores = withStyles(styles)(TblProveedores);

const mapStateToProps = (state) => {
  return {
    rows: state.proveedores.rows || [],
    totalRows: state.proveedores.totalRows || 0,
    pagination: state.app.pagination,
    selected: state.proveedores.selected
  };
}

TblProveedores = connect(mapStateToProps, {
  fetchProveedores,
  setAppTitle,
  setAppPagination,
  delProveedor,
  showConfirm,
  setSelectedProveedor,
  removeProveedorRow
}) (TblProveedores);

export default TblProveedores;
