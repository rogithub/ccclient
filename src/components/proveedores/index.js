import React from 'react';
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

function createData(id, empresa, contacto, domicilio, telefono, email, comentarios) {
  return { id, empresa, contacto, domicilio, telefono, email, comentarios };
}

const rows = [
  createData(1100, 'Lafayette', 'Juan Nepomuseno Cortina', 'Privada de diligencias #56 fraccionamento el mirador', '452-132-96-04', 'juannc@mailinator.com' ,'Nada que comentar'),
  createData(1200, 'NatZipp', 'Juan Nepomuseno Cortina', 'Privada de diligencias #56 fraccionamento el mirador', '452-132-96-04', 'juannc@mailinator.com', 'Nada que comentar'),
  createData(1300, 'Sprandley', 'Juan Nepomuseno Cortina', 'Privada de diligencias #56 fraccionamento el mirador', '452-132-96-04', 'juannc@mailinator.com', 'Nada que comentar'),
  createData(1400, 'La Nacional', 'Juan Nepomuseno Cortina', 'Privada de diligencias #56 fraccionamento el mirador', '452-132-96-04', 'juannc@mailinator.com', 'Nada que comentar'),
  createData(1500, 'El Bigotaco', 'Juan Nepomuseno Cortina', 'Privada de diligencias #56 fraccionamento el mirador', '452-132-96-04', 'juannc@mailinator.com', 'Nada que comentar')
];

function SimpleTable(props) {
  const { classes } = props;

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
              <TableRow key={row.id}>
                <TableCell numeric>{row.id}</TableCell>
                <TableCell>{row.empresa}</TableCell>
                <TableCell>{row.contacto}</TableCell>
                <TableCell>{row.telefono}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.domicilio}</TableCell>
                <TableCell>{row.comentarios}</TableCell>
                <TableCell>
                <Button variant="contained" color="primary" className={classes.button}>
                  Editar
                  <EditIcon className={classes.rightIcon}>send</EditIcon>
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

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
