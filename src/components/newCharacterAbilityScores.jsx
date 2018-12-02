import React from 'react';
import {connect} from 'react-redux';
import AbilityScoreDice from './abilityScoreDice';

import { abilityScoreGenerationMethod } from '../actions/index';
import { assignScore } from '../actions/index';

import './newCharacterAbilityScores.css';

export class NewCharacterAbilityScores extends React.Component{
	handleClick(text){
		// set the state.abilityScoreGenerationMethod to text
		this.props.dispatch(abilityScoreGenerationMethod(text));
	}

	render(){
		const complete = this.props.complete;
		if(!complete){
			return (
		        <div className="newCharacterAbilityScores">
		        	<h1>Character Ability Scores</h1>	
		        	<p>How would you like to generate ability scores?
		        	<select ref="abilityScoreGenerationMethod" onChange={()=> this.handleClick(this.refs.abilityScoreGenerationMethod.value)}>
		        		<option value="0">Select how to generate scores</option>
		        		<option value="arrays">Arrays</option>
		        		<option value="dice">Dice</option>
		        		<option value="manual">Manual</option>
		        		<option value="pointBuy">Point Buy</option>
		        	</select>{/*<button onClick={()=> this.handleClick(this.refs.abilityScoreGenerationMethod.value)}>Select</button>*/}</p>
			        <div className="abilityScoreGenerator">
			        	<AbilityScoreMethod method={this.props.abilityScoreGenerationMethod} statArrayToAssign={this.props.statArrayToAssign} dispatch={this.props.dispatch}/>
			        </div>
			        <div className="abilityScoreTable">
			        	<p>Ability Score table below shows all the calculations based on your input thus far</p>
			        	<table>
			        		<thead>
				        		<tr>
				        			<th></th>
				        			<th>Total Score</th>
				        			<th>Modifier</th>
				        			<th>Base Score</th>
				        			<th>Racial Bonus</th>
				        			<th>Enhancement Bonus</th>
				        			<th>Inherent Bonus</th>
				        			<th>Template Bonus</th>
				        		</tr>
				        	</thead>
				        	<tbody>
				        		<tr>
				        			<td>Strength</td>
				        			<td id="strTotal">--</td>
				        			<td id="strMod">--</td>
				        			<td id="strBase">--</td>
				        			<td id="strRacial">+0</td>
				        			<td id="strEnhance">+0</td>
				        			<td id="strInherent">+0</td>
				        			<td id="strTemplate">+0</td>
				        		</tr>
				        		<tr>
				        			<td>Dexterity</td>
				        			<td id="dexTotal">--</td>
				        			<td id="dexMod">--</td>
				        			<td id="dexBase">--</td>
				        			<td id="dexRacial">+0</td>
				        			<td id="dexEnhance">+0</td>
				        			<td id="dexInherent">+0</td>
				        			<td id="dexTemplate">+0</td>
				        		</tr>
				        		<tr>
				        			<td>Constitution</td>
				        			<td id="conTotal">--</td>
				        			<td id="conMod">--</td>
				        			<td id="conBase">--</td>
				        			<td id="conRacial">+0</td>
				        			<td id="conEnhance">+0</td>
				        			<td id="conInherent">+0</td>
				        			<td id="conTemplate">+0</td>
				        		</tr>
				        		<tr>
				        			<td>Intelligence</td>
				        			<td id="intTotal">--</td>
				        			<td id="intMod">--</td>
				        			<td id="intBase">--</td>
				        			<td id="intRacial">+0</td>
				        			<td id="intEnhance">+0</td>
				        			<td id="intInherent">+0</td>
				        			<td id="intTemplate">+0</td>
				        		</tr>
				        		<tr>
				        			<td>Wisdom</td>
				        			<td id="wisTotal">--</td>
				        			<td id="wisMod">--</td>
				        			<td id="wisBase">--</td>
				        			<td id="wisRacial">+0</td>
				        			<td id="wisEnhance">+0</td>
				        			<td id="wisInherent">+0</td>
				        			<td id="wisTemplate">+0</td>
				        		</tr>
				        		<tr>
				        			<td>Charisma</td>
				        			<td id="chaTotal">--</td>
				        			<td id="chaMod">--</td>
				        			<td id="chaBase">--</td>
				        			<td id="chaRacial">+0</td>
				        			<td id="chaEnhance">+0</td>
				        			<td id="chaInherent">+0</td>
				        			<td id="chaTemplate">+0</td>
				        		</tr>
				        	</tbody>
			        	</table>
			        	<br />
			        	<button>Submit</button>
			        </div>
		        </div>
		    );
		} else {
			return(
		        <div className="newCharacterAbilityScores">
		        	<h1>Character Ability Scores - done</h1>	
		        </div>			
			);
		};		
	}
}

const mapStateToProps = state => ({
	complete:state.characterReducer.creationSteps[3].complete,
	abilityScoreGenerationMethod:state.characterReducer.abilityScoreGenerationMethod,
	statArrayToAssign:state.characterReducer.statArrayToAssign,
});

function AbilityScoreMethod(props){
	switch(props.method){
		case "arrays": 
			return (<AbilityScoreArrays />);
			break;
		case "dice": 
			return (<AbilityScoreDice statArrayToAssign={props.statArrayToAssign} dispatch={props.dispatch}/>);
			break;
		case "manual": 
			return (<AbilityScoreManual />);
			break;
		case "pointBuy": 
			return (<AbilityScorePointBuy />);
			break;
		default:
			return null;			
	}
}

function AbilityScoreArrays(){
	return (
		<div>arrays</div>
	)
}

/***************************
helper function
***************************/
function DisplayStatArraySelectElements(props){
	const statArray = props.array;
	return(
		null

	)
}

function AbilityScoreManual(){
	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Strength</th>
						<th>Dexterity</th>
						<th>Constitution</th>
						<th>Intelligence</th>
						<th>Wisdom</th>
						<th>Charisma</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><input type="text" id="strInput" style={{width: 50 + 'px'}} /></td>
						<td><input type="text" id="dexInput" style={{width: 50 + 'px'}} /></td>
						<td><input type="text" id="conInput" style={{width: 50 + 'px'}} /></td>
						<td><input type="text" id="intInput" style={{width: 50 + 'px'}} /></td>
						<td><input type="text" id="wisInput" style={{width: 50 + 'px'}} /></td>
						<td><input type="text" id="chaInput" style={{width: 50 + 'px'}} /></td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

function AbilityScorePointBuy(){
	return (
		<div>Point Buy</div>
	)
}

export default connect(mapStateToProps)(NewCharacterAbilityScores);