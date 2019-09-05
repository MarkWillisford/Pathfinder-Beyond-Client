import { createBonus } from '../utility/statObjectFactories'

export const LOAD_CHARACTER = 'LOAD_CHARACTER';
export const loadCharacter = (char) => ({
    type: LOAD_CHARACTER,
    char,
});

export const LOAD_CREATION_STEPS = 'LOAD_CREATION_STEPS';
export const loadCreationSteps = () => ({
	type: LOAD_CREATION_STEPS,
});

export const TOGGLE_STEP = 'TOGGLE_STEP';
export const toggleStep = (index, disabledNext, disabledPrev) => ({
	type: TOGGLE_STEP,
	index, disabledNext, disabledPrev,
});

export const LOAD_RACES = 'LOAD_RACES';
export const loadRaces = (races) => ({
	type: LOAD_RACES,
	races,
});

export const LOAD_CLASSES = 'LOAD_CLASSES';
export const loadClasses = (classes) => ({
	type: LOAD_CLASSES,
	classes,
});

export const LOAD_TRAITS = 'LOAD_TRAITS';
export const loadTraits = (traits) => ({
	type: LOAD_TRAITS,
	traits,
});

export const SET_STEP = 'SET_STEP';
export const setStep = (index, disabledNext, disabledPrev) => ({
	type: SET_STEP,
	index, disabledNext, disabledPrev,
});

export const TOGGLE_RACE_EXPAND = 'TOGGLE_RACE_EXPAND';
export const toggleRaceExpand = (index) => ({
	type: TOGGLE_RACE_EXPAND,
	index, 
});

export const ABILITY_SCORE_GENERATION_METHOD = 'ABILITY_SCORE_GENERATION_METHOD';
export const abilityScoreGenerationMethod = (name) => ({
	type: ABILITY_SCORE_GENERATION_METHOD,
	name, 
});

export const RESET_ABILITY_SCORE_GENERATION_METHOD = 'RESET_ABILITY_SCORE_GENERATION_METHOD';
export const resetAbilityScoreGenerationMethod = () => ({
	type: RESET_ABILITY_SCORE_GENERATION_METHOD,
});

export const SET_AVAILABLE_STATS = 'SET_AVAILABLE_STATS';
export const setAvailableStats = (statArray) => ({
	type: SET_AVAILABLE_STATS,
	statArray, 
});

export const ASSIGN_SCORE = 'ASSIGN_SCORE';
export const assignScore = (value) => ({
	type: ASSIGN_SCORE,
	value, 
});

export const SUBMIT_PREFERENCES_TO_STATE = 'SUBMIT_PREFERENCES_TO_STATE';
export const submitPreferencesToState = (values) => ({
	type: SUBMIT_PREFERENCES_TO_STATE,
	values, 
});

export const TOGGLE_HELP = 'TOGGLE_HELP';
export const toggleHelp = () => ({
	type: TOGGLE_HELP,
});

export const SUBMIT_RACE_TO_STATE = 'SUBMIT_RACE_TO_STATE';
export const submitRaceToState = (index) => ({
	type: SUBMIT_RACE_TO_STATE,
	index,
});

export const SUBMIT_AASIMAR_RACE_TO_STATE = 'SUBMIT_AASIMAR_RACE_TO_STATE';
export const submitAasimarRaceToState = (race) => ({
	type: SUBMIT_AASIMAR_RACE_TO_STATE,
	race,
});

export const SUBMIT_ABILITY_SCORES_TO_STATE = 'SUBMIT_ABILITY_SCORES_TO_STATE';
export const submitAbilityScoreToState = (ability, bonusType, bonus) => ({
	type: SUBMIT_ABILITY_SCORES_TO_STATE, 
	ability, bonusType, bonus, 
});

export const SUBMIT_SKILLS_TO_STATE = 'SUBMIT_SKILLS_TO_STATE';
export const submitSkillsToState = (skill, bonusType, bonus) => ({
	type: SUBMIT_SKILLS_TO_STATE, 
	skill, bonusType, bonus, 
});

export const REMOVE_SKILLS_FROM_STATE = 'REMOVE_SKILLS_FROM_STATE';
export const removeSkillsFromState = (skill, bonusType, bonus) => ({
	type: REMOVE_SKILLS_FROM_STATE, 
	skill, bonusType, bonus, 
});

export const SUBMIT_CLASS_TO_STATE = 'SUBMIT_CLASS_TO_STATE';
export const submitClassToState = (index) => ({
	type: SUBMIT_CLASS_TO_STATE,
	index,
});

