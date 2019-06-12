import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requiresLogin';
import { capitalizeFirstLetter } from '../utility/helperFunctions';
import {toggleCharacterReviewView} from '../actions/index';

import './characterReview2.css';

export class CharacterReview extends React.Component{
  findStatisticByName(name, characterToReview){
    for(let i=0;i<characterToReview.characterStats.length;i++){
      if(characterToReview.characterStats[i].name === name){
        return characterToReview.characterStats[i];
      }
    }
  }

  toggleView(string){
    // a basic toggle opperation
    // first check to see if the string matches the current value
    if(this.props.reviewExpanded === string){
      this.props.dispatch(toggleCharacterReviewView(""));
    } else {
      // or set the string value
      this.props.dispatch(toggleCharacterReviewView(string));
    }
  }

  viewDetails(stat){
    console.log(stat);
  }

	render(){
    const skillList = require('../data/skills');
    const characterToReview = this.props.characterToReview;
    const reviewExpanded = this.props.reviewExpanded;
    
    let sizeMod = characterToReview.race ? 
      (characterToReview.race.standardRacialTraits.base.size === "small" ? 1 : 0) :
      0;
    
    let playerInformationClassName = "playerInformation";
    let characterDetailsClassName = "characterDetails";
    let characterAbilityScoresClassName = "characterAbilityScores";
    let characterVitalsClassName = "characterVitals";
    let characterCombatStatsClassName = "characterCombatStats";
    let characterInitiativeClassName = "characterInitiative";
    let characterSkillsClassName = "characterSkills";
    let characterFeatsAbilitiesNotesClassName = "characterFeatsAbilitiesNotes";

    // set expanded section
    switch(reviewExpanded){
      case "playerInformation":
        playerInformationClassName += " expand";
        console.log("in switch");
      break;
      case "characterDetails":
        characterDetailsClassName += " expand";
      break;
      case "characterAbilityScores":
        characterAbilityScoresClassName += " expand";
      break;
      case "characterVitals":
        characterVitalsClassName+= " expand";
      break;
      case "characterCombatStats":
        characterCombatStatsClassName += " expand";  
      break;
      case "characterInitiative":
        characterInitiativeClassName += " expand";  
      break;
      case "characterSkills":
        characterSkillsClassName += " expand";  
      break;
      case "characterFeatsAbilitiesNotes":
        characterFeatsAbilitiesNotesClassName += " expand";
      break;
    }

    return(
      <div className="characterReviewFlexContainer">
        <h1>{characterToReview.preferences.characterName}</h1>
        <div className="playerInformationLabel" onClick={() => this.toggleView("playerInformation")}>Player / Character Information</div>
        <div className={playerInformationClassName}>
          <div className="characterReviewLabelsCol">
            <div className="characterReviewLabel">Player: </div>
            <div className="characterReviewLabel">Advancement: </div>
            <div className="characterReviewLabel">HP progression: </div>
          </div>
          <div className="characterReviewOutputsCol">
            <div className="characterReviewOutput">{this.props.user}</div>
            <div className="characterReviewOutput">{capitalizeFirstLetter(characterToReview.preferences.advancement)}</div>
            <div className="characterReviewOutput">{capitalizeFirstLetter(characterToReview.preferences.hpProcess)}</div>
          </div>
          {/* <div className="characterReviewDataSet"></div>
          <div className="characterReviewDataSet"></div>
          <div className="characterReviewDataSet"></div>
          <div className="characterReviewLabel">Alignment: </div><div className="characterReviewOutput"></div>
          <div className="characterReviewLabel">Class: </div><div className="characterReviewOutput"></div>
          <div className="characterReviewLabel">Level: </div><div className="characterReviewOutput"></div> */}
        </div>
        <div className="characterDetailsLabel" onClick={() => this.toggleView("characterDetails")}>Character Details</div>
        <div className={characterDetailsClassName}>
          <div className="characterReviewLabelsCol">
            <div className="characterReviewLabel">Title / Nickname: </div>
            <div className="characterReviewLabel">Race: </div>
            <div className="characterReviewLabel">Type / (sub-type): </div>
            <div className="characterReviewLabel">Gender: </div>
            <div className="characterReviewLabel">Size: </div>
            <div className="characterReviewLabel">Age: </div>
            <div className="characterReviewLabel">Height: </div>
            <div className="characterReviewLabel">Weight: </div>
            <div className="characterReviewLabel">Eyes: </div>
            <div className="characterReviewLabel">Hair: </div>
            <div className="characterReviewLabel">Skin: </div>
            <div className="characterReviewLabel">Deity: </div>
            <div className="characterReviewLabel">Homeland: </div>
            <div className="characterReviewLabel">Occupation: </div>
            <div className="characterReviewLabel">Vision / Senses: </div>
            <div className="characterReviewLabel">Languages: </div>
            <div className="characterReviewLabel">Description: </div>
          </div>
          <div className="characterReviewOutputsCol">
            <div className="characterReviewOutput"></div>
            <div className="characterReviewOutput"></div>
            <div className="characterReviewOutput"></div>
            <div className="characterReviewOutput"></div>
            <div className="characterReviewOutput"></div>
            <div className="characterReviewOutput"></div>
            <div className="characterReviewOutput"></div>
            <div className="characterReviewOutput"></div>
            <div className="characterReviewOutput"></div>
            <div className="characterReviewOutput"></div>
            <div className="characterReviewOutput"></div>
            <div className="characterReviewOutput"></div>
            <div className="characterReviewOutput"></div>
            <div className="characterReviewOutput"></div>
            <div className="characterReviewOutput"></div>
            <div className="characterReviewOutput"></div>
            <div className="characterReviewOutput"></div>
          </div>
        </div>
        <div className="characterAbilityScoresLabel" onClick={() => this.toggleView("characterAbilityScores")}>Ability Scores</div>
        <div className={characterAbilityScoresClassName}>
          {/* <div className="characterAbilityScoresLabels"></div> */}
          <AbilityScoreDisplay ability={this.findStatisticByName("strength", characterToReview) ? 
            (this.findStatisticByName("strength", characterToReview)) : 
            {"name":"strength", "sum":{"total":0}}} />
          <AbilityScoreDisplay ability={this.findStatisticByName("dexterity", characterToReview) ?
            (this.findStatisticByName("dexterity", characterToReview)) : 
            {"name":"dexterity", "sum":{"total":0}}} />
          <AbilityScoreDisplay ability={this.findStatisticByName("constitution", characterToReview) ?
            (this.findStatisticByName("constitution", characterToReview)) : 
            {"name":"constitution", "sum":{"total":0}}} />
          <AbilityScoreDisplay ability={this.findStatisticByName("intelligence", characterToReview) ?
            (this.findStatisticByName("intelligence", characterToReview)) : 
            {"name":"intelligence", "sum":{"total":0}}} />
          <AbilityScoreDisplay ability={this.findStatisticByName("wisdom", characterToReview) ? 
            (this.findStatisticByName("wisdom", characterToReview)) :
            {"name":"wisdom", "sum":{"total":0}}} />
          <AbilityScoreDisplay ability={this.findStatisticByName("charisma", characterToReview) ?
            (this.findStatisticByName("charisma", characterToReview)) : 
            {"name":"charisma", "sum":{"total":0}}} />
        </div>
        <div className="characterVitalsLabel" onClick={() => this.toggleView("characterVitals")}>Hit Points</div>
        <div className={characterVitalsClassName}>
          <div className="characterHPs">
            <div className="currentHPs"></div>
            <div className="temporaryHPs"></div>
            <div className="nonLethalDamage"></div>
            <div className="classHPs"></div>
            <div className="totalHP"></div>
          </div>
          <div className="characterClassRecorder">
            <div className="classHD"></div>
            <div className="className"></div>
            <div className="classBAB"></div>
            <div className="classBaseSkills"></div>
            <div className="classBaseFort"></div>
            <div className="classBaseRef"></div>
            <div className="classBaseWill"></div>
            <div className="classLevels"></div>
            <div className="favoredClass"></div>
          </div>
        </div>
        <div className="characterCombatStatsLabel" onClick={() => this.toggleView("characterCombatStats")}>Combat</div>
        <div className={characterCombatStatsClassName}>
          <div className="characterArmorClassAndDefense">
            <div className="armorClass">
              <div className="armorClassLabel">
                <div className="armorClassAbbreviation">AC</div>
                <div className="armorClassComplete">Armor Class</div>   
              </div>
              <div className="armorClassTotal">{this.findStatisticByName("armorClass", characterToReview) ? 
                                                (this.findStatisticByName("armorClass", characterToReview).sum.total + 
                                                Math.floor((this.findStatisticByName("dexterity", characterToReview).sum.total - 10) / 2) +
                                                sizeMod) : 0}</div>
              <button onClick={ () => this.viewDetails("armorClass") }>details</button>
            </div>
            <div className="flatFootedArmorClass">
              <div className="flatFootedArmorClassLabel">
                <div className="flatFootedArmorClassAbbreviation">Flat</div>
                <div className="flatFootedArmorClassComplete">Flatfooted Armor Class</div>
              </div>
              <div className="flatFootedArmorClassTotal">{this.findStatisticByName("armorClass", characterToReview) ? 
                                                (this.findStatisticByName("armorClass", characterToReview).sum.total +
                                                sizeMod) : 0}</div>
              <button onClick={ () => this.viewDetails("flatFootedArmorClass") }>details</button>
            </div>
            <div className="touchArmorClass">
              <div className="touchArmorClassLabel">
                <div className="touchArmorClassAbbreviation">Touch</div>
                <div className="touchArmorClassComplete">Touch Armor Class</div>   
              </div>
              <div className="touchArmorClassTotal">{this.findStatisticByName("touchArmorClass", characterToReview) ? 
                                                (this.findStatisticByName("touchArmorClass", characterToReview).sum.total + 
                                                Math.floor((this.findStatisticByName("dexterity", characterToReview).sum.total - 10) / 2) +
                                                sizeMod) : 0}</div>
              <button onClick={ () => this.viewDetails("touchArmorClass") }>details</button>
            </div>
            <div className="combatManeuverDefense">
              <div className="combatManeuverDefenseLabel">
                <div className="combatManeuverDefenseAbbreviation">AC</div>
                <div className="combatManeuverDefenseComplete">Armor Class</div>   
              </div>
              <div className="combatManeuverDefenseTotal">{this.findStatisticByName("combatManeuverDefense", characterToReview) ?
                                                (this.findStatisticByName("combatManeuverDefense", characterToReview).sum.total + 
                                                Math.floor((this.findStatisticByName("dexterity", characterToReview).sum.total - 10) / 2) + 
                                                Math.floor((this.findStatisticByName("strength", characterToReview).sum.total - 10) / 2) +
                                                this.findStatisticByName("bab", characterToReview).sum.total - sizeMod) : 0 }</div>
              <button onClick={ () => this.viewDetails("combatManeuverDefense") }>details</button>
            </div>            
          </div>
          <div className="characterSavingThrows">
            <div className="fortitudeSave">
              <div className="fortitudeSaveLabel">
                <div className="fortitudeSaveAbbreviation">Fort</div>
                <div className="fortitudeSaveComplete">Fortitude Save</div>   
              </div>
              <div className="fortitudeSaveTotal">{this.findStatisticByName("fort", characterToReview) ?
                                                (this.findStatisticByName("fort", characterToReview).sum.total + 
                                                Math.floor((this.findStatisticByName("constitution", characterToReview).sum.total - 10) / 2)) : 0}</div>
              <button onClick={ () => this.viewDetails("fort") }>details</button>
            </div>
            <div className="reflexSave">
              <div className="reflexSaveLabel">
                <div className="reflexSaveAbbreviation">Ref</div>
                <div className="reflexSaveComplete">Reflex Save</div>   
              </div>
              <div className="reflexSaveTotal">{this.findStatisticByName("ref", characterToReview) ?
                                                (this.findStatisticByName("ref", characterToReview).sum.total + 
                                                Math.floor((this.findStatisticByName("dexterity", characterToReview).sum.total - 10) / 2)) : 0}</div>
              <button onClick={ () => this.viewDetails("ref") }>details</button>
            </div>
            <div className="willSave">
              <div className="willSaveLabel">
                <div className="willSaveAbbreviation">Will</div>
                <div className="willSaveComplete">Will Save</div>   
              </div>
              <div className="willSaveTotal">{this.findStatisticByName("will", characterToReview) ? 
                                              (this.findStatisticByName("will", characterToReview).sum.total + 
                                              Math.floor((this.findStatisticByName("wisdom", characterToReview).sum.total - 10) / 2)) : 0}</div>
              <button onClick={ () => this.viewDetails("will") }>details</button>
            </div>            
          </div>          
          <div className="characterAttackModifiers">
            <div className="melee">
              <div className="meleeLabel">
                <div className="meleeAbbreviation">Melee</div>
                <div className="meleeComplete">Melee Attack Bonus</div>   
              </div>
              <div className="meleeTotal">{this.findStatisticByName("bab", characterToReview) ?
                                            (this.findStatisticByName("bab", characterToReview).sum.total + 
                                            Math.floor((this.findStatisticByName("strength", characterToReview).sum.total - 10) / 2) +
                                            sizeMod) : 0}</div>
              <button onClick={ () => this.viewDetails("melee") }>details</button>
            </div>
            <div className="ranged">
              <div className="rangedLabel">
                <div className="rangedAbbreviation">Ranged</div>
                <div className="rangedComplete">Ranged Attack Bonus</div>   
              </div>
              <div className="rangedTotal">{this.findStatisticByName("bab", characterToReview) ?
                                            (this.findStatisticByName("bab", characterToReview).sum.total + 
                                            Math.floor((this.findStatisticByName("dexterity", characterToReview).sum.total - 10) / 2) +
                                            sizeMod) : 0}</div>
              <button onClick={ () => this.viewDetails("ranged") }>details</button>
            </div>
            <div className="combatManeuverBonus">
              <div className="combatManeuverBonusLabel">
                <div className="combatManeuverBonusAbbreviation">CMB</div>
                <div className="combatManeuverBonusComplete">Combat Maneuver Bonus</div>   
              </div>
              <div className="combatManeuverBonusTotal">{this.findStatisticByName("bab", characterToReview) ?
                                                (this.findStatisticByName("bab", characterToReview).sum.total + 
                                                Math.floor((this.findStatisticByName("strength", characterToReview).sum.total - 10) / 2) -
                                                sizeMod) : 0}</div>
              <button onClick={ () => this.viewDetails("combatManeuverBonus") }>details</button>
            </div>          
          </div>
          <div className="characterWeaponsSpecialAttacks"></div>
        </div>
        <div className="characterInitiativeLabel" onClick={() => this.toggleView("characterInitiative")}>Initiative</div>
        <div className={characterInitiativeClassName}>
            <div className="initiative">
              <div className="initiativeLabel">
                <div className="initiativeAbbreviation">Init</div>
                <div className="initiativeComplete">Initiative Bonus</div>   
              </div>
              <div className="initiativeTotal">{
                (this.findStatisticByName("initiative", characterToReview) ? 
                this.findStatisticByName("initiative", characterToReview).sum.total : 0) + 
                (this.findStatisticByName("dexterity", characterToReview) ?
                (Math.floor((this.findStatisticByName("dexterity", characterToReview).sum.total - 10) / 2)) : 0)
              }</div>
              <button onClick={ () => this.viewDetails("initiative") }>details</button>
            </div> 
            {/* <div className="speed">
              Speed                       <----- non-essential change, TODO! modify racial input to make speed an object {description: string, value: num}
            </div> */}
        </div>
        <div className="characterSkillsLabel" onClick={() => this.toggleView("characterSkills")}>Skills</div>
        <div className={characterSkillsClassName}>
          {skillList.map(({name, ability, untrained})=>
            <SkillDisplay key={name} name={name} ability={ability} untrained={untrained} 
            lookupCall={this.findStatisticByName} characterToReview={characterToReview} />
            
          )}
        </div>
        <div className="characterFeatsAbilitiesNotesLabel" onClick={() => this.toggleView("characterFeatsAbilitiesNotes")}>Feats and Abilities</div>
        <div className={characterFeatsAbilitiesNotesClassName}></div>

        {/* <Link to="/dashboard" onClick={ () => this.save() }>Submit and Save</Link> */}
        <button onClick={ () => this.save() }>Submit and Save</button>
      </div>
    )
	}
}

