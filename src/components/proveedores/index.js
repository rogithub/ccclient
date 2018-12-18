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
import ConfirmDelProveedor from './confirmDelProveedor';
import { fetchProveedores, setAppTitle, openConfirmDelProveedor } from '../../actions';

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

  componentDidMount() {
    this.props.fetchProveedores();
    this.props.setAppTitle("Proveedores");
  }
  componentWillUnmount() {
    this.props.setAppTitle(undefined);
  }

  render () {
    const rows = this.props.proveedores || [];
    const { classes, history } = this.props;

    return (
      <Paper className={classes.root}>
        <ConfirmDelProveedor />
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
                  onClick={() => this.props.openConfirmDelProveedor(row.idProveedor) } >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
          </TableBody>
        </Table>
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
    proveedores: state.proveedores.all
  };
}

TblProveedores = connect(mapStateToProps, {
  fetchProveedores,
  setAppTitle,
  openConfirmDelProveedor
}) (TblProveedores);

export default TblProveedores;
