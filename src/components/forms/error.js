import React from 'react';

export default ({ meta: { touched, error, warning } }) => {

  return (
    <div>
      <span>{error}</span>
      <span>{warning}</span>
    </div>
  );
}
