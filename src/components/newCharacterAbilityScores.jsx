import React from 'react';
import {connect} from 'react-redux';
import { formValueSelector } from 'redux-form';
import _ from 'lodash';
import AbilityScoreDice from './abilityScoreDice';
import AbilityScoreManual from './abilityScoreManual';

import { abilityScoreGenerationMethod } from '../actions/index';
import { assignScore } from '../actions/index';
import { capitalizeFirstLetter } from '../utility/helperFunctions';

import './newCharacterAbilityScores.css';

export class NewCharacterAbilityScores extends React.Component{
	constructor(props){
		super(props);
	}

	handleClick(text){
		// set the state.abilityScoreGenerationMethod to text
		this.props.dispatch(abilityScoreGenerationMethod(text));
	}

	abilitySum(ability, statArrayToAssign){
		let capAbility = capitalizeFirstLetter(ability);
		let basePath="props.base"+capAbility;
		let numBase = 0;
		let racialPath="props.racial"+capAbility;
		let numRace = Number(_.get(this, racialPath, "0"));
		let sum = 0;
/*		switch(this.props.abilityScoreGenerationMethod){
			case "arrays":
				console.log("arrays");
			break;
			case "dice":
			break;
			case "manual":
				console.log("manual");
			break;
			case "pointBuy":
				console.log("pointBuy");
			break;
			default:
				console.log("null");
		}*/
		numBase = Number(_.get(this, basePath, "0"));
		sum = numBase + numRace;

		if(sum === 0){
			console.log("--");
			return "--";
		} else {
			console.log(sum); return sum;
		}
	}

