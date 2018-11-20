import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Landing from './landing';
import PlayerHomePage from './playerHomePage';
import CharacterDetails from './characterDetails';

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
                        {/* TODO */}     
                        <Route exact path="/playerDemo/character/:characterID" component={CharacterDetails} />                   
                    </Switch>
                </main>
            </div>
        </Router>
    );
}