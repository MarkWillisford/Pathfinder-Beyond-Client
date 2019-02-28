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
				if(featsList[i].prerequisites){
					// If this is here, it is an array of prereq objects
					for(let j=0;j<featsList[i].prerequisites.length;j++){
						if(featsList[i].prerequisites[j].type === "options"){
							// I know that data is an array of objects, 
							for(let k=0;k<featsList[i].prerequisites[j].data.length;k++){
								if(featsList[i].prerequisites[j].type === "stat"){
									let str1 = Object.values(featsList[i].prerequisites[j].data[k].data).join(" ");
									prereqStringArray.push(str1);					
								} else {
									let str1 = Object.values(featsList[i].prerequisites[j].data[k]).join(" ");
									prereqStringArray.push(str1);			
								}
							}
						} else if(featsList[i].prerequisites[j].type === "stat"){
							// now I know data is an object with "stat" and "value" keys
							let str1 = Object.values(featsList[i].prerequisites[j].data).join(" ");
							prereqStringArray.push(str1);					
						} else {
							// in this situation, I know that 'data' is a string; "paladin", "5", etc
							let str1 = Object.values(featsList[i].prerequisites[j]).join(" ");
							let prereqStringArray = [];
							prereqStringArray.push(str1);						
						}
					}
					let str = prereqStringArray.join(", ")
					if(prereqString != ""){
						prereqString += str;
					} else {
						prereqString = str;
					}	
				}
				let feat = {
					"name":featsList[i].name,
					"prerequisitesString":prereqString,
					"prerequisites":featsList[i].prerequisites,
					"description":featsList[i].description,
					"repeatable":featsList[i].repeatable,
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
				<h2>{this.props.name}</h2>
				<button onClick={() => this.show(this.props.name)} disabled={thisExpanded}>Show</button>
				<button onClick={() => this.hide(this.props.name)} disabled={!thisExpanded}>Hide</button>
				{thisExpanded && featsList.map((feat) => 
					<CardFeat key={feat.name} name={feat.name} prerequisitesString={feat.prerequisitesString}
					description={feat.description} repeatable={feat.repeatable} prerequisites={feat.prerequisites}/>
				)}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	categoryToExpand:state.characterReducer.expanded,

});

export default connect(mapStateToProps)(CardFeatCategory);