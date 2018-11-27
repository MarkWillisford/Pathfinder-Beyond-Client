export const LOAD_CHARACTER = 'LOAD_CHARACTER';
export const loadCharacter = (char) => ({
    type: LOAD_CHARACTER,
    char,
});

export const LOAD_CREATION_STEPS = 'LOAD_CREATION_STEPS';
export const loadCreationSteps = () => ({
	type: LOAD_CREATION_STEPS,
});

export const DECREMENT_CURRENT_STEP = 'DECREMENT_CURRENT_STEP';
export const decrementCurrentStep = () => ({
	type: DECREMENT_CURRENT_STEP,
});

export const INCREMENT_CURRENT_STEP = 'INCREMENT_CURRENT_STEP';
export const incrementCurrentStep = () => ({
	type: INCREMENT_CURRENT_STEP,
});

export const TOGGLE_PREV = 'TOGGLE_PREV';
export const togglePrev = (index, disabledPrev, disabledNext) => ({
	type: TOGGLE_PREV,
	index, disabledPrev, disabledNext,
});

export const TOGGLE_NEXT = 'TOGGLE_NEXT';
export const toggleNext = (index, disabledNext, disabledPrev) => ({
	type: TOGGLE_NEXT,
	index, disabledNext, disabledPrev,
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