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

// Prep for future release
/*export const TOGGLE_FEATURE_EXPAND = 'TOGGLE_FEATURE_EXPAND';
export const toggleFeatureExpand = (charClass, feature) => ({
	type: TOGGLE_FEATURE_EXPAND,
	charClass, feature, 
});*/