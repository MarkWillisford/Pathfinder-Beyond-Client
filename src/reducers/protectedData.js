import {
    FETCH_PROTECTED_DATA_SUCCESS,
    FETCH_PROTECTED_DATA_USERSCHARACTERS_SUCCESS,
    FETCH_PROTECTED_DATA_CHARCLASSES_SUCCESS,
    FETCH_PROTECTED_DATA_ARMOR_SUCCESS,
    FETCH_PROTECTED_DATA_GOODSANDSERVICES_SUCCESS,
    FETCH_PROTECTED_DATA_TRADEGOODS_SUCCESS,
    FETCH_PROTECTED_DATA_WEAPONS_SUCCESS,
    FETCH_PROTECTED_DATA_ERROR,
    SET_LOADING,
    FETCH_PROTECTED_SUB_DATA_SUCCESS,
    FETCH_PROTECTED_SECONDARY_DATA_SUCCESS,
    FETCH_PROTECTED_EXTRA_DATA_SUCCESS,
    CLEAR_DATA,
    SET_SAVED
} from '../actions/protectedData';

const initialState = {
  usersCharacters:[],
  data: [],
  subData: [],
  secondaryData:[],
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_PROTECTED_DATA_SUCCESS) {
      return Object.assign({}, state, {
        data: action.data,
        error: null,
        loading: null
      });
  } else if (action.type === FETCH_PROTECTED_DATA_USERSCHARACTERS_SUCCESS) {
    return Object.assign({}, state, {
      ...state,
      usersCharacters:action.data,
      error: null,
      loading: null
    });
  } else if (action.type === FETCH_PROTECTED_DATA_CHARCLASSES_SUCCESS) {
    return Object.assign({}, state, {
      ...state,
      charClasses:action.data,
      error: null,
      loading: null
    });
  } else if (action.type === FETCH_PROTECTED_DATA_ARMOR_SUCCESS) {
    return Object.assign({}, state, {
      ...state,
      armor:action.data,
      error: null,
      loading: null
    });
  } else if (action.type === FETCH_PROTECTED_DATA_GOODSANDSERVICES_SUCCESS) {
    return Object.assign({}, state, {
      ...state,
      goodsAndServices:action.data,
      error: null,
      loading: null
    });
  } else if (action.type === FETCH_PROTECTED_DATA_TRADEGOODS_SUCCESS) {
    return Object.assign({}, state, {
      ...state,
      tradeGoods:action.data,
      error: null,
      loading: null
    });
  } else if (action.type === FETCH_PROTECTED_DATA_WEAPONS_SUCCESS) {
    return Object.assign({}, state, {
      ...state,
      weapons:action.data,
      error: null,
      loading: null
    });
  } else if (action.type === FETCH_PROTECTED_SUB_DATA_SUCCESS) {
    return Object.assign({}, state, {
      ...state,
      subData:action.data,
      error: null,
      loading: null
    });
  } else if (action.type === FETCH_PROTECTED_SECONDARY_DATA_SUCCESS) {
    return Object.assign({}, state, {
      ...state,
      secondaryData:action.data,
      error: null,
      loading: null
    });
  } else if (action.type === FETCH_PROTECTED_EXTRA_DATA_SUCCESS) {
    return Object.assign({}, state, {
      ...state,
      extraData:action.data,
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
  } else if (action.type === CLEAR_DATA) {
      return Object.assign({}, state, initialState);
  } else if (action.type === SET_SAVED) {
    return Object.assign({}, state, {
      saved: action.saved
    });
}
    return state;
}