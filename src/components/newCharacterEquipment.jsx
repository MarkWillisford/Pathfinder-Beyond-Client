import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import EquipmentStartingEquipment from './equipment_StartingEquipment';
import EquipmentGold from './equipment_Gold';

import { equipmentGenerationMethod } from '../actions/index';

import './newCharacterEquipment.css';

export class NewCharacterEquipment extends React.Component{
	handleClick(value){
		// set the state.equipmentGenerationMethod to value
    this.props.dispatch(equipmentGenerationMethod(value));
	}

	render(){
		const complete = this.props.complete;
		const help = this.props.help;
		const wealth = this.props.wealth;
    const defaultGear = this.props.defaultGear;
    const ready = (
      this.props.basics &&
      this.props.race && 
      this.props.charClassComplete &&  
      this.props.abilityScores &&
      this.props.details &&
      this.props.skills &&
      this.props.feats 
    );

		// first here we must check to ensure that race, class, and ability scores are complete. 
		// If not, we display an error message directing the user to complete those pages before 
		// continuing. 
		if(help){
			// if help is true, that screen is displayed
			return (
				<div className="equipmentHelp">
					<h2>Selecting Equipment</h2>
					<p>In this step you will select your starting equipment</p>
					<h4>Encumbrance</h4>
					<p>Your Strength score limits the amount of gear you can carry. Try not to purchase equipment with a total weight (in pounds) exceeding your Strength score times 15.</p>
				</div>
			);
		} else if( !ready ){
			return (
				<div>
          <h3>Please finish the rest of your character before buying equipment.</h3>
					{/* <h3>Please finish your race, class and ability score selections before choosing your equipment.</h3> */} 
				</div>
			)
		} else if(!complete){
			if(defaultGear){
				return (
			        <div className="newCharacterEquipment">
			        	<h1>Character Equipment</h1>	
			        	<p>{ wealth.number }D{ wealth.type }</p>
			        	<p>Choose <button onClick={()=> this.handleClick("equipment")}>Equipment</button> Or <button onClick={()=> this.handleClick("gold")}>Gold</button></p>
			        	<div className="equipmentSelection">
			        		<EquipmentMethod method={this.props.equipmentGenerationMethod} dispatch={this.props.dispatch}/>
			        	</div>
			        </div>
			    );				
			} else {
				return (
			        <div className="newCharacterEquipment">
			        	<h1>Character Equipment</h1>	
			        	<div className="equipmentSelection">
			        		<EquipmentMethod method="gold" dispatch={this.props.dispatch}/>
			        	</div>
			        </div>
			    );
			}
		} else {
      return <Redirect to="/newCharacter/review" />;
		}
	}
}
      
function EquipmentMethod(props){
	switch(props.method){
		case "equipment": 
			return (<EquipmentStartingEquipment />)
		case "gold": 
			return (<EquipmentGold />)
		default:
			return null;			
	}
}

const mapStateToProps = state => ({
	complete:state.characterReducer.creationSteps[7].complete,
	help:state.characterReducer.help,
	basics:state.characterReducer.creationSteps[0].complete,
	race:state.characterReducer.creationSteps[1].complete,
	charClassComplete:state.characterReducer.creationSteps[2].complete,
	abilityScores:state.characterReducer.creationSteps[3].complete,
	details:state.characterReducer.creationSteps[4].complete,
	skills:state.characterReducer.creationSteps[5].complete,
	feats:state.characterReducer.creationSteps[6].complete,
	wealth:state.characterReducer.newCharacter.charClass.classFeatures.wealth,
	equipmentGenerationMethod:state.characterReducer.equipmentGenerationMethod,
	defaultGear:state.characterReducer.newCharacter.charClass.classFeatures.gear,
});

export default connect(mapStateToProps)(NewCharacterEquipment);