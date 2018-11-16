import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import './navBar.css';

export default class NavBar extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        if (this.props.isLoggedIn) {
            {/* user is logged in, display the full nav bar */}
            return (
                <div className="navBar">
                    <div className="title">
                        <h2>Pathfinder Beyond</h2>
                    </div>
                    <div className="nav">
                        Home | Log Out
                    </div>
                </div>
            );
        } else {
            {/* user is not logged in, display the login / signup / demo */}
            return (
                <div className="navBar">
                    <div className="title">
                        <h2>Pathfinder Beyond</h2>
                    </div>
                    <div className="nav">
                        Login | Signup | Demo
                    </div>
                </div>
            );
        };
    }
}