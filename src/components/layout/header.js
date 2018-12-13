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
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';


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
    const { icon, primary, secondary, pathname } = this.props;

    return (
      <li>
        <ListItem button
          component={this.renderLink}
          selected={pathname === this.props.to} >
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          <ListItemText inset primary={primary} secondary={secondary} />
        </ListItem>
      </li>
    );
  }
}

class MenuAppBar extends React.Component {
  state = {
    menuOpen: false
  };

  toggleDrawer = (open) => () => {
     this.setState({
       menuOpen: open
     });
   };

  render() {
    const { classes, appTitle } = this.props;
    const { pathname } = this.props.location;


    const sideList = (
      <div className={classes.list}>
        <List component="nav">
          <ListItemLink to="/"
            primary="Inicio"
            icon={<HomeIcon />}
            pathname={pathname}
          />
          <ListItemLink to="/proveedores"
            primary="Proveedores"
            icon={<ContactPhone />}
            pathname={pathname}
          />
          <ListItemLink to="/materiales"
            primary="Materiales"
            icon={<Store />}
            pathname={pathname}
          />
          <ListItemLink to="/cotizaciones"
            primary="Cotizaciones"
            icon={<Description />}
            pathname={pathname}
          />
          <ListItemLink to="/inventario"
            primary="Inventario"
            icon={<LocalOffer />}
            pathname={pathname}
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
              { appTitle || pathname }              
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
MenuAppBar = withRouter(MenuAppBar);
MenuAppBar = withStyles(styles)(MenuAppBar);

const mapStateToProps = (state) => {
  return { appTitle: state.app.title };
}

MenuAppBar = connect(mapStateToProps) (MenuAppBar);

export default MenuAppBar;
