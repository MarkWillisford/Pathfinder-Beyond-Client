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

		// 2.) If the feat is not reapeatable (like power attack) we need to 
		// varify that the character doesn't already have the feat.

		// 3.) If all the available feat slots have been filled we need to set 
		// feats task to completed. 
		this.props.dispatch(submitFeatToState(feat));
	}

	render(){
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

		return(
			<div className="cardFeat">
				{!thisExpanded && <CardFeatSummery name={this.props.name}
					prerequisites={this.props.prerequisites} description={this.props.description}
					hide={() => this.hide(this.props.name)} show={() => this.show(this.props.name)} 
					thisExpanded={thisExpanded} submit={() => this.submitFeatToState(this.props.name)}/> }
				{thisExpanded && <CardFeatExpanded feat={featDetails} prerequisites={this.props.prerequisites}
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
			<div className="featPrerequisites">{props.prerequisites}</div>
			<div className="featDescription">{props.description}</div>
			<button onClick={() => props.show()} disabled={props.thisExpanded}>Show Details</button>
			<button onClick={() => props.hide()} disabled={!props.thisExpanded}>Hide Details</button>
			<button onClick={() => props.submit()}>Select</button>
		</div>
	)
}

function CardFeatExpanded(props){
	console.log(props.feat);
	let special = (props.feat.special == "" || props.feat.special == null) ? false : true;
	let normal = (props.feat.normal == "" || props.feat.normal == null) ? false : true;
	return(
		<div className="featExpandedTrue">
			<h3 className="featName">{props.feat.name}</h3>
			<button onClick={() => props.show()} disabled={props.thisExpanded}>Show Details</button>
			<button onClick={() => props.hide()} disabled={!props.thisExpanded}>Hide Details</button>
			<button onClick={() => props.submit()}>Select</button>
			<div className="featDescription">{props.feat.description}</div>
			<div className="featPrerequisites"><strong>Prerequisite(s): </strong>{props.prerequisites}</div>
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

});

export default connect(mapStateToProps)(CardFeat);