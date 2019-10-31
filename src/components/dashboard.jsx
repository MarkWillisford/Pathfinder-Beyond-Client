import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import requiresLogin from './requiresLogin';

import {fetchProtectedData, setSaved} from '../actions/protectedData';
import {setEditingExistingCharacter} from '../actions/index';
import { resetCompletedStep, resetCharacterReducerState } from '../actions/index';
import CardCharacters from './cardCharacters';

import './dashboard.css';

export class Dashboard extends React.Component {
    componentDidMount() {
      this.props.dispatch(fetchProtectedData("users/characters", "usersCharacters"));
      this.props.dispatch(setSaved(false));
    
      /*********************************/
      /* Trying to clean up extra data */
      /*********************************/
      this.props.dispatch(resetCharacterReducerState());
    }

    nextPath(path) {
      this.props.history.push(path);
    }

    newCharacter(){
      // We need to start by checking if the creation steps are in local storage
      // if not we add them
      let myStorage = window.localStorage;
      if(!myStorage.hasOwnProperty('creationSteps')){
        localStorage.setItem('creationSteps', creationSteps);
      }
      if(!myStorage.hasOwnProperty('currentStep')){
        localStorage.setItem('currentStep', 0);
      }

      for(let i=0; i<creationSteps.length; i++){
        this.props.dispatch(resetCompletedStep(i));
      }
      this.props.dispatch(setEditingExistingCharacter(false));
      this.props.history.push("/newCharacter/");
    }

    render() {
      const limit = 10;
      const characters = this.props.characters;
      const allowNew = characters.length < limit ? true : false;

      return (
        <div className="dashboard">
          <div className="dashboard-username">
            <h2>Characters</h2> 
            <p className="bold">{ characters.length } of { limit }</p>
          </div>
          <div className="dashboard-character-data">
            {characters.map((character) => 
              <CardCharacters key={character.preferences.name} name={character.preferences.name} character={character}/>
            )}
            {allowNew && <div className="cardCharacter div">
              <div className="newCharButtonContainer">
                <button className="newCharButton" onClick={() => this.newCharacter()}><h3>Create New Character</h3></button>              
              </div>
            </div>} 
          </div>        
        </div>
      );
    }
}

const mapStateToProps = state => ({
  username: state.auth.currentUser.username,
  characters:state.protectedData.usersCharacters,
});

export default requiresLogin()(connect(mapStateToProps)(Dashboard));

const creationSteps = JSON.stringify([
  {name:"Character Basics",
  id:0,
  complete:false},
  {name:"Race",
  id:1,
  complete:false},          
  {name:"Class",
  id:2,
  complete:false},
  {name:"Ability Scores",
  id:3,
  complete:false},
  {name:"Details",
  id:4,
  complete:false},
  {name:"Skills",
  id:5,
  url:"",
  completedUrl:"",
  complete:false},
  {name:"Feats",
  id:6,
  url:"",
  completedUrl:"",
  complete:false},
  {name:"Equipment",
  id:7,
  url:"",
  completedUrl:"",
  complete:false},
]);