import React from 'react';
import {connect} from 'react-redux';
import CardFeat from './cardFeat';

import { setExpandedFeatCategory } from '../actions/index';

import './cardFeatCategory.css';

class CardFeatCategory extends React.Component{
	getFeatList(category){
		// this will be an API call, but for now it loops through the list of feats on its own
		const featsList = require('../data/feats');
		let featsListToReturn = [];
		for(let i=0; i<featsList.length; i++){
			if(featsList[i].type.includes(category)){
				//create string for prereqs
				let prereqString = "";
				let prereqStringArray = [];
				if(featsList[i].prerequisites_list){
					for(let j=0;j<featsList[i].prerequisites_list.length;j++){
						//if this is an array, then loop throught that . . .   
						if(Array.isArray(featsList[i].prerequisites_list[j])){
							// this array could be objects (stats)
							// or strings (list of feats)
							if(typeof featsList[i].prerequisites_list[j][0] == 'string'){
								// ok, its the list of feats; loop through and add each element to the prereqString
								let str = featsList[i].prerequisites_list[j].join(", ");
								if(prereqString != ""){
									prereqString += str;
								} else {
									prereqString = str;
								}
							}
							else if(typeof featsList[i].prerequisites_list[j][0] == 'object'){
								// in this case it is an array of stat objects
								for(let k = 0; k<featsList[i].prerequisites_list[j].length;k++){
									let str = Object.values(featsList[i].prerequisites_list[j][k]).join(" ");
									prereqStringArray.push(str);
								}
								let str = prereqStringArray.join(", ")
								if(prereqString != ""){
									prereqString += str;
								} else {
									prereqString = str;
								}
							}
						}
					}
				}

				let feat = {
					"name":featsList[i].name,
					"prerequisites":prereqString,
					"description":featsList[i].description,
				};
				featsListToReturn.push(feat);
			}
		}
		return featsListToReturn;
	}

	show(name){
		// set the name of the expanded category in state
		this.props.dispatch(setExpandedFeatCategory(name));
	}

	hide(name){
		name = "";
		// remove the name of the expanded category in state
		this.props.dispatch(setExpandedFeatCategory(name));
	}

	render(){
		let categoryToExpand ="";
		if(this.props.categoryToExpand){
			categoryToExpand = this.props.categoryToExpand.featCategory;
		} else {
			categoryToExpand = false;
		}
		let thisExpanded = ((categoryToExpand == this.props.name) ? true : false);

		// get the list of feats only if this is expanded
		let featsList = null;
		if(thisExpanded){
			featsList = this.getFeatList(this.props.name);
		}

		return(
			<div>
				<p>{this.props.name}</p>
				<button onClick={() => this.show(this.props.name)} disabled={thisExpanded}>Show</button>
				<button onClick={() => this.hide(this.props.name)} disabled={!thisExpanded}>Hide</button>
				{thisExpanded && featsList.map((feat) => 
					<CardFeat key={feat.name} name={feat.name} prerequisites={feat.prerequisites}
					description={feat.description} />
				)}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	categoryToExpand:state.characterReducer.expanded,

});

export default connect(mapStateToProps)(CardFeatCategory);