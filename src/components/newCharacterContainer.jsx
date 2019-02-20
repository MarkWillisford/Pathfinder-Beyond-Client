import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import NewCharacterNavLinks from './newCharacterNavLinks';
import NewCharacterPreferences from './newCharacterPreferences';
import NewCharacterRace from './newCharacterRace';
import NewCharacterClass from './newCharacterClass';
import NewCharacterAbilityScores from './newCharacterAbilityScores';
import NewCharacterDetails from './newCharacterDetails';
import NewCharacterSkills from './newCharacterSkills';
import NewCharacterFeats from './newCharacterFeats';
import NewCharacterEquipment from './newCharacterEquipment';
import LoadOptions from './loadNewCharacterOptions';
import Next from './next';
import Prev from './prev';

import {toggleStep} from '../actions/index';

import './newCharacterContainer.css';

export class NewCharacterContainer extends React.Component{
    togglePrev(e){
    	let index = this.props.currentStep-1;
    	let disabledPrev = (index === 0);

    	// call disable action
		LoadOptions(index, this.props.dispatch);
    	this.props.dispatch(toggleStep(index, false, disabledPrev));
    }

    toggleNext(e){
    	let index = this.props.currentStep+1;
    	let disabledNext = (index === this.props.creationSteps.length-1);

    	// call disable action
		LoadOptions(index, this.props.dispatch);
    	this.props.dispatch(toggleStep(index, disabledNext, false ));
    }

	render(){
		const stepsArray = this.props.creationSteps;
		const currentStep = this.props.currentStep;
		const disabledPrev = this.props.disabledPrev;
		const disabledNext = this.props.disabledNext;
		
		let prevUrl = "";
		if(currentStep !== 0){
			prevUrl = `/playerDemo/newCharacter/${stepsArray[currentStep-1].name}`;
		} else {
			prevUrl = `/playerDemo/newCharacter/${stepsArray[currentStep].name}`;
		}

		let nextUrl = "";
		if(currentStep !== 7){
			nextUrl = `/playerDemo/newCharacter/${stepsArray[currentStep+1].name}`;
		} else {
			nextUrl = `/playerDemo/newCharacter/${stepsArray[currentStep].name}`;
		}

		return (
	        <Router>
		        <div className="newCharacterContainer">
		        	<NewCharacterNavLinks /> 
		        	<Prev toggle={(e) => this.togglePrev(e)} disabled={disabledPrev} url={prevUrl}/>
		        	<div>
		        		{/* 8 sections, each of which has a completed property
			        		which controls which component is displayed */}
			        	<Route exact path="/playerDemo/newCharacter/Character Basics" render={() => <Redirect to="/playerDemo/newCharacter/home" />} />
		        		<Route exact path="/playerDemo/newCharacter/home" component={NewCharacterPreferences} />
		        		<Route exact path="/playerDemo/newCharacter/Race" component={NewCharacterRace} />
		        		<Route exact path="/playerDemo/newCharacter/Class" component={NewCharacterClass} />
			        	<Route exact path="/playerDemo/newCharacter/Ability Scores" render={() => <Redirect to="/playerDemo/newCharacter/AbilityScores" />} />
		        		<Route exact path="/playerDemo/newCharacter/AbilityScores" component={NewCharacterAbilityScores} />
		        		<Route exact path="/playerDemo/newCharacter/Details" component={NewCharacterDetails} />
		        		<Route exact path="/playerDemo/newCharacter/Skills" component={NewCharacterSkills} />
		        		<Route exact path="/playerDemo/newCharacter/Feats" component={NewCharacterFeats} />
		        		<Route exact path="/playerDemo/newCharacter/Equipment" component={NewCharacterEquipment} />
		        	</div>
		        	<Next toggle={(e) => this.toggleNext(e)} disabled={disabledNext} url={nextUrl}/>
		        </div>
	        </Router>
	    );
	}
}

const mapStateToProps = state => ({
	creationSteps:state.characterReducer.creationSteps,
	currentStep:state.characterReducer.currentStep,
    disabledNext:state.characterReducer.disabledNext,
    disabledPrev:state.characterReducer.disabledPrev,
});

export default connect(mapStateToProps)(NewCharacterContainer);