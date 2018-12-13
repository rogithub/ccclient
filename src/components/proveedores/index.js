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
import { fetchProveedores, setAppTitle } from '../../actions';
import { Route } from 'react-router-dom'

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
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell numeric>Folio</TableCell>
              <TableCell>Empresa</TableCell>
              <TableCell>Contacto</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Domicilio</TableCell>
              <TableCell>Comentarios</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {rows.map(row => {
            return (
              <TableRow key={row.idProveedor}>
                <TableCell numeric>{row.idProveedor}</TableCell>
                <TableCell>{row.empresa}</TableCell>
                <TableCell>{row.contacto}</TableCell>
                <TableCell>{row.telefono}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.domicilio}</TableCell>
                <TableCell>{row.comentarios}</TableCell>
                <TableCell>
                 <Route render={({ history}) => (
                    <Button variant="contained" color="primary" className={classes.button}
                      onClick={() => history.push(`/proveedores/${row.idProveedor}`) } >
                      Editar
                      <EditIcon className={classes.rightIcon}>send</EditIcon>
                    </Button>
                 )} />
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

TblProveedores = connect(mapStateToProps, { fetchProveedores, setAppTitle }) (TblProveedores);

export default TblProveedores;
