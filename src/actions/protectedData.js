import {API_BASE_URL} from '../config/main.config';
import {normalizeResponseErrors} from '../utility/normalizeResponseErrors';
import React from 'react';
import {Redirect} from 'react-router-dom';
import { resetCharacterReducerState } from '../actions/index';
import {clearCurrentStep} from '../localStorage';


export const FETCH_PROTECTED_DATA_SUCCESS = 'FETCH_PROTECTED_DATA_SUCCESS';
export const fetchProtectedDataSuccess = data => ({
    type: FETCH_PROTECTED_DATA_SUCCESS,
    data
});

/******************************
 * Slowly converting the sub / secondary / extra into named calls
**************************** */
export const FETCH_PROTECTED_DATA_USERSCHARACTERS_SUCCESS = 'FETCH_PROTECTED_DATA_USERSCHARACTERS_SUCCESS';
export const fetchProtectedData_usersCharacters_Success = data => ({
    type: FETCH_PROTECTED_DATA_USERSCHARACTERS_SUCCESS,
    data
});
export const FETCH_PROTECTED_DATA_CHARCLASSES_SUCCESS = 'FETCH_PROTECTED_DATA_CHARCLASSES_SUCCESS';
export const fetchProtectedData_charClasses_Success = data => ({
    type: FETCH_PROTECTED_DATA_CHARCLASSES_SUCCESS,
    data
});

export const FETCH_PROTECTED_SUB_DATA_SUCCESS = 'FETCH_PROTECTED_SUB_DATA_SUCCESS';
export const fetchProtectedSubDataSuccess = data => ({
    type: FETCH_PROTECTED_SUB_DATA_SUCCESS,
    data
});

export const FETCH_PROTECTED_SECONDARY_DATA_SUCCESS = 'FETCH_PROTECTED_SECONDARY_DATA_SUCCESS';
export const fetchProtectedSecondaryDataSuccess = data => ({
    type: FETCH_PROTECTED_SECONDARY_DATA_SUCCESS,
    data
});

export const FETCH_PROTECTED_EXTRA_DATA_SUCCESS = 'FETCH_PROTECTED_EXTRA_DATA_SUCCESS';
export const fetchProtectedExtraDataSuccess = data => ({
    type: FETCH_PROTECTED_EXTRA_DATA_SUCCESS,
    data
});

export const FETCH_PROTECTED_DATA_ERROR = 'FETCH_PROTECTED_DATA_ERROR';
export const fetchProtectedDataError = error => ({
    type: FETCH_PROTECTED_DATA_ERROR,
    error
});

export const SET_LOADING = 'SET_LOADING';
export const setLoading = () => ({
    type: SET_LOADING
});

export const CLEAR_DATA = 'CLEAR_DATA';
export const clearData = () => ({
    type: CLEAR_DATA
});

export const SET_SAVED = 'SET_SAVED';
export const setSaved = (toggle) => ({
  type: SET_SAVED,
  saved: toggle
})
/* export const fetchProtectedData = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/protected`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({data}) => dispatch(fetchProtectedDataSuccess(data)))
        .catch(err => {
            dispatch(fetchProtectedDataError(err));
        });
}; */

/* export const fetchProtectedCharactersData = () => (dispatch, getState) => {  
  const authToken = getState().auth.authToken;
  dispatch(setLoading());

  return fetch(`${API_BASE_URL}/users/characters`, {
    method: 'GET',
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(({data}) => dispatch(fetchProtectedDataSuccess(data)))
  .catch(err => {
    dispatch(fetchProtectedDataError(err));
  });
} */

export const fetchProtectedData = (api, call="") => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(setLoading());
  
  fetch(`${API_BASE_URL}/${api}`, {
    method: 'GET',
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    }
  }).then(res => normalizeResponseErrors(res)
  ).then(res => {
    return res.json();
  }).then(data => {
    let str = JSON.stringify(data);
    switch(call){
      case "usersCharacters": 
        dispatch(fetchProtectedData_usersCharacters_Success(data));
        break;
      case "charClasses":
        dispatch(fetchProtectedData_charClasses_Success(data));
        break;
      default: 
        dispatch(fetchProtectedDataSuccess(data));
    }
  }).catch(err => {
      dispatch(fetchProtectedDataError(err));
  });
};

