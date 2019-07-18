import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router'
import { capitalizeFirstLetter } from '../utility/helperFunctions';
import { deleteCharacterById } from '../actions/protectedData';
import {fetchProtectedData} from '../actions/protectedData';
import { editingExistingCharacter } from '../actions/index';

import './cardCharacters.css';

class CardCharacters extends React.Component{  

  view(character){
    console.log(character); 
  }

  getFeatDetails(name){
    const featsList = this.props.featsList 
    let featToReturn = featsList.find( feat => feat.name === name);
    return featToReturn;
  };

  edit(character){    
    this.props.dispatch(editingExistingCharacter(character));
    this.props.history.push("/newCharacter");
  }
  
  delete(id){
    this.props.dispatch(deleteCharacterById(id));
    this.props.dispatch(fetchProtectedData("users/characters", "usersCharacters"));
  }

	render(){
		return(
			<div className="cardCharacter div">
				<h3>{this.props.name}</h3>
        {capitalizeFirstLetter(this.props.character.race.name) + " " + capitalizeFirstLetter(this.props.character.charClass.name)}
        <button onClick={() => this.view(this.props.character)}>View</button>
        <button onClick={() => this.edit(this.props.character)}>Edit</button>
        <button onClick={() => this.delete(this.props.character._id)}>Delete</button>
			</div>
		)
	}
}

const mapStateToProps = state => ({

});

export default withRouter(connect(mapStateToProps)(CardCharacters));