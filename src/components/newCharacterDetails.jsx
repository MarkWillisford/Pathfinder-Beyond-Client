import React from 'react';
import {connect} from 'react-redux';

import './newCharacterDetails.css';

export class NewCharacterDetails extends React.Component{
	render(){
		const complete = this.props.complete;
		if(!complete){
			return (
		        <div className="newCharacterDetails">
		        	<h1>Character Details - todo</h1>	
		        </div>
		    );
		} else {
			return(
		        <div className="newCharacterDetails">
		        	<h1>Character Details - done</h1>	
		        </div>			
			);
		};		
	}
}

const mapStateToProps = state => ({
	complete:state.characterReducer.creationSteps[4].complete,
});

export default connect(mapStateToProps)(NewCharacterDetails);