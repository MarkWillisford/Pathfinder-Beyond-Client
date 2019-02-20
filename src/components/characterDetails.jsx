import React from 'react';
import {connect} from 'react-redux';

import './characterDetails.css';

export class CharacterDetails extends React.Component{

    render() {
		const character = this.props.character;
        const characterPic = character.pic;
        const characterName = character.name;
        const characterLevel = character.level;
        const characterClass = character.class;
        const characterStats = character.stats;
        const characterAbilityScores = character.stats.abilityScores;
        const characterBio = character.bio;
        const characterBackground = character.background;
        return (
            <div className="characterDetails">
            	<h1>{characterName}</h1>
            	<div>
	            	<p><img src={characterPic.src} alt={characterPic.alt}></img></p>
	                <p>Level {characterLevel} {characterClass}</p>
	                <button>Level</button>
	                <button>Award Experience</button>
		            <dl>
		                <dt>Str:</dt>
		                <dd>{characterAbilityScores.strength}</dd>
		                <dt>Dex:</dt>
		                <dd>{characterAbilityScores.dexterity}</dd>
		                <dt>Con:</dt>
		                <dd>{characterAbilityScores.constitution}</dd>
		                <dt>Int:</dt>
		                <dd>{characterAbilityScores.intelligence}</dd>
		                <dt>Wis:</dt>
		                <dd>{characterAbilityScores.wisdom}</dd>
		                <dt>Cha:</dt>
		                <dd>{characterAbilityScores.charisma}</dd>
		                <dt>HP:</dt>
		                <dd>{characterStats.maxHitPoints}</dd>
		                <dt>AC:</dt>
		                <dd>{characterStats.armorClass}</dd>
		                <button>Character Sheet</button>
		                <button>Gear</button>
		                <button>Retrain</button>
		            </dl>
		            <div>
		            	<p>{characterBio}</p>
		            	<p>{characterBackground}</p>
		            	<button>Edit</button>
		            </div>
		        </div>
		        <div>
            		<p>[<em>placeholder for Journal Card</em>]</p>		        	
					<button>Play</button>
		        </div>
		        <div>
            		<p>[<em>placeholder for Journal Card</em>]</p>	
            		<p>[<em>placeholder for Journal Card</em>]</p>	
            		<p>[<em>placeholder for Journal Card</em>]</p>		        	
					<button>More</button>      	
					<button>New</button>      	
					<button>Prepare Summery</button>
		        </div>
		        <div>
            		<p>[<em>placeholder for Past Campaigns</em>]</p>
		        </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    character: state.characterReducer.char,
});

export default connect(mapStateToProps)(CharacterDetails);