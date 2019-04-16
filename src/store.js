import {createStore, combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'

import {characterReducer} from './reducers/index';
import authReducer from './reducers/auth';
import {loadAuthToken} from './localStorage';
import {setAuthToken, refreshAuthToken} from './actions/auth';

const store = createStore(
	combineReducers({
		characterReducer: characterReducer,
    form: formReducer,
    auth: authReducer
  }),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
} 

export default store;