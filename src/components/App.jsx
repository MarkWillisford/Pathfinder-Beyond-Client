import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import PlayerHomePage from './playerHomePage';
import Landing from './landing';

import './app.css';

export default function App(props) {
    return (
        <Router>
            <div className="app">
            {/* <header>
                    <h1></h1>
                </header>*/}
                <main>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/player/:playerId" component={PlayerHomePage} />                    
                </main>
            </div>
        </Router>
    );
}