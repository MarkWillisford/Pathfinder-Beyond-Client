import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
/*import {BrowserRouter as Router, Route, Link} from 'react-router-dom';*/
import CharacterCard from './characterCard';
import NewCharacter from './newCharacter';

import './myCharactersArray.css';

export function MyCharactersArray(props){
	const characters = [];
	props.characters.forEach((character) => {
		characters.push(
			<CharacterCard 
				character={character}
				key={character.name}/>
		);
	});
    return (
        <div className="myCharactersArray">
        	{characters}
            <Link to={ '/playerDemo/newCharacter'}>
            	<div className="newCharacter">
            		<img src="plus.jpg" alt="Plus Sign Image"></img>
                	<div className="characterCardName">New Character</div>
            	</div>
            </Link>
        </div>
    );
}

const mapStateToProps = state => ({
    characters: state.chars,
});

export default connect(mapStateToProps)(MyCharactersArray);