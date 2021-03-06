import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NewCharacterContainer from './newCharacterContainer';
import LandingPage from './landingPage';
import Dashboard from './dashboard';
import RegistrationPage from './registrationPage';
import NavBar from './navBar';
import './App.css';

export default function App(props) {
  return (
  <Router>
    <div className="app">
      <main className="main">
        <NavBar />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/register" component={RegistrationPage} />
        <Route path="/newCharacter/" component={NewCharacterContainer} />
      </main>
    </div>
  </Router>        
  );
}