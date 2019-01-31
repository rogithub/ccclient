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
import ConfirmDelMaterial from './confirmDelMaterial';
import TablePagination from '@material-ui/core/TablePagination';
import { fetchMateriales, setAppTitle, openConfirmDelMaterial } from '../../actions';

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
    this.state = {
      page: 0,
      rowsPerPage: 5
    };
  }

  componentDidMount = () => {
    const { rowsPerPage, page } = this.state;
    this.props.fetchMateriales(page, rowsPerPage);
    this.props.setAppTitle("Materiales");
  }
  componentWillUnmount = () => {
    this.props.setAppTitle(undefined);
  }

  handleChangePage = (event, page) => {
    const { rowsPerPage } = this.state;
    this.props.fetchMateriales((page * rowsPerPage), rowsPerPage);
    this.setState({ page })
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render () {
    const rows = this.props.rows || [];
    const totalRows = this.props.totalRows || 0;
    const { classes, history } = this.props;
    const { rowsPerPage, page } = this.state;

    return (
      <Paper className={classes.root}>
        <ConfirmDelMaterial />
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
              <TableRow hover key={row.idProducto}>
                <TableCell numeric>{row.idProducto}</TableCell>
                <TableCell>{row.nombre}</TableCell>
                <TableCell>{row.color}</TableCell>
                <TableCell>{row.unidad}</TableCell>
                <TableCell>{row.marca}</TableCell>
                <TableCell>{row.modelo}</TableCell>
                <TableCell>{row.comentarios}</TableCell>
                <TableCell>
                  <IconButton aria-label="Edit" className={classes.margin}
                  onClick={() => history.push(`/materiales/editar/${row.idProducto}`) }>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton aria-label="Delete" className={classes.margin}
                  onClick={() => this.props.openConfirmDelMaterial(row.idProducto) } >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalRows}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
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
    rows: state.materiales.rows,
    totalRows: state.materiales.totalRows
  };
}

TblMateriales = connect(mapStateToProps, {
  fetchMateriales,
  setAppTitle,
  openConfirmDelMaterial
}) (TblMateriales);

export default TblMateriales;
