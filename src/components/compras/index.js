import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ProveedoresSelector from '../forms/proveedoresSelector';
import AddMaterialExistente from '../forms/addMaterialExistente';
import AddMaterialNuevo from '../forms/addMaterialNuevo';
import AddServicio from '../forms/addServicio';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import DialogConfirm from '../dialogs/dlgConfirm';
import DialogContentText from '@material-ui/core/DialogContentText';
import { setAppTitle, addCompraRow, delCompraRow, setRowToDeleteCompra, setSelectedProveedor } from '../../actions';
import { formatCurrency, getSubtotalCurr, getSubtotalMasIVACurr, getTotalCurr } from '../services/sumatorias';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
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
  alignRight: {
    'text-align': 'right'
  }
});

class Compras extends React.Component {
  getComposedName = (material) => {
    return `${material.nombre || ""} ${material.color || ""} ${material.marca || ""} ${material.modelo || ""}`
  }

  state = {
    mode: "Main",
    showDeleteDialog: false,
    showCancelCompraDialog: false
  };

  componentWillUnmount= () => {
    this.props.setAppTitle();
  };

  handleFormCancel = () => {
    this.setState({ mode: "Main" });
  };

  handleAddRow = (row) => {
    this.props.addCompraRow(row);
    this.setState({ mode: "Main" });
  };

  componentDidMount = () => {
    this.props.setAppTitle("Compras");
  };

  handleConfirmChangeProveedor = () => {
    this.props.setSelectedProveedor();
    this.setState({ mode: "Main", showDeleteDialog: false });
  };

  handleConfirmCompraCancell = () => {
    this.setState({ showCancelCompraDialog: false });
    alert("Cancelling...");
  }

  handleCompraCancel = () => {
    if (this.hasRows()) {
      this.setState({ showCancelCompraDialog: true });
      return;
    }

    this.handleConfirmCompraCancell();
  };

  hasRows = () => {
    return this.props.rows && this.props.rows.length > 0;
  }

