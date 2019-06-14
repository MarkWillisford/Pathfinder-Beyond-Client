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

export const SUBMIT_CLASS_TO_STATE = 'SUBMIT_CLASS_TO_STATE';
export const submitClassToState = (index) => ({
	type: SUBMIT_CLASS_TO_STATE,
	index,
});

export const SUBMIT_FEAT_TO_STATE = 'SUBMIT_FEAT_TO_STATE';
export const submitFeatToState = (feat) => ({
	type: SUBMIT_FEAT_TO_STATE,
	feat,
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
export const sumbmitTraitToState = (trait) => ({
	type: SUBMIT_TRAIT_TO_STATE,
	trait, 
});

export const ADD_BONUS = 'ADD_BONUS';
export const addBonus = (bonus) => ({
	type: ADD_BONUS,
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

export const SET_DOMAIN = 'SET_DOMAIN';
export const setDomain = (domain) => ({
	type: SET_DOMAIN, 
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

export const setStepToCompleteCheckCharacter = (step, dispatch) => {
  dispatch(setStepToComplete(step));
}

export const RESET_COMPLETED_STEP = 'RESET_COMPLETED_STEP';
export const resetCompletedStep = (step) => ({
  type: RESET_COMPLETED_STEP,
  step: step,
})