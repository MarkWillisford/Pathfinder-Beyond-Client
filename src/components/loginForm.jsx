import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import GoogleLogin from 'react-google-login';

import {login} from '../actions/auth';
import {required, nonEmpty} from '../utility/validators';

export class LoginForm extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(login(values.email, values.password));
    }

    render() {
      const responseGoogle = (response) => {
        console.log(response);
      }
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }
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

            <GoogleLogin
            clientId="916807456829-i5iksjetkuinmltcu0svi8leh7lckhjh.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            />
          </div>
        );
    }
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'email'))
})(LoginForm);