export const RESET_CHAR_CLASS = 'RESET_CHAR_CLASS';
export const resetCharClass = () => ({
	type: RESET_CHAR_CLASS,
});

export const SUBMIT_FEAT_TO_STATE = 'SUBMIT_FEAT_TO_STATE';
export const submitFeatToState = (feat) => ({
	type: SUBMIT_FEAT_TO_STATE,
	feat,
});

export const CLEAR_FEATS = 'CLEAR_FEATS';
export const clearFeats = (slots) => ({
  type: CLEAR_FEATS,
  slots,
});

export const SET_FEAT_FILTER = 'SET_FEAT_FILTER';
export const setFeatFilter = (category) => ({
	type: SET_FEAT_FILTER,
	category,
});

export const CLEAR_FEAT_FILTER = 'CLEAR_FEAT_FILTER';
export const clearFeatFilter = () => ({
	type: CLEAR_FEAT_FILTER,
});

export const SET_TRAIT_FILTER = 'SET_TRAIT_FILTER';
export const setTraitFilter = (category) => ({
	type: SET_TRAIT_FILTER,
	category,
});

export const CLEAR_TRAIT_FILTER = 'CLEAR_TRAIT_FILTER';
export const clearTraitFilter = () => ({
	type: CLEAR_TRAIT_FILTER,
});

export const SUBMIT_DETAILS_TO_STATE = 'SUBMIT_DETAILS_TO_STATE';
export const submitDetailsToState = (values) => ({
	type: SUBMIT_DETAILS_TO_STATE,
	values,
});

export const TOGGLE_CLASS_EXPAND = 'TOGGLE_CLASS_EXPAND';
export const toggleClassExpand = (index) => ({
	type: TOGGLE_CLASS_EXPAND,
	index, 
});

export const TOGGLE_DETAILS_EXPAND = 'TOGGLE_DETAILS_EXPAND';
export const toggleDetailsExpand = (index) => ({
	type: TOGGLE_DETAILS_EXPAND,
	index, 
});

export const SAVE_ABILITY_SCORE_OPTIONS = 'SAVE_ABILITY_SCORE_OPTIONS';
export const saveAbilityScoreOptions = (options) => ({
	type: SAVE_ABILITY_SCORE_OPTIONS,
	options,
});

export const SET_STEP_TO_COMPLETE = 'SET_STEP_TO_COMPLETE';
export const setStepToComplete = (step) => ({
	type: SET_STEP_TO_COMPLETE,
	step, 
})

export const EQUIPMENT_GENERATION_METHOD = 'EQUIPMENT_GENERATION_METHOD';
export const equipmentGenerationMethod = (value) => ({
	type: EQUIPMENT_GENERATION_METHOD,
	value, 
});

export const GOLD_GENERATION_METHOD = 'GOLD_GENERATION_METHOD';
export const goldGenerationMethod = (text) => ({
	type: GOLD_GENERATION_METHOD,
	text, 
});

export const SET_GOLD = 'SET_GOLD';
export const setGold = (value) => ({
	type: SET_GOLD,
	value, 
});

export const SET_INITIAL_EQUIPMENT_SLOTS = 'SET_INITIAL_EQUIPMENT_SLOTS';
export const setInitialEquipmentSlots = () => ({
	type: SET_INITIAL_EQUIPMENT_SLOTS,
});

export const SET_EQUIPMENT_SLOT_STATUS = 'SET_EQUIPMENT_SLOT_STATUS';
export const setEquipmentSlotStatus = (slot) => ({
  type: SET_EQUIPMENT_SLOT_STATUS,
  slot,
});

export const SET_EQUIPMENT_SLOT_ITEM = 'SET_EQUIPMENT_SLOT_ITEM';
export const setEquipmentSlotItem = (slotItem) => ({
  type: SET_EQUIPMENT_SLOT_ITEM,
  slotItem,
});

export const SET_TEMP_WEAPON_CATEGORY = 'SET_TEMP_WEAPON_CATEGORY';
export const setTempWeaponCategory = (category) => ({
	type: SET_TEMP_WEAPON_CATEGORY,
	category,
});

export const SET_TEMP_WEAPON = 'SET_TEMP_WEAPON';
export const setTempWeapon = (weapon) => ({
	type: SET_TEMP_WEAPON,
	weapon,
});

export const SET_TEMP_WEAPON_ATTACK_MODIFIER = 'SET_TEMP_WEAPON_ATTACK_MODIFIER';
export const setTempWeaponAttackModifier = (string) => ({
	type: SET_TEMP_WEAPON_ATTACK_MODIFIER,
	string,
});

