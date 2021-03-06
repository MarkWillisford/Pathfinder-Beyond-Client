import React from 'react';
import { connect } from 'react-redux';
import RaceCard from './raceCard';

import { submitRaceToState } from '../actions/index';
import { submitSkillsToState } from '../actions/index';
import { addBonus } from '../actions/index';
import { sumBonus } from '../actions/index';
import { setSelections } from '../actions/index';
import { setExpandedRace } from '../actions/index';
import { resetCompletedStep } from '../actions/index';
import { removeSkillsFromState } from '../actions/index';
import { removeBonus } from '../actions/index';
import { capitalizeFirstLetter} from '../utility/helperFunctions';
import { fetchProtectedData, clearData } from '../actions/protectedData';
import { createBonus } from '../utility/statObjectFactories'
import { fetchProtectedSubData } from '../actions/protectedData';
import CharacterReview from './characterReview2';

export class NewCharacterRace extends React.Component{   
  componentDidUpdate() {
    let element = document.getElementsByClassName("expanded")[0];
    if(!element){
      element = document.getElementsByClassName("title")[0];
    } else {
      element = element.previousSibling;
    }
    
    element.scrollIntoView({behavior: 'smooth'});
  }

  componentDidMount(){
    this.props.dispatch(clearData());
    this.props.dispatch(fetchProtectedData("races"));
    this.props.dispatch(fetchProtectedSubData("aasimarHeritages"));
  }

	showExpandedRace(id){
    let toExpand = "";
    if(this.props.toExpand){
      if(this.props.toExpand.race){
        toExpand = this.props.toExpand.race;
      }
    }	

		const racesArray = this.props.racesArray;
    let name = "";
		for(let i=0; i<racesArray.length;i++){
			if( racesArray[i].id === id && racesArray[i].name === toExpand){
        name = "";
			} else if (racesArray[i].id === id){
        name = racesArray[i].name;
      }
		}
    this.props.dispatch(setExpandedRace(name));    
	}

	addRace(id){
    const racesArray = this.props.racesArray;
    for(let i=0; i<racesArray.length;i++){
			// if this is the clicked element toggle it 
			if(  racesArray[i].id===id ){
				// if the class doesn't have selections . . .    
				if(!racesArray[i].standardRacialTraits.selections){
					this.props.dispatch(submitRaceToState(racesArray[i]));
					let abilityArray = racesArray[i].standardRacialTraits.base.abilityScoreRacialBonusArray;
					if(abilityArray){		// find out if there are given ability score bonuses
						for(let j=0; j<abilityArray.length; j++){
							let bonus = createBonus({ 
								name:"race", 
								source:"race", 
								stat:abilityArray[j].stat, 
								type:"racial", 
								duration:-1, 
								amount:abilityArray[j].value });
							this.props.dispatch(addBonus(bonus));
							this.props.dispatch(sumBonus(bonus));
						}					
          } else {		// nothing set means the user has to pick one. 
            
					}
					let skillArray = racesArray[i].standardRacialTraits.base.skillRacialBonusArray;
					if(skillArray){			// find out if there are any racial skill bonuses
						for(let j=0; j<skillArray.length; j++){
							this.props.dispatch(submitSkillsToState( skillArray[j].stat, "racial", skillArray[j].value ));
							let bonus = createBonus({ 
								name:"race", 
								source:"race", 
								stat:skillArray[j].stat, 
								type:"racial", 
								duration:-1, 
								amount:skillArray[j].value });
							this.props.dispatch(addBonus(bonus));
							this.props.dispatch(sumBonus(bonus));
						}
					}
				} else {
          // this means that the race does have selections
					this.props.dispatch(setSelections(racesArray[i]));
				}
			}
		}		
	}

  dispatchResetCompletedStep(){
    const stats = this.props.stats;
    const skills = this.props.skills;
    let arrayOfBonusesToRemove = [];
    
    // look through the stats array for all bonus objects with source === action.bonus.source
    for(let i=0; i<stats.length;i++){
      for(let j=0;j<stats[i].bonuses.length;j++){
        if(stats[i].bonuses[j].source === "race"){
          arrayOfBonusesToRemove.push(stats[i].bonuses[j]);
        }
      }
    }

    for(let i=0;i<arrayOfBonusesToRemove.length;i++){
      this.props.dispatch(removeBonus(arrayOfBonusesToRemove[i]));
      this.props.dispatch(sumBonus(arrayOfBonusesToRemove[i]));
    }

    // reset and check skills
    arrayOfBonusesToRemove = [];
    for(let key in skills){
      let skill = skills[key];
      if(skill.hasOwnProperty("racial")){
        this.props.dispatch(removeSkillsFromState(key, "racial", skill.racial));
      }
    }

    this.props.dispatch(resetCompletedStep(1));
  }

