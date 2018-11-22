import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Landing from './landing';
import PlayerHomePage from './playerHomePage';
import CharacterDetails from './characterDetails';
import NewCharacter from './newCharacter';

import './App.css';

export default function App(props) {  
    return (
        <Router>
            <div className="app">
            {/* <header>
                    <h1></h1>
                </header>*/}
                <main>
                    <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/playerDemo" component={PlayerHomePage} />    
                        <Route exact path="/playerDemo/character/:characterID" component={CharacterDetails} />
                        <Route path="/playerDemo/newCharacter" component={NewCharacter} />                     
                    </Switch>
                </main>
            </div>
        </Router>
    );
}