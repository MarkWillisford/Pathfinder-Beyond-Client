import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import { statIndex } from '../utility/helperFunctions';
import FeatSelectionsForm from './featSelectionsForm';
import { capitalizeFirstLetter} from '../utility/helperFunctions';

import { setExpandedFeat } from '../actions/index';
import { submitFeatToState } from '../actions/index';
import { setSelections } from '../actions/index';
import { setStepToComplete } from '../actions/index';

import './cardFeat.css';

export class CardFeat extends React.Component{
	getFeatDetails(name){
		const featsList = this.props.featsList 
		let featToReturn = featsList.find( feat => feat.name === name);
		return featToReturn;
	}

	submitFeatToState(name){
		let feat = this.getFeatDetails(name);
		// We now have the feat the user selected;
		// If there are any selections required we need to get those from 
		// the user, 
		if(feat.selections){
			// If the feat has selections, then toggle the flag, displaying the selection radios
			this.props.dispatch(setSelections(name));
		} else {
			// check to see if there is exactly 1 feat slot object with a selection of "null"
			let remainingSlots = (this.props.feats.filter(f => f.selection === null));
			let lastFeatSelected = false;
			if(remainingSlots.length === 1){
				lastFeatSelected = true;
			};

      // If the feat doesn't have selections then submit. 
      console.log(feat);
			this.props.dispatch(submitFeatToState(feat));  

			// Finaly if the last feat has been selected, set the step to complete. 
			if(lastFeatSelected){
				this.props.dispatch(setStepToComplete(6));
			}
		}
	}

