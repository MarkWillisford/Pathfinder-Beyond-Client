import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import './characterCard.css';

export default class characterCard extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        const characterThum = this.props.character.thum;
        const characterName = this.props.character.name;
        const characterLevel = this.props.character.level;
        const characterRace = this.props.character.race;
        const characterClass = this.props.character.class;

        return (
            <div className="characterCard">
                <img src={characterThum.src} alt={characterThum.alt}></img>
                <div className="characterCardName">{characterName}</div>
                <div className="characterCardData">{characterLevel} | 
                {characterRace} | {characterClass}</div>
            </div>
        );
    }
}