export const SET_TEMP_WEAPON_DAMAGE_MODIFIER = 'SET_TEMP_WEAPON_DAMAGE_MODIFIER';
export const setTempWeaponDamageModifier = (string) => ({
	type: SET_TEMP_WEAPON_DAMAGE_MODIFIER,
	string,
});

export const SET_TEMP_ARMOR_CATEGORY = 'SET_TEMP_ARMOR_CATEGORY';
export const setTempArmorCategory = (category) => ({
	type: SET_TEMP_ARMOR_CATEGORY,
	category,
});

export const SET_TEMP_ARMOR = 'SET_TEMP_ARMOR';
export const setTempArmor = (armor) => ({
	type: SET_TEMP_ARMOR,
	armor,
});

export const SET_TEMP_ITEM_CATEGORY = 'SET_TEMP_ITEM_CATEGORY';
export const setTempItemCategory = (category) => ({
	type: SET_TEMP_ITEM_CATEGORY,
	category,
});

export const SET_TEMP_ITEM = 'SET_TEMP_ITEM';
export const setTempItem = (item) => ({
	type: SET_TEMP_ITEM,
	item,
});

export const ADD_ITEM_SLOT = 'ADD_ITEM_SLOT';
export const addItemSlot = (newSlot) => ({
	type: ADD_ITEM_SLOT,
	newSlot,
});

export const ADD_ITEM_TO_CHARACTER = 'ADD_ITEM_TO_CHARACTER';
export const addItemToCharacter = (item) => ({
	type: ADD_ITEM_TO_CHARACTER,
	item,
});

export const REMOVE_ITEM_FROM_CHARACTER = 'REMOVE_ITEM_FROM_CHARACTER';
export const removeItemFromCharacter = (item) => ({
	type: REMOVE_ITEM_FROM_CHARACTER,
	item,
});

export const SPEND_GOLD = 'SPEND_GOLD';
export const spendGold = (cost) => ({
	type: SPEND_GOLD,
	cost, 
});

export const SET_EXPANDED_FEAT_CATEGORY = 'SET_EXPANDED_FEAT_CATEGORY';
export const setExpandedFeatCategory = (name) => ({
	type: SET_EXPANDED_FEAT_CATEGORY,
	name, 
});

export const SET_EXPANDED_FEAT = 'SET_EXPANDED_FEAT';
export const setExpandedFeat = (name) => ({
	type: SET_EXPANDED_FEAT,
	name, 
});

export const SET_EXPANDED_TRAIT_CATEGORY = 'SET_EXPANDED_TRAIT_CATEGORY';
export const setExpandedTraitCategory = (name) => ({
	type: SET_EXPANDED_TRAIT_CATEGORY,
	name, 
});

export const SUBMIT_TRAIT_TO_STATE = 'SUBMIT_TRAIT_TO_STATE';
export const submitTraitToState = (trait) => ({
	type: SUBMIT_TRAIT_TO_STATE,
	trait, 
});

export const REMOVE_TRAIT_FROM_STATE = 'REMOVE_TRAIT_FROM_STATE';
export const removeTraitFromState = (trait) => ({
	type: REMOVE_TRAIT_FROM_STATE,
	trait, 
});

export const SAVE_TEMP_SCORE = 'SAVE_TEMP_SCORE';
export const saveTempScore = (ability, score) => ({
  type: SAVE_TEMP_SCORE,
  ability,
  score,
})

export const RESET_TEMP_SCORE = 'RESET_TEMP_SCORE';
export const resetTempScore = () => ({
  type: RESET_TEMP_SCORE,
})

export const ADD_BONUS = 'ADD_BONUS';
export const addBonus = (bonus) => ({
	type: ADD_BONUS,
	bonus,
})

export const REMOVE_BONUS = 'REMOVE_BONUS';
export const removeBonus = (bonus) => ({
	type: REMOVE_BONUS,
	bonus,
})

export const SUM_BONUS = 'SUM_BONUS';
export const sumBonus = (bonus) => ({
	type: SUM_BONUS,
	bonus,
})

export const SET_SELECTIONS = 'SET_SELECTIONS';
export const setSelections = (race) => ({
	type: SET_SELECTIONS,
	race,
})

export const SUBMIT_FAVORED_CLASS_TO_STATE = 'SUBMIT_FAVORED_CLASS_TO_STATE';
export const submitFavoredClassToState = (favoredClass) => ({
	type: SUBMIT_FAVORED_CLASS_TO_STATE, 
	favoredClass,
});

