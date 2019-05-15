import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import { statIndex } from '../utility/helperFunctions';
import FeatSelectionsForm from './featSelectionsForm';

import { setExpandedFeat } from '../actions/index';
import { submitFeatToState } from '../actions/index';
import { setSelections } from '../actions/index';
import { setStepToComplete } from '../actions/index';

export class CardFeat extends React.Component{
	getFeatDetails(name){
		// this will be an API call, but for now it searches the list and retreaves feat details
		const featsList = this.props.featsList //require('../data/feats');
		let featToReturn = featsList.find( feat => feat.name === name);
		return featToReturn;
	}

	show(name){
		// set the name of the expanded feat in state
		this.props.dispatch(setExpandedFeat(name));
	}

	hide(name){
		name = "";
		// remove the name of the expanded category in state
		this.props.dispatch(setExpandedFeat(name));
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

		// I only want to make the feat selection button if the feat prereqs are done and
		// if the user doesn't already have the feat (if it isn't repeatable)
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
			console.log(errorMessage);
		};
		// Are prereques complete?
		if(this.props.prerequisitesString){
			let obj = this.props.prerequisites;
			for(let i=0;i<obj.length;i++){
				let key = obj[i].type;
				// do something with obj[key] which is an array
				switch(key){
					case "race":
						if(this.props.race.localeCompare( obj[i].data , undefined, { sensitivity: 'accent' }) !== 0){							
							selectable = false;
							if(errorMessage != ""){
								errorMessage += ", " + obj[i].type + " must be " + obj[i].data
							} else { errorMessage = obj[i].type + " must be " + obj[i].data};
							//console.log(errorMessage);
						}
					break;
					case "class":
						if(this.props.characterClass.localeCompare( obj[i].data , undefined, { sensitivity: 'accent' }) !== 0){							
							selectable = false;
							if(errorMessage != ""){
								errorMessage += ", " + obj[i].type + " must be " + obj[i].data
							} else { errorMessage = obj[i].type + " must be " + obj[i].data};
							//console.log(errorMessage);
						}
					break;
					case "classFeature":
					break;
					case "level":
					break;
					case "stat":
						if(charStats[statIndex(charStats, obj[i].data.stat)].sum.total < obj[i].data.value){
							selectable = false;
							if(errorMessage != ""){
								errorMessage += ", " + obj[i].data.stat + " must be at least " + obj[i].data.value
							} else { errorMessage = obj[i].data.stat + " must be at least " + obj[i].data.value};
							console.log(errorMessage);
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


		return(
			<div className="cardFeat">
				{!thisExpanded && <CardFeatSummery name={this.props.name}
					prerequisitesString={this.props.prerequisitesString} description={this.props.description}
					hide={() => this.hide(this.props.name)} show={() => this.show(this.props.name)} 
					thisExpanded={thisExpanded} submit={() => this.submitFeatToState(this.props.name)}
					selectable={selectable} showTheseSelections={showTheseSelections}/> }
				{thisExpanded && <CardFeatExpanded feat={featDetails} prerequisitesString={this.props.prerequisitesString}
					hide={() => this.hide(this.props.name)} show={() => this.show(this.props.name)} 
					thisExpanded={thisExpanded} submit={() => this.submitFeatToState(this.props.name)}
					selectable={selectable} showTheseSelections={showTheseSelections}/>}
			</div>
		)	
	}	
}

function CardFeatSummery(props){
	if(!props.showTheseSelections){
		return(
			<div>
				<h3 className="featName">{props.name}</h3>
				<div className="featPrerequisites">{props.prerequisitesString}</div>
				<div className="featDescription">{props.description}</div>
				<button onClick={() => props.show()} disabled={props.thisExpanded}>Show Details</button>
				<button onClick={() => props.hide()} disabled={!props.thisExpanded}>Hide Details</button>
				<button onClick={() => props.submit()} disabled={!props.selectable}>Select</button>
			</div>
		)
	} else {
		return(
			<div>
				<h3 className="featName">{props.name}</h3>
				<FeatSelectionsForm name={props.name}/>
			</div>
		)
	}
}

function CardFeatExpanded(props){
	let special = (props.feat.special == "" || props.feat.special == null) ? false : true;
	let normal = (props.feat.normal == "" || props.feat.normal == null) ? false : true;
	
	if(!props.showTheseSelections){
		return(
			<div className="featExpandedTrue">
				<h3 className="featName">{props.feat.name}</h3>
				<button onClick={() => props.show()} disabled={props.thisExpanded}>Show Details</button>
				<button onClick={() => props.hide()} disabled={!props.thisExpanded}>Hide Details</button>
				<button onClick={() => props.submit()} disabled={!props.selectable}>Select</button>
				<div className="featDescription">{props.feat.description}</div>
				<div className="featPrerequisites"><strong>Prerequisite(s): </strong>{props.prerequisitesString}</div>
				<div className="featBenefit"><strong>Benefit: </strong>{props.feat.benefit}</div>
				{normal && <div><strong>Normal: </strong>{props.feat.normal}</div>}
				{special && <div><strong>Special: </strong>{props.feat.special}</div>}
				<button onClick={() => props.show()} disabled={props.thisExpanded}>Show Details</button>
				<button onClick={() => props.hide()} disabled={!props.thisExpanded}>Hide Details</button>
				<button onClick={() => props.submit()} disabled={!props.selectable}>Select</button>
			</div>
		)
	} else {
		return(
			<div>
				<h3 className="featName">{props.feat.name}</h3>
				<FeatSelectionsForm name={props.feat.name}/>
			</div>
		)		
	}
}

const mapStateToProps = state => ({
	featToExpand:state.characterReducer.expanded,
	feats:state.characterReducer.newCharacter.featSlots,
	charStats:state.characterReducer.newCharacter.characterStats,
	showSelections:state.characterReducer.selections,
	characterClass:state.characterReducer.newCharacter.charClass.name,
	race:state.characterReducer.newCharacter.race.name,
  featsList:state.protectedData.data,
});

export default connect(mapStateToProps)(CardFeat);