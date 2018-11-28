import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NewCharacterNavLinks from './newCharacterNavLinks';
import NewCharacterPerferances from './newCharacterPerferances';
import NewCharacterRace from './newCharacterRace';
import NewCharacterClass from './newCharacterClass';
import NewCharacterAbilityScores from './newCharacterAbilityScores';
import NewCharacterDetails from './newCharacterDetails';
import NewCharacterSkills from './newCharacterSkills';
import NewCharacterFeats from './newCharacterFeats';
import NewCharacterEquipment from './newCharacterEquipment';
import Next from './next';
import Prev from './prev';

import {decrementCurrentStep} from '../actions/index';
import {incrementCurrentStep} from '../actions/index';
import {togglePrev} from '../actions/index';
import {toggleNext} from '../actions/index';
import {toggleStep} from '../actions/index';
import {loadRaces} from '../actions/index';
import TestingRoutes from './testingRoutes';

import './newCharacterPerferances.css';

export class NewCharacterContainer extends React.Component{
/*    loadPrevious(){
        this.props.dispatch(decrementCurrentStep());    	
    }

    loadNext(){
        this.props.dispatch(incrementCurrentStep());
        let url = "";
        const idToFind = this.props.currentStep+1;
        for(let i=0;i<this.props.creationSteps.length;i++){
        	if(this.props.creationSteps[i].id === idToFind){
        		url=this.props.creationSteps[i].name;
        	};
        };
        this.props.history.push(`/playerDemo/newCharacter/${url}`);          
    }*/

    togglePrev(e){
    	let index = this.props.currentStep-1;
    	console.log("index is: " + index);
    	let disabledPrev = (index === 0);
    	console.log("disabledPrev is: " + disabledPrev);

    	// call disable action
    	this.props.dispatch(toggleStep(index, false, disabledPrev));
    	this.setUrl();
    }

    toggleNext(e){
    	let index = this.props.currentStep+1;
    	let disabledNext = (index === this.props.creationSteps.length-1);

    	// call disable action
    	this.props.dispatch(toggleStep(index, disabledNext, false ));
    	this.setUrl();
    }

    setUrl(){
		const stepsArray = this.props.creationSteps;
		const currentStep = this.props.currentStep+1;
		console.log("currentStep is: " + currentStep);
		const help = this.props.help;
		const disabledPrev = this.props.disabledPrev;
		const disabledNext = this.props.disabledNext;
		
		const url = stepsArray[currentStep].name
		console.log(this.props);
		this.props.history.push(`/playerDemo/newCharacter/${url}`);

    }

	render(){
		const stepsArray = this.props.creationSteps;
		const currentStep = this.props.currentStep;
		const help = this.props.help;
		const disabledPrev = this.props.disabledPrev;
		const disabledNext = this.props.disabledNext;
		
		const url = stepsArray[currentStep].name/*
		this.props.history.push(`/playerDemo/newCharacter/${url}`);*/

		return (
	        <Router>
		        <div className="newCharacterContainer">
		        	<NewCharacterNavLinks /> 
		        	change to links
		        	<Prev toggle={(e) => this.togglePrev(e)} disabled={disabledPrev} />
		        	<div>
		        		{/* 8 sections, each of which has a completed property
			        		which controls which component is displayed */}
			        	<Route exact path="/playerDemo/newCharacter/Character Basics" render={() => <Redirect to="/playerDemo/newCharacter/home" />} />
		        		<Route exact path="/playerDemo/newCharacter/home" component={NewCharacterPerferances} />
		        		<Route exact path="/playerDemo/newCharacter/Race" component={NewCharacterRace} />
		        		<Route exact path="/playerDemo/newCharacter/Class" component={NewCharacterClass} />
			        	<Route exact path="/playerDemo/newCharacter/Ability Scores" render={() => <Redirect to="/playerDemo/newCharacter/AbilityScores" />} />
		        		<Route exact path="/playerDemo/newCharacter/AbilityScores" component={NewCharacterAbilityScores} />
		        		<Route exact path="/playerDemo/newCharacter/Details" component={NewCharacterDetails} />
		        		<Route exact path="/playerDemo/newCharacter/Skills" component={NewCharacterSkills} />
		        		<Route exact path="/playerDemo/newCharacter/Feats" component={NewCharacterFeats} />
		        		<Route exact path="/playerDemo/newCharacter/Equipment" component={NewCharacterEquipment} />
		        	</div>
		        	<Next toggle={(e) => this.toggleNext(e)} disabled={disabledNext} />
		        </div>
	        </Router>
	    );
	}
}

const mapStateToProps = state => ({
	creationSteps:state.creationSteps,
	currentStep:state.currentStep,
	help:state.help,
    disabledNext:state.disabledNext,
    disabledPrev:state.disabledPrev,
});

export default connect(mapStateToProps)(NewCharacterContainer);