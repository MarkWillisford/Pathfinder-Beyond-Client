import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import requiresLogin from './requiresLogin';
import { addBonus } from '../actions/index';
import { sumBonus } from '../actions/index';
import { createBonus } from '../utility/statObjectFactories'
import { capitalizeFirstLetter } from '../utility/helperFunctions';
import { saveAndSubmit } from '../actions/protectedData';
import { resetCharacterReducerState } from '../actions/index';

import './characterReview.css';

export class CharacterReview extends React.Component{
  findStatisticByName(name, characterToReview){
    for(let i=0;i<characterToReview.characterStats.length;i++){
      if(characterToReview.characterStats[i].name === name){
        return characterToReview.characterStats[i];
      }
    }
  }

  viewDetails(stat){
    console.log(stat);
  }

  save(){
    this.props.dispatch(saveAndSubmit());
    // redirect to dashboard    
  }

	render(){
    const saved = this.props.saved;
    const skillList = require('../data/skills');
    let characterToReview = this.props.characterToReview;
    console.log(this.props);
    let sizeMod = characterToReview.race.standardRacialTraits.base.size === "small" ? 1 : 0;
    

    if(!saved){
      return(
        <div>
          Character Review
          <div className="playerInformation"></div>
          <div className="characterAbilityScores">
            <div className="characterAbilityScoresLabels"></div>
            <AbilityScoreDisplay ability={this.findStatisticByName("strength", characterToReview)} />
            <AbilityScoreDisplay ability={this.findStatisticByName("dexterity", characterToReview)} />
            <AbilityScoreDisplay ability={this.findStatisticByName("constitution", characterToReview)} />
            <AbilityScoreDisplay ability={this.findStatisticByName("intelligence", characterToReview)} />
            <AbilityScoreDisplay ability={this.findStatisticByName("wisdom", characterToReview)} />
            <AbilityScoreDisplay ability={this.findStatisticByName("charisma", characterToReview)} />
          </div>
          <div className="characterVitals">
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
          <div className="characterCombatStats">
            <div className="characterArmorClassAndDefense">
              <div className="armorClass">
                <div className="armorClassLabel">
                  <div className="armorClassAbbreviation">AC</div>
                  <div className="armorClassComplete">Armor Class</div>   
                </div>
                <div className="armorClassTotal">{this.findStatisticByName("armorClass", characterToReview).sum.total + 
                                                  Math.floor((this.findStatisticByName("dexterity", characterToReview).sum.total - 10) / 2) +
                                                  sizeMod}</div>
                <button onClick={ () => this.viewDetails("armorClass") }>details</button>
              </div>
              <div className="flatFootedArmorClass">
                <div className="flatFootedArmorClassLabel">
                  <div className="flatFootedArmorClassAbbreviation">Flat</div>
                  <div className="flatFootedArmorClassComplete">Flatfooted Armor Class</div>
                </div>
                <div className="flatFootedArmorClassTotal">{this.findStatisticByName("armorClass", characterToReview).sum.total +
                                                  sizeMod}</div>
                <button onClick={ () => this.viewDetails("flatFootedArmorClass") }>details</button>
              </div>
              <div className="touchArmorClass">
                <div className="touchArmorClassLabel">
                  <div className="touchArmorClassAbbreviation">Touch</div>
                  <div className="touchArmorClassComplete">Touch Armor Class</div>   
                </div>
                <div className="touchArmorClassTotal">{this.findStatisticByName("touchArmorClass", characterToReview).sum.total + 
                                                  Math.floor((this.findStatisticByName("dexterity", characterToReview).sum.total - 10) / 2) +
                                                  sizeMod}</div>
                <button onClick={ () => this.viewDetails("touchArmorClass") }>details</button>
              </div>
              <div className="combatManeuverDefense">
                <div className="combatManeuverDefenseLabel">
                  <div className="combatManeuverDefenseAbbreviation">AC</div>
                  <div className="combatManeuverDefenseComplete">Armor Class</div>   
                </div>
                <div className="combatManeuverDefenseTotal">{this.findStatisticByName("combatManeuverDefense", characterToReview).sum.total + 
                                                  Math.floor((this.findStatisticByName("dexterity", characterToReview).sum.total - 10) / 2) + 
                                                  Math.floor((this.findStatisticByName("strength", characterToReview).sum.total - 10) / 2) +
                                                  this.findStatisticByName("bab", characterToReview).sum.total - sizeMod }</div>
                <button onClick={ () => this.viewDetails("combatManeuverDefense") }>details</button>
              </div>            
            </div>
            <div className="characterSavingThrows">
              <div className="fortitudeSave">
                <div className="fortitudeSaveLabel">
                  <div className="fortitudeSaveAbbreviation">Fort</div>
                  <div className="fortitudeSaveComplete">Fortitude Save</div>   
                </div>
                <div className="fortitudeSaveTotal">{this.findStatisticByName("fort", characterToReview).sum.total + 
                                                  Math.floor((this.findStatisticByName("constitution", characterToReview).sum.total - 10) / 2)}</div>
                <button onClick={ () => this.viewDetails("fort") }>details</button>
              </div>
              <div className="reflexSave">
                <div className="reflexSaveLabel">
                  <div className="reflexSaveAbbreviation">Ref</div>
                  <div className="reflexSaveComplete">Reflex Save</div>   
                </div>
                <div className="reflexSaveTotal">{this.findStatisticByName("ref", characterToReview).sum.total + 
                                                  Math.floor((this.findStatisticByName("dexterity", characterToReview).sum.total - 10) / 2)}</div>
                <button onClick={ () => this.viewDetails("ref") }>details</button>
              </div>
              <div className="willSave">
                <div className="willSaveLabel">
                  <div className="willSaveAbbreviation">Will</div>
                  <div className="willSaveComplete">Will Save</div>   
                </div>
                <div className="willSaveTotal">{this.findStatisticByName("will", characterToReview).sum.total + 
                                                  Math.floor((this.findStatisticByName("wisdom", characterToReview).sum.total - 10) / 2)}</div>
                <button onClick={ () => this.viewDetails("will") }>details</button>
              </div>            
            </div>          
            <div className="characterAttackModifiers">
              <div className="melee">
                <div className="meleeLabel">
                  <div className="meleeAbbreviation">Melee</div>
                  <div className="meleeComplete">Melee Attack Bonus</div>   
                </div>
                <div className="meleeTotal">{this.findStatisticByName("bab", characterToReview).sum.total + 
                                                  Math.floor((this.findStatisticByName("strength", characterToReview).sum.total - 10) / 2) +
                                                  sizeMod}</div>
                <button onClick={ () => this.viewDetails("melee") }>details</button>
              </div>
              <div className="ranged">
                <div className="rangedLabel">
                  <div className="rangedAbbreviation">Ranged</div>
                  <div className="rangedComplete">Ranged Attack Bonus</div>   
                </div>
                <div className="rangedTotal">{this.findStatisticByName("bab", characterToReview).sum.total + 
                                                  Math.floor((this.findStatisticByName("dexterity", characterToReview).sum.total - 10) / 2) +
                                                  sizeMod}</div>
                <button onClick={ () => this.viewDetails("ranged") }>details</button>
              </div>
              <div className="combatManeuverBonus">
                <div className="combatManeuverBonusLabel">
                  <div className="combatManeuverBonusAbbreviation">CMB</div>
                  <div className="combatManeuverBonusComplete">Combat Maneuver Bonus</div>   
                </div>
                <div className="combatManeuverBonusTotal">{this.findStatisticByName("bab", characterToReview).sum.total + 
                                                  Math.floor((this.findStatisticByName("strength", characterToReview).sum.total - 10) / 2) -
                                                  sizeMod}</div>
                <button onClick={ () => this.viewDetails("combatManeuverBonus") }>details</button>
              </div>          
            </div>
            <div className="characterWeaponsSpecialAttacks"></div>
          </div>
          <div className="characterInitiative">
              <div className="initiative">
                <div className="initiativeLabel">
                  <div className="initiativeAbbreviation">Init</div>
                  <div className="initiativeComplete">Initiative Bonus</div>   
                </div>
                <div className="initiativeTotal">{
                  (this.findStatisticByName("initiative", characterToReview) ? 
                  this.findStatisticByName("initiative", characterToReview).sum.total : 0) + 
                  Math.floor((this.findStatisticByName("dexterity", characterToReview).sum.total - 10) / 2)
                }</div>
                <button onClick={ () => this.viewDetails("initiative") }>details</button>
              </div> 
              {/* <div className="speed">
                Speed                       <----- non-essential change, TODO! modify racial input to make speed an object {description: string, value: num}
              </div> */}
          </div>
          <div className="characterSkills">
            {skillList.map(({name, ability, untrained})=>
              <SkillDisplay key={name} name={name} ability={ability} untrained={untrained} 
              lookupCall={this.findStatisticByName} characterToReview={characterToReview} />
              
            )}
          </div>
          <div className="characterFeatsAbilitiesNotes"></div>

          {/* <Link to="/dashboard" onClick={ () => this.save() }>Submit and Save</Link> */}
          <button onClick={ () => this.save() }>Submit and Save</button>
        </div>
      )
    } else {   
      this.props.dispatch(resetCharacterReducerState());
      return <Redirect to="/dashboard/" />;
    }
	}
}

const mapStateToProps = state => ({
  characterToReview:state.characterReducer.newCharacter,
  saved:state.protectedData.saved
});

export default connect(mapStateToProps)(CharacterReview);
//export default requiresLogin()(connect(mapStateToProps)(CharacterReview));

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

function SkillDisplay(skill){
  return(
    <div className={skill.name}>
      <div className={skill.name+"Overview"}>
        <div className={skill.name+"Label"}>{capitalizeFirstLetter(skill.name)}</div>
        <div className={skill.name+"Total"}>

        {/* skill.lookupCall(skill.name, skill.characterToReview) ? "found it": "not there" */}
        {(skill.lookupCall(skill.name, skill.characterToReview) ? 
          skill.lookupCall(skill.name, skill.characterToReview).sum.total : 0) + 
          Math.floor((skill.lookupCall(skill.ability, skill.characterToReview).sum.total - 10) / 2) }

        
        
        
        </div>
      </div>
      <button onClick={ () => this.viewDetails(skill.name) }>details</button>
    </div>
  )
}