export const fetchProtectedSubData = (api) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(setLoading());
  
  fetch(`${API_BASE_URL}/${api}`, {
    method: 'GET',
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    }
  }).then(res => normalizeResponseErrors(res)
  ).then(res => {
    return res.json();
  }).then(data => {
    dispatch(fetchProtectedSubDataSuccess(data));
  }).catch(err => {
    dispatch(fetchProtectedDataError(err));
  });
};

export const fetchProtectedSecondaryData = (api) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(setLoading());
  
  fetch(`${API_BASE_URL}/${api}`, {
    method: 'GET',
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    }
  }).then(res => normalizeResponseErrors(res)
  ).then(res => {
    return res.json();
  }).then(data => {
      dispatch(fetchProtectedSecondaryDataSuccess(data));
  }).catch(err => {
      dispatch(fetchProtectedDataError(err));
  });
};

export const fetchProtectedExtraData = (api) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(setLoading());
  
  fetch(`${API_BASE_URL}/${api}`, {
    method: 'GET',
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    }
  }).then(res => normalizeResponseErrors(res)
  ).then(res => {
    return res.json();
  }).then(data => {
      dispatch(fetchProtectedExtraDataSuccess(data));
  }).catch(err => {
      dispatch(fetchProtectedDataError(err));
  });
};

export const saveAndSubmit = () => (dispatch, getState, history) => {
  console.log("saving");
  const authToken = getState().auth.authToken;
  const user = getState().auth.currentUser._id; 
  dispatch(setLoading());
  
  const charState = getState().characterReducer;
  let arrayOfFeats = [];
  let arrayOfTraits = [];
  
  for(let i=0; i<charState.newCharacter.featSlots.length; i++){
    arrayOfFeats.push(charState.newCharacter.featSlots[i].selection.id);
  }
  for(let i=0; i<charState.newCharacter.traitSlots.length; i++){
    arrayOfTraits.push(charState.newCharacter.traitSlots[i].selection.id);
  }

  let armorsList = [];
  let weaponsList = [];
  let tradeGoodsList = [];
  let goodsAndServicesList = [];

  if(charState.newCharacter.gear){
    for(let i = 0; i < charState.newCharacter.gear.length; i++){
      let item = charState.newCharacter.gear[i];
      if(item.hasOwnProperty("dmgS")){
        weaponsList.push(item.id);
      } else if (item.hasOwnProperty("collection")){
        goodsAndServicesList.push(item.id);
      } else if (item.hasOwnProperty("armorCheckPenalty")){
        armorsList.push(item.id);
      } else {
        tradeGoodsList.push(item.id);
      }
    }
  }

  fetch(`${API_BASE_URL}/users/characters`, {
    method: 'POST',
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: user,
      characterStats: charState.newCharacter.characterStats,
      charClass: charState.newCharacter.charClass._id,
      selections: charState.newCharacter.selections,
      featSlots: arrayOfFeats,
      traitSlots: arrayOfTraits,
      preferences: {
        name: charState.newCharacter.preferences.characterName,
        advancement: charState.newCharacter.preferences.advancement,
        hpProcess: charState.newCharacter.preferences.hpProcess,
      },
      race: charState.newCharacter.race.id,
      details:{
        age: charState.newCharacter.details.age,
        alignments: charState.newCharacter.details.alignments,
        allies: charState.newCharacter.details.allies,
        backstory: charState.newCharacter.details.backstory,
        deity: charState.newCharacter.details.deity ? charState.newCharacter.details.deity.name : null,
        enemies: charState.newCharacter.details.enemies,
        eyes: charState.newCharacter.details.eyes,
        flaws: charState.newCharacter.details.flaws,
        gender: charState.newCharacter.details.gender,
        hair: charState.newCharacter.details.hair,
        ideals: charState.newCharacter.details.ideals,
        organizations: charState.newCharacter.details.organizations,
        other: charState.newCharacter.details.other,
        personalityTraits: charState.newCharacter.details.personalityTraits,
        skin: charState.newCharacter.details.skin,
        weight: charState.newCharacter.details.weight,
      },
      goldMethod: charState.newCharacter.goldMethod,
      gold: charState.newCharacter.gold,
      availableGold: charState.newCharacter.availableGold,
      gear: {
        armor:armorsList,
        weapon:weaponsList,
        tradeGoods:tradeGoodsList,
        goodsAndServices:goodsAndServicesList,
      },
      abilityScoreGenerationMethod: charState.abilityScoreGenerationMethod,
    }),
  }).then(res => normalizeResponseErrors(res)
  ).then(res => {
    return res.json();
  }).then(data => {
    clearCurrentStep();
    dispatch(setSaved(true));
  }).catch(err => {
      dispatch(fetchProtectedDataError(err));
  });
};

