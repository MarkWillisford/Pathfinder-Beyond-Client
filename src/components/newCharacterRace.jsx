import React from 'react';
import { connect } from 'react-redux';
import RaceCard from './raceCard';

import { toggleRaceExpand } from '../actions/index';

import './newCharacterRace.css';

export class NewCharacterRace extends React.Component{
	handleClick(id){
		for(let i=0; i<this.props.racesArray.length;i++){
			// if this is the clicked element toggle it **OR**
			// if this is not the clicked element and it is expanded, toggle it
			if( (i===id) || (i!==id && this.props.racesArray[i].expand === true) ){
				this.props.dispatch(toggleRaceExpand(i));
			}
		}
	}

	render(){

		const complete = this.props.complete;
		if(!complete){
			// Not complete, get choices and display
			return (
		        <div className="newCharacterRace">
		        	<h1>Character Race - todo</h1>	
		        	{this.props.racesArray.map(({id,thum,name,expand,standardRacialTraits}) => 
		        		<RaceCard key={id} thum={thum} name={name} expand={expand} traits={standardRacialTraits} callback={()=> this.handleClick(id)} />
		        	)}
		        </div>
		    );
		} else {
			return(
		        <div className="newCharacterRace">
		        	<h1>Character Race - done</h1>	
		        </div>			
			);
		};		
	}
}

const mapStateToProps = state => ({
	complete:state.characterReducer.creationSteps[1].complete,
	racesArray:state.characterReducer.racesArray,
});

export default connect(mapStateToProps)(NewCharacterRace);