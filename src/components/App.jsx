import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import NewCharacterContainer from './newCharacterContainer';
import LandingPage from './landingPage';
import Dashboard from './dashboard';
import RegistrationPage from './registrationPage';
import CharacterReview from './characterReview';
import NavBar from './navBar';
import './App.css';

export default function App(props) {
  return (
  <Router>
    {/* <div className="app">
      <main>
        <Switch>
          <Redirect exact push from='/' to="/playerDemo/newCharacter/"  />
          <Route path="/playerDemo/newCharacter/" component={NewCharacterContainer} />                     
        </Switch>
      </main>
    </div> */}
    <div className="app">
      <main>
        <NavBar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/register" component={RegistrationPage} />
          <Route exact path="/review" component={CharacterReview} />
          <Route path="/newCharacter/" component={NewCharacterContainer} />
        </Switch>
      </main>
    </div>
  </Router>        
  );
}

// https://blooming-crag-44038.herokuapp.com/playerDemo/newCharacter/home