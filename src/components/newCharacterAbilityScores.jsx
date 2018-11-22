import React from 'react';
import {connect} from 'react-redux';

import './newCharacterAbilityScores.css';

export class NewCharacterAbilityScores extends React.Component{
	render(){
		const complete = this.props.complete;
		if(!complete){
			return (
		        <div className="newCharacterAbilityScores">
		        	<h1>Character Ability Scores - todo</h1>	
		        </div>
		    );
		} else {
			return(
		        <div className="newCharacterAbilityScores">
		        	<h1>Character Ability Scores - done</h1>	
		        </div>			
			);
		};		
	}
}

const mapStateToProps = state => ({
	complete:state.creationSteps[3].complete,
});

export default connect(mapStateToProps)(NewCharacterAbilityScores);