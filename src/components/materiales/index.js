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
import ConfirmDelMaterial from '../dialogs/dlgConfirm';
import TablePagination from '../forms/tblPagination';
import DialogContentText from '@material-ui/core/DialogContentText';
import { setAppPagination, fetchMateriales, setAppTitle,
  delMaterial, setRowToDeleteMaterial, removeMaterialRow } from '../../actions';

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

class TblMateriales extends React.Component {

  constructor(props) {
    super(props);
    this.classes = this.props;
  }

  componentDidMount = () => {
    this.props.setAppTitle("Materiales");
    const page = 0; const pageSize = 5;
    this.props.setAppPagination({ page, pageSize });
    this.props.fetchMateriales(page, pageSize, "");
  }
  componentWillUnmount = () => {
    this.props.setAppTitle(undefined);
  }

  handleChangePage = (event, page) => {
    const { pageSize } = this.props.pagination;
    this.props.setAppPagination({ page, pageSize});
    this.props.fetchMateriales((page * pageSize), pageSize, "");
  };

  handleChangePageSize = event => {
    const { page } = this.props.pagination;
    const pageSize = event.target.value;
    this.props.setAppPagination({ pageSize, page});
    this.props.fetchMateriales((page * pageSize), pageSize, "");
  };

  handleDeleteRow = () => {
    const row = this.props.toDelete;
    this.props.delMaterial(row.idMaterial);
    this.props.removeMaterialRow(row);
  }

  render () {
    const { classes, history, rows, totalRows, setRowToDeleteMaterial } = this.props;
    const { page, pageSize } = this.props.pagination || { page: 0, pageSize: 5};

    return (
      <Paper className={classes.root}>
        <ConfirmDelMaterial
          open={this.props.toDelete !== undefined}
          handleConfirm={this.handleDeleteRow}
          handleCancel={() => setRowToDeleteMaterial()}
          title="¿Desea borrar éste material?"
          confirmText="Borrar">
          <DialogContentText id="alert-dialog-description">
            { this.props.toDelete ?
              <b>{"[Folio: " + this.props.toDelete.idMaterial + "] " + this.props.toDelete.nombre}</b> :
              null
            }
          </DialogContentText>
        </ConfirmDelMaterial>
        <Button variant="contained" color="primary" className={classes.button}
          onClick={() => history.push(`/materiales/nuevo`) } >
          Nuevo
          <PersonAdd className={classes.rightIcon}>send</PersonAdd>
        </Button>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell numeric>Folio</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Unidad</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>Comentarios</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {rows.map(row => {
            return (
              <TableRow hover key={row.idMaterial}>
                <TableCell numeric>{row.idMaterial}</TableCell>
                <TableCell>{row.nombre}</TableCell>
                <TableCell>{row.color}</TableCell>
                <TableCell>{row.unidad}</TableCell>
                <TableCell>{row.marca}</TableCell>
                <TableCell>{row.modelo}</TableCell>
                <TableCell>{row.comentarios}</TableCell>
                <TableCell>
                  <IconButton aria-label="Edit" className={classes.margin}
                  onClick={() => history.push(`/materiales/editar/${row.idMaterial}`) }>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton aria-label="Delete" className={classes.margin}
                  onClick={() => setRowToDeleteMaterial(row)} >
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

TblMateriales.propTypes = {
  classes: PropTypes.object.isRequired,
};

TblMateriales = withStyles(styles)(TblMateriales);

const mapStateToProps = (state) => {

  return {
    rows: state.materiales.rows || [],
    totalRows: state.materiales.totalRows || 0,
    pagination: state.app.pagination,
    toDelete: state.materiales.toDelete,
  };
}

TblMateriales = connect(mapStateToProps, {
  fetchMateriales,
  setAppTitle,
  setAppPagination,
  delMaterial,
  setRowToDeleteMaterial,
  removeMaterialRow
}) (TblMateriales);

export default TblMateriales;
