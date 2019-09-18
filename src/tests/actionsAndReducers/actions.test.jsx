import * as actions_Auth from '../../actions/auth.js';
import * as actions_Data from '../../actions/protectedData';
import * as actions_Index from '../../actions/index';

/*********************************/
/*        Auth.js Actions        */
/*********************************/
describe('setAuthToken', () => {
  it('Should return the action', () => {
      const authToken = 'aflkwu3tyqpa7ghpzo';
      const action = actions_Auth.setAuthToken(authToken);
      expect(action.type).toEqual("SET_AUTH_TOKEN");
      expect(action.authToken).toEqual(authToken);
  });
});

describe('clearAuth', () => {
  it('Should return the action', () => {
    const action = actions_Auth.clearAuth();
    expect(action.type).toEqual("CLEAR_AUTH");
  })
})

describe('authRequest', () => {
  it('Should return the action', () => {
    const action = actions_Auth.authRequest();
    expect(action.type).toEqual("AUTH_REQUEST");
  })
})

describe('authSuccess', () => {
  it('Should return the action', () => {
      const currentUser = 'test user';
      const action = actions_Auth.authSuccess(currentUser);
      expect(action.type).toEqual("AUTH_SUCCESS");
      expect(action.currentUser).toEqual(currentUser);
  });
});

describe('authError', () => {
  it('Should return the action', () => {
      const error = 'test error';
      const action = actions_Auth.authError(error);
      expect(action.type).toEqual("AUTH_ERROR");
      expect(action.error).toEqual(error);
  });
});

/**********************************/
/*    protectedData.js Actions    */
/**********************************/

describe('fetchProtectedDataSuccess', () => {
  it('Should return the action', () => {
      const data = 'test data';
      const action = actions_Data.fetchProtectedDataSuccess(data);
      expect(action.type).toEqual("FETCH_PROTECTED_DATA_SUCCESS");
      expect(action.data).toEqual(data);
  });
});

describe('fetchProtectedData_usersCharacters_Success', () => {
  it('Should return the action', () => {
      const data = 'test data';
      const action = actions_Data.fetchProtectedData_usersCharacters_Success(data);
      expect(action.type).toEqual("FETCH_PROTECTED_DATA_USERSCHARACTERS_SUCCESS");
      expect(action.data).toEqual(data);
  });
});

describe('fetchProtectedData_charClasses_Success', () => {
  it('Should return the action', () => {
      const data = 'test data';
      const action = actions_Data.fetchProtectedData_charClasses_Success(data);
      expect(action.type).toEqual("FETCH_PROTECTED_DATA_CHARCLASSES_SUCCESS");
      expect(action.data).toEqual(data);
  });
});

describe('fetchProtectedData_armor_Success', () => {
  it('Should return the action', () => {
      const data = 'test data';
      const action = actions_Data.fetchProtectedData_armor_Success(data);
      expect(action.type).toEqual("FETCH_PROTECTED_DATA_ARMOR_SUCCESS");
      expect(action.data).toEqual(data);
  });
});

describe('fetchProtectedData_goodsAndServices_Success', () => {
  it('Should return the action', () => {
      const data = 'test data';
      const action = actions_Data.fetchProtectedData_goodsAndServices_Success(data);
      expect(action.type).toEqual("FETCH_PROTECTED_DATA_GOODSANDSERVICES_SUCCESS");
      expect(action.data).toEqual(data);
  });
});

describe('fetchProtectedData_tradeGoods_Success', () => {
  it('Should return the action', () => {
      const data = 'test data';
      const action = actions_Data.fetchProtectedData_tradeGoods_Success(data);
      expect(action.type).toEqual("FETCH_PROTECTED_DATA_TRADEGOODS_SUCCESS");
      expect(action.data).toEqual(data);
  });
});

describe('fetchProtectedData_weapons_Success', () => {
  it('Should return the action', () => {
      const data = 'test data';
      const action = actions_Data.fetchProtectedData_weapons_Success(data);
      expect(action.type).toEqual("FETCH_PROTECTED_DATA_WEAPONS_SUCCESS");
      expect(action.data).toEqual(data);
  });
});

describe('fetchProtectedSubDataSuccess', () => {
  it('Should return the action', () => {
      const data = 'test data';
      const action = actions_Data.fetchProtectedSubDataSuccess(data);
      expect(action.type).toEqual("FETCH_PROTECTED_SUB_DATA_SUCCESS");
      expect(action.data).toEqual(data);
  });
});

describe('fetchProtectedSecondaryDataSuccess', () => {
  it('Should return the action', () => {
      const data = 'test data';
      const action = actions_Data.fetchProtectedSecondaryDataSuccess(data);
      expect(action.type).toEqual("FETCH_PROTECTED_SECONDARY_DATA_SUCCESS");
      expect(action.data).toEqual(data);
  });
});

describe('fetchProtectedExtraDataSuccess', () => {
  it('Should return the action', () => {
      const data = 'test data';
      const action = actions_Data.fetchProtectedExtraDataSuccess(data);
      expect(action.type).toEqual("FETCH_PROTECTED_EXTRA_DATA_SUCCESS");
      expect(action.data).toEqual(data);
  });
});

describe('fetchProtectedDataError', () => {
  it('Should return the action', () => {
      const error = 'test error';
      const action = actions_Data.fetchProtectedDataError(error);
      expect(action.type).toEqual("FETCH_PROTECTED_DATA_ERROR");
      expect(action.error).toEqual(error);
  });
});

describe('setLoading', () => {
  it('Should return the action', () => {
      const action = actions_Data.setLoading();
      expect(action.type).toEqual("SET_LOADING");
  });
});

