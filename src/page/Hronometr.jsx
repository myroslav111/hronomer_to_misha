import Form from 'components/Form';
import React from 'react';

function Hronometr() {
  return (
    <div>
      <Form />
      <span
        style={{
          position: 'absolute',
          bottom: 5,
          right: 5,
          fontSize: '10px',
          color: 'grey',
        }}
      >
        Made by myroslav111
      </span>
    </div>
  );
}

export default Hronometr;
