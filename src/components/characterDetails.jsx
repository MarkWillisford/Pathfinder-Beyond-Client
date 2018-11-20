import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import './characterDetails.css';

export class CharacterDetails extends React.Component{
    render() {
/*        const m = this.props.character.thum;
        const characterName = this.props.character.name;
        const characterLevel = this.props.character.level;
        const characterRace = this.props.character.race;
        const characterClass = this.props.character.class;*/

        console.log(this.props.match.params.characterID);
        console.log(this.props);
        return (
            <div className="characterDetails">
            	{} hi
            </div>
        );
    }
}

const mapStateToProps = state => ({
    character: state.char,
});

export default connect(mapStateToProps)(CharacterDetails);