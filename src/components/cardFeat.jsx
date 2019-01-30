import React from 'react';
import {connect} from 'react-redux';
import { capitalizeFirstLetter, arrayToSentence } from '../utility/helperFunctions';

import { setExpandedFeat } from '../actions/index';
import { submitFeatToState } from '../actions/index';

export class CardFeat extends React.Component{
	getFeatDetails(name){
		// this will be an API call, but for now it searches the list and retreaves feat details
		const featsList = require('../data/feats');
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
		// 1.) If there are any selections required we need to get those from 
		// the user, 
		let selections = null;
		if(feat.selections){
			console.log("hi");
		}

		this.props.dispatch(submitFeatToState(feat));
	}

	render(){
		let feats = this.props.feats;
		let featToExpand ="";
		if(this.props.featToExpand){
			featToExpand = this.props.featToExpand.feat;
		} else {
			featToExpand = false;
		}
		let thisExpanded = ((featToExpand == this.props.name) ? true : false);

		// get the list of feats only if this is expanded
		let featDetails = null;
		if(thisExpanded){
			featDetails = this.getFeatDetails(this.props.name);
		}

		// I only want to make the feat selection button if the feat prereqs are done and
		// if the user doesn't already have the feat (if it isn't repeatable)
		let selectable = true;
		let errorMessage = "";
		// Is feat repeatable if I already have it?
		if(feats && !this.props.repeatable){	// I already have it AND it isn't repeatable
			selectable = false;
			errorMessage = "Feat is already selected";
		};
		// Are prereques complete?
		if(this.props.prerequisitesString){
			let obj = this.props.prerequisites;
			console.log(obj);
			for(let i=0;i<obj.length;i++){
				let key = obj[i].type;
				   // do something with obj[key] which is an array
				switch(key){
					case "race":
					break;
					case "class":
					break;
					case "classFeature":
					break;
					case "level":
					break;
					case "stat":
						console.log(obj[i]);
						console.log(obj[i].data);	// object with stat and value
						console.log("prereq is: ");
						console.log("a " + obj[i].data.stat);
						console.log("with a score of "+ obj[i].data.value);
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
					thisExpanded={thisExpanded} submit={() => this.submitFeatToState(this.props.name)}/> }
				{thisExpanded && <CardFeatExpanded feat={featDetails} prerequisitesString={this.props.prerequisitesString}
					hide={() => this.hide(this.props.name)} show={() => this.show(this.props.name)} 
					thisExpanded={thisExpanded} submit={() => this.submitFeatToState(this.props.name)}/>}
			</div>
		)	
	}	
}

function CardFeatSummery(props){
	return(
		<div>
			<h3 className="featName">{props.name}</h3>
			<div className="featPrerequisites">{props.prerequisitesString}</div>
			<div className="featDescription">{props.description}</div>
			<button onClick={() => props.show()} disabled={props.thisExpanded}>Show Details</button>
			<button onClick={() => props.hide()} disabled={!props.thisExpanded}>Hide Details</button>
			<button onClick={() => props.submit()}>Select</button>
		</div>
	)
}

function CardFeatExpanded(props){
	let special = (props.feat.special == "" || props.feat.special == null) ? false : true;
	let normal = (props.feat.normal == "" || props.feat.normal == null) ? false : true;
	return(
		<div className="featExpandedTrue">
			<h3 className="featName">{props.feat.name}</h3>
			<button onClick={() => props.show()} disabled={props.thisExpanded}>Show Details</button>
			<button onClick={() => props.hide()} disabled={!props.thisExpanded}>Hide Details</button>
			<button onClick={() => props.submit()}>Select</button>
			<div className="featDescription">{props.feat.description}</div>
			<div className="featPrerequisites"><strong>Prerequisite(s): </strong>{props.prerequisitesString}</div>
			<div className="featBenefit"><strong>Benefit: </strong>{props.feat.benefit}</div>
			{normal && <div><strong>Normal: </strong>{props.feat.normal}</div>}
			{special && <div><strong>Special: </strong>{props.feat.special}</div>}
			<button onClick={() => props.show()} disabled={props.thisExpanded}>Show Details</button>
			<button onClick={() => props.hide()} disabled={!props.thisExpanded}>Hide Details</button>
			<button onClick={() => props.submit()}>Select</button>
		</div>
	)
}

const mapStateToProps = state => ({
	featToExpand:state.characterReducer.expanded,
	feats:state.characterReducer.newCharacter.feats,
});

export default connect(mapStateToProps)(CardFeat);