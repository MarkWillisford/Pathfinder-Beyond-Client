import React from 'react';
import {connect} from 'react-redux';

import CardFeatCategory from './cardFeatCategory';

import './newCharacterFeats.css';

export class NewCharacterFeats extends React.Component{	
	getCategoryList(){
		// this will be an api call, for now it just loops through the list of feats and
		// returns an array of categories on its own
		const featsList = require('../data/feats');
		let featsCategory = [];		// list of categories
		let foundCategory = false;		// flag
		for(let i = 0; i<featsList.length;i++){				// for each feat
			let categoryArray = featsList[i].type;			// get the array of category
			foundCategory = false;							// make sure the marker is false 
			for(let k=0;k<categoryArray.length;k++){		// for each string in our category array we will
				for(let j=0;j<featsCategory.length;j++){		// search the list
					if(featsCategory[j] == categoryArray){		// if the category is found
						foundCategory = true;					// set the marker
					};
				};	
				if(!foundCategory){ 							// if there is no marker, then it is a new category
					featsCategory.push(categoryArray[k]); 			// add it to the list
				};
			};
		};
		return featsCategory;
	}

	render(){
		const complete = this.props.complete;
		const help = this.props.help;
		const featCategories = this.getCategoryList(); 

		// first here we must check to ensure that race, class, and ability scores are complete. 
		// If not, we display an error message directing the user to complete those pages before 
		// continuing. 
		/*if( !(this.props.race && this.props.charClass && this.props.abilityScores) ){
			return ( <h1>NOT READY</h1> )
		} else */if(help){
		// if help is true, that screen is displayed
			return (
				<div className="">
					<h2>Selecting Feats</h2>
					<p>Some abilities are not tied to your race, class, or skill-things like particularly quick reflexes that allow you to react to danger more swiftly, the ability to craft magic items, the training to deliver powerful strikes with melee weapons, or the knack for deflecting arrows fired at you. These abilities are represented as feats. While some feats are more useful to certain types of characters than others, and many of them have special prerequisites that must be met before they are selected, as a general rule feats represent abilities outside of the normal scope of your character’s race and class. Many of them alter or enhance class abilities or soften class restrictions, while others might apply bonuses to your statistics or grant you the ability to take actions otherwise prohibited to you. By selecting feats, you can customize and adapt your character to be uniquely yours.</p>
				</div>
			);
		} else if(!complete){
			return (
		        <div className="newCharacterFeats">
		        	<h1>Character Feats</h1>
		        	{featCategories.map((category) => 
		        		<CardFeatCategory key={category} name={category} />
		        	)}
			    </div>
		    );
		} else {
			return(
		        <div className="newCharacterFeats">
		        	<h1>Character Feats - done</h1>	
		        </div>			
			);
		}	
	}
}

/*class FeatCategory extends React.Component{

	handleClick(name){
		this.getDetails(name);
	}

	getDetails(name){
		// currently static, will be an api call
		const featsList = require('../data/feats');
		let feat = featsList.find( feat => feat.name === name);
		
		console.log(feat);
		// okay, now I have the feat. I need to display additional information
		// toggle the feat.expand. 

	}
		let index = 0;
		let featsToDisplay = [];

		console.log("testing method: ");
		console.log(this.getFeatDetails("Spell Focus"));

		//while(featsToDisplay.length < 3){
		for(let i=0;i<featsList.length;i++){
			if(featsList[index].type.includes(this.props.name)){
				//create string for prereqs
				//featsList[index].prerequisites_list
				let prereqString = "";
				let prereqStringArray = [];
				if(featsList[index].prerequisites_list){
					for(let j=0;j<featsList[index].prerequisites_list.length;j++){
						//if this is an array, then loop throught that . . .   
						if(Array.isArray(featsList[index].prerequisites_list[j])){
							// this array could be objects (stats)
							// or strings (list of feats)
							if(typeof featsList[index].prerequisites_list[j][0] == 'string'){
								// ok, its the list of feats; loop through and add each element to the prereqString
								let str = featsList[index].prerequisites_list[j].join(", ");
								if(prereqString != ""){
									prereqString += str;
								} else {
									prereqString = str;
								}
							}
							else if(typeof featsList[index].prerequisites_list[j][0] == 'object'){
								// in this case it is an array of stat objects
								for(let k = 0; k<featsList[index].prerequisites_list[j].length;k++){
									let str = Object.values(featsList[index].prerequisites_list[j][k]).join(" ");
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
					"name":featsList[index].name,
					"prerequisites":prereqString,
					"description":featsList[index].description,
				};
				featsToDisplay.push(feat);
			}
			index++
		};
		return (
			<div>
				{featsToDisplay.map(({name, prerequisites, description}) => 
					<CardFeat key={name} name={name} prerequisites={prerequisites} description={description} 
					callback={()=> this.handleClick(name)} expand={false}/>
				)}
			</div>
		)
}*/

const mapStateToProps = state => ({
	complete:state.characterReducer.creationSteps[6].complete,
	help:state.characterReducer.help,
	race:state.characterReducer.creationSteps[1].complete,
	charClass:state.characterReducer.creationSteps[2].complete,
	abilityScores:state.characterReducer.creationSteps[3].complete,
});

export default connect(mapStateToProps)(NewCharacterFeats);