const mapStateToProps = state => ({
  characterToReview:state.characterReducer.newCharacter,
  user:state.auth.currentUser.username,
  reviewExpanded:state.characterReducer.reviewExpanded,
  // saved:state.protectedData.saved
}); 

export default requiresLogin()(connect(mapStateToProps)(CharacterReview));

function AbilityScoreDisplay(props){
  const ability = props.ability;

  return(
    <div className={ability.name}>
      <div className={ability.name+"Overview"}>
        <div className={ability.name+"Label"}>
          <div className={ability.name+"Abbreviation"}>{ability.name.substring(0, 3).toUpperCase()}</div>
          <div className={ability.name+"Complete"}>{ability.name.toUpperCase()}</div>   
        </div>
        <div className={ability.name+"Total"}>{ability.sum.total}</div>
        <div className={ability.name+"Mod"}>{Math.floor((ability.sum.total - 10) / 2) }</div>
      </div>
      <div className={ability.name+"Details"}></div>
    </div>
  )
}
function AbilityScoreLabelDisplay(props){
  const ability = props.ability;

  return(
    <div className={ability.name}>
      <div className={ability.name+"Overview"}>
        <div className={ability.name+"Label"}>
          <div className={ability.name+"Abbreviation"}>{ability.name.substring(0, 3).toUpperCase()}</div>
          <div className={ability.name+"Complete"}>{ability.name.toUpperCase()}</div>   
        </div>
        <div className={ability.name+"Total"}>{ability.sum.total}</div>
        <div className={ability.name+"Mod"}>{Math.floor((ability.sum.total - 10) / 2) }</div>
      </div>
      <div className={ability.name+"Details"}></div>
    </div>
  )
}
function AbilityScoreOutputDisplay(props){
  const ability = props.ability;

  return(
    <div className={ability.name}>
      <div className={ability.name+"Overview"}>
        <div className={ability.name+"Label"}>
          <div className={ability.name+"Abbreviation"}>{ability.name.substring(0, 3).toUpperCase()}</div>
          <div className={ability.name+"Complete"}>{ability.name.toUpperCase()}</div>   
        </div>
        <div className={ability.name+"Total"}>{ability.sum.total}</div>
        <div className={ability.name+"Mod"}>{Math.floor((ability.sum.total - 10) / 2) }</div>
      </div>
      <div className={ability.name+"Details"}></div>
    </div>
  )
}

function SkillDisplay(skill){
  return(
    <div className={skill.name}>
      <div className={skill.name+"Overview"}>
        <div className={skill.name+"Label"}>{capitalizeFirstLetter(skill.name)}</div>
        <div className={skill.name+"Total"}>

        {/* skill.lookupCall(skill.name, skill.characterToReview) ? "found it": "not there" */}
        {(skill.lookupCall(skill.name, skill.characterToReview) ? 
          skill.lookupCall(skill.name, skill.characterToReview).sum.total : 0) + 
          skill.lookupCall(skill.ability, skill.characterToReview) ? 
          (Math.floor((skill.lookupCall(skill.ability, skill.characterToReview).sum.total - 10) / 2)) : 0}

        
        
        
        </div>
      </div>
      <button onClick={ () => this.viewDetails(skill.name) }>details</button>
    </div>
  )
}