  handleChangeProveedor = () => {
    if (this.hasRows()) {
      this.setState({ showDeleteDialog: true });
      return;
    }

    this.handleConfirmChangeProveedor();
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

  renderWithTitle = (title, control) => {
    return (
      <div>
        <Typography gutterBottom variant="title">
          {title}
        </Typography>
        {control}
      </div>
    );
  };

  renderEditArea = () => {
    switch(this.state.mode) {
      case "Main":
        return this.renderButtons();
      case "AddMaterialExistente":
        return this.renderWithTitle("Agregar Material Existente",
          <AddMaterialExistente
          onCancel={this.handleFormCancel}
          onSave={this.handleAddRow} />
        );

      case "AddMaterialNuevo":
        return this.renderWithTitle("Agregar Material Nuevo",
          <AddMaterialNuevo
          onCancel={this.handleFormCancel}
          onSave={this.handleAddRow} />
        );

      case "AddServicio":
        return this.renderWithTitle("Agregar Servicio",
          <AddServicio
          onCancel={this.handleFormCancel}
          onSave={this.handleAddRow} />
        );
      default:
        return this.renderButtons();
    }
  };

  subtotalReducer = (acc, r) => acc + (r.cantidad * r.precio);

  handleSave = () => {
    alert("Guardar al server!");
  };

  handleDeleteRow = () => {
    const row = this.props.toDelete;
    this.props.delCompraRow(row);
  }

  getCancelCompraDialogContent = () => {
    return (<DialogContentText>
      Se perderán todas las filas capturadas
    </DialogContentText>);
  };

  getDelCompraDialogContent = () => {
    const p = this.props.proveedor;
    if (!p) return null

    return (<DialogContentText>
      {
        p.empresa
      }
    </DialogContentText>);
  };
  getDelRowDialogContent = () => {
    const r = this.props.toDelete;
    if (!r) return null

    return (<DialogContentText>
      {
        r.material ? this.getComposedName(r.material) : r.descripcion
      }
    </DialogContentText>);
  };

  renderTable = () => {
    if (this.state.mode !== "Main") return null;
    const {
      iva,
      classes,
      rows,
      setRowToDeleteCompra,
     } = this.props;
    return (
      <div>
        <DialogConfirm
          open={this.props.toDelete !== undefined}
          handleConfirm={this.handleDeleteRow}
          handleCancel={() => setRowToDeleteCompra()}
          title="¿Desea borrar éste renglón?"
          confirmText="Borrar">
          {this.getDelRowDialogContent()}
        </DialogConfirm>

        <DialogConfirm
          open={this.state.showDeleteDialog}
          handleConfirm={this.handleConfirmChangeProveedor }
          handleCancel={() => this.setState({ showDeleteDialog: false }) }
          title="¿Desea cambiar éste proveedor?"
          confirmText="Continuar">
          {this.getDelCompraDialogContent()}
        </DialogConfirm>
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
                <TableCell numeric>
                  { r.material ? r.material.idMaterial : rows.indexOf(r) }
                </TableCell>
                <TableCell>
                  { r.material ? this.getComposedName(r.material) : r.descripcion }
                  </TableCell>
                <TableCell>
                  { r.material ? r.material.unidad: "Servicio" }
                </TableCell>
                <TableCell>{r.cantidad}</TableCell>
                <TableCell>{formatCurrency(r.precio)}</TableCell>
                <TableCell className={classes.alignRight}>{formatCurrency(r.cantidad * r.precio)}</TableCell>
                <TableCell>
                  <IconButton aria-label="Delete" className={classes.margin}
                  onClick={() => setRowToDeleteCompra(r) } >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
            <TableRow>
              <TableCell colSpan={4} />
              <TableCell className={classes.alignRight}>Subtotal</TableCell>
              <TableCell className={classes.alignRight}>{getSubtotalCurr(rows, this.subtotalReducer)}</TableCell>
              <TableCell />
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} />
              <TableCell className={classes.alignRight}>
                IVA {iva}%
              </TableCell>
              <TableCell className={classes.alignRight}>{getSubtotalMasIVACurr(rows, iva, this.subtotalReducer)}</TableCell>
              <TableCell />
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} />
              <TableCell className={classes.alignRight}>Total</TableCell>
              <TableCell className={classes.alignRight}>{getTotalCurr(rows, iva, this.subtotalReducer)}</TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
        <div className={classes.alignRight}>
          <Button variant="contained" size="small" className={classes.button}
            onClick={() => this.handleChangeProveedor() } >
            <NavigateBefore className={classNames(classes.leftIcon, classes.iconSmall)} />
            Regresar
          </Button>
          <Button variant="contained" size="small" className={classes.button}
            color="primary"
            onClick={() => this.handleSave() } >
            <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
            Guardar
          </Button>
        </div>
      </div>
    );
  }

  renderSelectProveedor = () => {
    const {
      classes,
     } = this.props;

    return this.renderWithTitle("Seleccionar Proveedor",
    <div>
      <DialogConfirm
        open={this.state.showCancelCompraDialog}
        handleConfirm={this.handleConfirmCompraCancell }
        handleCancel={() => this.setState({ showCancelCompraDialog: false }) }
        title="¿Desea cancalar la compra?"
        cancelText="No"
        confirmText="Sí">
        {this.getCancelCompraDialogContent()}
      </DialogConfirm>
      <ProveedoresSelector
        componentProps={{
          placeholder: "Escriba aquí para comenzar a buscar..."
      }} />
      <div className={classes.alignRight}>
      {
        this.hasRows() ?
        <Button variant="contained" size="small" className={classes.button}
          color="secondary"
          onClick={() => this.handleCompraCancel() } >
          <DeleteIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
          Cancelar
        </Button>
        : // note ternary operator hasRows
        <Button variant="contained" size="small" className={classes.button}
          color="primary"
          onClick={() => this.handleCompraCancel() } >
          <NavigateBefore className={classNames(classes.leftIcon, classes.iconSmall)} />
          Cancelar
        </Button>
      }
      </div>
    </div>
    );
  };

  renderMainArea = () => {
    return (
      <div>
        <Typography gutterBottom variant="title">
          {this.props.proveedor.empresa}
        </Typography>
        { this.renderEditArea() }
        { this.renderTable() }
        </div>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root}>
            { this.props.proveedor ?
              this.renderMainArea() :
              this.renderSelectProveedor()
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
    iva: state.app.iva,
    rows: state.compras.rows || [],
    toDelete: state.compras.toDelete,
    proveedor: state.proveedores.selected,
  };
}

Compras = connect(mapStateToProps, {
  setAppTitle,
  addCompraRow,
  delCompraRow,
  setRowToDeleteCompra,
  setSelectedProveedor,
}) (Compras);

export default Compras;
