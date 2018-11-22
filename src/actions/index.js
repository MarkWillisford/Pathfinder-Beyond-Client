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