	render(){
		let feats = this.props.feats; // An array of feat slot objects { type: "category", selection: "feat name"}
		let featToExpand ="";
		let showSelections = "";
		let charStats = this.props.charStats;
		if(this.props.featToExpand){
			featToExpand = this.props.featToExpand.feat;
		} else {
			featToExpand = false;
		}
		if(this.props.showSelections){
			showSelections = this.props.showSelections
		} else {
			showSelections = false;
		}
		let thisExpanded = ((featToExpand == this.props.name) ? true : false);
		let showTheseSelections = ((showSelections == this.props.name) ? true : false);

		// get the list of feats only if this is expanded
		let featDetails = null;
		if(thisExpanded){
			featDetails = this.getFeatDetails(this.props.name);
		}

    // check if the user has the feat and if so, is it repeatable?
		let selectable = true;
		let errorMessage = "";
		// do I already have the feat?
		let found = false;
		for(let i=0;i<feats.length;i++){
			if(feats[i].selection){
				if(feats[i].selection.name === this.props.name){
					found = true;
				}
			}
		}
    if(found && !this.props.repeatable){	// I already have it AND it isn't repeatable
			selectable = false;
			errorMessage = "Feat is already selected";
		};

    // Are prereques complete?
    if(this.props.prerequisites){
      if(this.props.prerequisites.length > 0){
        let obj = this.props.prerequisites;
        for(let i=0;i<obj.length;i++){
          let key = obj[i].type;
          // do something with obj[key] which is an array
          switch(key){
            case "race":
              if(this.props.race){
                if(this.props.race.localeCompare( obj[i].data , undefined, { sensitivity: 'accent' }) !== 0){							
                  selectable = false;
                  if(errorMessage != ""){
                    errorMessage += ", " + capitalizeFirstLetter(obj[i].type) + " must be " + obj[i].data
                  } else { errorMessage = capitalizeFirstLetter(obj[i].type) + " must be " + obj[i].data}
                }
              } else {
                selectable = false;
                if(errorMessage != ""){
                  errorMessage += ", " + capitalizeFirstLetter(obj[i].type) + " must be " + obj[i].data
                } else { errorMessage = capitalizeFirstLetter(obj[i].type) + " must be " + obj[i].data}
              }
            break;
            case "class":
              if(this.props.characterClass){
                if(this.props.characterClass.localeCompare( obj[i].data , undefined, { sensitivity: 'accent' }) !== 0){							
                  selectable = false;
                  if(errorMessage != ""){
                    errorMessage += ", " + capitalizeFirstLetter(obj[i].type) + " must be " + obj[i].data
                  } else { errorMessage = capitalizeFirstLetter(obj[i].type) + " must be " + obj[i].data};
                }
              } else { 
                selectable = false;
                if(errorMessage != ""){
                  errorMessage += ", " + capitalizeFirstLetter(obj[i].type) + " must be " + obj[i].data
                } else { errorMessage = capitalizeFirstLetter(obj[i].type) + " must be " + obj[i].data}; 
              }
            break;
            case "classFeature":
            break;
            case "level":
            break;
            case "stat":
              if(charStats[statIndex(charStats, obj[i].data.stat)]){
                if(charStats[statIndex(charStats, obj[i].data.stat)].sum.total < obj[i].data.value){
                  selectable = false;
                  if(errorMessage != ""){
                    errorMessage += ", " + capitalizeFirstLetter(obj[i].data.stat) + " must be at least " + obj[i].data.value
                  } else { errorMessage = capitalizeFirstLetter(obj[i].data.stat) + " must be at least " + obj[i].data.value};
                }
              } else {
                selectable = false;
                if(errorMessage != ""){
                  errorMessage += ", " + capitalizeFirstLetter(obj[i].data.stat) + " must be at least " + obj[i].data.value
                } else { errorMessage = capitalizeFirstLetter(obj[i].data.stat) + " must be at least " + obj[i].data.value};
              }
            break;
            case "feat":
            break;
            case "options":
            break;
            default:
          };
        } 
      }
    }

    let featCardClassName = "featCard";
    let featDivClassName = "featDiv";
    let featFlexContainerName = "featCardFlexContianer";
    let featButtonsClassname = "featButtons";
    if(thisExpanded){
      featCardClassName += " expanded";
      featDivClassName += " expanded";
      featFlexContainerName += " expanded";
      featButtonsClassname += " expanded";
    }

		return(
			<div className={featCardClassName}>
        <div className={featFlexContainerName}>
          <div className={featDivClassName}>
            <div className="featName">{capitalizeFirstLetter(this.props.name)}</div>
            <div className="errorMessage">{errorMessage}</div>
          </div>
          <div className="featDescriptionAndButtons">
            <div className="featDescription">{this.props.description}</div>
            <div className={featButtonsClassname}>
              {!thisExpanded && <button onClick={this.props.callback}>Show Details</button>}
              {thisExpanded && <button onClick={this.props.callback}>Hide Details</button>}
              <button onClick={() => this.submitFeatToState(this.props.name)} disabled={!selectable || showTheseSelections}>Select</button>
            </div>
          </div>
          {thisExpanded && <CardFeatExpanded feat={featDetails} prerequisites={this.props.prerequisites}
            /* hide={() => this.hide(this.props.name)} show={() => this.show(this.props.name)} */ 
            thisExpanded={thisExpanded} submit={() => this.submitFeatToState(this.props.name)}
            hide={() => this.hide()} selectable={selectable} showTheseSelections={showTheseSelections} 
            errorMessage={errorMessage}/>}
          {showTheseSelections && <FeatSelectionsForm name={this.props.name}/>}
        </div>				
			</div>
		)
	}	
}

function CardFeatExpanded(props){
	let special = (props.feat.special == "" || props.feat.special == null) ? false : true;
	let normal = (props.feat.normal == "" || props.feat.normal == null) ? false : true;
  let prereq = props.prerequisites ? props.prerequisites.toString() : null;

  return(
    <div className="featExpanded">
      <div className="featPrerequisites"><strong>Prerequisite(s): </strong></div>
      <div className="featBenefit"><strong>Benefit: </strong>{props.feat.benefit}</div>
      {normal && <div><strong>Normal: </strong>{props.feat.normal}</div>}
      {special && <div><strong>Special: </strong>{props.feat.special}</div>}
      {/* <button onClick={() => props.show()} disabled={props.thisExpanded}>Show Details</button>
      <button onClick={() => props.hide()} disabled={!props.thisExpanded}>Hide Details</button>
        */}<button onClick={() => props.submit()} disabled={!props.selectable}>Select</button>
    </div>
  )
}

const mapStateToProps = state => ({
	featToExpand:state.characterReducer.expanded,
	feats:state.characterReducer.newCharacter.featSlots,
	charStats:state.characterReducer.newCharacter.characterStats,
	showSelections:state.characterReducer.selections,
	characterClass:state.characterReducer.newCharacter.charClass.name,
	race: state.characterReducer.newCharacter.race ? state.characterReducer.newCharacter.race.name : null,
  featsList:state.protectedData.data,
});

export default connect(mapStateToProps)(CardFeat);