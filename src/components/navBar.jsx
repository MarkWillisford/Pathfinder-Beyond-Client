import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../localStorage';

import './navBar.css';

export class NavBar extends React.Component{
/*    constructor(props){
        super(props);
    }*/

  logOut(){
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    let username = '';
    if(this.props.currentUser){
      username = this.props.currentUser.username;
    }

    if (this.props.currentUser) {
      /* user is logged in, display the full nav bar */
      return (
          <div className="navBar">
              <div className="title">
                  <h2>Pathfinder Beyond</h2>
                  Username: {this.props.username}
              </div>
              <div className="nav">
                  <Link to="/dashboard">Home</Link> | <button onClick={() => this.logOut()}>Log Out</button>{/* <Link to="/">Log Out</Link> */}
              </div>
          </div>
      );
  } else {
      /* user is not logged in, display the login / signup / demo */
      return (
          <div className="navBar">
              {/* <div className="title">
                  <h2>Pathfinder Beyond</h2>
              </div>
              <div className="nav">
                  Login | Signup | <Link to="/playerDemo">Demo</Link>
              </div> */}
          </div>
      );
  }    
  }
}

const mapStateToProps = state => ({
    currentUser: state.auth,
});

export default connect(mapStateToProps)(NavBar);