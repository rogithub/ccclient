import React from 'react';
import ReactDOM from 'react-dom';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Error from './error';

class Input extends React.Component {
  render () {
    const { input, label, meta, className, multiline, rowsMax, disabled } = this.props;
    return (

      <FormControl className={className} error={meta.invalid} variant="outlined">
        <InputLabel
          ref={ref => {
            this.labelRef = ReactDOM.findDOMNode(ref);
          }}
        >{label}</InputLabel>
        <OutlinedInput {...input}
                       disabled={disabled}
                       rowsMax={rowsMax}
                       multiline={multiline}
                       labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                       />
        <Error meta={meta} />
      </FormControl>
    );
  }
}


export default Input;
