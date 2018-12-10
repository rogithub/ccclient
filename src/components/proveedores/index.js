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
import { fetchProveedores } from '../../actions';

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
  }

  render () {
    const rows = this.props.proveedores || [];
    
    return (
      <Paper className={this.classes.root}>
        <Table className={this.classes.table}>
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
                <Button variant="contained" color="primary" className={this.classes.button}>
                  Editar
                  <EditIcon className={this.classes.rightIcon}>send</EditIcon>
                </Button>
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

const mapStateToProps = (state) => {
  return { proveedores: state.proveedores.data };
}

TblProveedores.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default connect(mapStateToProps, { fetchProveedores }) ( withStyles(styles)(TblProveedores) );
