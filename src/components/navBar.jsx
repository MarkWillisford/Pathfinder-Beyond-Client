import React from 'react';
import {Link} from 'react-router-dom';

import './navBar.css';

export default class NavBar extends React.Component{
/*    constructor(props){
        super(props);
    }*/

    render() {
        if (this.props.isLoggedIn) {
            /* user is logged in, display the full nav bar */
            return (
                <div className="navBar">
                    <div className="title">
                        <h2>Pathfinder Beyond</h2>
                    </div>
                    <div className="nav">
                        <Link to="/playerDemo">Home</Link> | <Link to="/">Log Out</Link>
                    </div>
                </div>
            );
        } else {
            /* user is not logged in, display the login / signup / demo */
            return (
                <div className="navBar">
                    <div className="title">
                        <h2>Pathfinder Beyond</h2>
                    </div>
                    <div className="nav">
                        Login | Signup | <Link to="/playerDemo">Demo</Link>
                    </div>
                </div>
            );
        }
    }
}