export const deleteCharacterById = (id) => (dispatch, getState) => {
  console.log("deleting id:");
  console.log(id);
  const authToken = getState().auth.authToken;
  // const user = getState().auth.currentUser._id; 
  fetch(`${API_BASE_URL}/users/characters`, {
    method: 'DELETE',
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      _id:id,
    }),
  }).then(res => normalizeResponseErrors(res)
  ).then(res => {
    return res.json();
  }).catch(err => {
      dispatch(fetchProtectedDataError(err));
  });
}

export const editAndSubmit = () => (dispatch, getState) => {
  console.log("saving");
  const authToken = getState().auth.authToken;
  const user = getState().auth.currentUser._id; 
  dispatch(setLoading());
  
  const charState = getState().characterReducer;
  let arrayOfFeats = [];
  let arrayOfTraits = [];
  
  for(let i=0; i<charState.newCharacter.featSlots.length; i++){
    arrayOfFeats.push(charState.newCharacter.featSlots[i].selection.id);
  }
  for(let i=0; i<charState.newCharacter.traitSlots.length; i++){
    arrayOfTraits.push(charState.newCharacter.traitSlots[i].selection.id);
  }

  let armorsList = [];
  let weaponsList = [];
  let tradeGoodsList = [];
  let goodsAndServicesList = [];

  if(charState.newCharacter.gear){
    for(let i = 0; i < charState.newCharacter.gear.length; i++){
      let item = charState.newCharacter.gear[i];
      if(item.hasOwnProperty("dmgS")){
        weaponsList.push(item.id);
      } else if (item.hasOwnProperty("collection")){
        goodsAndServicesList.push(item.id);
      } else if (item.hasOwnProperty("armorCheckPenalty")){
        armorsList.push(item.id);
      } else {
        tradeGoodsList.push(item.id);
      }
    }
  }

  fetch(`${API_BASE_URL}/users/characters`, {
    method: 'PUT',
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: charState.id,
      user_id: user,
      characterStats: charState.newCharacter.characterStats,
      charClass: charState.newCharacter.charClass._id,
      selections: charState.newCharacter.selections,
      featSlots: arrayOfFeats,
      traitSlots: arrayOfTraits,
      preferences: {
        name: charState.newCharacter.preferences.characterName,
        advancement: charState.newCharacter.preferences.advancement,
        hpProcess: charState.newCharacter.preferences.hpProcess,
      },
      race: charState.newCharacter.race._id,
      details:{
        age: charState.newCharacter.details.age,
        alignments: charState.newCharacter.details.alignments,
        allies: charState.newCharacter.details.allies,
        backstory: charState.newCharacter.details.backstory,
        deity: charState.newCharacter.details.deity ? charState.newCharacter.details.deity.name : null,
        enemies: charState.newCharacter.details.enemies,
        eyes: charState.newCharacter.details.eyes,
        flaws: charState.newCharacter.details.flaws,
        gender: charState.newCharacter.details.gender,
        hair: charState.newCharacter.details.hair,
        ideals: charState.newCharacter.details.ideals,
        organizations: charState.newCharacter.details.organizations,
        other: charState.newCharacter.details.other,
        personalityTraits: charState.newCharacter.details.personalityTraits,
        skin: charState.newCharacter.details.skin,
        weight: charState.newCharacter.details.weight,
      },
      goldMethod: charState.newCharacter.goldMethod,
      gold: charState.newCharacter.gold,
      availableGold: charState.newCharacter.availableGold,
      gear: {
        armor:armorsList,
        weapon:weaponsList,
        tradeGoods:tradeGoodsList,
        goodsAndServices:goodsAndServicesList,
      },
      abilityScoreGenerationMethod: charState.abilityScoreGenerationMethod,
    }),
  }).then(res => normalizeResponseErrors(res)
  ).then(res => {
    return res.json();
  }).then(data => {
    clearCurrentStep();
    dispatch(setSaved(true));
  }).catch(err => {
      dispatch(fetchProtectedDataError(err));
  });
}