import React from 'react';
import Error from './error';

export default ({ input, label, type, meta }) => {  
  return (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} />
        <Error meta={meta} />
      </div>
    </div>
  );
}
