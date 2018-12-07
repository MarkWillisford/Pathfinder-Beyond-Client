import React from 'react';
import { connect } from 'react-redux';
import RaceCard from './raceCard';

import { toggleRaceExpand } from '../actions/index';
import { submitRaceToState } from '../actions/index';
import { submitAbilityScoreToState } from '../actions/index';
import { submitSkillsToState } from '../actions/index';

import './newCharacterRace.css';

export class NewCharacterRace extends React.Component{
	handleClick(id){
		for(let i=0; i<this.props.racesArray.length;i++){
			// if this is the clicked element toggle it **OR**
			// if this is not the clicked element and it is expanded, toggle it
			if( (i===id) || (i!==id && this.props.racesArray[i].expand === true) ){
				this.props.dispatch(toggleRaceExpand(i));
			}
			// again we have to find the element that called this function
			if( i===id ){
				// and set its child component button to display off. 
				// TODO! by ref or by state?
			}
		}

	}

	addRace(id){
		for(let i=0; i<this.props.racesArray.length;i++){
			// if this is the clicked element toggle it 
			if( i===id ){
				this.props.dispatch(submitRaceToState(i));
				let abilityArray = this.props.racesArray[i].standardRacialTraits.base.abilityScoreRacialBonusArray;
				if(abilityArray){		// find out if there are given ability score bonuses
					for(let j=0; j<abilityArray.length; j++){
						this.props.dispatch(submitAbilityScoreToState( abilityArray[j].stat, "racial", abilityArray[j].value ));
					}					
				} else {		// nothing set means the user has to pick one. 
					// TODO do a cool thing
				}
				let skillArray = this.props.racesArray[i].standardRacialTraits.base.skillRacialBonusArray;
				if(skillArray){			// find out if there are any racial skill bonuses
					for(let j=0; j<skillArray.length; j++){
						this.props.dispatch(submitSkillsToState( skillArray[j].stat, "racial", skillArray[j].value ));
					}
				}
			}
		}		
	}

	render(){
		const complete = this.props.complete;
		const help = this.props.help;

		// if help is true, that screen is displayed
		if(help){
			return ( <h1>HELP</h1> );
		} 
		else if(!complete){
			// Not complete, get choices and display
			return (
		        <div className="newCharacterRace">
		        	<h1>Character Race - todo</h1>	
		        	{this.props.racesArray.map(({id,thum,name,expand,standardRacialTraits}) => 
		        		<RaceCard key={id} thum={thum} name={name} expand={expand} traits={standardRacialTraits} 
		        			callback={()=> this.handleClick(id)} addRaceCallback={()=> this.addRace(id)}/>
		        	)}
		        </div>
		    );
		} else {
			return(
		        <div className="newCharacterRace">
		        	<h1>Character Race - done</h1>	
		        </div>			
			);
		};		
	}
}

const mapStateToProps = state => ({
	complete:state.characterReducer.creationSteps[1].complete,
	racesArray:state.characterReducer.racesArray,
	help:state.characterReducer.help,
});

export default connect(mapStateToProps)(NewCharacterRace);