export const SET_CLASS_SELECTIONS_VIEW = 'SET_CLASS_SELECTIONS_VIEW';
export const setClassSelectionsView = (charClass) => ({
	type: SET_CLASS_SELECTIONS_VIEW, 
	charClass,
});

export const REMOVE_CLASS_SELECTIONS_VIEW = 'REMOVE_CLASS_SELECTIONS_VIEW';
export const removeClassSelectionsView = () => ({
	type: REMOVE_CLASS_SELECTIONS_VIEW, 
});

export const SUBMIT_FAVORED_ENEMY = 'SUBMIT_FAVORED_ENEMY';
export const submitFavoredEnemy = (favoredEnemy) => ({
	type: SUBMIT_FAVORED_ENEMY, 
	favoredEnemy,
});

export const SET_GENERIC_EXPAND = 'SET_GENERIC_EXPAND';
export const setGenericExpand = (name) => ({
	type: SET_GENERIC_EXPAND, 
	name,
});

export const SUBMIT_NATURE_BOND = 'SUBMIT_NATURE_BOND';
export const submitNatureBond = (bond) => ({
	type: SUBMIT_NATURE_BOND, 
	bond,
});

export const SET_AVAILABLE_DOMAINS = 'SET_AVAILABLE_DOMAINS';
export const setAvailableDomains = (domains) => ({
	type: SET_AVAILABLE_DOMAINS, 
	domains,
});

export const SUBMIT_DOMAIN = 'SUBMIT_DOMAIN';
export const submitDomain = (domain) => ({
	type: SUBMIT_DOMAIN, 
	domain,
}); 

export const SUBMIT_DEITY = 'SUBMIT_DEITY';
export const submitDeity = (deity) => ({
	type: SUBMIT_DEITY, 
	deity,
}); 

export const SET_DEITY = 'SET_DEITY';
export const setDeity = (deity) => ({
	type: SET_DEITY, 
	deity,
}); 

export const REMOVE_DEITY = 'REMOVE_DEITY';
export const removeDeity = () => ({
	type: REMOVE_DEITY, 
});

export const SET_DOMAIN = 'SET_DOMAIN';
export const setDomain = (domain) => ({
	type: SET_DOMAIN, 
	domain,
});

export const REMOVE_DOMAIN = 'REMOVE_DOMAIN';
export const removeDomain = (domain) => ({
	type: REMOVE_DOMAIN, 
	domain,
});

export const SET_BLOODLINE = 'SET_BLOODLINE';
export const setBloodline = (bloodline) => ({
	type: SET_BLOODLINE, 
	bloodline,
});

export const SET_SPELLS = 'SET_SPELLS';
export const setSpells = (spell, asLevel) => ({
	type: SET_SPELLS, 
	spell, asLevel,
});

export const SUBMIT_SORCERER_DETAILS = 'SUBMIT_SORCERER_DETAILS';
export const submitSorcDetails = (details) => ({
	type: SUBMIT_SORCERER_DETAILS, 
	details,
});

export const SUBMIT_ALIGNMENT_RESTRICTIONS = 'SUBMIT_ALIGNMENT_RESTRICTIONS';
export const submitAlignmentRestrictions = (alignmentRestrictions) => ({
	type: SUBMIT_ALIGNMENT_RESTRICTIONS, 
	alignmentRestrictions,
});

export const ADD_FEAT_SLOT = 'ADD_FEAT_SLOT';
export const addFeatSlot = (category) => ({
	type: ADD_FEAT_SLOT, 
	category,
});

export const SET_TRAITS_TO_COMPLETE = 'SET_TRAITS_TO_COMPLETE';
export const setTraitsToComplete = () => ({
	type: SET_TRAITS_TO_COMPLETE, 
});

export const RESET_TRAITS_TO_COMPLETE = 'RESET_TRAITS_TO_COMPLETE';
export const resetTraitsToComplete = () => ({
	type: RESET_TRAITS_TO_COMPLETE, 
});

export const SET_EXPANDED_RACE = 'SET_EXPANDED_RACE';
export const setExpandedRace = (name) => ({
	type: SET_EXPANDED_RACE, 
	name,
});

export const SET_EXPANDED_CLASS = 'SET_EXPANDED_CLASS';
export const setExpandedClass = (name) => ({
	type: SET_EXPANDED_CLASS, 
	name,
});

export const TOGGLE_MENU_ACTIVE = 'TOGGLE_MENU_ACTIVE';
export const toggleMenuActive = () => ({
  type: TOGGLE_MENU_ACTIVE,
})

