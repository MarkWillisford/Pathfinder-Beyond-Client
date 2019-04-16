import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import NewCharacterCreationMethod from './newCharacterCreationMethod';
import QuickBuild from './quickBuild';
import NewCharacterContainer from './newCharacterContainer';

import TestingRoutes from './testingRoutes';

import './newCharacter.css';

export class NewCharacter extends React.Component{
	render(){
		return (
	        <Router>
		        <div className="newCharacter">
					    <Route exact path="/playerDemo/newCharacter" component={NewCharacterCreationMethod} />
		        	<Route exact path="/playerDemo/testingRoutes" component={TestingRoutes} />
		        	<Route exact path="/playerDemo/newCharacter/quickBuild" component={QuickBuild} />
		        	<Route exact path="/playerDemo/newCharacter/home" component={NewCharacterContainer} /> 
		        </div>
	        </Router>
	    );
	}
}

export default connect()(NewCharacter);