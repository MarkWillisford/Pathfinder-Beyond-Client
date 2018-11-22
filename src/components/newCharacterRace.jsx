import React from 'react';
import {connect} from 'react-redux';

import './newCharacterRace.css';

export class NewCharacterRace extends React.Component{
	render(){
		const complete = this.props.complete;
		if(!complete){
			return (
		        <div className="newCharacterRace">
		        	<h1>Character Race - todo</h1>	
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
});

export default connect(mapStateToProps)(NewCharacterRace);