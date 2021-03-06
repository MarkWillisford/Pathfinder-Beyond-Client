import React from 'react';
import {connect} from 'react-redux';
import { fetchProtectedData, clearData } from '../actions/protectedData';
import { resetCompletedStep, setExpandedFeat } from '../actions/index';
import { setFeatFilter, clearFeatFilter } from '../actions/index';
import { clearFeats } from '../actions/index';
import { capitalizeFirstLetter} from '../utility/helperFunctions';

import CharacterReview from './characterReview2';
import CardFeat from './cardFeat'; 

import './newCharacterFeats.css';

export class NewCharacterFeats extends React.Component{	   
  componentDidUpdate() {
    let element = document.getElementsByClassName("expanded")[0];
    if(!element){
      element = document.getElementsByClassName("title")[0];
    } else {
      element = element.previousSibling;
    }
    
    element.scrollIntoView({behavior: 'smooth'});
  }

  componentDidMount(){
    this.props.dispatch(clearData());
    this.props.dispatch(fetchProtectedData("feats"));
  }

	getCategoryList(){
    let featsList = this.props.featsList ? this.props.featsList : []; 
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
 
  dispatchResetCompletedStep(){
    this.props.dispatch(resetCompletedStep(6));
    this.props.dispatch(clearFeats(this.props.featSlots.length));
  }

  filterFeats(category){
    if(category !== "All"){
      this.props.dispatch(setFeatFilter(category));
    } else if(category === "All"){
      this.props.dispatch(clearFeatFilter());
    }
  }

  showExpandedFeat(name){
    let toExpand = "";
    if(this.props.toExpand){
      if(this.props.toExpand.feat){
        toExpand = this.props.toExpand.feat;
      }
    }	
    
    if(toExpand === name){
      name = "";
    }
    this.props.dispatch(setExpandedFeat(name));
  }
  
	render(){ 
		const complete = this.props.complete;
    const help = this.props.help;
    const featFilter = this.props.featFilter ? this.props.featFilter : null;
    const featsList = this.props.featsList;
    let featCategories = (featsList[0] && featsList[0].hasOwnProperty("repeatable")) ? this.getCategoryList() : []; // this.getCategoryList() // 
    let filteredFeatsList = [];

		let toExpand = "";
		if(this.props.toExpand){
			if(this.props.toExpand.feat){
				toExpand = this.props.toExpand.feat;
			}
    }	
    
    // filter the feats list based on the filter selected by the user
    if(featsList[0] && featsList[0].hasOwnProperty("repeatable")){
      if(!featFilter){
        filteredFeatsList = featsList;
      } else {
        for(let i=0;i<featsList.length;i++){
          if(featsList[i].type.includes(featFilter)){
            filteredFeatsList.push(featsList[i]);
          }
        }
      }
    }

    // sort
    filteredFeatsList.sort((a, b) => (a.name > b.name) ? (1) : (-1));

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
		} else if(!complete){
			return (
        <div className="newCharacterFeats">
          <div className="featHeader">
            <h1>Character Feats</h1>
            <select ref="featCategorySelection" onChange={() => this.filterFeats(this.refs.featCategorySelection.value)}>
              <option value="All">All</option>
              {featCategories && featCategories.map((category) =>
                <option key={category} value={category}>{capitalizeFirstLetter(category)}</option>
              )}
            </select>
          </div>
          <div className="featDisplay">
            <div className="placeholderForScrolling"></div>
            {filteredFeatsList.map((feat) => 
              <CardFeat key={feat.name} name={feat.name} description={feat.description} 
              repeatable={feat.repeatable} prerequisites={feat.prerequisites}
              callback={()=> this.showExpandedFeat(feat.name)} expand={ toExpand === feat.name ? true : false }/>  
            )}
          </div>
        </div>
      );
		} else {
			return(
        <div className="newCharacterFeats">
          <CharacterReview resetCallback={()=>this.dispatchResetCompletedStep()} page={"Feats"}/>
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
  featFilter:state.characterReducer.featFilter,
  toExpand:state.characterReducer.expanded, 
  featSlots:state.characterReducer.newCharacter.featSlots,
});

export default connect(mapStateToProps)(NewCharacterFeats);