import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ProveedoresSelector from '../forms/proveedoresSelector';
import MaterialesSelector from '../forms/materialesSelector';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

import { setAppTitle } from '../../actions';
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

  addMaterial = () => {
    this.props.rows.push("Material");
    console.log(this.props.rows);
  };

  addServicio = () => {
    this.props.rows.push("Servicio");
    console.log(this.props.rows);
  };

  rendertable = () => {
    const { classes, rows } = this.props;

    return (
      <div>
        <h1>{this.props.selected.empresa}</h1>

        <div>
          <Button variant="contained" size="small" className={classes.button}
            onClick={() => this.addMaterial() } >
            <AddIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
            Material
          </Button>
          <Button variant="contained" size="small" className={classes.button}
            onClick={() => this.addServicio() } >
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
              <TableRow hover key={1}>
                <TableCell numeric>{1}</TableCell>
                <TableCell>Hilo Nylon #30</TableCell>
                <TableCell>Rollo</TableCell>
                <TableCell>10</TableCell>
                <TableCell>$150.00</TableCell>
                <TableCell>$1,500.00</TableCell>
                <TableCell>
                  <IconButton aria-label="Delete" className={classes.margin}
                  onClick={() => alert("clicked!") } >
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
    rows: [],
    selected: state.proveedores.selected
  };
}

Compras = connect(mapStateToProps, {
  setAppTitle,
}) (Compras);

export default Compras;
