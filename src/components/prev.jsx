import React from 'react';
import { Link } from 'react-router-dom';

export default function Prev(props) {
  const show = props.disabled;
  if(!show){
  	return (<Link className="prevButton"  to={props.url} onClick={props.toggle}>Prev</Link>);
  }
  return (
    <span className="prevButton">Prev</span>
  );
} 