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
export const loadRaces = () => ({
	type: LOAD_RACES,
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