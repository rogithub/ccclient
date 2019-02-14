import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ProveedoresSelector from '../forms/proveedoresSelector';
import AddMaterialExistente from '../forms/addMaterialExistente';
import AddMaterialNuevo from '../forms/addMaterialNuevo';
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
import Typography from '@material-ui/core/Typography';

import { setAppTitle, addServicio, addMaterial, delCompraItem } from '../../actions';
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
  getComposedName = (material) => {
    return `${material.nombre || ""} ${material.color || ""} ${material.marca || ""} ${material.modelo || ""}`
  }

  state = {
    mode: "Normal"
  };

  handleFormCancel = () => {
    this.setState({ mode: "Normal" });
  };

  handleAddMaterial = (row) => {
    this.props.addMaterial(row);
    this.setState({ mode: "Normal" });
  };

  componentDidMount = () => {
    this.props.setAppTitle("Compras");
  };

  renderButtons = () => {
    const {
      classes
    } = this.props;

    return (
      <div>
        <Button variant="contained" size="small" className={classes.button}
          onClick={() => this.setState({ mode: "AddMaterialExistente" }) } >
          <AddIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
          Material Existente
        </Button>
        <Button variant="contained" size="small" className={classes.button}
          onClick={() => this.setState({ mode: "AddMaterialNuevo" }) } >
          <AddIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
          Material Nuevo
        </Button>
        <Button variant="contained" size="small" className={classes.button}
          onClick={() => this.setState({ mode: "AddServicio" }) } >
          <AddIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
          Servicio
        </Button>
      </div>
    );
  };

  renderEditArea = () => {
    switch(this.state.mode) {
      case "Normal":
        return this.renderButtons();
      case "AddMaterialExistente":
        return <AddMaterialExistente
        onCancel={this.handleFormCancel} onSave={this.handleAddMaterial} />;
      case "AddMaterialNuevo":
        return <AddMaterialNuevo
        onCancel={this.handleFormCancel} onSave={this.handleAddMaterial} />;
      case "AddServicio":
        return <AddMaterialExistente
        onCancel={this.handleFormCancel} onSave={this.handleAddMaterial} />;
      default:
        return this.renderButtons();
    }
  };

  rendertable = () => {
    const {
      classes,
      delCompraItem,
      rows } = this.props;

    return (
      <div>
      { this.renderEditArea() }
      <Typography gutterBottom variant="title">
        {this.props.selected.empresa}
      </Typography>
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
          {rows.map(r => {
            return (
              <TableRow hover key={rows.indexOf(r)}>
                <TableCell numeric>{r.material.idMaterial}</TableCell>
                <TableCell>{this.getComposedName(r.material)}</TableCell>
                <TableCell>{r.material.unidad}</TableCell>
                <TableCell>{r.cantidad}</TableCell>
                <TableCell>{r.precio}</TableCell>
                <TableCell>{r.cantidad * r.precio}</TableCell>
                <TableCell>
                  <IconButton aria-label="Delete" className={classes.margin}
                  onClick={() => delCompraItem(r) } >
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
              <ProveedoresSelector componentProps={{
                                      label: "Proveedor",
                                      placeholder: "Buscar..."
                                    }} />
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
    rows: state.compras.rows || [],
    compra: state.compras.compra,
    selected: state.proveedores.selected
  };
}

Compras = connect(mapStateToProps, {
  setAppTitle,
  addServicio,
  addMaterial,
  delCompraItem,
}) (Compras);

export default Compras;
