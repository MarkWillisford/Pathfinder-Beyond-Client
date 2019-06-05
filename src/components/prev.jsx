import React from 'react';
import { Link } from 'react-router-dom';

import './prev.css';
import doubleArrowLeft from '../images/doubleArrowLeft.png';
import doubleArrowLeftDisabled from '../images/doubleArrowLeftDisabled.png';

export function Prev(props) {
  const show = props.disabled;
  if(!show){
  	return (
      <div className="prevButtonWrapper show">
        <Link className="prevButton"  to={props.url} onClick={props.toggle}>          
          <img src={doubleArrowLeft} alt="next" height="35" />
        </Link>
      </div>
    )
  }
  return (
    <div className="prevButtonWrapper disabled">
      <span className="prevButton">     
        <img src={doubleArrowLeftDisabled} alt="next" height="35" />
      </span>
    </div>
  );
} 

export function MobilePrev(props) {
  const show = props.disabled;
  let prev = "<< Previous";
  if(!show){
  	return (
      <div className="prevButtonWrapper show">
        <Link className="prevButton"  to={props.url} onClick={props.toggle}>          
          { prev }
        </Link>
      </div>
    )
  }
  return (
    <div className="prevButtonWrapper disabled">
      <span className="prevButton">     
        { prev }
      </span>
    </div>
  );
} 