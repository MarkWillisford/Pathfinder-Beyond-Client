import {createStore, combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'

import {characterReducer} from './reducers/index';

export default createStore(
	combineReducers({
		characterReducer: characterReducer,
        form: formReducer
    }),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)