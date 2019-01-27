import React from 'react';
import {connect} from 'react-redux';
import { capitalizeFirstLetter, arrayToSentence } from '../utility/helperFunctions';

import { setExpandedFeat } from '../actions/index';

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
			console.log(featDetails);
		}

		return(
			<div className="cardFeat">
				<div className="featExpandedFalse">
					<div className="featName">{this.props.name}</div>
					<div className="featPrerequisites">{this.props.prerequisites}</div>
					<div className="featDescription">{this.props.description}</div>
					<button onClick={() => this.show(this.props.name)} disabled={thisExpanded}>Show Details</button>
					<button onClick={() => this.hide(this.props.name)} disabled={!thisExpanded}>Hide Details</button>
					
					{thisExpanded && <CardFeatExpanded feat={featDetails}/>}

				</div>
			</div>
		)	
	}	
}

function CardFeatExpanded(props){
	return(
		<div className="featExpandedTrue">EXPANDED WITH DETAILS!</div>
	)
}

const mapStateToProps = state => ({
	featToExpand:state.characterReducer.expanded,

});

export default connect(mapStateToProps)(CardFeat);