import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import './playerHomePage.css';

export default class playerHomePage extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        const user = this.props.user;
        
        return (
            <div className="playerHomePage">
                <h2>Welcome to Pathfinder Beyond {user}!</h2>


            </div>
        );
    }
}