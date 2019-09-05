import React from 'react';
import { withRouter } from 'react-router'
import {connect} from 'react-redux';
import requiresLogin from './requiresLogin';
import { capitalizeFirstLetter } from '../utility/helperFunctions';
import {toggleCharacterReviewView} from '../actions/index';
import { saveAndSubmit, editAndSubmit } from '../actions/protectedData';
import {fetchProtectedData} from '../actions/protectedData';

import './characterReview2.css';
import rightDisplayArrow from '../images/rightArrowTrans.png';
import downDisplayArrow from '../images/downArrowTrans.png';

export class CharacterReview extends React.Component{
  componentDidUpdate() {
    let element = document.getElementsByClassName("expand")[0];
    if(!element){
      element = document.getElementsByClassName("title")[0];
    } else {
      element = element.parentElement;
    }
    
    element.scrollIntoView({behavior: 'smooth'});
  }

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

  saveCharacter(){
    if(!this.props.editingExistingCharacter){
      this.props.dispatch(saveAndSubmit());
    } else {
      this.props.dispatch(editAndSubmit());
    }
    
    this.props.dispatch(fetchProtectedData("users/characters", "usersCharacters"));
    this.props.history.push("/dashboard");
  }

	render(){
    const skillList = require('../data/skills');
    const characterToReview = this.props.characterToReview;
    const reviewExpanded = this.props.reviewExpanded;
    const creationSteps = this.props.creationSteps;

    let allStepsComplete = true;
    for(let i=0; i<creationSteps.length; i++){
      if(creationSteps[i].complete === false){
        allStepsComplete = false;
        break;
      }
    }
    
    let sizeMod = characterToReview.race ? 
      (characterToReview.race.standardRacialTraits.base.size === "small" ? 1 : 0) :
      0;
    
    let playerInformationClassName = "playerInformation";
    let playerInformationRightArrowClassName = "rightArrowImg";
    let playerInformationDownArrowClassName = "downArrowImg";
    let characterDetailsClassName = "characterDetails";
    let characterDetailsRightArrowClassName = "rightArrowImg";
    let characterDetailsDownArrowClassName = "downArrowImg";
    let characterAbilityScoresClassName = "characterAbilityScores";
    let characterAbilityScoresRightArrowClassName = "rightArrowImg";
    let characterAbilityScoresDownArrowClassName = "downArrowImg";
    let characterVitalsClassName = "characterVitals";
    let characterVitalsRightArrowClassName = "rightArrowImg";
    let characterVitalsDownArrowClassName = "downArrowImg";
    let characterCombatStatsClassName = "characterCombatStats";
    let characterCombatStatsRightArrowClassName = "rightArrowImg";
    let characterCombatStatsDownArrowClassName = "downArrowImg";
    let characterInitiativeClassName = "characterInitiative";
    let characterInitiativeRightArrowClassName = "rightArrowImg";
    let characterInitiativeDownArrowClassName = "downArrowImg";
    let characterSkillsClassName = "characterSkills";
    let characterSkillsRightArrowClassName = "rightArrowImg";
    let characterSkillsDownArrowClassName = "downArrowImg";
    let characterFeatsAbilitiesNotesClassName = "characterFeatsAbilitiesNotes";
    let characterFeatsAbilitiesNotesRightArrowClassName = "rightArrowImg";
    let characterFeatsAbilitiesNotesDownArrowClassName = "downArrowImg";

    // set expanded section
    switch(reviewExpanded){
      case "playerInformation":
        playerInformationClassName += " expand";
        playerInformationRightArrowClassName += " hide";
        playerInformationDownArrowClassName += " expand";
      break;
      case "characterDetails":
        characterDetailsClassName += " expand";
        characterDetailsRightArrowClassName += " hide";
        characterDetailsDownArrowClassName += " expand";
      break;
      case "characterAbilityScores":
        characterAbilityScoresClassName += " expand";
        characterAbilityScoresRightArrowClassName += " hide";
        characterAbilityScoresDownArrowClassName += " expand";
      break;
      case "characterVitals":
        characterVitalsClassName+= " expand";
        characterVitalsRightArrowClassName += " hide";
        characterVitalsDownArrowClassName += " expand";
      break;
      case "characterCombatStats":
        characterCombatStatsClassName += " expand";  
        characterCombatStatsRightArrowClassName += " hide";
        characterCombatStatsDownArrowClassName += " expand";
      break;
      case "characterInitiative":
        characterInitiativeClassName += " expand";  
        characterInitiativeRightArrowClassName += " hide";
        characterInitiativeDownArrowClassName += " expand";
      break;
      case "characterSkills":
        characterSkillsClassName += " expand";  
        characterSkillsRightArrowClassName += " hide";
        characterSkillsDownArrowClassName += " expand";
      break;
      case "characterFeatsAbilitiesNotes":
        characterFeatsAbilitiesNotesClassName += " expand";
        characterFeatsAbilitiesNotesRightArrowClassName += " hide";
        characterFeatsAbilitiesNotesDownArrowClassName += " expand";
      break;
    }
 
    // I need to know what weapons the character has.
    const gear = this.props.characterToReview.gear ? this.props.characterToReview.gear : [];
    let meleeWeapons = [];
    let rangedWeapons = [];
    for(let i=0;i<gear.length;i++){
      // if the gear item has a dmgS value then it is a weapon and we need to know about it
      if(gear[i].use){
        if(gear[i].use.includes("Melee") || gear[i].use.includes("melee")){
          meleeWeapons.push(gear[i]);
        } else if(gear[i].use.includes("Ranged") || gear[i].use.includes("ranged")){
          rangedWeapons.push(gear[i]);
        }
      }
    }

    if(meleeWeapons.length === 0){
      meleeWeapons.push({
        "name" : "Strike, Unarmed",
        "expand" : false,
        "description" : "An unarmed strike is always considered a light weapon. Therefore, you can use the Weapon Finesse feat to apply your Dexterity modifier instead of your Strength modifier to attack rolls with an unarmed strike. Unarmed strikes do not count as natural weapons (see Combat). The damage from an unarmed strike is considered weapon damage for the purposes of effects that give you a bonus on weapon damage rolls. A monk or any character with the Improved Unarmed Strike feat can deal lethal or nonlethal damage with unarmed strikes, at his discretion.",
        "category" : "simple",
        "use" : "Light Melee",
        "cost" : 0,
        "dmgS" : [ 
            "1d2"
        ],
        "dmgM" : [ 
            "1d3"
        ],
        "critical" : "x2",
        "range" : "0",
        "weight" : 0,
        "type" : [ 
            "B"
        ],
        "special" : [],
        "material" : "none",
        "masterwork" : false
      })
    }

    return(
      <div className="characterReviewFlexContainer">
        <h1>{characterToReview.preferences ? (characterToReview.preferences.characterName) : "Unnamed Character"}</h1>        
        <h3>{this.props.page}</h3><button onClick={this.props.resetCallback}>Edit</button>
        { allStepsComplete && <button onClick={() => this.saveCharacter()}>Save</button> }

        <div className="playerInformationLabel" onClick={() => this.toggleView("playerInformation")}>
          <img className={playerInformationRightArrowClassName} src={rightDisplayArrow} alt="show" />
          <img className={playerInformationDownArrowClassName} src={downDisplayArrow} alt="hide" />          
          Player / Character Information</div> 
        <div className={playerInformationClassName}>
          <div className="characterReviewLabelsCol">
            <div className="characterReviewLabel">Player: </div>
            <div className="characterReviewLabel">Advancement: </div>
            <div className="characterReviewLabel">HP progression: </div>
            <div className="characterReviewLabel">Alignment: </div>
            <div className="characterReviewLabel">Class: </div>
          </div>
          <div className="characterReviewOutputsCol">
            <div className="characterReviewOutputCentered">{this.props.user}</div>
            <div className="characterReviewOutputCentered">{characterToReview.preferences 
              ? (capitalizeFirstLetter(characterToReview.preferences.advancement)): "--"}</div>
            <div className="characterReviewOutputCentered">{characterToReview.preferences 
              ? (capitalizeFirstLetter(characterToReview.preferences.hpProcess)): "--"}</div>
            <div className="characterReviewOutputCentered">{ characterToReview.details
              ? ( characterToReview.details.alignments ) : "--"}</div>
            <div className="characterReviewOutputCentered">{characterToReview.charClass.name 
              ? (capitalizeFirstLetter(characterToReview.charClass.name)): "--"}</div>
          </div>
        </div>
        <div className="characterDetailsLabel" onClick={() => this.toggleView("characterDetails")}>
          <img className={characterDetailsRightArrowClassName} src={rightDisplayArrow} alt="show" />
          <img className={characterDetailsDownArrowClassName} src={downDisplayArrow} alt="hide" />    
          Character Details</div> 
        <div className={characterDetailsClassName}>
          <div className="characterReviewLabelsCol">
            {/* <div className="characterReviewLabel">Title / Nickname: </div> */}
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
            {/* <div className="characterReviewLabel">Homeland: </div>
            <div className="characterReviewLabel">Occupation: </div> */}
            {/* <div className="characterReviewLabel">Vision / Senses: </div> */}
            <div className="characterReviewLabel">Languages: </div>
            {/* <div className="characterReviewLabel">Description: </div> */}
          </div>
          <div className="characterReviewOutputsCol">
            {/* <div className="characterReviewOutputCentered"> -- </div> */}
            <div className="characterReviewOutputCentered">{characterToReview.race ?
              characterToReview.race.name: "--" }</div>
            <div className="characterReviewOutputCentered">{characterToReview.race ?
              characterToReview.race.standardRacialTraits.base.type: "--" }</div>
            <div className="characterReviewOutputCentered">{characterToReview.details 
              ? ( characterToReview.details.gender ? characterToReview.details.gender : "--") 
              : "--"}</div>
            <div className="characterReviewOutputCentered">{characterToReview.race ?
              characterToReview.race.standardRacialTraits.base.size: "--" }</div>
            <div className="characterReviewOutputCentered">{characterToReview.details 
              ? ( characterToReview.details.age ? characterToReview.details.age : "--") 
              : "--"}</div>
            <div className="characterReviewOutputCentered">{characterToReview.details 
              ? ( characterToReview.details.height ? characterToReview.details.height : "--") 
              : "--"}</div>
            <div className="characterReviewOutputCentered">{characterToReview.details 
              ? ( characterToReview.details.weight ? characterToReview.details.weight : "--") 
              : "--"}</div>
            <div className="characterReviewOutputCentered">{characterToReview.details 
              ? ( characterToReview.details.eyes ? characterToReview.details.eyes : "--") 
              : "--"}</div>
            <div className="characterReviewOutputCentered">{characterToReview.details 
              ? ( characterToReview.details.hair ? characterToReview.details.hair : "--") 
              : "--"}</div>
            <div className="characterReviewOutputCentered">{characterToReview.details 
              ? ( characterToReview.details.skin ? characterToReview.details.skin : "--") 
              : "--"}</div>
            <div className="characterReviewOutputCentered">{characterToReview.details 
              ? ( characterToReview.details.deity ? characterToReview.details.deity.name : "--") 
              : "--"}</div>
            {/* <div className="characterReviewOutputCentered"> -- </div>
            <div className="characterReviewOutputCentered"> -- </div> */}
            {/* <div className="characterReviewOutputCentered"> -- </div> */}
            <div className="characterReviewOutputCentered">{characterToReview.race ?
              characterToReview.race.standardRacialTraits.base.Languages.start.toString(): "--" }</div>
            {/* <div className="characterReviewOutputCentered"> -- </div> */}
          </div>
        </div>
        <div className="characterAbilityScoresLabel" onClick={() => this.toggleView("characterAbilityScores")}>
          <img className={characterAbilityScoresRightArrowClassName} src={rightDisplayArrow} alt="show" />
          <img className={characterAbilityScoresDownArrowClassName} src={downDisplayArrow} alt="hide" />  
          Ability Scores</div>   
        <div className={characterAbilityScoresClassName}>
          <div className="characterReviewLabelsCol">
            <AbilityScoreLabelDisplay ability={this.findStatisticByName("strength", characterToReview) ? 
              (this.findStatisticByName("strength", characterToReview)) : 
              {"name":"strength", "sum":{"total":0}}} />
            <AbilityScoreLabelDisplay ability={this.findStatisticByName("dexterity", characterToReview) ?
              (this.findStatisticByName("dexterity", characterToReview)) : 
              {"name":"dexterity", "sum":{"total":0}}} />
            <AbilityScoreLabelDisplay ability={this.findStatisticByName("constitution", characterToReview) ?
              (this.findStatisticByName("constitution", characterToReview)) : 
              {"name":"constitution", "sum":{"total":0}}} />
            <AbilityScoreLabelDisplay ability={this.findStatisticByName("intelligence", characterToReview) ?
              (this.findStatisticByName("intelligence", characterToReview)) : 
              {"name":"intelligence", "sum":{"total":0}}} />
            <AbilityScoreLabelDisplay ability={this.findStatisticByName("wisdom", characterToReview) ? 
              (this.findStatisticByName("wisdom", characterToReview)) :
              {"name":"wisdom", "sum":{"total":0}}} />
            <AbilityScoreLabelDisplay ability={this.findStatisticByName("charisma", characterToReview) ?
              (this.findStatisticByName("charisma", characterToReview)) : 
              {"name":"charisma", "sum":{"total":0}}} />
          </div>
          <div className="characterReviewOutputsCol">
            <AbilityScoreOutputDisplay ability={this.findStatisticByName("strength", characterToReview) ? 
              (this.findStatisticByName("strength", characterToReview)) : 
              {"name":"strength", "sum":{"total":0}}} />
            <AbilityScoreOutputDisplay ability={this.findStatisticByName("dexterity", characterToReview) ?
              (this.findStatisticByName("dexterity", characterToReview)) : 
              {"name":"dexterity", "sum":{"total":0}}} />
            <AbilityScoreOutputDisplay ability={this.findStatisticByName("constitution", characterToReview) ?
              (this.findStatisticByName("constitution", characterToReview)) : 
              {"name":"constitution", "sum":{"total":0}}} />
            <AbilityScoreOutputDisplay ability={this.findStatisticByName("intelligence", characterToReview) ?
              (this.findStatisticByName("intelligence", characterToReview)) : 
              {"name":"intelligence", "sum":{"total":0}}} />
            <AbilityScoreOutputDisplay ability={this.findStatisticByName("wisdom", characterToReview) ? 
              (this.findStatisticByName("wisdom", characterToReview)) :
              {"name":"wisdom", "sum":{"total":0}}} />
            <AbilityScoreOutputDisplay ability={this.findStatisticByName("charisma", characterToReview) ?
              (this.findStatisticByName("charisma", characterToReview)) : 
              {"name":"charisma", "sum":{"total":0}}} />
          </div>

        </div>
        <div className="characterVitalsLabel" onClick={() => this.toggleView("characterVitals")}>
          <img className={characterVitalsRightArrowClassName} src={rightDisplayArrow} alt="show" />
          <img className={characterVitalsDownArrowClassName} src={downDisplayArrow} alt="hide" />     
          Hit Points</div>
        <div className={characterVitalsClassName}>
          <div className="characterHPs">
            <div className="characterReviewLabelsCol">
              {/* <div className="currentHPs">Current HPs</div> */}
              {/* <div className="temporaryHPs">Temporary HPs</div> */}
              {/* <div className="nonLethalDamage">Nonlethal Damage</div> */}
              <div className="classHPs">Class Base HPs</div>
              <div className="totalHP">Total HPs</div>
            </div>
            <div className="characterReviewOutputsCol">
              <div className="characterReviewOutputCentered">{characterToReview.charClass.classFeatures.hd ?
              characterToReview.charClass.classFeatures.hd : "--" }</div>
              <div className="characterReviewOutputCentered">{
                characterToReview.charClass.classFeatures.hd ?
                  (this.findStatisticByName("constitution", characterToReview) ? characterToReview.charClass.classFeatures.hd + 
                  Math.floor((this.findStatisticByName("constitution", characterToReview).sum.total - 10) / 2)
                  : (characterToReview.charClass.classFeatures.hd) + " + Con")
                : (this.findStatisticByName("constitution", characterToReview) ? "Class HD + " + (Math.floor((this.findStatisticByName("constitution", characterToReview).sum.total - 10) / 2))
                  : 0 )
              }</div>
            </div>
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
        <div className="characterCombatStatsLabel" onClick={() => this.toggleView("characterCombatStats")}>
          <img className={characterCombatStatsRightArrowClassName} src={rightDisplayArrow} alt="show" />
          <img className={characterCombatStatsDownArrowClassName} src={downDisplayArrow} alt="hide" />     
          Combat</div>
        <div className={characterCombatStatsClassName}>
          <div className="characterAttackModifiers">
            <div className="characterReviewLabelsCol">
              {/****************************************************
                loop through each weapon. each gets its own section
              *****************************************************/}
              {meleeWeapons.length > 0 ? (meleeWeapons.map((weapon) => 
                <MeleeWeaponLabel key={weapon.name} name={weapon.name}/>
              )) : <MeleeWeaponLabel key={""} name={""}/>}
              {rangedWeapons.length > 0 ? (rangedWeapons.map((weapon) => 
                <RangedWeaponLabel key={weapon.name} name={weapon.name}/>
              )) : <RangedWeaponLabel key={""} name={""}/>}
              <div className="combatManeuverBonusLabel">
                <div className="combatManeuverBonusAbbreviation">CMB</div>
                <div className="combatManeuverBonusComplete">Combat Maneuver Bonus</div>   
              </div>
            </div>
            <div className="characterReviewOutputsCol">
              <div className="characterReviewOutput">
              {/****************************************************
                loop through each weapon. each gets its own section
              *****************************************************/}
                {meleeWeapons.map((weapon) => 
                  <MeleeWeaponOutput key={weapon.name} weapon={weapon} characterToReview={characterToReview} 
                  sizeMod={sizeMod} findStatisticByName={this.findStatisticByName}/>
                )}
                {/* <div className="combatDetailsButton"><button onClick={ () => this.viewDetails("melee") }>details</button></div> */}
              </div>
              <div className="characterReviewOutput">
                {rangedWeapons.length > 0 ? rangedWeapons.map((weapon) => 
                  <RangedWeaponOutput key={weapon.name} weapon={weapon} characterToReview={characterToReview} 
                  sizeMod={sizeMod} findStatisticByName={this.findStatisticByName}/>
                ): <RangedWeaponOutput key={"ranged"} weapon={null} characterToReview={characterToReview} 
                sizeMod={sizeMod} findStatisticByName={this.findStatisticByName}/>}
                {/* <div className="combatDetailsButton"><button onClick={ () => this.viewDetails("ranged") }>details</button></div> */}
              </div>
              <div className="characterReviewOutput">
                <div className="combatManeuverBonusTotal">{
                  this.findStatisticByName("bab", characterToReview) ?
                    (this.findStatisticByName("strength", characterToReview) ? this.findStatisticByName("bab", characterToReview).sum.total + 
                    Math.floor((this.findStatisticByName("strength", characterToReview).sum.total - 10) / 2) - sizeMod
                    : (this.findStatisticByName("bab", characterToReview).sum.total - sizeMod) + " + Str")
                  : (this.findStatisticByName("strength", characterToReview) ? "BAB + " + (Math.floor((this.findStatisticByName("strength", characterToReview).sum.total - 10) / 2) - sizeMod)
                    : 0 )
                }</div>
                {/* <div className="combatDetailsButton"><button onClick={ () => this.viewDetails("combatManeuverBonus") }>details</button></div> */}
              </div>
            </div>        
          </div>
          <div className="characterArmorClassAndDefense">
            <div className="characterReviewLabelsCol">
              <div className="armorClassLabel">
                <div className="armorClassAbbreviation">AC</div>
                <div className="armorClassComplete">Armor Class</div>   
              </div>
              <div className="flatFootedArmorClassLabel">
                <div className="flatFootedArmorClassAbbreviation">Flat</div>
                <div className="flatFootedArmorClassComplete">Flatfooted Armor Class</div>
              </div>
              <div className="touchArmorClassLabel">
                <div className="touchArmorClassAbbreviation">Touch</div>
                <div className="touchArmorClassComplete">Touch Armor Class</div>   
              </div>
              <div className="combatManeuverDefenseLabel">
                <div className="combatManeuverDefenseAbbreviation">CMD</div>
                <div className="combatManeuverDefenseComplete">Combat Maneuver Defense</div>   
              </div>
            </div>
            <div className="characterReviewOutputsCol">
              <div className="characterReviewOutput">
                <div className="armorClassTotal">{this.findStatisticByName("armorClass", characterToReview) ? 
                  (this.findStatisticByName("armorClass", characterToReview).sum.total + 
                  (this.findStatisticByName("dexterity", characterToReview) ? Math.floor((this.findStatisticByName("dexterity", characterToReview).sum.total - 10) / 2) : 0) +
                  sizeMod) 
                  : ( 10 + sizeMod + ( this.findStatisticByName("dexterity", characterToReview)
                    ? Math.floor((this.findStatisticByName("dexterity", characterToReview).sum.total - 10) / 2) : " + Dex" ) ) }</div>
                {/* <button onClick={ () => this.viewDetails("armorClass") }>details</button> */}
              </div>
              <div className="characterReviewOutput">   {/* How is this stat stored? */}
                <div className="flatFootedArmorClassTotal">{this.findStatisticByName("armorClass", characterToReview) ? 
                  (this.findStatisticByName("armorClass", characterToReview).sum.total + 
                  (this.findStatisticByName("dexterity", characterToReview) ? Math.floor((this.findStatisticByName("dexterity", characterToReview).sum.total - 10) / 2) : 0) +
                  sizeMod) : ( 10 + sizeMod ) }</div>
                {/* <button onClick={ () => this.viewDetails("flatFootedArmorClass") }>details</button> */}
              </div>
              <div className="characterReviewOutput">
                <div className="touchArmorClassTotal">{this.findStatisticByName("touchArmorClass", characterToReview) ? 
                  (this.findStatisticByName("touchArmorClass", characterToReview).sum.total + 
                  (this.findStatisticByName("dexterity", characterToReview) ? Math.floor((this.findStatisticByName("dexterity", characterToReview).sum.total - 10) / 2) : 0) +
                  sizeMod) 
                  : ( 10 + sizeMod + ( this.findStatisticByName("dexterity", characterToReview)
                    ? Math.floor((this.findStatisticByName("dexterity", characterToReview).sum.total - 10) / 2) : " + Dex" ) ) }</div>
                {/* <button onClick={ () => this.viewDetails("touchArmorClass") }>details</button> */}
              </div>
              <div className="characterReviewOutput">
              <div className="combatManeuverDefenseTotal">{this.findStatisticByName("combatManeuverDefense", characterToReview) ?
                (this.findStatisticByName("combatManeuverDefense", characterToReview).sum.total + 
                Math.floor((this.findStatisticByName("dexterity", characterToReview).sum.total - 10) / 2) + 
                Math.floor((this.findStatisticByName("strength", characterToReview).sum.total - 10) / 2) +
                this.findStatisticByName("bab", characterToReview).sum.total - sizeMod) 
                : /* Here we have no CMD stat saved, we now have three checks we need to make; dex, str, and bab */
                ( this.findStatisticByName("dexterity", characterToReview) 
                  ? ( /* There is Dex */ this.findStatisticByName("strength", characterToReview) 
                    ? ( /* There is Dex and Str */ this.findStatisticByName("bab", characterToReview) 
                      ? (/* There is Dex and Str and BAB */ 10 + Math.floor((this.findStatisticByName("dexterity", characterToReview).sum.total - 10) / 2) + 
                        Math.floor((this.findStatisticByName("strength", characterToReview).sum.total - 10) / 2) +
                        this.findStatisticByName("bab", characterToReview).sum.total - sizeMod) 
                      : (/* There is Dex and Str and no BAB */ 10 + Math.floor((this.findStatisticByName("dexterity", characterToReview).sum.total - 10) / 2) + 
                        Math.floor((this.findStatisticByName("strength", characterToReview).sum.total - 10) / 2) - sizeMod + " + BAB") ) 
                    : ( /* There is Dex, no Str */ this.findStatisticByName("bab", characterToReview) 
                      ? (/* There is Dex, no Str and BAB */ 10 + Math.floor((this.findStatisticByName("dexterity", characterToReview).sum.total - 10) / 2) + 
                        this.findStatisticByName("bab", characterToReview).sum.total - sizeMod + " + Str") 
                      : (/* There is Dex, no Str and no BAB */ 10 + Math.floor((this.findStatisticByName("dexterity", characterToReview).sum.total - 10) / 2) - 
                        sizeMod + " + Str + BAB") ) ) 
                  : ( /* There is No Dex */ this.findStatisticByName("strength", characterToReview) 
                    ? ( /* There is no Dex and Str */ this.findStatisticByName("bab", characterToReview) 
                      ? (/* There is no Dex and Str and BAB */ 10 + Math.floor((this.findStatisticByName("strength", characterToReview).sum.total - 10) / 2) +
                        this.findStatisticByName("bab", characterToReview).sum.total - sizeMod + " + Dex") 
                      : (/* There is no Dex and Str and no BAB */ 10 + Math.floor((this.findStatisticByName("strength", characterToReview).sum.total - 10) / 2) -
                      sizeMod + " + Dex + BAB") ) 
                    : ( /* There is no Dex, no Str */ this.findStatisticByName("bab", characterToReview) 
                      ? (/* There is no Dex, no Str and BAB */ 10 + this.findStatisticByName("bab", characterToReview).sum.total - sizeMod + " + Dex + Str") 
                      : (/* There is no Dex, no Str and no BAB */ 10 + " + Dex + Str + BAB") ) ) ) }</div>
              {/* <button onClick={ () => this.viewDetails("combatManeuverDefense") }>details</button> */}
            </div> 
            </div>
          </div>
          <div className="characterSavingThrows">
            <div className="characterReviewLabelsCol">
              <div className="fortitudeSaveLabel">
                <div className="fortitudeSaveAbbreviation">Fort</div>
                <div className="fortitudeSaveComplete">Fortitude Save</div>   
              </div>
              <div className="reflexSaveLabel">
                <div className="reflexSaveAbbreviation">Ref</div>
                <div className="reflexSaveComplete">Reflex Save</div>   
              </div>
              <div className="willSaveLabel">
                <div className="willSaveAbbreviation">Will</div>
                <div className="willSaveComplete">Will Save</div>   
              </div>
            </div>
            <div className="characterReviewOutputsCol">
              <div className="characterReviewOutput">
                <div className="fortitudeSaveTotal">{
                  this.findStatisticByName("fort", characterToReview) ?
                    (this.findStatisticByName("constitution", characterToReview) ? this.findStatisticByName("fort", characterToReview).sum.total + 
                    Math.floor((this.findStatisticByName("constitution", characterToReview).sum.total - 10) / 2)
                    : (this.findStatisticByName("fort", characterToReview).sum.total) + " + Con")
                  : (this.findStatisticByName("constitution", characterToReview) ? "Fortitude + " + (Math.floor((this.findStatisticByName("constitution", characterToReview).sum.total - 10) / 2))
                    : 0 )
                }</div>
                {/* <button onClick={ () => this.viewDetails("fort") }>details</button> */}
              </div>
              <div className="characterReviewOutput">
                <div className="reflexSaveTotal">{
                  this.findStatisticByName("ref", characterToReview) ?
                    (this.findStatisticByName("dexterity", characterToReview) ? this.findStatisticByName("ref", characterToReview).sum.total + 
                    Math.floor((this.findStatisticByName("dexterity", characterToReview).sum.total - 10) / 2)
                    : (this.findStatisticByName("ref", characterToReview).sum.total) + " + Dex")
                  : (this.findStatisticByName("dexterity", characterToReview) ? "Reflex + " + (Math.floor((this.findStatisticByName("dexterity", characterToReview).sum.total - 10) / 2))
                    : 0 )
                }</div>
                {/* <button onClick={ () => this.viewDetails("ref") }>details</button> */}
              </div>
              <div className="characterReviewOutput">
                <div className="willSaveTotal">{
                  this.findStatisticByName("will", characterToReview) ?
                    (this.findStatisticByName("wisdom", characterToReview) ? this.findStatisticByName("will", characterToReview).sum.total + 
                    Math.floor((this.findStatisticByName("wisdom", characterToReview).sum.total - 10) / 2)
                    : (this.findStatisticByName("will", characterToReview).sum.total) + " + Wis")
                  : (this.findStatisticByName("wisdom", characterToReview) ? "Will + " + (Math.floor((this.findStatisticByName("wisdom", characterToReview).sum.total - 10) / 2))
                    : 0 )
                }</div>
                {/* <button onClick={ () => this.viewDetails("will") }>details</button> */}
              </div>
            </div>
          </div>         
          <div className="characterWeaponsSpecialAttacks"></div>
        </div>
        <div className="characterInitiativeLabel" onClick={() => this.toggleView("characterInitiative")}>
          <img className={characterInitiativeRightArrowClassName} src={rightDisplayArrow} alt="show" />
          <img className={characterInitiativeDownArrowClassName} src={downDisplayArrow} alt="hide" />     
          Initiative</div>
        <div className={characterInitiativeClassName}>
          <div className="characterReviewLabelsCol">
            <div className="initiativeLabel">
              <div className="initiativeAbbreviation">Init</div>
              <div className="initiativeComplete">Initiative Bonus</div>   
            </div>
            <div className="speedLabel">
              <div className="speedAbbreviation">Speed</div>
              <div className="speedComplete">Speed</div>   
            </div>
          </div>
          <div className="characterReviewOutputsCol">
            <div className="characterReviewOutput">
              <div className="initiativeTotal">{
                (this.findStatisticByName("initiative", characterToReview) ? 
                this.findStatisticByName("initiative", characterToReview).sum.total : 0) + 
                (this.findStatisticByName("dexterity", characterToReview) ?
                (Math.floor((this.findStatisticByName("dexterity", characterToReview).sum.total - 10) / 2)) : 0)
              }</div>
              {/* <button onClick={ () => this.viewDetails("initiative") }>details</button> */}
            </div>
            <div className="characterReviewOutput">
              <div className="speedTotal"> -- {
                // <----- non-essential change, TODO! modify racial input to make speed an object {description: string, value: num}
                /* (this.findStatisticByName("initiative", characterToReview) ? 
                this.findStatisticByName("initiative", characterToReview).sum.total : 0) + 
                (this.findStatisticByName("dexterity", characterToReview) ?
                (Math.floor((this.findStatisticByName("dexterity", characterToReview).sum.total - 10) / 2)) : 0) */
              }</div>
              {/* <button onClick={ () => this.viewDetails("speed") }>details</button> */}
            </div>
          </div>
        </div>
        <div className="characterSkillsLabel" onClick={() => this.toggleView("characterSkills")}>
          <img className={characterSkillsRightArrowClassName} src={rightDisplayArrow} alt="show" />
          <img className={characterSkillsDownArrowClassName} src={downDisplayArrow} alt="hide" />   
          Skills</div>  
        <div className={characterSkillsClassName}>
          <div className="characterReviewLabelsCol">
            {skillList.map(({name}) => 
              <div key={name} className={name+"Label"}>{capitalizeFirstLetter(name)}</div>
            )}
          </div>
          <div className="characterReviewOutputsCol">
            {skillList.map(({name, ability, untrained})=>
              <SkillDisplay key={name} name={name} ability={ability} untrained={untrained} 
              lookupCall={this.findStatisticByName} characterToReview={characterToReview} 
              /* viewDetails = {this.viewDetails} *//>            
            )}
          </div>          
        </div>
        <div className="characterFeatsAbilitiesNotesLabel" onClick={() => this.toggleView("characterFeatsAbilitiesNotes")}>
          <img className={characterFeatsAbilitiesNotesRightArrowClassName} src={rightDisplayArrow} alt="show" />
          <img className={characterFeatsAbilitiesNotesDownArrowClassName} src={downDisplayArrow} alt="hide" />     
          Feats and Abilities</div>
        <FeatsDisplay characterToReview = {this.props.characterToReview} characterFeatsAbilitiesNotesClassName={characterFeatsAbilitiesNotesClassName}/>
        {/* <Link to="/dashboard" onClick={ () => this.save() }>Submit and Save</Link> */}
        {/* <button onClick={ () => this.save() }>Submit and Save</button> */}
      </div>
    )
	}
}

