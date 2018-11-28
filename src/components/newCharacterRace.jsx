import React from 'react';
import { connect } from 'react-redux';
import RaceCard from './raceCard';

import './newCharacterRace.css';

export class NewCharacterRace extends React.Component{
	handleClick(id){
		console.log(this.props.racesArray[id].name);
	}

	render(){

		const complete = this.props.complete;
		if(!complete){
			// Not complete, get choices and display
			return (
		        <div className="newCharacterRace">
		        	<h1>Character Race - todo</h1>	
{/*		        	{this.props.racesArray.map(({id,thum,name,expand}) => 
		        		<RaceCard key={id} thum={thum} name={name} expand={expand} callback={()=> this.handleClick(id)}/>
		        	)}*/}
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
	complete:state.creationSteps[1].complete,
	racesArray:state.racesArray,
});

export default connect(mapStateToProps)(NewCharacterRace);