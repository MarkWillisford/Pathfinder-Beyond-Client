import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import { submitSkillsToState } from '../actions/index';

import './newCharacterSkills.css';

export class NewCharacterSkills extends React.Component{
	sumObject(obj){
		let sum = 0;
		for( let el in obj ) {
		    if( obj.hasOwnProperty( el ) ) {
		    	sum += parseFloat( obj[el] );
			}
		}
		return sum;
	}
	getModifier(abilityScore){
		let mod = Math.floor((abilityScore-10)/2);
		return mod;
	}

	onChangeHandler(event){
		let value = event.target.value;
		let skill = event.target.parentElement.parentElement.getAttribute("name");

		this.props.dispatch(submitSkillsToState( skill, "ranks", value ));
	}

	render(){
		const complete = this.props.complete;
		const help = this.props.help;
		// For now this is hard coded in. 
		const hitDie = 1;
		const strength = this.getModifier(this.sumObject(_.get(this, "props.strength", "0")));
		const dexterity = this.getModifier(this.sumObject(_.get(this, "props.dexterity", "0")));
		const constitution = this.getModifier(this.sumObject(_.get(this, "props.constitution", "0")));
		const intelligence = this.getModifier(this.sumObject(_.get(this, "props.intelligence", "0")));
		const wisdom = this.getModifier(this.sumObject(_.get(this, "props.wisdom", "0")));
		const charisma = this.getModifier(this.sumObject(_.get(this, "props.charisma", "0")));
		const abilityMods = [{"name":"strength","value":strength},{"name":"dexterity","value":dexterity},{"name":"constitution","value":constitution},
						{"name":"intelligence","value":intelligence},{"name":"wisdom","value":wisdom},{"name":"charisma","value":charisma}];

		const listOfSkills = [
			{"name":"acrobatics","ability":"dexterity"},
			{"name":"appraise","ability":"intelligence"},
			{"name":"bluff","ability":"charisma"},
			{"name":"climb","ability":"strength"},
				{"name":"craft","ability":"intelligence"},
			{"name":"diplomacy","ability":"charisma"},
			{"name":"disableDevice","ability":"dexterity"},
			{"name":"disguise","ability":"charisma"},
			{"name":"escapeArtist","ability":"dexterity"},
			{"name":"fly","ability":"dexterity"},
			{"name":"handleAnimal","ability":"charisma"},
			{"name":"heal","ability":"wisdom"},
			{"name":"intimidate","ability":"charisma"},
			{"name":"knowledge (arcana)","ability":"intelligence"},
			{"name":"knowledge (dungeoneering)","ability":"intelligence"},
			{"name":"knowledge (engineering)","ability":"intelligence"},
			{"name":"knowledge (geography)","ability":"intelligence"},
			{"name":"knowledge (history)","ability":"intelligence"},
			{"name":"knowledge (local)","ability":"intelligence"},
			{"name":"knowledge (nature)","ability":"intelligence"},
			{"name":"knowledge (nobility)","ability":"intelligence"},
			{"name":"knowledge (planes)","ability":"intelligence"},
			{"name":"knowledge (religion)","ability":"intelligence"},
			{"name":"linguistics","ability":"intelligence"},
			{"name":"perception","ability":"wisdom"},
				{"name":"perform","ability":"charisma"},
				{"name":"profession","ability":"wisdom"},
			{"name":"ride","ability":"dexterity"},
			{"name":"senseMotive","ability":"wisdom"},
			{"name":"sleightOfHand","ability":"dexterity"},
			{"name":"spellcraft","ability":"intelligence"},
			{"name":"stealth","ability":"dexterity"},
			{"name":"survival","ability":"wisdom"},
			{"name":"swim","ability":"strength"},
			{"name":"useMagicDevice","ability":"charisma"},
		];
		const path1 = "props.skills"
		let array = this.props.skills;
		let ranksAssigned = Object.keys(array).reduce(function (previous, key) {
			if(array[key].ranks){
		    	return previous + Number(array[key].ranks);
			} else {
				return previous;
			}
		}, 0);
		const remainingSkillRanks = ((this.props.classSkillsPerLevel + intelligence) > 0 ? this.props.classSkillsPerLevel + intelligence : 1) - ranksAssigned;

		// first here we must check to ensure that race, class, and ability scores are complete. 
		// If not, we display an error message directing the user to complete those pages before 
		// continuing. 
		if( !(this.props.race && this.props.charClass && this.props.abilityScores) ){
			return ( <h1>NOT READY</h1> )
		} else if(help){
			// if help is true, that screen is displayed
			return (
				<div className="skillsHelp">
					<h2>Acquiring Skills</h2>
					<p>Skills represent some of the most basic and yet most fundamental abilities your character possesses. As your character advances in level, he can gain new skills and improve his existing skills dramatically. Each level, your character gains a number of skill ranks dependent upon your class plus your Intelligence modifier. Investing a rank in a skill represents a measure of training in that skill. You can never have more ranks in a skill than your total number of Hit Dice. </p>
					<p>Humans gain 1 additional skill rank per class level. Characters who take a level in a favored class have the option of gaining 1 additional skill rank or an additional hit point . If you select a level in a new class, all of its class skills are automatically added to your list of class skills, and you gain a +3 bonus on these skills if you have ranks in them.</p>
					<h3>Class Skills</h3>
					<p>In addition, each class has a number of favored skills, called class skills. It is easier for your character to become more proficient in these skills, as they represent part of his professional training and constant practice. You gain a +3 bonus on all class skills that you put ranks into. If you have more than one class and both grant you a class skill bonus, these bonuses do not stack.</p>
				</div>
			);
		} else if(!complete){
			return (
		        <div className="newCharacterSkills">
		        	<h1>Character Skills</h1>
		        	<p>Skills are based on your class and your intelligence modifier.</p>
		        	<p>Remaining skill ranks: {remainingSkillRanks}</p>
		        	<table>
		        		<thead>
			        		<tr>
			        			<th>Skill</th>
			        			<th>Total</th>
			        			<th>Ranks</th>
			        			<th>Ability</th>
			        			<th>Class</th>
			        			<th>Racial</th>
			        			<th>Trait</th>
			        		</tr>
			        	</thead>
			        	<tbody>
			        		{listOfSkills.map(item => 
								<tr key={item.name} name={item.name}>
									<td>{item.name}</td>
									<td>{
										Number(_.get(this, path1+"."+item.name+".ranks", "0")) + 
										Number(abilityMods.find( (abilityMod) => abilityMod.name === item.ability).value) +
										Number((_.get(this, "props.classSkills", "error").includes(item.name) && ( _.get(this, path1+"."+item.name+".ranks", "0") > 0 )) ? 3 : 0) +
										Number(_.get(this, path1+"."+item.name+".racial", "0"))
									}</td>
							        <td><input type="number" name={item.name+"Ranks"} min="0" max={hitDie} 
							        	placeholder={(Number(_.get(this, path1+"."+item.name+".ranks"))) ? Number(_.get(this, path1+"."+item.name+".ranks")) : "0" }
							        	onChange={this.onChangeHandler.bind(this)} 
							        	disabled={remainingSkillRanks<1 && (Number(_.get(this, path1+"."+item.name+".ranks"))!=1)}/></td>
									<td>{abilityMods.find( (abilityMod) => abilityMod.name === item.ability).value}</td>
							        <td>{(_.get(this, "props.classSkills", "error").includes(item.name) && ( _.get(this, path1+"."+item.name+".ranks", "0") > 0 )) ? 3 : 0}</td>
									<td>{_.get(this, path1+"."+item.name+".racial", "0")}</td>
							        <td>Trait</td>
								</tr>
							)}
			        	</tbody>
			        </table>
		        </div>
		    );
		} else {
			return(
		        <div className="newCharacterSkills">
		        	<h1>Character Skills - done</h1>	
		        </div>			
			);
		};		
	}
}

const mapStateToProps = state => ({
	complete:state.characterReducer.creationSteps[5].complete,
	help:state.characterReducer.help,
	race:state.characterReducer.creationSteps[1].complete,
	charClass:state.characterReducer.creationSteps[2].complete,
	abilityScores:state.characterReducer.creationSteps[3].complete,
	classSkillsPerLevel:state.characterReducer.newCharacter.charClass.classFeatures.skills,
	classSkills:state.characterReducer.newCharacter.charClass.classFeatures.classSkills,
	skills:state.characterReducer.newCharacter.skills,
	strength: state.characterReducer.newCharacter.strength,
	dexterity: state.characterReducer.newCharacter.dexterity,
	constitution: state.characterReducer.newCharacter.constitution,
	intelligence: state.characterReducer.newCharacter.intelligence,
	wisdom: state.characterReducer.newCharacter.wisdom,
	charisma: state.characterReducer.newCharacter.charisma,
	// draw in the sum of the abilityScores here 
});

export default connect(mapStateToProps)(NewCharacterSkills);