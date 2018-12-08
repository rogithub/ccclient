import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem'
import { Link } from "react-router-dom";


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenuAppBar extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              aria-owns={anchorEl ? 'app-menu' : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}>
              <MenuIcon />
            </IconButton>
            <Menu id="app-menu" anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}>

                <MenuItem onClick={this.handleClose}>
                  <Link to="/">Inicio</Link>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <Link to="/proveedores/">Proveedores</Link>
                </MenuItem>
                  
              </Menu>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Inicio
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
