import React from 'react';
import {connect} from 'react-redux';

import './newCharacterEquipment.css';

export class NewCharacterEquipment extends React.Component{
	render(){
		const complete = this.props.complete;
		const help = this.props.help;

		// first here we must check to ensure that race, class, and ability scores are complete. 
		// If not, we display an error message directing the user to complete those pages before 
		// continuing. 
		if( !(this.props.race && this.props.charClass && this.props.abilityScores) ){
			return ( <h1>NOT READY</h1> )
		} else if(help){
			// if help is true, that screen is displayed
			return ( <h1>HELP</h1> );
		} else if(!complete){
			return (
		        <div className="newCharacterEquipment">
		        	<h1>Character Equipment - todo</h1>	
		        </div>
		    );
		} else {
			return(
		        <div className="newCharacterEquipment">
		        	<h1>Character Equipment - done</h1>	
		        </div>			
			);
		};		
	}
}

const mapStateToProps = state => ({
	complete:state.characterReducer.creationSteps[7].complete,
	help:state.characterReducer.help,
	race:state.characterReducer.creationSteps[1].complete,
	charClass:state.characterReducer.creationSteps[2].complete,
	abilityScores:state.characterReducer.creationSteps[3].complete,
});

export default connect(mapStateToProps)(NewCharacterEquipment);