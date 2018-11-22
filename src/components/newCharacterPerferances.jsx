import React from 'react';
import {connect} from 'react-redux';

import './newCharacterPerferances.css';

export class NewCharacterPerferances extends React.Component{
	render(){
		const complete = this.props.complete;
		if(!complete){
			return (
		        <div className="newCharacterPerferances">
		        	<h1>Character Basics</h1>
		        	<p>How will this character advance? 
		        	<select>
		        		<option value="select">Select</option>
		        		<option value="slow">Slow</option>
		        		<option value="normal">Normal</option>
		        		<option value="fast">Fast</option>
		        		<option value="story">Story</option>
		        	</select></p>
		        	<p>How will hit points be handled? 
		        	<select>
		        		<option value="select">Select</option>
		        		<option value="auto">Roller</option>
		        		<option value="avg">Average</option>
		        		<option value="max">Max</option>
		        		<option value="manual">Manual</option>
		        		<option value="optional">Optional</option>
		        	</select></p>
		        	<p>Will this character use the optional encumberence rules?
		        	<input type="checkbox" name="encumberence" value="encumberence" /></p>
		        	<p>Should we track coin weight?
		        	<input type="checkbox" name="coinWeight" value="coinWeight" /></p>
					<p>Are Monster races allowed?
		        	<input type="checkbox" name="monsterRaces" value="monsterRaces" /></p>
		        	<p>What rules govern the use of templates? 
		        	<select>
		        		<option value="select">Select</option>
		        		<option value="none">None</option>
		        		<option value="level">Level</option>
		        		<option value="crRefunds">CR Refunds</option>
		        	</select></p>
			        	
		        </div>
		    );
		} else {
			return(
		        <div className="newCharacterPerferances">
		        	<h1>Character Basics - done</h1>	
		        </div>			
			);
		};		
	}
}

const mapStateToProps = state => ({
	complete:state.creationSteps[0].complete,
});

export default connect(mapStateToProps)(NewCharacterPerferances);