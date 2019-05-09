import {
    FETCH_PROTECTED_DATA_SUCCESS,
    FETCH_PROTECTED_DATA_ERROR,
    SET_LOADING,
    FETCH_BOARD_SUCCESS
} from '../actions/protectedData';

const initialState = {
    data: [],
    error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_PROTECTED_DATA_SUCCESS) {
      return Object.assign({}, state, {
        data: action.data,
        error: null,
        loading: null
      });
  } else if (action.type === FETCH_PROTECTED_DATA_ERROR) {
      return Object.assign({}, state, {
        error: action.error
      });
  } else if (action.type === SET_LOADING) {
      return Object.assign({}, state, {
        loading: "loading"
      });
  }
    return state;
}