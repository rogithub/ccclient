import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ProveedoresSelector from '../forms/proveedoresSelector';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DlgAddMaterial from './dlgAddMaterial';

import { setAppTitle, addServicio, delCompraItem, showDlgAddMaterial } from '../../actions';
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

class Compras extends React.Component {

  componentDidMount = () => {
    this.props.setAppTitle("Compras");
  };

  rendertable = () => {
    const {
      classes,
      addMaterial,
      addServicio,
      delCompraItem,
      rows } = this.props;

    return (
      <div>
        <h1>{this.props.selected.empresa}</h1>
        <DlgAddMaterial />
        <div>
          <Button variant="contained" size="small" className={classes.button}
            onClick={() => this.props.showDlgAddMaterial(true) } >
            <AddIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
            Material
          </Button>
          <Button variant="contained" size="small" className={classes.button}
            onClick={() => addServicio({id: 2}) } >
            <AddIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
            Servicio
          </Button>
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell numeric>Folio</TableCell>
              <TableCell>Concepto</TableCell>
              <TableCell>Unidad</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Precio Unitario</TableCell>
              <TableCell>Importe</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {rows.map(row => {
            return (
              <TableRow hover key={rows.indexOf(row)}>
                <TableCell numeric>{1}</TableCell>
                <TableCell>Hilo Nylon #30</TableCell>
                <TableCell>Rollo</TableCell>
                <TableCell>10</TableCell>
                <TableCell>$150.00</TableCell>
                <TableCell>$1,500.00</TableCell>
                <TableCell>
                  <IconButton aria-label="Delete" className={classes.margin}
                  onClick={() => delCompraItem(row) } >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
          </TableBody>
        </Table>
      </div>
    );
  };

  render() {
    return (
      <div>
        <Paper>
            { this.props.selected ?
              this.rendertable() :
              <ProveedoresSelector />
            }
        </Paper>
      </div>
    );
  }
}

Compras.propTypes = {
  classes: PropTypes.object.isRequired,
};

Compras = withStyles(styles)(Compras);

const mapStateToProps = (state) => {
  return {
    rows: state.compras.rows,
    compra: state.compras.compra,
    selected: state.proveedores.selected
  };
}

Compras = connect(mapStateToProps, {
  setAppTitle,
  addServicio,
  delCompraItem,
  showDlgAddMaterial,
}) (Compras);

export default Compras;
