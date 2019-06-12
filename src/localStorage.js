export const loadAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const saveAuthToken = authToken => {
  try {
      localStorage.setItem('authToken', authToken);
  } catch (e) {
  }
};

export const clearAuthToken = () => {
  try {
      localStorage.removeItem('authToken');
  } catch (e) {}
};

export const loadCurrentStep = () => {
  return localStorage.getItem('currentStep');
}

export const saveCurrentStep = currentStep => {
  try {
      localStorage.setItem('currentStep', currentStep);
  } catch (e) {
  }
};

export const clearCurrentStep = () => {
  try {
      localStorage.removeItem('currentStep');
  } catch (e) {}
};