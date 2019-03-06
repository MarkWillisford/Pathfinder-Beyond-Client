import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import NewCharacterContainer from './newCharacterContainer';

import './App.css';

export default function App(props) {
    return (
    <Router>
        <div className="app">
            <main>
                <Switch>
                    <Redirect exact push from='/' to="/playerDemo/newCharacter/home"  />
                    <Route exact path="/playerDemo/newCharacter/home" component={NewCharacterContainer} />                     
                </Switch>
            </main>
        </div>
        {/* <Router>
            <div className="app">
             <header>
                    <h1></h1>
                </header>
                <main>
                    <Switch>
                        
                        <Route exact path="/" render={() => <Redirect to="/playerDemo/newCharacter/home" />} />
		        	    <Route exact path="/playerDemo/newCharacter/home" component={NewCharacterContainer} /> 
		        		
                    </Switch>
                </main>
            </div>
        </Router> */}
    </Router>        
    );
}

// https://blooming-crag-44038.herokuapp.com/playerDemo/newCharacter/home