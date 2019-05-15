import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {login} from '../actions/auth';

import LoginForm from './loginForm';

export class LandingPage extends React.Component {
  loginDemo(){
    this.props.dispatch(login("demo@test.com", "demopassword"));
  }

  render(){
    // If we are logged in redirect straight to the user's dashboard
    if (this.props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <div className="home">
            <h2>Welcome to Foo App</h2>
            {/* Button to automatically log in the Demo user. */}
            <button onClick={() => this.loginDemo() }>
              Demo 
            </button>
            <LoginForm />
            <Link to="/register">Register</Link>
        </div>
    );
  }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    nextPath(path, props) {
      props.history.push(path);
    }
});

export default connect(mapStateToProps)(LandingPage);