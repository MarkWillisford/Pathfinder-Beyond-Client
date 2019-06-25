import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import AbilityScoreDice from './abilityScoreDice';
import AbilityScoreManual from './abilityScoreManual';
import CharacterReview from './characterReview2';

import { abilityScoreGenerationMethod, resetAbilityScoreGenerationMethod } from '../actions/index';
import { capitalizeFirstLetter, statIndex } from '../utility/helperFunctions';
import { resetCompletedStep } from '../actions/index';
import { removeBonus } from '../actions/index';
import { sumBonus } from '../actions/index';

import './newCharacterAbilityScores.css';

export class NewCharacterAbilityScores extends React.Component{
	handleClick(text){
		// set the state.abilityScoreGenerationMethod to text
		this.props.dispatch(abilityScoreGenerationMethod(text));
	}

  dispatchResetCompletedStep(){
    const charStats = this.props.charStats;
    const arrayOfAbilityNames = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"]
    let arrayOfBonusesToRemove = [];
    // look through the stats array for all bonus objects with type === base and name in the array above
    for(let i=0; i<charStats.length;i++){
      if(arrayOfAbilityNames.includes(charStats[i].name)){
        for(let j=0;j<charStats[i].bonuses.length;j++){
          if(charStats[i].bonuses[j].type === "base"){
            arrayOfBonusesToRemove.push(charStats[i].bonuses[j]);
          }
        }
      }
    }

    for(let i=0;i<arrayOfBonusesToRemove.length;i++){
      this.props.dispatch(removeBonus(arrayOfBonusesToRemove[i]));
      this.props.dispatch(sumBonus(arrayOfBonusesToRemove[i]));
    }

    this.props.dispatch(resetCompletedStep(3));
    this.props.dispatch(resetAbilityScoreGenerationMethod());
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

	findBonusIndexByType(arrayOfBonuses, type){
		for(let i=0;i<arrayOfBonuses.length;i++){
			if(arrayOfBonuses[i].type === type){
				return i;
			} else { return null; }
		}
	}
	findBonusAmountByType(stat, type){
		const charStats = this.props.charStats;
		let statObject = charStats[statIndex(charStats, stat)]
		if(statObject){
			let index = this.findBonusIndexByType(statObject.sum.bonuses, type);
			if(index != null){
				return statObject.sum.bonuses[index].amount;
			} else { return "0"}		
		} else { return "0" }
	}

  getAdjustedTotal(ability){
    const tempAbilityScores = this.props.tempAbilityScores;
    // find the previous base if there is one.
    let baseToRemove;
    for(let i=0;i<ability.sum.bonuses.length;i++){
      if(ability.sum.bonuses[i].type === "base"){
        baseToRemove = ability.sum.bonuses[i].amount;
        break;
      }
    }
    if(!baseToRemove){
      baseToRemove = 0;
    }
    // find the newly entered base
    let baseToAdd = Object.keys(tempAbilityScores).includes(ability.name) ? Number(tempAbilityScores[ability.name]) : 0;
    // rebuild the formula with the new total and return
    let adjustedTotal = ability.sum.total - baseToRemove + baseToAdd;
    return ( adjustedTotal );
  }

	render(){
		const complete = this.props.complete;
		const help = this.props.help;

		const charStats = this.props.charStats;
    const strengthTotal = (charStats[statIndex(charStats, "strength")]) 
      ? this.getAdjustedTotal(charStats[statIndex(charStats, "strength")])
      : (this.props.tempAbilityScores.strength ? this.props.tempAbilityScores.strength : "0");
    const dexterityTotal = (charStats[statIndex(charStats, "dexterity")]) 
      ? this.getAdjustedTotal(charStats[statIndex(charStats, "dexterity")])
      : (this.props.tempAbilityScores.dexterity ? this.props.tempAbilityScores.dexterity : "0");
    const constitutionTotal = (charStats[statIndex(charStats, "constitution")]) 
      ? this.getAdjustedTotal(charStats[statIndex(charStats, "constitution")])
      : (this.props.tempAbilityScores.constitution ? this.props.tempAbilityScores.constitution : "0");
    const intelligenceTotal = (charStats[statIndex(charStats, "intelligence")]) 
      ? this.getAdjustedTotal(charStats[statIndex(charStats, "intelligence")])
      : (this.props.tempAbilityScores.intelligence ? this.props.tempAbilityScores.intelligence : "0");
    const wisdomTotal = (charStats[statIndex(charStats, "wisdom")]) 
      ? this.getAdjustedTotal(charStats[statIndex(charStats, "wisdom")])
      : (this.props.tempAbilityScores.wisdom ? this.props.tempAbilityScores.wisdom : "0");
    const charismaTotal = (charStats[statIndex(charStats, "charisma")]) 
      ? this.getAdjustedTotal(charStats[statIndex(charStats, "charisma")])
      : (this.props.tempAbilityScores.charisma ? this.props.tempAbilityScores.charisma : "0");

		const strengthBase = this.props.tempAbilityScores.strength ? this.props.tempAbilityScores.strength : this.findBonusAmountByType("strength", "base");
		const dexterityBase = this.props.tempAbilityScores.dexterity ? this.props.tempAbilityScores.dexterity : this.findBonusAmountByType("dexterity", "base");
		const constitutionBase = this.props.tempAbilityScores.constitution ? this.props.tempAbilityScores.constitution : this.findBonusAmountByType("constitution", "base");
		const intelligenceBase = this.props.tempAbilityScores.intelligence ? this.props.tempAbilityScores.intelligence : this.findBonusAmountByType("intelligence", "base");
		const wisdomBase = this.props.tempAbilityScores.wisdom ? this.props.tempAbilityScores.wisdom : this.findBonusAmountByType("wisdom", "base");
		const charismaBase = this.props.tempAbilityScores.charisma ? this.props.tempAbilityScores.charisma : this.findBonusAmountByType("charisma", "base");

		const strengthRacial = this.findBonusAmountByType("strength", "racial");
		const dexterityRacial = this.findBonusAmountByType("dexterity", "racial");
		const constitutionRacial = this.findBonusAmountByType("constitution", "racial");
		const intelligenceRacial = this.findBonusAmountByType("intelligence", "racial");
		const wisdomRacial = this.findBonusAmountByType("wisdom", "racial");
		const charismaRacial = this.findBonusAmountByType("charisma", "racial");

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
          <h1>Ability Scores</h1>	
          <p>How would you like to generate ability scores?
          <select ref="abilityScoreGenerationMethod" onChange={()=> this.handleClick(this.refs.abilityScoreGenerationMethod.value)}>
            <option value="0">Select how to generate scores</option>
            {/* <option value="arrays">Arrays</option> */}
            <option value="dice">Dice</option>
            <option value="manual">Manual</option>
            {/* <option value="pointBuy">Point Buy</option> */}
          </select>{/*<button onClick={()=> this.handleClick(this.refs.abilityScoreGenerationMethod.value)}>Select</button>*/}</p>
          <div className="abilityScoreGenerator">
            <AbilityScoreMethod method={this.props.abilityScoreGenerationMethod} statArrayToAssign={this.props.statArrayToAssign} dispatch={this.props.dispatch}/>
          </div>
          <div className="abilityScoreTable">
            <p>Ability Score table below shows all the calculations based on your input thus far</p>
            <table className="statTable" id="strTable">
              <caption className="abilityHeader">
                Strength
              </caption>
              <tbody>
                <tr>
                  <td className="statTableDataLabel">Modifier</td>
                  <td className="statTableData" id="strMod">{ strengthBase ? strengthMod : "--" }</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Total Score</td>
                  <td className="statTableData"  id="strTotal">{ strengthTotal }</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Base Score</td>
                  <td className="statTableData"  id="strBase">{ strengthBase ? strengthBase : "--" }</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Racial Bonus</td>
                  <td className="statTableData"  id="strRacial">{ strengthRacial ? "+" + strengthRacial : "+0" }</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Enhancement Bonus</td>
                  <td className="statTableData"  id="strEnhance">+0</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Inherent Bonus</td>
                  <td className="statTableData"  id="strInherent">+0</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Template Bonus</td>
                  <td className="statTableData"  id="strTemplate">+0</td>
                </tr>
              </tbody>
            </table>
            <table className="statTable" id="dexTable">
              <caption className="abilityHeader">
                Dexterity
              </caption>
              <tbody>
                <tr>
                  <td className="statTableDataLabel">Modifier</td>
                  <td className="statTableData" id="dexMod">{ dexterityBase ? dexterityMod : "--" }</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Total Score</td>
                  <td className="statTableData"  id="dexTotal">{ dexterityTotal }</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Base Score</td>
                  <td className="statTableData"  id="dexBase">{ dexterityBase ? dexterityBase : "--" }</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Racial Bonus</td>
                  <td className="statTableData"  id="dexRacial">{ dexterityRacial ? "+" + dexterityRacial : "+0" }</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Enhancement Bonus</td>
                  <td className="statTableData"  id="dexEnhance">+0</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Inherent Bonus</td>
                  <td className="statTableData"  id="dexInherent">+0</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Template Bonus</td>
                  <td className="statTableData"  id="dexTemplate">+0</td>
                </tr>
              </tbody>
            </table>
            <table className="statTable" id="conTable">
              <caption className="abilityHeader">
                Constitution
              </caption>
              <tbody>
                <tr>
                  <td className="statTableDataLabel">Modifier</td>
                  <td className="statTableData" id="conMod">{ constitutionBase ? constitutionMod : "--" }</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Total Score</td>
                  <td className="statTableData"  id="conTotal">{ constitutionTotal }</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Base Score</td>
                  <td className="statTableData"  id="conBase">{ constitutionBase ? constitutionBase : "--" }</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Racial Bonus</td>
                  <td className="statTableData"  id="conRacial">{ constitutionRacial ? "+" + constitutionRacial : "+0" }</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Enhancement Bonus</td>
                  <td className="statTableData"  id="conEnhance">+0</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Inherent Bonus</td>
                  <td className="statTableData"  id="conInherent">+0</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Template Bonus</td>
                  <td className="statTableData"  id="conTemplate">+0</td>
                </tr>
              </tbody>
            </table>
            <table className="statTable" id="intTable">
              <caption className="abilityHeader">
                Intelligence
              </caption>
              <tbody>
                <tr>
                  <td className="statTableDataLabel">Modifier</td>
                  <td className="statTableData" id="intMod">{ intelligenceBase ? intelligenceMod : "--" }</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Total Score</td>
                  <td className="statTableData"  id="intTotal">{ intelligenceTotal }</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Base Score</td>
                  <td className="statTableData"  id="intBase">{ intelligenceBase ? intelligenceBase : "--" }</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Racial Bonus</td>
                  <td className="statTableData"  id="intRacial">{ intelligenceRacial ? "+" + intelligenceRacial : "+0" }</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Enhancement Bonus</td>
                  <td className="statTableData"  id="intEnhance">+0</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Inherent Bonus</td>
                  <td className="statTableData"  id="intInherent">+0</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Template Bonus</td>
                  <td className="statTableData"  id="intTemplate">+0</td>
                </tr>
              </tbody>
            </table>
            <table className="statTable" id="wisTable">
              <caption className="abilityHeader">
                Wisdom
              </caption>
              <tbody>
                <tr>
                  <td className="statTableDataLabel">Modifier</td>
                  <td className="statTableData" id="wisMod">{ wisdomBase ? wisdomMod : "--" }</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Total Score</td>
                  <td className="statTableData"  id="wisTotal">{ wisdomTotal }</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Base Score</td>
                  <td className="statTableData"  id="wisBase">{ wisdomBase ? wisdomBase : "--"}</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Racial Bonus</td>
                  <td className="statTableData"  id="wisRacial">{ wisdomRacial ? "+" + wisdomRacial : "+0" }</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Enhancement Bonus</td>
                  <td className="statTableData"  id="wisEnhance">+0</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Inherent Bonus</td>
                  <td className="statTableData"  id="wisInherent">+0</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Template Bonus</td>
                  <td className="statTableData"  id="wisTemplate">+0</td>
                </tr>
              </tbody>
            </table>
            <table className="statTable" id="chaTable">
              <caption className="abilityHeader">
                Charisma
              </caption>
              <tbody>
                <tr>
                  <td className="statTableDataLabel">Modifier</td>
                  <td className="statTableData" id="chaMod">{ charismaBase ? charismaMod : "--" }</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Total Score</td>
                  <td className="statTableData"  id="chaTotal">{ charismaTotal }</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Base Score</td>
                  <td className="statTableData"  id="chaBase">{ charismaBase ? charismaBase : "--" }</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Racial Bonus</td>
                  <td className="statTableData"  id="chaRacial">{ charismaRacial ? "+" + charismaRacial : "+0" }</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Enhancement Bonus</td>
                  <td className="statTableData"  id="chaEnhance">+0</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Inherent Bonus</td>
                  <td className="statTableData"  id="chaInherent">+0</td>
                </tr>
                <tr>
                  <td className="statTableDataLabel">Template Bonus</td>
                  <td className="statTableData"  id="chaTemplate">+0</td>
                </tr>
              </tbody>
            </table>
          </div>	
        </div>
		  );
		} else {
			return(
        <div className="newCharacterAbilityScores">
          <h3>Ability Scores</h3>
          <button onClick={() => this.dispatchResetCompletedStep()}>Edit</button>
          <CharacterReview />
        </div>			
			);
		}		
	}
}

function AbilityScoreMethod(props){
	switch(props.method){
		case "arrays": 
			return (<AbilityScoreArrays />);
		case "dice": 
			return (<AbilityScoreDice statArrayToAssign={props.statArrayToAssign} />);
		case "manual": 
			return (<AbilityScoreManual />);
		case "pointBuy": 
			return (<AbilityScorePointBuy />);
		default:
			return null;			
	}
}

function AbilityScoreArrays(){
	return (
		<div>arrays</div>
	)
}

function AbilityScorePointBuy(){
	return (
		<div>Point Buy</div>
	)
}

const mapStateToProps = state => ({
	complete:state.characterReducer.creationSteps[3].complete,
	help:state.characterReducer.help,
	abilityScoreGenerationMethod:state.characterReducer.abilityScoreGenerationMethod,
	statArrayToAssign:state.characterReducer.statArrayToAssign,
	charStats:state.characterReducer.newCharacter.characterStats,
  abilityScoreOptions: state.characterReducer.abilityScoreOptions,
  tempAbilityScores: state.characterReducer.abilityScoreTemp,
});

export default connect(mapStateToProps)(NewCharacterAbilityScores);