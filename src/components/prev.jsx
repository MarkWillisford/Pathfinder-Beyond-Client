import React from 'react';

export default function Prev(props) {
  return (
    <button onClick={props.toggle} disabled={props.disabled}>Previous</button>
  );
}