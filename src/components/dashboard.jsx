import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import requiresLogin from './requiresLogin';

// import {fetchProtectedData} from '../actions/protectedData';
import {fetchProtectedCharactersData} from '../actions/protectedData';

import CardCharacters from './cardCharacters';

export class Dashboard extends React.Component {
    componentDidMount() {
      this.props.dispatch(fetchProtectedCharactersData());
    }

    getCharacters(){
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
    }

    nextPath(path) {
      this.props.history.push(path);
    }

    newCharacter(){
      this.props.history.push("/newCharacter/");
    }

    render() {
      const characters = this.getCharacters();

      return (
        <div className="dashboard">
          <div className="dashboard-username">
            Username: {this.props.username}
          </div>
          <div className="dashboard-name">Name: {this.props.name}</div>
          <div className="dashboard-character-data">
            <h2>Characters</h2>
              {characters.map((character) => 
                <CardCharacters key={character.characterStats.name} name={character.characterStats.name} character={character}/>
              )}
          </div>
          <div>
            <button onClick={() => this.newCharacter()}>Create New Character</button>
            {/* <button onClick={() => this.nextPath('/playerDemo/newCharacter/') }>
              change path 
            </button> */}
          </div>
        </div>
      );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));