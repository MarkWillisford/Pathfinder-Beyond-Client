import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PlayerHomePage from './playerHomePage';
import Landing from './landing';

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
                    </Switch>
                </main>
            </div>
        </Router>
    );
}