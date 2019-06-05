import React from 'react';
import { Link } from 'react-router-dom';

import './next.css';
import doubleArrowRight from '../images/doubleArrowRight.png';
import doubleArrowRightDisabled from '../images/doubleArrowRightDisabled.png';


export function Next(props) {
  const show = props.disabled;
  if(!show){
    return (
      <div className="nextButtonWrapper show">
        <Link className="nextButton" to={props.url} onClick={props.toggle}>
          <img src={doubleArrowRight} alt="next" height="35" />
        </Link>
      </div>
    );
  }
  return (
    <div className="nextButtonWrapper disabled">
      <span className="nextButton">
        <img src={doubleArrowRightDisabled} alt="next" height="35" />
      </span>
    </div>
  );
}

export function MobileNext(props) {
  const show = props.disabled;
  if(!show){
    return (
      <div className="nextButtonWrapper show">
        <Link className="nextButton" to={props.url} onClick={props.toggle}>
          Next >>
        </Link>
      </div>
    );
  }
  return (
    <div className="nextButtonWrapper disabled">
      <span className="nextButton">
        Next >>
      </span>
    </div>
  );
}