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
import CharacterReview from './characterReview';
import Next from './next';
import Prev from './prev';
import requiresLogin from './requiresLogin';

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
			prevUrl = `/newCharacter/${stepsArray[currentStep-1].name}`;
		} else {
			prevUrl = `/newCharacter/${stepsArray[currentStep].name}`;
		}

		let nextUrl = "";
		if(currentStep !== 7){
			nextUrl = `/newCharacter/${stepsArray[currentStep+1].name}`;
		} else {
			nextUrl = `/newCharacter/${stepsArray[currentStep].name}`;
		}

		return (
	        <Router>
		        <div className="newCharacterContainer">
		        	<NewCharacterNavLinks /> 
		        	<Prev toggle={(e) => this.togglePrev(e)} disabled={disabledPrev} url={prevUrl}/>
		        	<div>
		        		{/* 8 sections, each of which has a completed property
			        		which controls which component is displayed */}
			        	<Route  path="/newCharacter/Character Basics" render={() => <Redirect to="/newCharacter/home" />} />
		        		<Route  path="/newCharacter/home" component={NewCharacterPreferences} />
		        		<Route  path="/newCharacter/Race" component={NewCharacterRace} />
		        		<Route  path="/newCharacter/Class" component={NewCharacterClass} />
			        	<Route  path="/newCharacter/Ability Scores" render={() => <Redirect to="/newCharacter/AbilityScores" />} />
		        		<Route  path="/newCharacter/AbilityScores" component={NewCharacterAbilityScores} />
		        		<Route  path="/newCharacter/Details" component={NewCharacterDetails} />
		        		<Route  path="/newCharacter/Skills" component={NewCharacterSkills} />
		        		<Route  path="/newCharacter/Feats" component={NewCharacterFeats} />
		        		<Route  path="/newCharacter/Equipment" component={NewCharacterEquipment} />
                <Route  path="/newCharacter/review" component={CharacterReview} />

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

export default requiresLogin()(connect(mapStateToProps)(NewCharacterContainer));