	render(){
		const complete = this.props.complete;
		const strengthTotal = this.abilitySum("strength");
		const dexterityTotal = this.abilitySum("dexterity");
		const constitutionTotal = this.abilitySum("constitution");
		const intelligenceTotal = this.abilitySum("intelligence");
		const wisdomTotal = this.abilitySum("wisdom");
		const charismaTotal = this.abilitySum("charisma");
		const strengthMod = Math.floor((strengthTotal - 10) / 2);
		const dexterityMod =0;
		const constitutionMod =0;
		const intelligenceMod =0;
		const wisdomMod =0;
		const charismaMod =0;

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
				        			<td id="strTotal">{strengthTotal}</td>
				        			<td id="strMod">{ this.props.baseStrength ? strengthMod : "--" }</td>
				        			<td id="strBase">{ this.props.baseStrength ? this.props.baseStrength : "--" }</td>
				        			<td id="strRacial">{ this.props.racialStrength ? this.props.racialStrength : "0" }</td>
				        			<td id="strEnhance">+0</td>
				        			<td id="strInherent">+0</td>
				        			<td id="strTemplate">+0</td>
				        		</tr>
				        		<tr>
				        			<td>Dexterity</td>
				        			<td id="dexTotal">{dexterityTotal}</td>
				        			<td id="dexMod">{ this.props.baseDexterity ? dexterityMod : "--" }</td>
				        			<td id="dexBase">{ this.props.baseDexterity ? this.props.baseDexterity : "--"}</td>
				        			<td id="dexRacial">{ this.props.racialDexterity ? this.props.racialDexterity : "0" }</td>
				        			<td id="dexEnhance">+0</td>
				        			<td id="dexInherent">+0</td>
				        			<td id="dexTemplate">+0</td>
				        		</tr>
				        		<tr>
				        			<td>Constitution</td>
				        			<td id="conTotal">{constitutionTotal}</td>
				        			<td id="conMod">{ this.props.baseConstitution ? constitutionMod : "--" }</td>
				        			<td id="conBase">{ this.props.baseConstitution ? this.props.baseConstitution : "--" }</td>
				        			<td id="conRacial">{ this.props.racialConstitution ? this.props.racialConstitution : "0" }</td>
				        			<td id="conEnhance">+0</td>
				        			<td id="conInherent">+0</td>
				        			<td id="conTemplate">+0</td>
				        		</tr>
				        		<tr>
				        			<td>Intelligence</td>
				        			<td id="intTotal">{intelligenceTotal}</td>
				        			<td id="intMod">{ this.props.baseIntelligence ? intelligenceMod : "--" }</td>
				        			<td id="intBase">{ this.props.baseIntelligence ? this.props.baseIntelligence : "--" }</td>
				        			<td id="intRacial">{ this.props.racialIntelligence ? this.props.racialIntelligence : "0" }</td>
				        			<td id="intEnhance">+0</td>
				        			<td id="intInherent">+0</td>
				        			<td id="intTemplate">+0</td>
				        		</tr>
				        		<tr>
				        			<td>Wisdom</td>
				        			<td id="wisTotal">{wisdomTotal}</td>
				        			<td id="wisMod">{ this.props.wisdom ? wisdomMod : "--" }</td>
				        			<td id="wisBase">{ this.props.baseWisdom ? this.props.baseWisdom : "--"}</td>
				        			<td id="wisRacial">{ this.props.racialWisdom ? this.props.racialWisdom : "0" }</td>
				        			<td id="wisEnhance">+0</td>
				        			<td id="wisInherent">+0</td>
				        			<td id="wisTemplate">+0</td>
				        		</tr>
				        		<tr>
				        			<td>Charisma</td>
				        			<td id="chaTotal">{charismaTotal}</td>
				        			<td id="chaMod">{ this.props.charisma ? charismaMod : "--" }</td>
				        			<td id="chaBase">{ this.props.baseCharisma ? this.props.baseCharisma : "--" }</td>
				        			<td id="chaRacial">{ this.props.racialCharisma ? this.props.racialCharisma : "0" }</td>
				        			<td id="chaEnhance">+0</td>
				        			<td id="chaInherent">+0</td>
				        			<td id="chaTemplate">+0</td>
				        		</tr>
				        	</tbody>
			        	</table>
			        	<br />
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

// function AddScores(base, racial){	// there has to be a better solution than this. 
//	{ this.props.baseStrength ? (<AddScores base={this.props.abilityScoreOptions[this.props.baseStrength].value} racial={this.props.racialStrength}/>) : "--"}
// 	console.log(base.base);
// 	console.log(racial);
// 	if(base.base && racial){
// 		console.log("adding");
// 		return (base.base+racial);
// 	} else if (base.base && !racial){
// 		console.log("only base");
// 		console.log(base);
// 		return base.base;
// 	} else if(!base.base && racial){
// 		console.log("only racial");
// 		return racial;
// 	} else {
// 		console.log("neither");
// 		return "--";
// 	}
// }

function AbilityScoreMethod(props){
	switch(props.method){
		case "arrays": 
			return (<AbilityScoreArrays />);
			break;
		case "dice": 
			return (<AbilityScoreDice statArrayToAssign={props.statArrayToAssign} />);
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

/*function AbilityScoreManual(){
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
}*/

function AbilityScorePointBuy(){
	return (
		<div>Point Buy</div>
	)
}

const selector = formValueSelector('diceForm');
const mapStateToProps = state => ({
	complete:state.characterReducer.creationSteps[3].complete,
	abilityScoreGenerationMethod:state.characterReducer.abilityScoreGenerationMethod,
	statArrayToAssign:state.characterReducer.statArrayToAssign,
	baseStrength: state.characterReducer.newCharacter.strength.base,//selector(state, "strengthSelecter"),
	baseDexterity: state.characterReducer.newCharacter.dexterity.base,//selector(state, "dexteritySelecter"),
	baseConstitution: state.characterReducer.newCharacter.constitution.base,//selector(state, "constitutionSelecter"),
	baseIntelligence: state.characterReducer.newCharacter.intelligence.base,//selector(state, "intelligenceSelecter"),
	baseWisdom: state.characterReducer.newCharacter.wisdom.base,//selector(state, "wisdomSelecter"),
	baseCharisma: state.characterReducer.newCharacter.charisma.base,//selector(state, "charismaSelecter"),
	abilityScoreOptions: state.characterReducer.abilityScoreOptions,
	racialStrength: state.characterReducer.newCharacter.strength.racial,
	racialDexterity: state.characterReducer.newCharacter.dexterity.racial,
	racialConstitution: state.characterReducer.newCharacter.constitution.racial,
	racialIntelligence: state.characterReducer.newCharacter.intelligence.racial,
	racialWisdom: state.characterReducer.newCharacter.wisdom.racial,
	racialCharisma: state.characterReducer.newCharacter.charisma.racial,
});

export default connect(mapStateToProps)(NewCharacterAbilityScores);