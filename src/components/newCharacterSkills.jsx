import React from 'react';
import {connect} from 'react-redux';

import './newCharacterSkills.css';

export class NewCharacterSkills extends React.Component{
	render(){
		const complete = this.props.complete;
		if(!complete){
			return (
		        <div className="newCharacterSkills">
		        	<h1>Character Skills - todo</h1>	
		        </div>
		    );
		} else {
			return(
		        <div className="newCharacterSkills">
		        	<h1>Character Skills - done</h1>	
		        </div>			
			);
		};		
	}
}

const mapStateToProps = state => ({
	complete:state.characterReducer.creationSteps[5].complete,
});

export default connect(mapStateToProps)(NewCharacterSkills);