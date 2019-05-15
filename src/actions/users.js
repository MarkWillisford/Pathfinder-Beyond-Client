import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config/main.config';
import {normalizeResponseErrors} from '../utility/normalizeResponseErrors';

export const registerUser = user => dispatch => {
  console.log("in actions.users.js");
    return fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .catch(err => {
          console.log("in actions.users.js catch");
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
        });
};