	render(){
		const complete = this.props.complete;
    const help = this.props.help;
    const loading = this.props.loading;
		let toExpand = "";
		if(this.props.toExpand){
			if(this.props.toExpand.race){
				toExpand = this.props.toExpand.race;
			}
		}	

		// if help is true, that screen is displayed
		if(help){
			return (
				<div className="racialHelp">
					<h2>Choose a Race</h2>
					<p>In fantasy roleplaying games, race is fundamental. It both provides a starting point for character creation and sets the tone for a character as it progresses. Race mixes biology and culture, then translates those concepts into racial traits. Yet since both biology and culture are mutable—especially when one considers the powerful forces of magic—racial traits can be so diverse that two elves can be extremely different while still manifesting aspects of their shared heritage and culture. A race’s traits, its history, its relations with other races, and the culture that all of these things imply—all of these frame your character. This is true whether you play to or against the stereotypes. A savage and bloodthirsty half-orc who lives only for battle is fun to play, but so is a stern and conflicted half-orc paladin constantly struggling to keep her bloodlust in check. Both fit comfortably within the theme of half-orc, but come off as very different characters around the game table.</p>
					<p>Race is an important part of what makes characters who they are, yet it’s often all too easy to gloss over the details. After all, most people know the basics: dwarves are short, elves live a long time, and gnomes are dangerously curious. Half-orcs are ugly. Humans are—well, human. To some players, choosing a race is simply a matter of finding which racial modifiers best fit a character’s class. Yet there’s so much more to race than that. From their deep halls beneath craggy mountains, dwarves sing mournful ballads that teach children of the heroes of old, helping them dream of the day when they might give their own lives in the stronghold’s defense. In the spires of their forest cities, elves find a kinship with nature, as the great trees are some of the few non-elven friends who won’t grow old and wither before their eyes. By exploring the cultures and traditions of a character’s race, we can better understand where she comes from and what makes her tick, thus immersing ourselves that much deeper in the campaign world. Each race's description includes information to help you roleplay a character of That race, including personality, physical appearance, features of society, and racial alignment tendencies.</p>
					<p>These details are suggestions to help you think about your character; adventurers can deviate widely from the norm for their race. It's worthwhile to consider why your character is different, as a helpful way to think about your character's background and personality.</p>
					<h3>Racial Traits</h3>
					<p>The description of each race includes racial traits that are common to members of that race. The following entries appear among the traits of most races.</p>
					<p><strong>Ability Score Adjustments</strong></p>
					<p>Every race modifies one or more of a character's ability scores.</p>
					<p><strong>Age</strong></p>
					<p>The Age statistic is the age at which a character of that race is considered an adult</p>
					<p><strong>Alignment</strong></p>
					<p>Most creatures of a given race tend towards a certain alignement. While this isn't required for any player character, it does give a starting point for your character. Why is your elf neutral vs the normal good alignment for example.</p>
					<p><strong>Size</strong></p>
					<p>Size categories indicate certain bonuses that characters of that race have. For example, small creatures are harder to notice that a large creature and thus have a bonus to stealth.</p>
					<p><strong>Speed</strong></p>
					<p>Your speed deterimnes how far you can move in a given amount of time. For example in combat most normal sized characters can move 30 feet in a round.</p>
					<p><strong>Languages</strong></p>
					<p>The languages section gives you the languages that your race can learn to read, write and speak.</p>
				</div>
			);
    } 
    else if(loading){
      return (
        <div>Loading . . .    </div>
      )
    } else {
      if(!complete){
      const racesArray = this.props.racesArray;
			// Not complete, get choices and display
			return (
		        <div className="newCharacterRace">
		        	<h1>Race</h1>	
		        	{racesArray && racesArray.map(({id,thum,name,standardRacialTraits}) => 
						<RaceCard key={id} thum={thum} name={name} expand={ toExpand === name ? true : false } 
							traits={standardRacialTraits} callback={()=> this.showExpandedRace(id)} 
							addRaceCallback={()=> this.addRace(id)}/>
		        	)}
		        </div>
		    );
      } else {
        return(
          <div className="newCharacterRace">
            <CharacterReview resetCallback={()=>this.dispatchResetCompletedStep()} page={"Race:" + this.props.race ? capitalizeFirstLetter(this.props.race) : ""}/>
          </div>			
        );
      };
    }	
	}
}

const mapStateToProps = state => ({
	complete:state.characterReducer.creationSteps[1].complete,
	help:state.characterReducer.help,
  toExpand:state.characterReducer.expanded, 
  racesArray:state.protectedData.data,
  loading:state.protectedData.loading,
  race:state.characterReducer.newCharacter.race ? state.characterReducer.newCharacter.race.name : null,
  stats:state.characterReducer.newCharacter.characterStats,
	skills:state.characterReducer.newCharacter.skills,
});

export default connect(mapStateToProps)(NewCharacterRace);