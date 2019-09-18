import protectedDataReducer from '../../reducers/protectedData';
import * as actions_Data from '../../actions/protectedData';

describe('protectedDataReducer', () => {
  // set up some dummy data
  
  it('Should set the initial state when nothing is passed in', () => {
    const state = protectedDataReducer(undefined, {type:'__UNKNOWN'});
    expect(state).toEqual({
      usersCharacters:[],
      data: [],
      subData: [],
      secondaryData:[],
      error: null
    })
  })
  it('Should return the current state on an unknown action', () => {
    let currentState = {};
    const state = protectedDataReducer(currentState, {type: '__UNKNOWN'});
    expect(state).toBe(currentState);
  });

  describe('fetchProtectedDataSuccess', () => {
    it('Should add data', () => {
      const data = "test data";
      let state;
      state = protectedDataReducer(state, actions_Data.fetchProtectedDataSuccess(data));
      expect(state).toEqual({
        usersCharacters:[],
        data: "test data",
        subData: [],
        secondaryData:[],
        error: null,
        loading: null
      });
    });
  });
  describe('fetchProtectedData_usersCharacters_Success', () => {
    it('Should add data', () => {
      const data = "test data";
      let state;
      state = protectedDataReducer(state, actions_Data.fetchProtectedData_usersCharacters_Success(data));
      expect(state).toEqual({
        usersCharacters:"test data",
        data: [],
        subData: [],
        secondaryData:[],
        error: null,
        loading: null
      });
    });
  });
  describe('fetchProtectedData_charClasses_Success', () => {
    it('Should add data', () => {
      const data = "test data";
      let state;
      state = protectedDataReducer(state, actions_Data.fetchProtectedData_charClasses_Success(data));
      expect(state).toEqual({
        usersCharacters: [],
        data: [],
        subData: [],
        secondaryData:[],
        error: null,
        loading: null,
        charClasses:"test data"
      });
    });
  });

})