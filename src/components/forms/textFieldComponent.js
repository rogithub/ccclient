import React from 'react';
import TextField from '@material-ui/core/TextField';

// Read documentation on
// https://redux-form.com/8.1.0/docs/api/field.md/#2-a-stateless-function

export default (field) => {
  const error = field.meta.touched && field.meta.invalid;

  return (
      <TextField {...field.input} error={error} />
  );
}
