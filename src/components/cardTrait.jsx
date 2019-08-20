import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import { submitTraitToState, removeTraitFromState } from '../actions/index';
import { setTraitsToComplete, resetTraitsToComplete } from '../actions/index';
import { setExpandedTraitCategory } from '../actions/index'; 
import { capitalizeFirstLetter} from '../utility/helperFunctions';

import './cardTrait.css';

export class CardTrait extends React.Component{
	submitTraitToState(trait){
    let remainingSlots = (this.props.traits.filter(t => t.selection === null));
    let lastTraitSelected = false;
    if(remainingSlots.length === 1){
      lastTraitSelected = true;
    };
    
    let traitObject = {
      id:trait.id,
      name:trait.name,
      category:trait.category,
      description:trait.description,
    }
    this.props.dispatch(submitTraitToState(traitObject));
    if(lastTraitSelected){
      // disable all options and hide the menu if all of our traits have now been selected.
      this.props.dispatch(setTraitsToComplete());
      this.props.hideMenu();
    }
	}  

  clearTraitFromState(trait){
    let traitObject = {
      id:trait.id,
      name:trait.name,
      category:trait.category,
      description:trait.description,
    }
    
    this.props.dispatch(removeTraitFromState(traitObject));
    this.props.dispatch(resetTraitsToComplete());
  }

	hide(){
		let name = "";
		// remove the name of the expanded category in state
		this.props.dispatch(setExpandedTraitCategory(name));
	}

	render(){
    const details = this.props.details;
		let traits = this.props.traits; // An array of trait slot objects { type: "category", selection: "feat name"}
    // I need the selection button disabled if either 1.) the trait is already selected, or 2.) if the user already
    // has a trait from that category
    let selectable = true;
    let deselectable = false;
		let errorMessage = "";
		// do I already have the trait?
		let found = false;
		for(let i=0;i<traits.length;i++){
			if(traits[i].selection){
				if(traits[i].selection.name === this.props.name){
					found = true;
				}
			}
		}
		if(found){	// I already have it
			selectable = false;
      deselectable = true;
			errorMessage = "Trait is selected";
		} else {
      // check Category    
      for(let i=0;i<traits.length;i++){      
        if(traits[i].selection){
          if(traits[i].selection.category === this.props.category){
            found = true;
          }
        }
      }
      if(found){// I already have a trait from that category
        selectable = false;
        errorMessage = "A " + this.props.category + " trait is already selected";
      }
    }

    selectable = details ? (details.traitsCompleted ? (details.traitsCompleted === true ? false : selectable) : selectable) : selectable;
        
        
		return(
      <div className="traitCard">
        <div className="traitCardFlexContainer">
          <div className="traitDiv">
            <div className="traitName">{capitalizeFirstLetter(this.props.name)}</div>
            <div className="errorMessage">{errorMessage}</div>
          </div>
          <div className="traitDescriptionAndButtons">
				    <div className="traitDescription">{this.props.description}</div>
            <div className="traitButtons">
              <button onClick={() => this.submitTraitToState(
                this.props
                //{name:this.props.name, id:this.props.id, description:this.props.description, prerequisites:this.props.prerequisites}
              )} disabled={!selectable}>Select</button>
              <button onClick={() => this.clearTraitFromState(
                this.props
              )} disabled={!deselectable}>Deselect</button>
            </div>
          </div>
        </div>      
			</div>
		)	
	}	
}

const mapStateToProps = state => ({
	traitToExpand:state.characterReducer.expanded,
  traits:state.characterReducer.newCharacter.traitSlots,
  details:state.characterReducer.newCharacter.details,
	showSelections:state.characterReducer.selections,
});

export default connect(mapStateToProps)(CardTrait);