import React from 'react';
import { Link } from 'react-router-dom';

export default function Prev(props) {
  const show = props.disabled;
  if(!show){
  	return (<Link to={props.url} onClick={props.toggle}>Prev</Link>);
  }
  return (
    <span>Prev</span>
  );
}