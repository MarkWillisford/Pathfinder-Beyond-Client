import {API_BASE_URL} from '../config/main.config';
import {normalizeResponseErrors} from '../utility/normalizeResponseErrors';

export const FETCH_PROTECTED_DATA_SUCCESS = 'FETCH_PROTECTED_DATA_SUCCESS';
export const fetchProtectedDataSuccess = data => ({
    type: FETCH_PROTECTED_DATA_SUCCESS,
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

export const FETCH_PROTECTED_DATA_ERROR = 'FETCH_PROTECTED_DATA_ERROR';
export const fetchProtectedDataError = error => ({
    type: FETCH_PROTECTED_DATA_ERROR,
    error
});

export const SET_LOADING = 'SET_LOADING';
export const setLoading = () => ({
    type: SET_LOADING
});

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

export const fetchProtectedCharactersData = () => (dispatch, getState) => {  
  const authToken = getState().auth.authToken;
  console.log('dispatching loading');
  dispatch(setLoading());

  console.log('returning fetch');
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
}

export const fetchProtectedData = (api) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  console.log(`${API_BASE_URL}/${api}`);
  
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
      dispatch(fetchProtectedDataSuccess(data));
  }).catch(err => {
      dispatch(fetchProtectedDataError(err));
  });
};

export const fetchProtectedSubData = (api) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  console.log(`${API_BASE_URL}/${api}`);
  
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
  console.log(`${API_BASE_URL}/${api}`);
  
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