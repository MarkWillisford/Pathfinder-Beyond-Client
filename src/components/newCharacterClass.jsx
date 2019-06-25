import React from 'react';
import {connect} from 'react-redux';
import CardClass from './cardClass';

import { toggleClassExpand } from '../actions/index';
import { submitClassToState } from '../actions/index';
import { addBonus } from '../actions/index';
import { sumBonus } from '../actions/index';
import { setClassSelectionsView, removeClassSelectionsView } from '../actions/index';
import { setExpandedClass } from '../actions/index';
import { resetCharClass } from '../actions/index';
import { removeBonus } from '../actions/index';
import { createBonus } from '../utility/statObjectFactories';
import { capitalizeFirstLetter } from '../utility/helperFunctions';
import * as ClassSelections from './classSelectionFiles/';
import { fetchProtectedData, clearData } from '../actions/protectedData';
import CharacterReview from './characterReview2';
import { resetCompletedStep } from '../actions/index';

import './newCharacterClass.css';

export class NewCharacterClass extends React.Component{ 
  componentDidUpdate() {
    let element;
    element = document.getElementsByClassName("expanded")[0];
    if(element){
      element = element.previousSibling;
    } else {
      element = document.getElementsByClassName("top")[0];
      if(element){
      } else {
        element = document.getElementsByClassName("title")[0];
      }
    }
    
    element.scrollIntoView({behavior: 'smooth'});
  }
  
  componentDidMount(){
    this.props.dispatch(clearData());
    this.props.dispatch(fetchProtectedData("charClasses"));
  }

  dispatchResetCompletedStep(){
    const stats = this.props.stats;
    let arrayOfBonusesToRemove = [];

    // reset charClass to initial state
    this.props.dispatch(resetCharClass());

    // look through the stats array for all bonus objects with source === action.bonus.source
    for(let i=0; i<stats.length;i++){
      for(let j=0;j<stats[i].bonuses.length;j++){
        if(stats[i].bonuses[j].source === "class"){
          arrayOfBonusesToRemove.push(stats[i].bonuses[j]);
        }
      }
    }

    for(let i=0;i<arrayOfBonusesToRemove.length;i++){
      this.props.dispatch(removeBonus(arrayOfBonusesToRemove[i]));
      this.props.dispatch(sumBonus(arrayOfBonusesToRemove[i]));
    }

    this.props.dispatch(clearData());
    this.props.dispatch(fetchProtectedData("charClasses"));
    this.props.dispatch(setClassSelectionsView(""));
    this.props.dispatch(resetCompletedStep(2));
  }

	handleClick(_id){
    let nameOfCurrentExpanded = this.props.toExpand ? (this.props.toExpand.charClass ? this.props.toExpand.charClass : null) 
      : null;
    let name = "";

		for(let i=0; i<this.props.classesArray.length;i++){
			// if this is the clicked element toggle it **OR**
      // if this is not the clicked element and it is expanded, toggle it
      if(this.props.classesArray[i]._id ===_id && this.props.classesArray[i].name === nameOfCurrentExpanded){
        name = null;
      }
      if(this.props.classesArray[i]._id === _id && this.props.classesArray[i].name !== nameOfCurrentExpanded){
				name = this.props.classesArray[i].name
      }
    }
		if(name === ""){
			console.log("Error! Couldn't find class")
		}
		this.props.dispatch(setExpandedClass(name));
	}

	checkForSelections(_id){
		for(let i=0; i<this.props.classesArray.length;i++){
      let classToCheck = this.props.classesArray[i];
			// find the class object
			if( classToCheck._id===_id ){
        let name = classToCheck.name;
				switch(name){
					case "cleric":
						this.props.dispatch(setClassSelectionsView("cleric"));
						break;
					case "druid":
						this.props.dispatch(setClassSelectionsView("druid"));
						break;
					case "paladin":
						this.props.dispatch(setClassSelectionsView("paladin"));
						break;
					case "ranger":
						this.props.dispatch(setClassSelectionsView("ranger"));
						break;
					case "sorcerer":
						this.props.dispatch(setClassSelectionsView("sorcerer"));
						break;
					default:
						this.addClass(_id);
				}
			}
		}
	}

	addClass(_id){
		for(let i=0; i<this.props.classesArray.length;i++){
			// if this is the clicked element toggle it 
			if( this.props.classesArray[i]===_id ){
				this.props.dispatch(submitClassToState(this.props.classesArray[i]));
				
        for(let j=1;j<5;j++){
          let bonus = createBonus({ 
            name:"class"+ capitalizeFirstLetter(this.props.classesArray[i].classFeatures.table[0][j]), 
            source:"class", 
            stat:this.props.classesArray[i].classFeatures.table[0][j], 
            type:"untyped", 
            duration:-1, 
            amount:this.props.classesArray[i].classFeatures.table[1][j] });
          this.props.dispatch(addBonus(bonus));
          this.props.dispatch(sumBonus(bonus));
        }

			}
		}		
	}

