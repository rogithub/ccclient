import React from 'react';
import Error from './error';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

class Input extends React.Component {
  render () {
    const { classes, input, label, name, type, meta } = this.props;

    return (
      <div>
        <TextField
          id={name}
          type={type}
          label={label}
          className={classes.textField}
          {...input}
          margin="normal"
          variant="outlined"
        />
        <Error meta={meta} />
      </div>
    );
  }
}

Input.propTypes = {
  classes: PropTypes.object.isRequired,
};

Input = withStyles(styles)(Input);

export default Input;
