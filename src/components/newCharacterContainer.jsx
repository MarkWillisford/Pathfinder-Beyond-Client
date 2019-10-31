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
import CharacterReview from './characterReview';
import {Next, MobileNext} from './next';
import {Prev, MobilePrev} from './prev';
import requiresLogin from './requiresLogin';

import {toggleStep} from '../actions/index';

import './newCharacterContainer.css';

export class NewCharacterContainer extends React.Component{  
  togglePrev(e){
    let index = this.props.currentStep-1;
    let disabledPrev = (index === 0);

    // call disable action
    this.props.dispatch(toggleStep(index, false, disabledPrev));
  }

  toggleNext(e){
    let index = this.props.currentStep+1;
    let disabledNext = (index === this.props.creationSteps.length-1);

    // call disable action
    this.props.dispatch(toggleStep(index, disabledNext, false ));
  }

  customRedirect(redirectTo){
    this.props.dispatch(toggleStep(0, false, true));
    //localStorage.setItem('currentStep', 0);
    return (<Redirect to={redirectTo} />)
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
      <div className="newCharacterContainer">
        <NewCharacterNavLinks />
        <div className="flexContianer">
          <div className="navButtonWrapper col-2">
            <Prev toggle={(e) => this.togglePrev(e)} disabled={disabledPrev} url={prevUrl}/>
          </div>
          <div className="newCharacterDataContainer col-8">
            {/* 8 sections, each of which has a completed property
              which controls which component is displayed */}
            <Route exact path="/newCharacter/" render= {() => this.customRedirect("/newCharacter/home")} />         {/* {() => <Redirect to="/newCharacter/home" />} /> */}
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
          <div className="navButtonWrapper col-2">
            <Next toggle={(e) => this.toggleNext(e)} disabled={disabledNext} url={nextUrl}/>
          </div>
          <div className="mobileNavFooter">
            <MobilePrev toggle={(e) => this.togglePrev(e)} disabled={disabledPrev} url={prevUrl}/>
            <MobileNext toggle={(e) => this.toggleNext(e)} disabled={disabledNext} url={nextUrl}/>
          </div>
        </div>
      </div>	        
	  );
	}
}

const mapStateToProps = state => ({
	creationSteps:state.characterReducer.creationSteps,
	currentStep:state.characterReducer.currentStep,
  disabledNext:state.characterReducer.disabledNext,
  disabledPrev:state.characterReducer.disabledPrev,
  editingExistingCharacter:state.characterReducer.editingExistingCharacter,
});

export default requiresLogin()(connect(mapStateToProps)(NewCharacterContainer));