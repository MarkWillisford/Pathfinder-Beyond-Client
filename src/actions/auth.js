import jwtDecode from 'jwt-decode';
import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config/main.config';
import {normalizeResponseErrors} from '../utility/normalizeResponseErrors';
import {saveAuthToken, clearAuthToken} from '../localStorage';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = authToken => ({
    type: SET_AUTH_TOKEN,
    authToken
});

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({
    type: CLEAR_AUTH
});

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
    type: AUTH_REQUEST
});

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = currentUser => ({
    type: AUTH_SUCCESS,
    currentUser
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = error => ({
    type: AUTH_ERROR,
    error
});

// Stores the auth token in state and localStorage, and decodes and stores
// the user data stored in the token
const storeAuthInfo = (token, _id, dispatch) => {
  const decodedToken = jwtDecode(token);
  dispatch(setAuthToken(token));
  dispatch(authSuccess(decodedToken));
  saveAuthToken(token);
};

export const login = (email, password) => dispatch => {
  // set a loading indicator to true and clearing any earlier errors
  dispatch(authRequest());
  return (
    fetch(`https://cors-anywhere.herokuapp.com/${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    // Reject any requests which don't return a 200 status, creating
    // errors which follow a consistent format
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({token, _id}) => storeAuthInfo(token, _id, dispatch))
    .catch(err => {
      const {code} = err;
      const message =
        code === 401
          ? 'Incorrect username or password'
          : 'Unable to login, please try again';
      dispatch(authError(err));
      // Could not authenticate, so return a SubmissionError for Redux
      // Form
      return Promise.reject(
        new SubmissionError({
          _error: message
        })
      );
    })
  );
};

export const testErrorDisplay = () => dispatch => {
  const err = "Error Testing";
  dispatch(authError(err));
}

export const googleLogin = (id_token) => dispatch => {
  dispatch(authRequest());
  return(
    fetch( `${API_BASE_URL}/users/googleLogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_token
      })
    })
    // Reject any requests which don't return a 200 status, creating
    // errors which follow a consistent format
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({token, _id}) => storeAuthInfo(token, _id, dispatch))
    .catch(err => { 
      const {code} = err;
      const message =
        code === 401
          ? 'Incorrect username or password'
          : ( 'Unable to login, please try again');
      dispatch(authError(err));
      // Could not authenticate, so return a SubmissionError for Redux
      // Form
      return Promise.reject(
        new SubmissionError({
          _error: message
        })
      );
    })
  )
}

export const refreshAuthToken = () => (dispatch, getState) => {
    dispatch(authRequest());
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/users/refresh`, {
        method: 'POST',
        headers: {
            // Provide our existing token as credentials to get a new one
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({token, _id}) => storeAuthInfo(token, _id, dispatch))
        .catch(err => {
            // We couldn't get a refresh token because our current credentials
            // are invalid or expired, or something else went wrong, so clear
            // them and sign us out
            dispatch(authError(err));
            dispatch(clearAuth());
            clearAuthToken(authToken);
        });
};