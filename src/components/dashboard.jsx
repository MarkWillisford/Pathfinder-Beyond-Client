import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import requiresLogin from './requiresLogin';

import {fetchProtectedData, setSaved} from '../actions/protectedData';
import {setEditingExistingCharacter} from '../actions/index';
import { resetCompletedStep } from '../actions/index';
import CardCharacters from './cardCharacters';

import './dashboard.css';

export class Dashboard extends React.Component {
    componentDidMount() {
      this.props.dispatch(fetchProtectedData("users/characters", "usersCharacters"));
      this.props.dispatch(setSaved(false));
    }

   /*  getCharacters(){
      return (
        [
          {
            '_id':1,
            'characterStats':{
              'name':"Syren",
            },
            'charClass':"ranger",
            'featSlots':"1 feat",
            'traitSlots':"1 trait",
            'preferences':"To Win",
            'race':"elf",
            'details':"details",
            'goldMethod':"crafting",
            'gold':"all the gold",
            'availableGold':"most of the gold", 
            'gear':"awesome gear",
            'abilityScoreGenerationMethod':"crazy high stats",
          },
          {
            '_id':2,
            'characterStats':{
              'name':"Slick",
            },
            'charClass':"ranger",
            'featSlots':"1 feat",
            'traitSlots':"1 trait",
            'preferences':"To Win",
            'race':"elf",
            'details':"details",
            'goldMethod':"crafting",
            'gold':"all the gold",
            'availableGold':"most of the gold", 
            'gear':"awesome gear",
            'abilityScoreGenerationMethod':"crazy high stats",
          }
        ]
      );
    } */

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
      const characters = this.props.characters;//this.getCharacters();
      return (
        <div className="dashboard">
          <div className="dashboard-username">
            Username: {this.props.username}
            <h2>Characters</h2>
          </div>
          <div className="dashboard-character-data">
            {characters.map((character) => 
              <CardCharacters key={character.preferences.name} name={character.preferences.name} character={character}/>
            )}
            <div className="cardCharacter div">
              <button onClick={() => this.newCharacter()}>Create New Character</button>
            </div> 
          </div>        
        </div>
      );
    }
}

//const {currentUser} = state.auth;
const mapStateToProps = state => ({
  username: state.auth.currentUser.username,
  characters:state.protectedData.usersCharacters,
  //characterSheetWindow:state.characterReducer.characterSheetWindow,
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