  removeClass(){
    this.props.dispatch(removeClassSelectionsView());
  }

	render(){
		const complete = this.props.complete;
		const help = this.props.help;
		const classSelections = this.props.classSelections ? this.props.classSelections : "";
		const classesArray = this.props.classesArray;
		let toExpand = "";
		if(this.props.toExpand){
			if(this.props.toExpand.charClass){
				toExpand = this.props.toExpand.charClass;
			}
		}	

		// if help is true, that screen is displayed
		if(help){
			return ( 				
				<div className="classHelp">
					<h2>Choose a Class</h2>
					<p>A character's class in one of his most defining features. It's the source of most of his abilities, and give him a specific role in any adventuring party. As characters overcome challenges, they gain experience points and advance in level and power.</p>
					<h3>Favored Class</h3>
					<p>Each character begins play with a single favored class of his choosing—typically, this is the same class as the one he chooses at 1st level. Whenever a character gains a level in his favored class, he receives either + 1 hit point or + 1 skill rank. The choice of favored class cannot be changed once the character is created, and the choice of gaining a hit point or a skill rank each time a character gains a level (including his first level) cannot be changed once made for a particular level. Prestige classes can never be a favored class.</p>
					<h3>Multiclassing</h3>
					<p>Instead of gaining the abilities granted by the next level in your character's current class, you can instead gain the 1st level abilities of a new class, adding all of those abilities to your existing ones. This is known as "multiclassing."</p>
					<p>Note that there are a number of effects and prerequisites that rely on a character’s level or Hit Dice. Such effects are always based on the total number of levels or Hit Dice a character possesses, not just those from one class. The exception to this is class abilities, most of which are based on the total number of class levels that a character possesses of that particular class.</p>
				</div>
			);
		} 
		else if(!complete){
			if(classSelections.length > 0){
				// If classSelections has been toggled, then get options and display
				switch(classSelections){
					case "cleric":
						return(
							<div>
								<h1 className="top">Cleric customization</h1>
                <button onClick={() => this.removeClass()}>Go Back</button>
								{<ClassSelections.ClassSelectionsCleric />}
							</div>
						)
					case "druid":
						return (
							<div>
								<h1 className="top">Druid customization</h1>
                <button onClick={() => this.removeClass()}>Go Back</button>
								{<ClassSelections.ClassSelectionsDruid />}
							</div>
						)
					case "ranger":
						return (
							<div>
								<h1 className="top">Ranger customization</h1>
                <button onClick={() => this.removeClass()}>Go Back</button>
								{<ClassSelections.ClassSelectionsRanger />}
							</div>
						)
					case "paladin":
						return (
							<div>
								<h1 className="top">Paladin customization</h1>
                <button onClick={() => this.removeClass()}>Go Back</button>
								{<ClassSelections.ClassSelectionsPaladin />}
							</div>
						)
					case "sorcerer":
						return (
							<div>
								<h1 className="top">Sorcerer customization</h1>
                <button onClick={() => this.removeClass()}>Go Back</button>
								{<ClassSelections.ClassSelectionsSorcerer />}
							</div>
						)
					default:
            console.log("here");
				}

			} else {
				// Not complete, with no class needing selections, therefore get choices and display
				return (
					<div className="newCharacterClass">
						<h1>Class</h1>	
						{classesArray.map(({_id,thum,name,classFeatures}) => 
							<CardClass key={_id} thum={thum} name={name} expand={ toExpand === name ? true : false } 
								features={classFeatures} callback={()=> this.handleClick(_id)} 
								addClassCallback={()=> this.checkForSelections(_id)}/>
						)}
					</div>
				)
			}
		} else {
			return(
        <div className="newCharacterClass">
          <h3>Class: {this.props.charClass ? capitalizeFirstLetter(this.props.charClass) : ""} </h3>
          <button onClick={() => this.dispatchResetCompletedStep()}>Edit</button>
          
          <CharacterReview />
        </div>			
			);
		}		
	}
}

const mapStateToProps = state => ({
	complete:state.characterReducer.creationSteps[2].complete,
  //classesArray:require('../data/classes'),
  classesArray:state.protectedData.data,
	help:state.characterReducer.help,
	classSelections:state.characterReducer.classSelectionsView,
	toExpand:state.characterReducer.expanded, 
  charClass:state.characterReducer.newCharacter.charClass.name ? state.characterReducer.newCharacter.charClass.name : null,
  stats:state.characterReducer.newCharacter.characterStats,
});

export default connect(mapStateToProps)(NewCharacterClass);