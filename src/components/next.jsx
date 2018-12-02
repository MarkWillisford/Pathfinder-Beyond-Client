import React from 'react';
import { Link } from 'react-router-dom';

export default function Next(props) {
  const show = props.disabled;
  if(!show){
  	return (<Link to={props.url} onClick={props.toggle}>Next</Link>);
  }
  return (
    <span>Next</span>
  );
}