import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import { withRouter } from 'react-router'
import { capitalizeFirstLetter } from '../utility/helperFunctions';
import { deleteCharacterById } from '../actions/protectedData';
import { fetchProtectedData, fetchProtectedPDF } from '../actions/protectedData';
import { editingExistingCharacter } from '../actions/index';

import './cardCharacters.css';

class CardCharacters extends React.Component{
  view(character){
    this.props.dispatch(fetchProtectedPDF(character, function (err, reportBlob) {
      if (err) {
        return console.error(err)
      }
      let reportFileUrl = URL.createObjectURL(reportBlob)
    
      // window.open(reportFileUrl)

      this.externalWindow = window.open(reportFileUrl, '', 'width=600,height=400,left=200,top=200');
      this.containerEl = this.externalWindow.document.createElement('div');
      this.externalWindow.document.body.appendChild(this.containerEl);

      this.externalWindow.document.title = character.preferences.name;
      // copyStyles(document, this.externalWindow.document);

      // update the state in the parent component if the user closes the 
      // new window
      /* this.externalWindow.addEventListener('beforeunload', () => {
        this.props.closeWindowPortal();
      }); */
    }))
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
    const currentUser = this.props.user;
    const usersCharacters = this.props.usersCharacters;
   
    // If this is the Demo user
    if(currentUser._id === "5cc7799ae143841e6c64ef42"){
      // Check if this is the last character 
      if(usersCharacters.length === 1){
        alert("You can not delete the last character in the Demo");
        return;
      }
    }
    this.props.dispatch(deleteCharacterById(id));
    this.props.dispatch(fetchProtectedData("users/characters", "usersCharacters"));
  }

	render(){
		return(
			<div className="cardCharacter div">
        <div className="characterTextContainer">
          <h3>{this.props.name}</h3>
          {capitalizeFirstLetter(this.props.character.race.name) + " " + capitalizeFirstLetter(this.props.character.charClass.name)}
        </div>  
        <div className="squareButtonContainer">
          <button className="squareButton" onClick={() => this.view(this.props.character)}>PDF</button>
          <button className="squareButton" onClick={() => this.edit(this.props.character)}>Edit</button>
          <button className="squareButton" onClick={() => this.delete(this.props.character._id)}>DEL</button> 
        </div>			
      </div>

		)
	}
}

const mapStateToProps = state => ({
  // authToken:state.auth.authToken,
  characterSheetWindow:state.characterReducer.characterSheetWindow,
  pdf:state.protectedData.pdf,
  user:state.auth.currentUser,
  usersCharacters:state.protectedData.usersCharacters,
});

export default withRouter(connect(mapStateToProps)(CardCharacters));