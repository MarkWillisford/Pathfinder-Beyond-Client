import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import './newCharacterSkills.css';

export class NewCharacterSkills extends React.Component{
	render(){
		const complete = this.props.complete;
		const help = this.props.help;

		const remainingSkillRanks = _.get(this, "props.classSkillsPerLevel", "default");

		
/*		const listOfSkills = [
			"acrobatics",
			"appraise",
			"bluff",
			"climb",
				"craft",
			"diplomacy",
			"disableDevice",
			"disguise",
			"escapeArtist",
			"fly",
			"handleAnimal",
			"heal",
			"intimidate",
			"knowledge (arcana)",
			"knowledge (dungeoneering)",
			"knowledge (engineering)",
			"knowledge (geography)",
			"knowledge (history)",
			"knowledge (local)",
			"knowledge (nature)",
			"knowledge (nobility)",
			"knowledge (planes)",
			"knowledge (religion)",
			"linguistics",
			"perception",
				"perform",
				"profession",
			"ride",
			"senseMotive",
			"sleightOfHand",
			"spellcraft",
			"stealth",
			"survival",
			"swim",
			"useMagicDevice",
		]*/
		// if help is true, that screen is displayed
		if(help){
			return ( <h1>HELP</h1> );
		} 
		if(!complete){
			// check if class and ability scores are done
			return (
		        <div className="newCharacterSkills">
		        	<h1>Character Skills - todo</h1>
		        	<p>Skills are based on your class and your intelligence modifier.</p>
		        	<p>Remaining skill ranks: {this.props.classSkills}</p>
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
			        			<th></th>
			        		</tr>
			        	</thead>
			        	<tbody>
			        		<tr>
			        			<td></td>
			        			<td></td>
			        			<td></td>

			        		</tr>
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
	classSkillsPerLevel:state.characterReducer.newCharacter.charClass.classFeatures.skills,
	skills:state.characterReducer.newCharacter.skills,
	// draw in the sum of the abilityScores here 
});

export default connect(mapStateToProps)(NewCharacterSkills);