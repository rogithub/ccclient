import React from 'react';
import Error from './error';
import TextField from '@material-ui/core/TextField';


class Input extends React.Component {
  render () {
    const { input, label, meta, className, multiline, rowsMax, disabled } = this.props;    
    return (
      <div>
        <TextField
          error={meta.invalid}
          className={className}
          label={label}
          {...input}
          margin="normal"
          variant="outlined"
          disabled={disabled}
          multiline={multiline}
          rowsMax={rowsMax}
        />
        <Error meta={meta} />
      </div>
    );
  }
}


export default Input;
