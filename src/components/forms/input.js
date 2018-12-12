import React from 'react';
import Error from './error';

export default ({ input, label, meta }) => {
  console.log(input);
  return (
    <div>
      <label>{label}</label>
      <input {...input} autoComplete="off" />
      <Error meta={meta} />
    </div>
  );
}
