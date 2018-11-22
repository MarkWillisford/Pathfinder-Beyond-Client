import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NewCharacterNavLinks from './newCharacterNavLinks';
import NewCharacterPerferances from './newCharacterPerferances';
import NewCharacterRace from './newCharacterRace';
import NewCharacterClass from './newCharacterClass';
import NewCharacterAbilityScores from './newCharacterAbilityScores';
import NewCharacterDetails from './newCharacterDetails';
import NewCharacterSkills from './newCharacterSkills';
import NewCharacterFeats from './newCharacterFeats';
import NewCharacterEquipment from './newCharacterEquipment';

import {decrementCurrentStep} from '../actions/index';
import {incrementCurrentStep} from '../actions/index';
import TestingRoutes from './testingRoutes';

import './newCharacterPerferances.css';

export class NewCharacterContainer extends React.Component{
    loadPrevious(){
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
    }

	render(){
		return (
	        <Router>
		        <div className="newCharacterContainer">
		        	<NewCharacterNavLinks /> {/*
			        <Route exact path="/playerDemo/newCharacter/:id" component={TestingRoutes} />*/}
		        	<button onClick={this.loadPrevious.bind(this)}>Back</button>
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
		        	<button onClick={this.loadNext.bind(this)}>Next</button>
		        </div>
	        </Router>
	    );
	}
}

const mapStateToProps = state => ({
	creationSteps:state.creationSteps,
	currentStep:state.currentStep,
});

export default connect(mapStateToProps)(NewCharacterContainer);