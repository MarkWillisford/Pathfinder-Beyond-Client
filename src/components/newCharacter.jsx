import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import NewCharacterCreationMethod from './newCharacterCreationMethod';
import NewCharacterContainer from './newCharacterContainer';

export class NewCharacter extends React.Component{
	render(){
		return (
	        <Router>
		        <div className="newCharacter">
					    <Route exact path="/playerDemo/newCharacter" component={NewCharacterCreationMethod} />
		        	<Route exact path="/playerDemo/newCharacter/home" component={NewCharacterContainer} /> 
		        </div>
	        </Router>
	    );
	}
}

export default connect()(NewCharacter);