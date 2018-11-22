import React from 'react';
import {connect} from 'react-redux';

import './newCharacterEquipment.css';

export class NewCharacterEquipment extends React.Component{
	render(){
		const complete = this.props.complete;
		if(!complete){
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
	complete:state.creationSteps[7].complete,
});

export default connect(mapStateToProps)(NewCharacterEquipment);