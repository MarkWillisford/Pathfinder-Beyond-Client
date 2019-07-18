import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {clearAuth} from '../actions/auth';
import {clearAuthToken, clearCurrentStep} from '../localStorage';
import {login} from '../actions/auth';

import './navBar.css';

export class NavBar extends React.Component{
/*    constructor(props){
        super(props);
    }*/
  loginDemo(){
    this.props.dispatch(login("demo@test.com", "demopassword"));
  }

  logOut(){
    this.props.dispatch(clearAuth());
    clearCurrentStep();
    clearAuthToken();
  }

  clearSteps(){
    clearCurrentStep();
  }

  render() {
    let username = '';
    if(this.props.currentUser){
      username = this.props.currentUser.username;
    }

    if (this.props.currentUser) {
      /* user is logged in, display the full nav bar */
      return (
        <div className="header" role="header" >
          <div className="navBar">
            <Link to="/" className="title">TTRPG Char Gen</Link>
            <div className="nav">
              <Link to="/dashboard" onClick={() => this.clearSteps()}>Home</Link> | <button onClick={() => this.logOut()}>Log Out</button>{/* <Link to="/">Log Out</Link> */}
            </div>
          </div>
        </div>
      );
    } else {
        /* user is not logged in, display the login / signup / demo */
      return (
        <div className="header" role="header" >
          <div className="navBar">
            <div className="title">
              <Link to="/" className="title">TTRPG Char Gen</Link>
            </div>
            <div className="nav">
              <button onClick={() => this.loginDemo() }>
                Demo 
              </button>
            </div>           
          </div>
        </div>
      );
    }    
  }
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser,
});

export default connect(mapStateToProps)(NavBar);