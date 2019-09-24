import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import GoogleLogin from 'react-google-login';

import {login, googleLogin, testErrorDisplay} from '../actions/auth';
import {required, nonEmpty} from '../utility/validators';

export class LoginForm extends React.Component {
  onSubmit(values) {
    return this.props.dispatch(login(values.email, values.password));
  }

  render() {
    const responseGoogle = (response) => {
      console.log(response);
      //this.props.dispatch(testErrorDisplay());
      this.props.dispatch(googleLogin(response.tokenObj.id_token));
    }
    
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }
    const message = this.props.errorMessage ? this.props.errorMessage.generalMessage : "If you aready have an account, you may use your google id to log in";

    return (
      <div>
        <form
          className="login-form"
          onSubmit={this.props.handleSubmit(values =>
            this.onSubmit(values)
          )}>
          {error}
          <label htmlFor="email">Email</label>
          <Field
            component={Input}
            type="text"
            name="email"
            id="email"
            validate={[required, nonEmpty]}
          />
          <label htmlFor="password">Password</label>
          <Field
            component={Input}
            type="password"
            name="password"
            id="password"
            validate={[required, nonEmpty]}
          />
          <button disabled={this.props.pristine || this.props.submitting}>
            Log in
          </button>
        </form>

        {/* <div class="g-signin2"></div> */}
        <div><p>{message}</p></div>
        <GoogleLogin
          clientId="916807456829-f1s5e597m7t1iqm8bgf40s6h58f8rl95.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage:state.auth.error,
})

LoginForm = reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'email'))
})(LoginForm);

export default connect(mapStateToProps)(LoginForm)