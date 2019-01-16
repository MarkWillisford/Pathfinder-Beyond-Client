import React from 'react';
import {connect} from 'react-redux';

export class Equipment_StartingEquipment extends React.Component {
	render(){
		return (
			<p>EQ</p>
		)
	}
}

const mapStateToProps = state => ({
	complete:state.characterReducer.creationSteps[3].complete,
})

export default connect(mapStateToProps)(Equipment_StartingEquipment);