import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import ContactPhone from '@material-ui/icons/ContactPhone';
import LocalOffer from '@material-ui/icons/LocalOffer';
import Store from '@material-ui/icons/Store';
import Description from '@material-ui/icons/Description';
import { Link } from "react-router-dom";


const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class MenuAppBar extends React.Component {
  state = {
    menuOpen: false,
    title: "Inicio"
  };

  toggleDrawer = (open) => () => {
     this.setState({
       menuOpen: open
     });
   };

   setTitle = (title) => () => {
      this.setState({
        title: title
      });
    };

  render() {
    const { classes } = this.props;
    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem button key="Inicio" onClick={this.setTitle('Inicio')} >
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <Link to="/">Inicio</Link>
          </ListItem>
          <ListItem button key="Proveedores" onClick={this.setTitle('Proveedores')}>
            <ListItemIcon><ContactPhone /></ListItemIcon>
            <Link to="/proveedores">Proveedores</Link>
          </ListItem>
          <ListItem button key="Materiales" onClick={this.setTitle('Materiales')}>
            <ListItemIcon><Store /></ListItemIcon>
            <Link to="/materiales">Materiales</Link>
          </ListItem>
          <ListItem button key="Cotizaciones" onClick={this.setTitle('Cotizaciones')}>
            <ListItemIcon><Description /></ListItemIcon>
            <Link to="/cotizaciones">Cotizaciones</Link>
          </ListItem>
          <ListItem button key="Inventario" onClick={this.setTitle('Inventario')}>
            <ListItemIcon><LocalOffer /></ListItemIcon>
            <Link to="/inventario">Inventario</Link>
          </ListItem>
        </List>
      </div>
    );


    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.toggleDrawer(true)} >
              <MenuIcon />
            </IconButton>
            <SwipeableDrawer
              open={this.state.menuOpen}
              onClose={this.toggleDrawer(false)}
              onOpen={this.toggleDrawer(true)} >
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer(false)}
                onKeyDown={this.toggleDrawer(false)} >
                {sideList}
              </div>
            </SwipeableDrawer>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {this.state.title}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);
