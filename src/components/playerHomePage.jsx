import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import NavBar from './navBar';
import MyCharactersArray from './myCharactersArray';

import './playerHomePage.css';

export default class PlayerHomePage extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        const user = this.props.user;
        const isLoggedIn = this.props.isLoggedIn;
        const chars = this.props.characters;

        return (
            <div className="playerHomePage">
                <NavBar isLoggedIn={isLoggedIn} />

                <h2>Welcome to Pathfinder Beyond {user}!</h2>
                <MyCharactersArray characters={chars}/>
            </div>
        );
    }
}