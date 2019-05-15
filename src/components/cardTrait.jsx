import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import { sumbmitTraitToState } from '../actions/index';
import { setTraitsToComplete } from '../actions/index';
import { setExpandedTraitCategory } from '../actions/index'; 

export class CardTrait extends React.Component{
	sumbmitTraitToState(trait){
        let remainingSlots = (this.props.traits.filter(t => t.selection === null));
			let lastTraitSelected = false;
			if(remainingSlots.length === 1){
				lastTraitSelected = true;
			};
        this.props.dispatch(sumbmitTraitToState(trait));
        if(lastTraitSelected){
            // disable all options if all of our traits have now been selected.
			this.props.dispatch(setTraitsToComplete()); 
			this.hide();
        }
	}

	hide(){
		let name = "";
		// remove the name of the expanded category in state
		this.props.dispatch(setExpandedTraitCategory(name));
	}

	render(){
        const details = this.props.details;
		let traits = this.props.traits; // An array of trait slot objects { type: "category", selection: "feat name"}
		// I only want to make the trait selection button if the trait prereqs are done and
		// if the user doesn't already have the trait
		let selectable = true;
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
			errorMessage = "Trait is already selected";
		};

        selectable = details ? (details.traitsCompleted ? (details.traitsCompleted === true ? false : selectable) : selectable) : selectable;
        /********************
        * Prereqs
        * ******************/

		/* // I only want to make the trait selection button if the trait prereqs are done and
		// if the user doesn't already have the trait (if it isn't repeatable)
		let selectable = true;
		let errorMessage = "";
		// do I already have the trait?
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
		} */
        
		return(
            <div>
				<h3 className="traitName">{this.props.name}</h3>
				<div className="traitDescription">{this.props.description}</div>
				<button onClick={() => this.sumbmitTraitToState({
                    name:this.props.name, id:this.props.id, description:this.props.description, prerequisites:this.props.prerequisites
                    })} disabled={!selectable}>Select</button>            
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