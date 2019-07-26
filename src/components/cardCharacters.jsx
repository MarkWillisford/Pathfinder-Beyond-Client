import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import { withRouter } from 'react-router'
import { capitalizeFirstLetter } from '../utility/helperFunctions';
import { deleteCharacterById } from '../actions/protectedData';
import {fetchProtectedData, fetchProtectedPDF} from '../actions/protectedData';
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
    this.props.dispatch(deleteCharacterById(id));
    this.props.dispatch(fetchProtectedData("users/characters", "usersCharacters"));
  }

	render(){
/*     let display = false;
    const characterSheetWindow = this.props.characterSheetWindow;
    if(characterSheetWindow){
      if(characterSheetWindow === this.props.name){
        display = true;
      }
    } */

		return(
			<div className="cardCharacter div">
				<h3>{this.props.name}</h3>
        {capitalizeFirstLetter(this.props.character.race.name) + " " + capitalizeFirstLetter(this.props.character.charClass.name)}
        <button onClick={() => this.view(this.props.character)}>View PDF</button>
        <button onClick={() => this.edit(this.props.character)}>Edit</button>
        <button onClick={() => this.delete(this.props.character._id)}>Delete</button> 
			
        {/* display && (
          <CharSheetWindow closeWindowPortal={this.closeWindowPortal}>
            <h1>{this.props.name}</h1>
            <p>Even though I render in a different window, I share state!</p>
            <p>{this.props.pdf}</p>
            {}
          </CharSheetWindow>
        ) */}
      </div>

		)
	}
}

const mapStateToProps = state => ({
  // authToken:state.auth.authToken,
  characterSheetWindow:state.characterReducer.characterSheetWindow,
  pdf:state.protectedData.pdf,
});

export default withRouter(connect(mapStateToProps)(CardCharacters));