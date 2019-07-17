import React from 'react';
import {connect} from 'react-redux';
import { capitalizeFirstLetter } from '../utility/helperFunctions';
import { deleteCharacterById } from '../actions/protectedData';
import {fetchProtectedData} from '../actions/protectedData';

import './cardCharacters.css';

class CardCharacters extends React.Component{  

  view(character){
    console.log("view");
    console.log(character);
  }

  edit(character){
    console.log("edit");
  }
  
  delete(id){
    this.props.dispatch(deleteCharacterById(id));
    this.props.dispatch(fetchProtectedData("users/characters", "usersCharacters"));
  }

	render(){/* 
    let charName = this.props
    let raceName = this.props.character ? this.props.character.race.name : "";
    let className = this.props.character ? this.props.character.charClass.name : "";
    console.log(this.props.character.race.name); */
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

export default connect(mapStateToProps)(CardCharacters);