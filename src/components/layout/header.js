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
import ListItemText from '@material-ui/core/ListItemText';
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
  linkMenu: {
    textDecoration: 'none'
  }
};

class ListItemLink extends React.Component {
  renderLink = itemProps => <Link to={this.props.to} {...itemProps} />;

  render() {
    const { icon, primary, secondary, onClick, selected } = this.props;
    return (
      <li>
        <ListItem button
          component={this.renderLink}
          onClick={onClick}
          selected={selected}>
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          <ListItemText inset primary={primary} secondary={secondary} />
        </ListItem>
      </li>
    );
  }
}

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
        <List component="nav">
          <ListItemLink to="/" primary="Inbox"
            icon={<HomeIcon />}
            onClick={this.setTitle('Inicio')}
            selected={this.state.title === 'Inicio'}
          />
          <ListItemLink to="/proveedores" primary="Proveedores"
            icon={<ContactPhone />}
            onClick={this.setTitle('Proveedores')}
            selected={this.state.title === 'Proveedores'}
          />
          <ListItemLink to="/materiales" primary="Materiales"
            icon={<Store />}
            onClick={this.setTitle('Materiales')}
            selected={this.state.title === 'Materiales'}
          />
          <ListItemLink to="/cotizaciones" primary="Cotizaciones"
            icon={<Description />}
            onClick={this.setTitle('Cotizaciones')}
            selected={this.state.title === 'Cotizaciones'}
          />
          <ListItemLink to="/inventario" primary="Inventario"
            icon={<LocalOffer />}
            onClick={this.setTitle('Inventario')}
            selected={this.state.title === 'Inventario'}
          />
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