const mapStateToProps = state => ({
	creationSteps:state.characterReducer.creationSteps,
  characterToReview:state.characterReducer.newCharacter,
  user:state.auth.currentUser.username,
  reviewExpanded:state.characterReducer.reviewExpanded,
  editingExistingCharacter:state.characterReducer.editingExistingCharacter,
}); 

export default requiresLogin()(withRouter(connect(mapStateToProps)(CharacterReview)));

function AbilityScoreLabelDisplay(props){
  const ability = props.ability;

  return(
    <div className={ability.name+"Label"}>
      <div className={ability.name+"Abbreviation"}>{ability.name.substring(0, 3).toUpperCase()}</div>
      <div className={ability.name+"Complete"}>{ability.name.toUpperCase()}</div>   
    </div>
  )
}
function AbilityScoreOutputDisplay(props){
  const ability = props.ability;

  return(
    <div className={ability.name+"Output"}>
      <div className={ability.name+"Total"}>{ability.sum.total}</div>
      <div className={ability.name+"Mod"}>{Math.floor((ability.sum.total - 10) / 2) }</div>
      <div className={ability.name+"Details"}></div>
    </div>
  )
}
function SkillDisplay(skill){
  return(
    <div className={skill.name}>
      <div className="characterReviewOutput"> {/* skill.name+"Output" */}
        <div className="characterReviewTotal"> {/* skill.name+"Total" */}
          {/* skill.lookupCall(skill.name, skill.characterToReview) ? "found it": "not there" */}
          {(skill.lookupCall(skill.name, skill.characterToReview) ? 
            skill.lookupCall(skill.name, skill.characterToReview).sum.total : 0) + 
            skill.lookupCall(skill.ability, skill.characterToReview) ? 
            (Math.floor((skill.lookupCall(skill.ability, skill.characterToReview).sum.total - 10) / 2)) : 0}
        </div>
        {/* <button onClick={ () => skill.viewDetails(skill.name) }>details</button> */}
      </div>
    </div>
  )
}
function FeatsDisplay(props){
  const characterFeatsAbilitiesNotesClassName = props.characterFeatsAbilitiesNotesClassName;
  const characterToReview = props.characterToReview;
  const proficiency = characterToReview.charClass.classFeatures.proficiency ? characterToReview.charClass.classFeatures.proficiency : null;
  let specialAbilities = [];
  
  if(characterToReview.race){ //.standardRacialTraits.racial
    for(let i=0;i<characterToReview.race.standardRacialTraits.racial.length;i++){
      specialAbilities.push(characterToReview.race.standardRacialTraits.racial[i]);
    }
  }
  if(proficiency){
    let obj = { "name" : "proficiencies",
                "description" : proficiency.join(", ") }
    specialAbilities.push(obj);
  }
  if(characterToReview.charClass.classFeatures.table){ //[1][5]
    for(let i=0;i<characterToReview.charClass.classFeatures.table[1][5].length;i++){
      specialAbilities.push(characterToReview.charClass.classFeatures.table[1][5][i]);
    }
  }
  if(characterToReview.featSlots[0].selection){
    for(let i=0;i<characterToReview.featSlots.length;i++){
      specialAbilities.push(characterToReview.featSlots[i].selection);
    }
  }
  if(characterToReview.traitSlots[0].selection){
    for(let i=0;i<characterToReview.traitSlots.length;i++){
      specialAbilities.push(characterToReview.traitSlots[i].selection);
    }
  }

  return(
    <div className={characterFeatsAbilitiesNotesClassName}>
      {specialAbilities.length > 0
      ? (specialAbilities.map((spec) => 
        <div key={spec.name}>
          <div className="featsAndAbilitesLabel">{capitalizeFirstLetter(spec.name) + (spec.type ? " ( " + spec.type + " ) " : "")}</div>
          <div className="featsAndAbilitesOutput">{spec.description}</div>
        </div>
      )) 
      : ( <div key={0}>
            <div className="featsAndAbilitesLabel">None</div>
            <div className="featsAndAbilitesOutput"></div>
          </div> )}
    </div>
  )
}
class MeleeWeaponLabel extends React.Component{
  render(){
    return(
      <div className="meleeLabel">
        <div className="meleeAbbreviation">Melee - {this.props.name}</div>
        <div className="meleeComplete">Melee Attack Bonus - {this.props.name}</div>   
      </div>
    )
  }
}
class RangedWeaponLabel extends React.Component{
  render(){
    return (
      <div className="rangedLabel">
        <div className="rangedAbbreviation">Ranged - {this.props.name}</div>
        <div className="rangedComplete">Ranged Attack Bonus - {this.props.name}</div>   
      </div>
    )
  }
}
class MeleeWeaponOutput extends React.Component{
  render(){
    {/* if there is a bab ( if there is a str  ) - else ( if there is a str  ) */}    
    let damageMod;
    switch(this.props.weapon.damageModifier){
      case "none":
        damageMod = "";
        break;
      case "0_5_strength":
        let strength = this.props.findStatisticByName("strength", this.props.characterToReview) ? Math.floor((this.props.findStatisticByName("strength", this.props.characterToReview).sum.total - 10) / 2) : 0;
        damageMod = (Math.floor(strength / 2) !== 0) ? (" + " + Math.floor(strength / 2)) : " + 0.5 * STR";
        break;
      case "strength":
        strength = this.props.findStatisticByName("strength", this.props.characterToReview) ? Math.floor((this.props.findStatisticByName("strength", this.props.characterToReview).sum.total - 10) / 2) : 0;
        damageMod = (strength !== 0) ? (" + " + strength) : " + STR";
        break;
      case "1_5_strength":
        strength = this.props.findStatisticByName("strength", this.props.characterToReview) ? Math.floor((this.props.findStatisticByName("strength", this.props.characterToReview).sum.total - 10) / 2) : 0;
        damageMod = (Math.floor(strength * 1.5) !== 0) ? (" + " + Math.floor(strength * 1.5)) : " + 1.5 * STR";
        break;
      case "2_strength":
        strength = this.props.findStatisticByName("strength", this.props.characterToReview) ? Math.floor((this.props.findStatisticByName("strength", this.props.characterToReview).sum.total - 10) / 2) : 0;
        damageMod = (strength * 2 !== 0) ? (" + " + strength * 2) : " + 2 * STR";
        break;
      case "dexterity":
        let dexterity = this.props.findStatisticByName("dexterity", this.props.characterToReview) ? Math.floor((this.props.findStatisticByName("dexterity", this.props.characterToReview).sum.total - 10) / 2) : 0;
        damageMod = (dexterity !== 0) ? (" + " + dexterity) : " + DEX";
        break;
    }
    
    return(
      <div className="meleeTotal">{
        this.props.findStatisticByName("bab", this.props.characterToReview) 
          ? (this.props.findStatisticByName(this.props.weapon.attackModifier, this.props.characterToReview)
            ? "+" + this.props.findStatisticByName("bab", this.props.characterToReview).sum.total 
              + Math.floor((this.props.findStatisticByName(this.props.weapon.attackModifier, this.props.characterToReview).sum.total - 10) / 2) 
              + this.props.sizeMod
            : "+" + (this.props.findStatisticByName("bab", this.props.characterToReview).sum.total + this.props.sizeMod) + " + " + this.props.weapon.attackModifier)
          : (this.props.findStatisticByName(this.props.weapon.attackModifier, this.props.characterToReview) 
            ? "BAB + " + (Math.floor((this.props.findStatisticByName(this.props.weapon.attackModifier, this.props.characterToReview).sum.total - 10) / 2) 
              + this.props.sizeMod)
            : "+0" ) + " ( " + (this.props.sizeMod === 0 ? this.props.weapon.dmgM[0] : this.props.weapon.dmgS[0]) 
              + damageMod + " ( " + this.props.weapon.critical + " )" + " ) " 
      }</div>
    )
  }
}
class RangedWeaponOutput extends React.Component{
  render(){
    {/* if there is a bab ( if there is a str  ) - else ( if there is a str  ) */}    
    let damageMod = 0;
    let attackModifier;
    let dmgM;
    let dmgS;
    let critical;

    if(this.props.weapon){
      switch(this.props.weapon.damageModifier){
        case "none":
          damageMod = "";
          break;
        case "0_5_strength":
          let strength = this.props.findStatisticByName("strength", this.props.characterToReview) ? Math.floor((this.props.findStatisticByName("strength", this.props.characterToReview).sum.total - 10) / 2) : 0;
          damageMod = (Math.floor(strength / 2) !== 0) ? (" + " + Math.floor(strength / 2)) : " + 0.5 * STR";
          break;
        case "strength":
          strength = this.props.findStatisticByName("strength", this.props.characterToReview) ? Math.floor((this.props.findStatisticByName("strength", this.props.characterToReview).sum.total - 10) / 2) : 0;
          damageMod = (strength !== 0) ? (" + " + strength) : " + STR";
          break;
        case "1_5_strength":
          strength = this.props.findStatisticByName("strength", this.props.characterToReview) ? Math.floor((this.props.findStatisticByName("strength", this.props.characterToReview).sum.total - 10) / 2) : 0;
          damageMod = (Math.floor(strength * 1.5) !== 0) ? (" + " + Math.floor(strength * 1.5)) : " + 1.5 * STR";
          break;
        case "2_strength":
          strength = this.props.findStatisticByName("strength", this.props.characterToReview) ? Math.floor((this.props.findStatisticByName("strength", this.props.characterToReview).sum.total - 10) / 2) : 0;
          damageMod = (strength * 2 !== 0) ? (" + " + strength * 2) : " + 2 * STR";
          break;
        case "dexterity":
          let dexterity = this.props.findStatisticByName("dexterity", this.props.characterToReview) ? Math.floor((this.props.findStatisticByName("dexterity", this.props.characterToReview).sum.total - 10) / 2) : 0;
          damageMod = (dexterity !== 0) ? (" + " + dexterity) : " + DEX";
          break;
      }
      attackModifier = this.props.weapon.attackModifier;
      dmgM = this.props.weapon.dmgM[0];
      dmgS = this.props.weapon.dmgS[0];
      critical = this.props.weapon.critical;
    } else {
      attackModifier = "dexterity";
      dmgM = "";
      dmgS = "";
      critical = "";
    }
    
    return(
      <div className="rangedTotal">{
        this.props.findStatisticByName("bab", this.props.characterToReview) 
          ? (this.props.findStatisticByName(attackModifier, this.props.characterToReview)
            ? "+" + this.props.findStatisticByName("bab", this.props.characterToReview).sum.total 
              + Math.floor((this.props.findStatisticByName(attackModifier, this.props.characterToReview).sum.total - 10) / 2) 
              + this.props.sizeMod
            : "+" + (this.props.findStatisticByName("bab", this.props.characterToReview).sum.total + this.props.sizeMod) + " + " + attackModifier)
          : (this.props.findStatisticByName(attackModifier, this.props.characterToReview) 
            ? "BAB + " + (Math.floor((this.props.findStatisticByName(attackModifier, this.props.characterToReview).sum.total - 10) / 2) 
              + this.props.sizeMod)
            : "+0" ) + " ( " + (this.props.sizeMod === 0 ? dmgM : dmgS) 
              + damageMod + " ( " + critical + " )" + " ) " 
      }</div>
    )
  }
}