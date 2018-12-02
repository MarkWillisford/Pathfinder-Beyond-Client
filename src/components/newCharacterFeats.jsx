import React from 'react';
import {connect} from 'react-redux';

import './newCharacterFeats.css';

export class NewCharacterFeats extends React.Component{
	render(){
		const complete = this.props.complete;
		if(!complete){
			return (
		        <div className="newCharacterFeats">
		        	<h1>Character Feats - todo</h1>	
		        </div>
		    );
		} else {
			return(
		        <div className="newCharacterFeats">
		        	<h1>Character Feats - done</h1>	
		        </div>			
			);
		};		
	}
}

const mapStateToProps = state => ({
	complete:state.characterReducer.creationSteps[6].complete,
});

export default connect(mapStateToProps)(NewCharacterFeats);