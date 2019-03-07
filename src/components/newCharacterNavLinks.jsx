import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {setStep} from '../actions/index';
import LoadOptions from './loadNewCharacterOptions';
import {toggleHelp} from '../actions/index';

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
		// Will need to be async . . .     
		LoadOptions(step, this.props.dispatch);					// <---!!!  This may be causing a lot of issues. 
		this.props.dispatch(setStep(step, disabledNext, disabledPrev));
	}

	toggleHelp(){
		this.props.dispatch(toggleHelp());		
	}

	render(){
		return (
	        <div className="newCharacterNavLinks">
	        	Nav Links
	        	<p><button onClick={this.toggleHelp.bind(this)}>Help</button></p>
	        	<ul>
		        	{this.props.creationSteps.map(({name, id}) => (
		        		<li key={id}>
		        			<Link to={`/playerDemo/newCharacter/${name}`} onClick={this.setStep.bind(this,id)}>{name}</Link>
		        		</li>
		        	))}
		        </ul>
	        </div>
	    );
	}
}

const mapStateToProps = state => ({
    creationSteps: state.characterReducer.creationSteps,
});

export default connect(mapStateToProps)(NewCharacterNavLinks);