describe('clearData', () => {
  it('Should return the action', () => {
      const action = actions_Data.clearData();
      expect(action.type).toEqual("CLEAR_DATA");
  });
});

describe('setSaved', () => {
  it('Should return the action', () => {
      const saved = 'test toggle';
      const action = actions_Data.setSaved(saved);
      expect(action.type).toEqual("SET_SAVED");
      expect(action.saved).toEqual(saved);
  });
});

/*********************************/
/*        Index.js Actions       */
/*********************************/

describe('loadCharacter', () => {
  it('Should return the action', () => {
      const char = 'test char';
      const action = actions_Index.loadCharacter(char);
      expect(action.type).toEqual("LOAD_CHARACTER");
      expect(action.char).toEqual(char);
  });
});

describe('loadCreationSteps', () => {
  it('Should return the action', () => {
      const action = actions_Index.loadCreationSteps();
      expect(action.type).toEqual("LOAD_CREATION_STEPS");
  });
});

describe('toggleStep', () => {
  it('Should return the action', () => {
      const index = 0;
      const disabledNext = true;
      const disabledPrev = false;
      const action = actions_Index.toggleStep(index, disabledNext, disabledPrev);
      expect(action.type).toEqual("TOGGLE_STEP");
      expect(action.index).toEqual(index);
      expect(action.disabledNext).toEqual(disabledNext);
      expect(action.disabledPrev).toEqual(disabledPrev);
  });
});

describe('loadRaces', () => {
  it('Should return the action', () => {
      const data = 'test data';
      const action = actions_Index.loadRaces(data);
      expect(action.type).toEqual("LOAD_RACES");
      expect(action.races).toEqual(data);
  });
});

describe('loadClasses', () => {
  it('Should return the action', () => {
      const data = 'test data';
      const action = actions_Index.loadClasses(data);
      expect(action.type).toEqual("LOAD_CLASSES");
      expect(action.classes).toEqual(data);
  });
});

describe('loadTraits', () => {
  it('Should return the action', () => {
      const data = 'test data';
      const action = actions_Index.loadTraits(data);
      expect(action.type).toEqual("LOAD_TRAITS");
      expect(action.traits).toEqual(data);
  });
});

describe('setStep', () => {
  it('Should return the action', () => {
      const index = 0;
      const disabledNext = true;
      const disabledPrev = false;
      const action = actions_Index.setStep(index, disabledNext, disabledPrev);
      expect(action.type).toEqual("SET_STEP");
      expect(action.index).toEqual(index);
      expect(action.disabledNext).toEqual(disabledNext);
      expect(action.disabledPrev).toEqual(disabledPrev);
  });
});

describe('toggleRaceExpand', () => {
  it('Should return the action', () => {
      const data = 'test data';
      const action = actions_Index.toggleRaceExpand(data);
      expect(action.type).toEqual("TOGGLE_RACE_EXPAND");
      expect(action.index).toEqual(data);
  });
});

describe('abilityScoreGenerationMethod', () => {
  it('Should return the action', () => {
      const data = 'test data';
      const action = actions_Index.abilityScoreGenerationMethod(data);
      expect(action.type).toEqual("ABILITY_SCORE_GENERATION_METHOD");
      expect(action.name).toEqual(data);
  });
});

describe('resetAbilityScoreGenerationMethod', () => {
  it('Should return the action', () => {
      const action = actions_Index.resetAbilityScoreGenerationMethod();
      expect(action.type).toEqual("RESET_ABILITY_SCORE_GENERATION_METHOD");
  });
});

describe('setAvailableStats', () => {
  it('Should return the action', () => {
      const data = 'test data';
      const action = actions_Index.setAvailableStats(data);
      expect(action.type).toEqual("SET_AVAILABLE_STATS");
      expect(action.statArray).toEqual(data);
  });
});

describe('assignScore', () => {
  it('Should return the action', () => {
      const data = 'test data';
      const action = actions_Index.assignScore(data);
      expect(action.type).toEqual("ASSIGN_SCORE");
      expect(action.value).toEqual(data);
  });
});

describe('submitPreferencesToState', () => {
  it('Should return the action', () => {
      const data = 'test data';
      const action = actions_Index.submitPreferencesToState(data);
      expect(action.type).toEqual("SUBMIT_PREFERENCES_TO_STATE");
      expect(action.values).toEqual(data);
  });
});

describe('toggleHelp', () => {
  it('Should return the action', () => {
      const action = actions_Index.toggleHelp();
      expect(action.type).toEqual("TOGGLE_HELP");
  });
});

describe('submitRaceToState', () => {
  it('Should return the action', () => {
      const data = 'test data';
      const action = actions_Index.submitRaceToState(data);
      expect(action.type).toEqual("SUBMIT_RACE_TO_STATE");
      expect(action.index).toEqual(data);
  });
});

describe('submitAasimarRaceToState', () => {
  it('Should return the action', () => {
      const data = 'test data';
      const action = actions_Index.submitAasimarRaceToState(data);
      expect(action.type).toEqual("SUBMIT_AASIMAR_RACE_TO_STATE");
      expect(action.race).toEqual(data);
  });
});

describe('submitAbilityScoreToState', () => {
  it('Should return the action', () => {
      const index = 0;
      const disabledNext = true;
      const disabledPrev = false;
      const action = actions_Index.submitAbilityScoreToState(index, disabledNext, disabledPrev);
      expect(action.type).toEqual("SUBMIT_ABILITY_SCORES_TO_STATE");
      expect(action.ability).toEqual(index);
      expect(action.bonusType).toEqual(disabledNext);
      expect(action.bonus).toEqual(disabledPrev);
  });
});