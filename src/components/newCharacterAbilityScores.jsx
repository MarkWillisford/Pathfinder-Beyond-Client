import React from 'react';
import {connect} from 'react-redux';
import { formValueSelector } from 'redux-form';
import _ from 'lodash';
import AbilityScoreDice from './abilityScoreDice';
import AbilityScoreManual from './abilityScoreManual';

import { abilityScoreGenerationMethod } from '../actions/index';
import { assignScore } from '../actions/index';
import { capitalizeFirstLetter, statIndex } from '../utility/helperFunctions';

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
		let numBase = Number(_.get(this, basePath, "0"));
		let racialPath="props.racial"+capAbility;
		let numRace = Number(_.get(this, racialPath, "0"));
		let sum = numBase + numRace;

		if(sum === 0){
			return "--";
		} else {
			return sum;
		}
	}

	getModifier(abilityScore){
		let mod = Math.floor((abilityScore-10)/2);
		return mod;
	}

	render(){
		const complete = this.props.complete;
		const help = this.props.help;



		const charStats = this.props.charStats;
		const strengthTotal = (charStats[statIndex(charStats, "strength")]) ? charStats[statIndex(charStats, "strength")].sum.total : "0";
		const dexterityTotal = (charStats[statIndex(charStats, "dexterity")]) ? charStats[statIndex(charStats, "dexterity")].sum.total : "0";
		const constitutionTotal = (charStats[statIndex(charStats, "constitution")]) ? charStats[statIndex(charStats, "constitution")].sum.total : "0";
		const intelligenceTotal = (charStats[statIndex(charStats, "intelligence")]) ? charStats[statIndex(charStats, "intelligence")].sum.total : "0";
		const wisdomTotal = (charStats[statIndex(charStats, "wisdom")]) ? charStats[statIndex(charStats, "wisdom")].sum.total : "0";
		const charismaTotal = (charStats[statIndex(charStats, "charisma")]) ? charStats[statIndex(charStats, "charisma")].sum.total : "0";

/*		const strengthMod = this.getModifier();
		const dexterityMod = this.getModifier(charStats[this.statIndex(charStats, "dexterity")].sum.total);
		const constitutionMod = this.getModifier(charStats[this.statIndex(charStats, "constitution")].sum.total);
		const intelligenceMod = this.getModifier(charStats[this.statIndex(charStats, "intelligence")].sum.total);
		const wisdomMod = this.getModifier(charStats[this.statIndex(charStats, "wisdom")].sum.total);
		const charismaMod = this.getModifier(charStats[this.statIndex(charStats, "charisma")].sum.total);
*/
		const strengthMod = Math.floor((strengthTotal - 10) / 2);
		const dexterityMod = Math.floor((dexterityTotal - 10) / 2);
		const constitutionMod = Math.floor((constitutionTotal - 10) / 2);
		const intelligenceMod = Math.floor((intelligenceTotal - 10) / 2);
		const wisdomMod = Math.floor((wisdomTotal - 10) / 2);
		const charismaMod = Math.floor((charismaTotal - 10) / 2);

		// if help is true, that screen is displayed
		if(help){
			return (
				<div className="abilityScoreHelp">
					<h2>Ability Score Selection</h2>
					<p>Most of what your character attempts in the game is effected by one of his, her or thier six ability scores: Strength, Dexterity, Constitution, Intelligence, Wisdom, and Charisma. Each Ability has a score and a modifier, which you record for use during play. To get the modifier, you simply take the score, subtract 10, and devide by two, rounding down. For example; a 17 becomes a 3 (17 - 10 = 7, 7 / 2 = 3.5, rounded down to 3).</p>
					<h3>Generation Method</h3>
					<p>There are four ways to deterimine your ability scores</p>
					<h4>Standard Arrays</h4>
					<p>If you want to save time or don’t like the idea of randomly determining ability scores, you can choose from a fixed list (15, 14, 13, 12, 10, 8 or 16, 13, 12, 12, 10, 8).</p>
					<h4>Rolling Dice</h4>
					<p>A built in Dice roller for the two most common die methods.</p>
					<h4>Manual Selection</h4>
					<p>Manually enter your ability scores. If you roll to randomly determine scores, choose this option to record your results.</p>
					<h4>Point Buy</h4>
					<p>Customize your ability scores by spending points.</p>
					</div> 

			);
		} else if(!complete){
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
				        			<td id="wisMod">{ this.props.baseWisdom ? wisdomMod : "--" }</td>
				        			<td id="wisBase">{ this.props.baseWisdom ? this.props.baseWisdom : "--"}</td>
				        			<td id="wisRacial">{ this.props.racialWisdom ? this.props.racialWisdom : "0" }</td>
				        			<td id="wisEnhance">+0</td>
				        			<td id="wisInherent">+0</td>
				        			<td id="wisTemplate">+0</td>
				        		</tr>
				        		<tr>
				        			<td>Charisma</td>
				        			<td id="chaTotal">{charismaTotal}</td>
				        			<td id="chaMod">{ this.props.baseCharisma ? charismaMod : "--" }</td>
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
/*function DisplayStatArraySelectElements(props){
	const statArray = props.array;
	return(
		null

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
	help:state.characterReducer.help,
	abilityScoreGenerationMethod:state.characterReducer.abilityScoreGenerationMethod,
	statArrayToAssign:state.characterReducer.statArrayToAssign,
	
/*	baseStrength: state.characterReducer.newCharacter.strength.base,//selector(state, "strengthSelecter"),
	baseDexterity: state.characterReducer.newCharacter.dexterity.base,//selector(state, "dexteritySelecter"),
	baseConstitution: state.characterReducer.newCharacter.constitution.base,//selector(state, "constitutionSelecter"),
	baseIntelligence: state.characterReducer.newCharacter.intelligence.base,//selector(state, "intelligenceSelecter"),
	baseWisdom: state.characterReducer.newCharacter.wisdom.base,//selector(state, "wisdomSelecter"),
	baseCharisma: state.characterReducer.newCharacter.charisma.base,//selector(state, "charismaSelecter"),
	*/
	charStats:state.characterReducer.newCharacter.characterStats,
	abilityScoreOptions: state.characterReducer.abilityScoreOptions,
/*	racialStrength: state.characterReducer.newCharacter.strength.racial,
	racialDexterity: state.characterReducer.newCharacter.dexterity.racial,
	racialConstitution: state.characterReducer.newCharacter.constitution.racial,
	racialIntelligence: state.characterReducer.newCharacter.intelligence.racial,
	racialWisdom: state.characterReducer.newCharacter.wisdom.racial,
	racialCharisma: state.characterReducer.newCharacter.charisma.racial,*/
});

export default connect(mapStateToProps)(NewCharacterAbilityScores);