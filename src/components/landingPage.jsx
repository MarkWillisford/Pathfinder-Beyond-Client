import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import LoginForm from './loginForm';
 
import './landingPage.css';

export class LandingPage extends React.Component {

  render(){
    // If we are logged in redirect straight to the user's dashboard
    if (this.props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <div className="home">
          <h3>Jedipawn Mark's online</h3>
          <h1 className="landingPageTitle">Character Sheet</h1>
          {/* Button to automatically log in the Demo user. */}
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