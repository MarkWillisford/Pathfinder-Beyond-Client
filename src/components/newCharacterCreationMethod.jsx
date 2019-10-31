import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {loadCreationSteps} from '../actions/index';

export class NewCharacterCreationMethod extends React.Component{
    loadCreationSteps(){ 
		  this.props.dispatch(loadCreationSteps()); 		
    }
    
    render(){
    	return (
            <div className="newCharacterCreationMethod">
            	<h2>Select a method of character creation</h2>
            	<Link to={"/playerDemo/newCharacter/home"} onClick={this.loadCreationSteps.bind(this)}>
            		<div className="standardCharacterCreation">
            			<h3>Standard</h3>
            			<p>The player selects the normal choices and is in complete control of the character creation process</p>
            		</div>
            	</Link>
            	<Link to={"/playerDemo/newCharacter/quickBuild"} >
            		<div className="quickCharacterCreation">
            			<h3>Quick</h3>
            			<p>The player selects the Race / Subrace and Class / Archetype and we build a character for you</p>
            		</div>
            	</Link>
            </div>
        );
    }
}

export default connect()(NewCharacterCreationMethod);