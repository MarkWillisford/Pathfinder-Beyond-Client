import React from 'react';
import {connect} from 'react-redux';
import { fetchProtectedData } from '../actions/protectedData';

import CardFeatCategory from './cardFeatCategory';

import './newCharacterFeats.css';

export class NewCharacterFeats extends React.Component{	
  componentDidMount(){
    this.props.dispatch(fetchProtectedData("feats"));
  }

	getCategoryList(){
		// this will be an api call, for now it just loops through the list of feats and
    // returns an array of categories on its own
    console.log('in category list');
    console.log(this.props.featsList);
    let featsList = this.props.featsList ? this.props.featsList : []; //require('../data/feats');
		let featsCategory = [];		// list of categories
    let foundCategory = false;		// flag
		if(featsList.length > 0){
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
    }
		return featsCategory;
	}
 
	render(){ 
		const complete = this.props.complete;
    const help = this.props.help;
    let featsList = (this.props.featsList[0].repeatable) ? this.props.featsList : [];
		let featCategories = (this.props.featsList[0].repeatable) ? this.getCategoryList() : []; 

		// first here we must check to ensure that race, class, and ability scores are complete. 
		// If not, we display an error message directing the user to complete those pages before 
		// continuing. 
		if(help){
			// if help is true, that screen is displayed
			return (
				<div className="">
					<h2>Selecting Feats</h2>
					<p>Some abilities are not tied to your race, class, or skill-things like particularly quick reflexes that allow you to react to danger more swiftly, the ability to craft magic items, the training to deliver powerful strikes with melee weapons, or the knack for deflecting arrows fired at you. These abilities are represented as feats. While some feats are more useful to certain types of characters than others, and many of them have special prerequisites that must be met before they are selected, as a general rule feats represent abilities outside of the normal scope of your character’s race and class. Many of them alter or enhance class abilities or soften class restrictions, while others might apply bonuses to your statistics or grant you the ability to take actions otherwise prohibited to you. By selecting feats, you can customize and adapt your character to be uniquely yours.</p>
				</div>
			);
		} else if( !(this.props.race && this.props.charClass && this.props.abilityScores) ){
			return ( 
				<div>
					<h3>Please finish your race, class and ability score selections before choosing your feats.</h3> 
				</div>
			 )
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

const mapStateToProps = state => ({
	complete:state.characterReducer.creationSteps[6].complete,
	help:state.characterReducer.help,
	race:state.characterReducer.creationSteps[1].complete,
	charClass:state.characterReducer.creationSteps[2].complete,
	abilityScores:state.characterReducer.creationSteps[3].complete,
  featsList:state.protectedData.data,
});

export default connect(mapStateToProps)(NewCharacterFeats);