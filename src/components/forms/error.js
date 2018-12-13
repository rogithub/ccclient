import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';

export default ({ meta: { touched, error, warning } }) => {

  return (
    <div>
      <FormHelperText>{error}</FormHelperText>
      <FormHelperText>{warning}</FormHelperText>
    </div>
  );
}
