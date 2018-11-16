import React from 'react';
import {connect} from 'react-redux';
import NavBar from './navBar';
import MyCharactersArray from './myCharactersArray';

import './playerHomePage.css';

export function PlayerHomePage(props){
    const user = props.user;
    const isLoggedIn = props.isLoggedIn;
    const chars = props.characters;

    return (
        <div className="playerHomePage">
            <NavBar isLoggedIn={isLoggedIn} />

            <h2>Welcome to Pathfinder Beyond {user}!</h2>
            <MyCharactersArray characters={chars}/>
        </div>
    );    
}

PlayerHomePage.defaultProps = {
    user: "",
    isLoggedIn: false,
    chars: null,
}

const mapStateToProps = state => ({
    user: state.user,
    isLoggedIn: state.isLoggedIn,
    chars: state.chars,
});

export default connect(mapStateToProps)(PlayerHomePage);