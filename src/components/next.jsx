import React from 'react';

export default function Next(props) {
  return (
    <button onClick={props.toggle} disabled={props.disabled}>Next</button>
  );
}