import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {setStep} from '../actions/index';
import {toggleHelp} from '../actions/index';
import {toggleMenuActive} from '../actions/index';

import './newCharacterNavLinks.css';

export class NewCharacterNavLinks extends React.Component{
	/* 8 sections, each of which has a completed property
	which controls which component is displayed. I was hoping
	to have this forLoop control the links but I couldnt get
	it working. Instead I will have two 'views' within each
	component 
*/
	setStep(step){
		let disabledPrev = false;
		let disabledNext = false;

		if(step === 0){
			disabledPrev = true;
		} else if(step === 7){
			disabledNext = true;
		}
    this.props.dispatch(toggleMenuActive());    
		this.props.dispatch(setStep(step, disabledNext, disabledPrev));
	}

	toggleHelp(){
    this.props.dispatch(toggleMenuActive());    
		this.props.dispatch(toggleHelp());		
	}

  toggleClass(){
    this.props.dispatch(toggleMenuActive());
  }

	render(){
    let className = "toggleView";
    if(this.props.isActive){
      className += ' active';
    }
		return (
      <div className="newCharacterNavLinks">
        {/* Nav Links */}
        <div className="toggle">
          <i className="fas fa-bars" onClick={this.toggleClass.bind(this)}></i>
        </div>
        <div className={className}>
          <ul className="newCharacterNavUL">
            <li className="newCharacterNavLI">
              <button className="helpButton" onClick={this.toggleHelp.bind(this)}>Help</button>
            </li>
            {this.props.creationSteps.map(({name, id}) => (
              <li key={id} className="newCharacterNavLI">
                <Link to={`/newCharacter/${name}`} onClick={this.setStep.bind(this,id)}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div> 
	  );
	}
}

const mapStateToProps = state => ({
    creationSteps: state.characterReducer.creationSteps,
    isActive:state.characterReducer.menuActive,
});

export default connect(mapStateToProps)(NewCharacterNavLinks);