import React from 'react';
import {connect} from 'react-redux';

import './newCharacterClass.css';

export class NewCharacterClass extends React.Component{
	render(){
		const complete = this.props.complete;
		if(!complete){
			return (
		        <div className="newCharacterClass">
		        	<h1>Character Class - todo</h1>	
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
});

export default connect(mapStateToProps)(NewCharacterClass);