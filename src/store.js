import {applyMiddleware, createStore, combineReducers, compose} from 'redux'
import {reducer as formReducer} from 'redux-form'
import thunk from 'redux-thunk';

import {characterReducer} from './reducers/index';
import authReducer from './reducers/auth';
import protectedDataReducer from './reducers/protectedData';
import {loadAuthToken, loadCurrentStep} from './localStorage';
import {setAuthToken, refreshAuthToken} from './actions/auth';
import {setStep} from './actions/index';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancer(
  applyMiddleware(thunk),
  // any other store enhancers
);

const store = createStore(
	combineReducers({
		characterReducer: characterReducer,
    form: formReducer,
    auth: authReducer,
    protectedData: protectedDataReducer
  }),
  enhancer
);

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
} 

// Hydrate the currentStep from localStorage if it exist
const currentStep = Number(loadCurrentStep());
if(currentStep){
  store.dispatch(setStep(currentStep));
}

export default store;