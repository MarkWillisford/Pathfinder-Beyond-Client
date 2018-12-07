import React from 'react';
import {connect} from 'react-redux';
import CardClass from './cardClass';

import { toggleClassExpand } from '../actions/index';
import { submitClassToState } from '../actions/index';

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

	addClass(id){
		for(let i=0; i<this.props.classesArray.length;i++){
			// if this is the clicked element toggle it 
			if( i===id ){
				this.props.dispatch(submitClassToState(i));
			}
		}		
	}

	render(){
		const complete = this.props.complete;
		const help = this.props.help;

		// if help is true, that screen is displayed
		if(help){
			return ( <h1>HELP</h1> );
		} 
		else if(!complete){
			// Not complete, get choices and display
			return (
		        <div className="newCharacterClass">
		        	<h1>Character Class - todo</h1>	
		        	{this.props.classesArray.map(({id,thum,name,expand,classFeatures}) => 
		        		<CardClass key={id} thum={thum} name={name} expand={expand} features={classFeatures}
		        			callback={()=> this.handleClick(id)} addClassCallback={()=> this.addClass(id)}/>
		        	)}
		        </div>
		    );
		} else {
			return(
		        <div className="newCharacterClass">
		        	<h1>Character Class - done</h1>	
		        </div>			
			);
		};		
	}
}

const mapStateToProps = state => ({
	complete:state.characterReducer.creationSteps[2].complete,
	classesArray:state.characterReducer.classesArray,
	help:state.characterReducer.help,
});

export default connect(mapStateToProps)(NewCharacterClass);