export const RESET_CHARACTER_REDUCER_STATE = 'RESET_CHARACTER_REDUCER_STATE';
export const resetCharacterReducerState = () => ({
  type: RESET_CHARACTER_REDUCER_STATE,
})

export const TOGGLE_CHARACTER_REVIEW_VIEW = 'TOGGLE_CHARACTER_REVIEW_VIEW';
export const toggleCharacterReviewView = (string) => ({
  type: TOGGLE_CHARACTER_REVIEW_VIEW,
  string: string,
})

/* export const setStepToCompleteCheckCharacter = (step, dispatch) => {
  dispatch(setStepToComplete(step));
} */

export const RESET_COMPLETED_STEP = 'RESET_COMPLETED_STEP';
export const resetCompletedStep = (step) => ({
  type: RESET_COMPLETED_STEP,
  step: step,
})

export const SET_EDITING_EXISTING_CHARACTERS = 'SET_EDITING_EXISTING_CHARACTERS';
export const setEditingExistingCharacter = (bool) => ({
  type: SET_EDITING_EXISTING_CHARACTERS,
  bool: bool,
})

export const LOAD_SELECTIONS = 'LOAD_SELECTIONS';
export const loadSelections = (selections) => ({
  type: LOAD_SELECTIONS,
  selections: selections,
})

export const LOAD_CHARACTER_ID = 'LOAD_SELECTLOAD_CHARACTER_IDIONS';
export const loadCharacterId = (id) => ({
  type: LOAD_CHARACTER_ID,
  id: id,
})

export const CLEAR_CHAR_STATS = 'CLEAR_CHAR_STATS';
export const clearCharStats = () => ({
  type: CLEAR_CHAR_STATS,
})

export const TOGGLE_CHARACTER_SHEET_WINDOW = 'TOGGLE_CHARACTER_SHEET_WINDOW';
export const toggleCharacterSheetWindow = (name) => ({
  type: TOGGLE_CHARACTER_SHEET_WINDOW,
  name: name,
})

export const editingExistingCharacter = (character) => (dispatch, getState, history) => {
  dispatch(setEditingExistingCharacter(true));
  dispatch(clearCharStats());
  const creationSteps = getState().characterReducer.creationSteps;

  for(let i=0; i<creationSteps.length; i++){
    dispatch(setStepToComplete(i));
  }

  dispatch(goldGenerationMethod(character.goldMethod));
  dispatch(setGold(character.gold));  
  dispatch(spendGold(character.gold - character.availableGold));
  dispatch(abilityScoreGenerationMethod(character.abilityScoreGenerationMethod));

  let preferences = {
    characterName: character.preferences.name,
    advancementSelecter: character.preferences.advancement,
    hpSelecter: character.preferences.hpProcess,
  }
  dispatch(submitPreferencesToState(preferences));
  dispatch(submitRaceToState(character.race));

  for(let i=0;i<character.featSlots.length;i++){
    let featToLoad = character.featSlots[i];
    let {_id, ...feat} = featToLoad
    feat.id = featToLoad._id;

    if(character.featSlots.length > 1){
      dispatch(addFeatSlot("any"));
    }
    dispatch(submitFeatToState(feat));
  }

  for(let i=0;i<character.traitSlots.length;i++){
    let trait = {
      id:character.traitSlots[i]._id,
      name:character.traitSlots[i].Name,
      cateogry:character.traitSlots[i].Cateogry,
      description:character.traitSlots[i].Description,
    }
    dispatch(submitTraitToState(trait));
  }

  dispatch(submitClassToState(character.charClass));
  dispatch(loadSelections(character.selections));
  // build skills
  for(let i=0;i<character.characterStats.length;i++){
    for(let j=0;j<character.characterStats[i].bonuses.length;j++){
      let bonusToCreate = character.characterStats[i].bonuses[j];
      let bonus = createBonus({ 
        name:bonusToCreate.name, 
        source:bonusToCreate.source, 
        stat:bonusToCreate.stat, 
        type:bonusToCreate.type, 
        duration:-1, 
        amount:Number(bonusToCreate.amount) });
      dispatch(addBonus(bonus));
      dispatch(sumBonus(bonus));
    }
  }

  dispatch(submitDetailsToState(character.details));
  dispatch(loadCharacterId(character._id));

  // load gear found at character.gear.armor, .weapon, etc . . .   
  Object.values(character.gear).forEach(item => {
    for(let i=0;i<item.length;i++){
      dispatch(addItemToCharacter(item[i]));
    }
  });
};