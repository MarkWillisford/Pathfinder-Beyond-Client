import React from 'react';
import {connect} from 'react-redux';
import CardClass from './cardClass';

import { toggleClassExpand } from '../actions/index';
import { submitClassToState } from '../actions/index';
import { addBonus } from '../actions/index';
import { sumBonus } from '../actions/index';
import { createBonus } from '../utility/statObjectFactories'

import './newCharacterClass.css';

export class NewCharacterClass extends React.Component{
	handleClick(id){
		for(let i=0; i<this.props.classesArray.length;i++){
			// if this is the clicked element toggle it **OR**
			// if this is not the clicked element and it is expanded, toggle it
			if( (i===id) || (i!==id && this.props.classesArray[i].expand === true) ){
				this.props.dispatch(toggleClassExpand(i));
			}
		}
	}

	checkForSelections(id){
		for(let i=0; i<this.props.classesArray.length;i++){
			// find the class object
			if( i===id ){
				let name = this.props.classesArray[i].name;
				switch(name){
					case "cleric":
						console.log("cleric");
						break;
					case "druid":
						console.log("druid");
						break;
					case "ranger":
						console.log("ranger");
						break;
					case "sorcerer":
						console.log("sorcerer");
						break;
					default:
						this.addClass(id);
				}
			}
		}
	}

	addClass(id){
		for(let i=0; i<this.props.classesArray.length;i++){
			// if this is the clicked element toggle it 
			if( i===id ){
				this.props.dispatch(submitClassToState(i));
				let bonus = createBonus({ 
					name:"classBAB", 
					source:"class", 
					stat:"bab", 
					type:"untyped", 
					duration:-1, 
					amount:this.props.classesArray[i].classFeatures.table[1][1] });
				this.props.dispatch(addBonus(bonus));
				this.props.dispatch(sumBonus(bonus));				
			}
		}		
	}

	render(){
		const complete = this.props.complete;
		const help = this.props.help;

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

			// If classSelections has not been toggled then get class options and display

			// Not complete, get choices and display
			return (
		        <div className="newCharacterClass">
		        	<h1>Character Class - todo</h1>	
		        	{this.props.classesArray.map(({id,thum,name,expand,classFeatures}) => 
		        		<CardClass key={id} thum={thum} name={name} expand={expand} features={classFeatures}
		        			callback={()=> this.handleClick(id)} addClassCallback={()=> this.checkForSelections(id)}/>
		        	)}
		        </div>
			)
			
			// If classSelections has been toggled, then get options and display


		} else {
			return(
		        <div className="newCharacterClass">
		        	<h1>Character Class - done</h1>	
		        </div>			
			);
		}		
	}
}

const mapStateToProps = state => ({
	complete:state.characterReducer.creationSteps[2].complete,
	classesArray:state.characterReducer.classesArray,
	help:state.characterReducer.help,
});

export default connect(mapStateToProps)(NewCharacterClass);