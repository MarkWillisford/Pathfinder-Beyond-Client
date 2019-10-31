import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import requiresLogin from './requiresLogin';
import { capitalizeFirstLetter } from '../utility/helperFunctions';
import { saveAndSubmit } from '../actions/protectedData';
import { resetCharacterReducerState } from '../actions/index';
import CharacterReview from './characterReview2';

export class CharacterReviewPage extends React.Component{
  findStatisticByName(name, characterToReview){
    for(let i=0;i<characterToReview.characterStats.length;i++){
      if(characterToReview.characterStats[i].name === name){
        return characterToReview.characterStats[i];
      }
    }
  }

  save(){
    this.props.dispatch(saveAndSubmit());
  }

	render(){
    const saved = this.props.saved;
    const skillList = require('../data/skills');
    let characterToReview = this.props.characterToReview;
    let sizeMod = characterToReview.race.standardRacialTraits.base.size === "small" ? 1 : 0;
    

    if(!saved){
      return(
        <div>
          Character Review          
          <CharacterReview />

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

export default requiresLogin()(connect(mapStateToProps)(CharacterReviewPage));

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
        {(skill.lookupCall(skill.name, skill.characterToReview) ? 
          skill.lookupCall(skill.name, skill.characterToReview).sum.total : 0) + 
          Math.floor((skill.lookupCall(skill.ability, skill.characterToReview).sum.total - 10) / 2) }
        </div>
      </div>
      <button onClick={ () => this.viewDetails(skill.name) }>details</button>
    </div>
  )
}