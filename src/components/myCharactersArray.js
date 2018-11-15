import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import CharacterCard from './characterCard';

import './myCharactersArray.css';

export default class MyCharactersArray extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
    	const characters = [];
    	this.props.characters.forEach((character) => {
    		characters.push(
    			<CharacterCard 
    				character={character}
    				key={character.name}/>
    		);
    	});
        return (
            <div className="myCharactersArray">
            	{characters}
            	<div className="newCharacter">
            		<img src="plus.jpg" alt="New Character"></img>
                	<div className="characterCardName">New Character</div>
            	</div>
            </div>
        );
    }
}