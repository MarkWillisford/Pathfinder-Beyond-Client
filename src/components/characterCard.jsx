import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {loadCharacter} from '../actions/index';
/*import {BrowserRouter as Router, Route, Link} from 'react-router-dom';*/

import './characterCard.css';

export class CharacterCard extends React.Component{
    constructor(props){
        super(props);
    }
    
    loadCharacter(character) {
        console.log(this.props);
        this.props.dispatch(loadCharacter(character));
    }    

    render() {
        const character = this.props.character;
        const characterThum = this.props.character.thum;
        const characterName = this.props.character.name;
        const characterLevel = this.props.character.level;
        const characterRace = this.props.character.race;
        const characterClass = this.props.character.class;

        return (
            <div className="characterCard">
                        {/* TODO */}    
                <Link to={ '/playerDemo/character/' + character.name } onClick={this.loadCharacter} ><img src={characterThum.src} alt={characterThum.alt}></img>
                {/*https://stackoverflow.com/questions/42800815/how-to-use-onclick-event-on-react-link-component*/}


                <div className="characterCardName">{characterName}</div></Link>
                <div className="characterCardData">{characterLevel} | {characterRace} | {characterClass}</div>
            </div>
        );
    }
}

export default connect()(CharacterCard);